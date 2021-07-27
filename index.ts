import { pipe } from 'fp-ts/function'
import { pick } from 'fp-ts-std/Record'

const prop = <
  Infer,
  Path extends 
    // necessary to allow inference
    Paths<Infer> extends (number | string | readonly string[])[] 
      ? Paths<Infer> 
      : never
>(...path: Path) => (obj: Infer) => {
  if ((path as string[]).some(
    p => typeof p === 'number' || (typeof p === 'string' && p.endsWith('?'))
  )) {
    const a = (path as string[]).reduce(
      (acc, cur) => {
        if (acc.isSome) {
          if (typeof cur === 'number') {
            return acc.obj[cur] !== undefined
              ? { obj: acc.obj[cur], isSome: true }
              : { obj: undefined, isSome: false }
          } else if (typeof cur === 'object') {
            return { obj: pick<any>()(cur)(acc), isSome: true}
          } else if (typeof cur === 'string' && cur.endsWith('?')) {
            return acc.obj[cur.slice(0, cur.length - 1)] !== undefined
              ? { obj: acc.obj[cur.slice(0, cur.length - 1)], isSome: true }
              : { obj: undefined, isSome: false }
          }
          return { obj: acc.obj[cur], isSome: true }
        }
        return acc
      },
      { obj: obj as any, isSome: true }
    )
    return (a.isSome
      ? { _tag: 'Some', value: a.obj }
      : { _tag: 'None' }) as GiveOpt<AtPath<Infer, Path>, Path>
  }
  return (path as (string | string[])[]).reduce(
    (acc, cur) => typeof cur === 'string' 
      ? acc[cur]
      : pick<any>()(cur)(acc),
    obj as any
  ) as GiveOpt<AtPath<Infer, Path>, Path>
}

const nested = pipe(
  { c: [{a: 123, b: 'abc'}] }, 
  prop('c', 0, ['a', 'b'] as const)
)

console.log(nested)

///////////
// types //
//////////

interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}
interface None { readonly _tag: 'None' }
type Option<A> = Some<A> | None

type HasUndesiredKeys<A> = A extends number
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