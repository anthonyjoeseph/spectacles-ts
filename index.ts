import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'

import * as S from 'fp-ts/string'
import * as Eq from 'fp-ts/Eq'
import * as O from 'fp-ts/Option'

const isPathLens = (
  path: (number | string | readonly string[])[]
): path is (string | readonly string[])[] => !path.some(
  p => typeof p === 'number' || (typeof p === 'string' && p.endsWith('?'))
)

const optionalFromPath = (
  path: (number | string | readonly string[])[]
): Op.Optional<any, any> => {
  const opt = path.reduce(
    (acc, cur) => {
      if (Array.isArray(cur)) {
        return pipe(acc, Op.props(...(cur as [string, string])))
      } else if (typeof cur === 'number') {
        return pipe(acc, Op.index(cur))
      } else if (typeof cur === 'string' && cur.endsWith('?')) {
        return pipe(acc, Op.prop(cur.slice(0, cur.length - 1)), Op.fromNullable)
      }
      return pipe(acc, Op.prop(cur as string))
    },
    Op.id<any>()
  )
  return opt
}

const lensFromPath = (
  path: (string | readonly string[])[]
): L.Lens<any, any> => {
  const lens = path.reduce(
    (acc, cur) => {
      if (Array.isArray(cur)) {
        return pipe(acc, L.props(...(cur as [string, string])))
      }
      return pipe(acc, L.prop(cur as string))
    },
    L.id<any>()
  )
  return lens
}


export const get = <
  Infer,
  Path extends 
    Paths<Infer> extends never
      ? (number | string | readonly string[])[]
      // necessary to allow inference
      : Paths<Infer> extends (number | string | readonly string[])[] 
        ? Paths<Infer> 
        : never,
  Ret
>(...path: Path): (
  unknown extends Ret
    ? <Constructed extends BuildObj<Path, unknown>>(c: Constructed) => GiveOpt<AtPath<Constructed, Path>, Path>
    : (obj: Paths<Infer> extends never ? BuildObj<Path, Ret> : Infer) => 
      Paths<Infer> extends never ? Ret : GiveOpt<AtPath<Infer, Path>, Path>
) => {
  if (isPathLens(path)) {
    return lensFromPath(path)
      .get as any
  }
  return optionalFromPath(path)
    .getOption as any
}

const lkj = get('a', 'b?', 0, ['c', 'e'] as const)({
  a: {
    b: [{ c: 123, e: true }]
  }
})
const zztop = pipe(O.getEq(S.Eq), Eq.contramap(get('a?', 'b')))

export const set = <
  Val
>(
  val: Val
) => <
  Infer extends BuildObj<Path, Val>,
  Path extends 
    // necessary to allow inference
    Paths<Infer> extends (number | string | readonly string[])[] 
      ? Paths<Infer> 
      : never
>(...path: Path) => 
  (obj: Infer) =>
  {
  if (isPathLens(path)) {
    return lensFromPath(path)
      .set(val)(obj) as Infer
  }
  return optionalFromPath(path)
    .set(val)(obj) as Infer
}

export const modify = <
  Val
>(
  modFunc: (v: Val) => Val
) => <
  Infer extends BuildObj<Path, Val>,
  Path extends 
    // necessary to allow inference
    Paths<Infer> extends (number | string | readonly string[])[] 
      ? Paths<Infer> 
      : never
>(...path: Path) => 
(a: Infer) => {
  if (isPathLens(path)) {
    return pipe(
      lensFromPath(path),
      L.modify(modFunc)
    )(a) as Infer
  }
  return pipe(
    optionalFromPath(path),
    Op.modify(modFunc)
  )(a) as Infer
}

export const modifyOption = <
  Val
>(
  modFunc: (v: Val) => Val
) => <
  Infer extends BuildObj<Path, Val>,
  Path extends 
    // necessary to allow inference
    Paths<Infer> extends (number | string | readonly string[])[] 
      ? Paths<Infer> 
      : never
>(...path: Path) => 
(a: Infer) => {
  if (isPathLens(path)) {
    return pipe(
      lensFromPath(path),
      L.modify(modFunc)
    )(a) as GiveOpt<Infer, Path>
  }
  return pipe(
    optionalFromPath(path),
    Op.modifyOption(modFunc)
  )(a) as GiveOpt<Infer, Path>
}

interface Data { a: {b?: {c: number; d: string; e: boolean }[] } }
const data: Data = {
  a: {
    b: [{
      c: 123,
      d: 'abc',
      e: false
    }]
  }
}

const gotten = pipe(
  data, 
  get('a', 'b?', 0, ['c', 'e'] as const)
)

const beenSet = pipe(
  data,
  set({c: 456, e: true})('a', 'b?', 0, ['c', 'e'] as const)
)

const modified = pipe(
  data,
  modify((j: number) => j + 4)('a', 'b?', 0, 'c')
)
const modifyOpted = pipe(
  data,
  modifyOption((j: number) => j + 4)('a', 'b?', 0, 'c')
)
const modifyUnopted = pipe(
  {a: 123},
  modifyOption((j: number) => j + 4)('a')
)

console.log(`get: ${JSON.stringify(gotten)}`)
console.log(`set: ${JSON.stringify(beenSet)}`)
console.log(`modify: ${JSON.stringify(modified)}`)
console.log(`modifyOptioned: ${JSON.stringify(modifyOpted)}`)
console.log(`modifyOptioned (but not): ${JSON.stringify(modifyUnopted)}`)

///////////
// types //
//////////

interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}
interface None { readonly _tag: 'None' }
type Option<A> = Some<A> | None

type HasUndesiredKeys<A> = 
  unknown extends A
    ? true
    : A extends number
      ? true
      : A extends string
        ? true
        : A extends boolean
          ? true
          : A extends Promise<any>
            ? true
            : false

type Paths<
  A, 
  Prev extends unknown[] = [],
  Keys = keyof A,
  OptKeys = OptKeyof<A>
> = 
  HasUndesiredKeys<A> extends false 
    ? [A] extends [Array<unknown>]
      ? ArrayPaths<A, Prev>
      : 
        | [...Prev, readonly Keys[]]
        | (
          Keys extends unknown
            ? ObjPaths<A, false, Prev, Keys>
              | (OptKeys extends never 
                ? never 
                : ObjPaths<A, true, Prev, OptKeys>)
            : never
        )
    : never

type ArrayPaths<
  A extends Array<unknown>,
  Prev extends unknown[] = []
> = 
  | [...Prev, number]
  | Paths<A[number], [...Prev, number]>
  // | ObjPaths<A, false, Prev, TupleKeyof<A>>

type ObjPaths<
  A,
  isOpt extends boolean,
  Prev extends unknown[] = [],
  Keys = keyof A
> = 
  | [...Prev, Keys]
  | (
      isOpt extends true 
        ? (
            Unopt<Keys> extends keyof A
              ? Paths<NonNullable<A[Unopt<Keys>]>, [...Prev, Keys]> 
              : never
          )
          : (
              Keys extends keyof A 
              ? Paths<A[Keys], [...Prev, Keys]> 
              : never
            )
    )

type AtPath<
  A,
  Args extends unknown[]
> = 
  Args extends []
    ? A
    : Args extends [infer Key, ...infer Rest]
      ? Key extends readonly (keyof A)[]
        ? { [P in Key[number]]: A[P] }
        : Key extends number
          ? A extends unknown[] ? AtPath<A[number], Rest> : never
          : Unopt<Key> extends keyof A 
              ? true extends HasOpt<Key>
                ? AtPath<NonNullable<A[Unopt<Key>]>, Rest>
                : AtPath<A[Unopt<Key>], Rest>
              : never
            : never

type BuildObj<
  Path extends unknown[],
  Obj
> = 
  Path extends []
    ? Obj
    : Path extends [...infer Rest, infer Key]
      ? Key extends readonly string[]
        ? unknown extends Obj 
          ? BuildObj<Rest, { [P in Key[number]]: unknown }>
          : BuildObj<Rest, Obj>
        : Key extends number
          ? BuildObj<Rest, Obj[]>
          : Key extends string 
              ? true extends HasOpt<Key>
                ? BuildObj<Rest, { [k in Unopt<Key>]?: Obj }>
                : BuildObj<Rest, { [k in Unopt<Key>]: Obj }>
              : never
            : never

type GiveOpt<A, Args extends unknown[]> =
  true extends HasOpt<Args[number]> 
    ? Option<A> 
    : true extends HasNum<Args[number]>
      ? Option<A> 
      : A

type OptKeyof<A> = {
  [K in keyof A]-?: undefined extends A[K] 
    ? K extends string ? `${K}?` : never 
    : never
}[keyof A]

type HasOpt<K> = K extends `${infer _}?` ? true : never

type HasNum<K> = K extends number ? true : never

type Unopt<K> = K extends `${infer Key}?` ? Key : K

type TupleKeyof<A extends unknown[]> =
  Exclude<
    keyof A,
    keyof Array<unknown>
  >