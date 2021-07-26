const prop = <
  Infer,
>(obj: Infer) => <
  Path extends Paths<Infer>
>(...path: Path) => {
  if ((path as string[]).some(p => typeof p === 'number' || p.endsWith('?'))) {
    const a = (path as string[]).reduce(
      (acc, cur) => {
        if (acc.isSome) {
          if (typeof cur === 'string' && cur.endsWith('?')) {
            return acc.obj[cur.slice(0, cur.length - 1)] !== undefined
              ? { obj: acc.obj[cur.slice(0, cur.length - 1)], isSome: true }
              : { obj: undefined, isSome: false }
          } else if (typeof cur === 'number') {
            return acc.obj[cur] !== undefined
              ? { obj: acc.obj[cur], isSome: true }
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
  return (path as string[]).reduce(
    (acc, cur) => acc[cur],
    obj as any
  ) as GiveOpt<AtPath<Infer, Path>, Path>
}


const full: {
  a?: {
    b: number[]
  }
} = {}
const nested = prop(full)('a?', 'b', 30)

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
      : Keys extends unknown
        ? ObjPaths<A, false, Prev, Keys>
          | (OptKeys extends never 
            ? never 
            : ObjPaths<A, true, Prev, OptKeys>)
        : never
    : never

type ArrayPaths<
  A extends Array<unknown>,
  Prev extends unknown[] = []
> = 
  | [...Prev, number]
  | Paths<A[number], [...Prev, number]> 

type ObjPaths<
  A,
  isOpt extends boolean,
  Prev extends unknown[] = [],
  Keys = keyof A
> = 
  | [...Prev, Keys]
  | (isOpt extends true 
      ? (Unopt<Keys> extends keyof A
          ? Paths<NonNullable<A[Unopt<Keys>]>, [...Prev, Keys]> 
          : never)
        : (Keys extends keyof A 
          ? Paths<A[Keys], [...Prev, Keys]> 
          : never))

type AtPath<
  A,
  Args extends unknown[]
> = 
  Args extends [infer Key]
    ? Key extends number
      ? A extends unknown[] ? A[number] : never
      : Unopt<Key> extends keyof A 
        ? true extends HasOpt<Key>
          ? NonNullable<A[Unopt<Key>]>
          : A[Unopt<Key>]
        : never
    : Args extends [infer Key, ...infer Rest]
      ? Key extends number
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