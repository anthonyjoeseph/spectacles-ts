import type { HasUndesiredKeys, OptKeyof, Unopt } from "./utils"

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
      | RefinementPaths<A, Prev>
      | (
        Keys extends unknown
          ? ObjPaths<A, false, Prev, Keys>
            | (OptKeys extends never 
              ? never 
              : ObjPaths<A, true, Prev, OptKeys>)
          : never
      )
  : never

export type RefinementPaths<
  A extends B,
  Prev extends readonly unknown[],
  B = A
> = A extends unknown
  ? [B] extends [A]
    ? never
    : | readonly [...Prev, (b: B) => b is A]
      | Paths<A, readonly [...Prev, (b: B) => b is A]>
  : never

type ArrayPaths<
  A extends readonly unknown[],
  Prev extends readonly unknown[]
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