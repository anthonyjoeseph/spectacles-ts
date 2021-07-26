const addOptions = (path: string[], wrapVal: any) => {
  const numOpts = path.filter(p => p.startsWith).length
}

const prop = <
  Infer,
>(obj: Infer) => <
  Path extends Paths<Infer>
>(...path: Path) => 
  (path as string[]).map(
    (p) => p.startsWith('?') ? p.slice(1) : p
  ).reduce(
    (acc, cur) => {
      return acc !== undefined ? acc[cur] : undefined
    },
    obj as any
  ) as AtPath<Infer, Path>

interface Struct { 
  three?: { 
    four: string 
  } 
}
const full: Struct = {
  three: {
    four: '33'
  }
}
const nested = // <-- correctly inferred as string | undefined
  prop(
    full
  )('three?', 'four') // <-- autocomplete for a variable # of fields

///////////
// types //
//////////

type Some<A> = {
  _tag: 'Some',
  value: A
}
type None = { _tag: 'None' }
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
  Keys = OptKeyof<A>
> = 
  HasUndesiredKeys<A> extends false 
    ? Keys extends unknown
      ? Unopt<Keys> extends keyof A 
          ? | [...Prev, Keys] 
            | Paths<NonNullable<A[Unopt<Keys>]>, [...Prev, Keys]>
          : never
      : never
    : never

type AtPath<
  A,
  Args extends unknown[]
> = Args extends [infer Key]
  ? Unopt<Key> extends keyof A 
    ? undefined extends A[Unopt<Key>] ? Option<NonNullable<A[Unopt<Key>]>> : A[Unopt<Key>]
    : never
  : Args extends [infer Key, ...infer Rest]
    ? Unopt<Key> extends keyof A 
      ? undefined extends A[Unopt<Key>] 
        ? Option<AtPath<NonNullable<A[Unopt<Key>]>, Rest>>
        : AtPath<A[Unopt<Key>], Rest>
      : never
    : never

type OptKeyof<A> = {
  [K in keyof A]-?: undefined extends A[K] 
    ? K extends string ? `${K}?` : never 
    : K
}[keyof A]

type Unopt<K> = K extends `${infer Key}?` ? Key : K
