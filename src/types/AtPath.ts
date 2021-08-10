import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'

export type AtPath<
  A, 
  Args extends readonly unknown[],
  Op extends 'static' | 'insert' = 'static'
> = Args extends readonly []
  ? A
  : Args extends readonly [infer Key, ...infer Rest]
  ? AtPathInternal<Op, A, Key, Rest>
  : never

type AtPathInternal<
  Op extends 'static' | 'insert',
  A,
  Key,
  Rest extends readonly unknown[]
> = AtRefinement<
  Op, Key, Rest,
  AtPick<
      A, Key,
      AtArray<
      Op, A, Key, Rest,
      AtNullable<
        Op, A, Key, Rest,
        AtOption<
          Op, A, Key, Rest,
          AtTraversal<
            Op, A, Key, Rest,
            AtObjectKey<Op, A, Key, Rest, never>
          >
        >
      >
    >
  >
>

type AtRefinement<
  Op extends 'static' | 'insert',
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends (a: any) => a is infer Refined
  ? AtPath<Refined, Rest, Op>
  : Else

type AtPick<
  A,
  Key,
  Else
> = Key extends readonly (keyof A)[]
  ? { [P in Key[number]]: A[P] }
  : Else

type AtArray<
  Op extends 'static' | 'insert',
  A,
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends number
  ? A extends unknown[]
    ? AtPath<A[number], Rest, Op>
    : never
  : Else

type AtNullable<
  Op extends 'static' | 'insert',
  A,
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends '?'
  ? AtPath<NonNullable<A>, Rest, Op>
  : Else

type AtOption<
  Op extends 'static' | 'insert',
  A,
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends '?some'
? [A] extends [Option<infer Some>]
  ? AtPath<Some, Rest>
  : never
: Key extends '?right'
? [A] extends [Either<unknown, infer Right>]
  ? AtPath<Right, Rest, Op>
  : never
: Key extends '?left'
? [A] extends [Either<infer Left, unknown>]
  ? AtPath<Left, Rest, Op>
  : never
: Else

type AtTraversal<
  Op extends 'static' | 'insert',
  A,
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends '[]>'
  ? A extends unknown[] ? AtPath<A[number], Rest, Op>[] : never
  : Key extends '{}>'
  ? A extends Record<string, infer Val> ? Record<string, AtPath<Val, Rest, Op>> : never
  : Else

type AtObjectKey<
  Op extends 'static' | 'insert',
  A,
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends keyof A
  ? AtPath<
      A[Key] | (string extends keyof A ? undefined : never), 
      Rest,
      Op
    >
  : Else