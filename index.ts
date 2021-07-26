const prop = <
  Infer,
>(obj: Infer) => <
  Path extends Paths<Infer>
>(...path: Path) => {
  if ((path as string[]).some(p => p.endsWith('?'))) {
    const a = (path as string[]).reduce(
      (acc, cur) => {
        if (acc.isSome) {
          if (cur.endsWith('?')) {
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
  return (path as string[]).reduce(
    (acc, cur) => acc[cur],
    obj as any
  ) as GiveOpt<AtPath<Infer, Path>, Path>
}

interface Struct { 
  three?: { 
    four?: string 
  } 
}
const full: Struct = {
  three: {}
}
const nested = prop(full)('three?', 'four')

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
    ? Keys extends unknown
      ? | [...Prev, Keys]
        | (Keys extends keyof A 
            ? Paths<A[Keys], [...Prev, Keys]> 
            : never)
        | (OptKeys extends never 
          ? never 
          : | [...Prev, OptKeys]
            | (Unopt<OptKeys> extends keyof A
                ? Paths<NonNullable<A[Unopt<OptKeys>]>, [...Prev, OptKeys]> 
                : never))
      : never
    : never

type AtPath<
  A,
  Args extends unknown[]
> = 
  Args extends [infer Key]
    ? Unopt<Key> extends keyof A 
      ? true extends HasOpt<Key>
        ? NonNullable<A[Unopt<Key>]>
        : A[Unopt<Key>]
      : never
    : Args extends [infer Key, ...infer Rest]
      ? Unopt<Key> extends keyof A 
        ? true extends HasOpt<Key>
          ? AtPath<NonNullable<A[Unopt<Key>]>, Rest>
          : AtPath<A[Unopt<Key>], Rest>
        : never
      : never

type GiveOpt<A, Args extends unknown[]> =
  true extends HasOpt<Args[number]> ? Option<A> : A

type OptKeyof<A> = {
  [K in keyof A]-?: undefined extends A[K] 
    ? K extends string ? `${K}?` : never 
    : never
}[keyof A]

type HasOpt<K> = K extends `${infer _}?` ? true : never

type Unopt<K> = K extends `${infer Key}?` ? Key : K