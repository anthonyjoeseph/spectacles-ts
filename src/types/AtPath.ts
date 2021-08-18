import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'

export type AtPath<
  A, 
  Args extends readonly unknown[],
  Op extends 'static' | 'unpack' = 'static'
> = Args extends readonly []
  ? A
  : Args extends readonly [infer Key, ...infer Rest]
  ? AtPathInternal<Op, A, Key, Rest>
  : never

type AtPathInternal<
  Op extends 'static' | 'unpack',
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
  Op extends 'static' | 'unpack',
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
  Op extends 'static' | 'unpack',
  A,
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends number
  ? A extends readonly unknown[]
    ? AtPath<A[number], Rest, Op>
    : never
  : Else

type AtNullable<
  Op extends 'static' | 'unpack',
  A,
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends '?'
  ? AtPath<NonNullable<A>, Rest, Op>
  : Else

type AtOption<
  Op extends 'static' | 'unpack',
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
  Op extends 'static' | 'unpack',
  A,
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends '[]>'
  ? A extends unknown[] 
    ? Op extends 'unpack' 
      ? AtPath<A[number], Rest, Op>
      : AtPath<A[number], Rest, Op>[] 
    : never
  : Key extends '{}>'
  ? A extends Record<string, infer Val> 
    ? Op extends 'unpack'
      ? AtPath<Val, Rest, Op> 
      : Record<string, AtPath<Val, Rest, Op>> 
    : never
  : Else

type AtObjectKey<
  Op extends 'static' | 'unpack',
  A,
  Key,
  Rest extends readonly unknown[],
  Else
> = Key extends '?key'
  ? Rest extends [infer RecordKey, ...infer Rest2] 
    ? AtObjectKey<
      Op,
      A,
      RecordKey,
      Rest2,
      Else
    >
    : never
  : Key extends keyof A
  ? AtPath<A[Key], Rest, Op>
  : Else

