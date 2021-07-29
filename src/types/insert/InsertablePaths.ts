import type { HasUndesiredKeys, OptKeyof, Unopt } from "../utils"

export type InsertablePaths<
  A, 
  Prev extends readonly unknown[] = [],
  Keys = keyof A,
  OptKeys = OptKeyof<A>
> = 
  HasUndesiredKeys<A> extends false 
    ? [A] extends [readonly unknown[]]
      ? ArrayPaths<A, Prev>
      : 
        | RefinementPaths<NonNullable<A>, Prev>
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
  Prev extends readonly unknown[]
> = 
  | readonly [...Prev, number]
  | InsertablePaths<A[number], readonly [...Prev, number]>
  // | ObjPaths<A, false, Prev, TupleKeyof<A>>

type ObjPaths<
  A,
  isOpt extends boolean,
  Prev extends readonly unknown[] = [],
  Keys = keyof A
> = 
  | readonly [...Prev, Keys, string]
  | (
      isOpt extends true 
        ? (
            Unopt<Keys> extends keyof A
              ? InsertablePaths<NonNullable<A[Unopt<Keys>]>, readonly [...Prev, Keys]> 
              : never
          )
          : (
              Keys extends keyof A 
              ? InsertablePaths<A[Keys], readonly [...Prev, Keys]> 
              : never
            )
    )

export type RefinementPaths<
  A extends B,
  Prev extends readonly unknown[],
  B = A
> = A extends unknown
  ? [B] extends [A]
    ? never
    : InsertablePaths<A, readonly [...Prev, (b: B) => b is A]>
  : never