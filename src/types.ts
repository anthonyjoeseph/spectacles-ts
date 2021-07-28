import type { Option } from 'fp-ts/Option'

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

export type Paths<
  A, 
  Prev extends readonly unknown[] = [],
  Keys = keyof A,
  OptKeys = OptKeyof<A>
> = 
  HasUndesiredKeys<A> extends false 
    ? [A] extends [readonly unknown[]]
      ? ArrayPaths<A, Prev>
      : 
        | readonly [...Prev, readonly Keys[]]
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
  A extends readonly unknown[],
  Prev extends readonly unknown[] = []
> = 
  | readonly [...Prev, number]
  | Paths<A[number], readonly [...Prev, number]>
  // | ObjPaths<A, false, Prev, TupleKeyof<A>>

type ObjPaths<
  A,
  isOpt extends boolean,
  Prev extends readonly unknown[] = [],
  Keys = keyof A
> = 
  | readonly [...Prev, Keys]
  | (
      isOpt extends true 
        ? (
            Unopt<Keys> extends keyof A
              ? Paths<NonNullable<A[Unopt<Keys>]>, readonly [...Prev, Keys]> 
              : never
          )
          : (
              Keys extends keyof A 
              ? Paths<A[Keys], readonly [...Prev, Keys]> 
              : never
            )
    )

export type AtPath<
  A,
  Args extends readonly unknown[]
> = 
  Args extends readonly []
    ? A
    : Args extends readonly [infer Key, ...infer Rest]
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

export type BuildObj<
  Path extends readonly unknown[],
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

export type GiveOpt<A, Args extends readonly unknown[]> =
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