import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'

export type AtPath<A, Args extends readonly unknown[]> = Args extends readonly [

]
  ? A
  : Args extends readonly [infer Key, ...infer Rest]
  ? Key extends (a: any) => a is infer A
    ? AtPath<A, Rest>
    : Key extends readonly (keyof A)[]
    ? { [P in Key[number]]: A[P] }
    : Key extends number
    ? A extends unknown[]
      ? AtPath<A[number], Rest>
      : never
    : Key extends '?'
    ? AtPath<NonNullable<A>, Rest>
    : Key extends '?some'
    ? [A] extends [Option<infer Some>]
      ? AtPath<Some, Rest>
      : never
    : Key extends '?right'
    ? [A] extends [Either<unknown, infer Right>]
      ? AtPath<Right, Rest>
      : never
    : Key extends '?left'
    ? [A] extends [Either<infer Left, unknown>]
      ? AtPath<Left, Rest>
      : never
    : Key extends '[]>'
    ? A extends unknown[] ? AtPath<A[number], Rest>[] : never
    : Key extends '{}>'
    ? A extends Record<string, infer Val> ? Record<string, AtPath<Val, Rest>> : never
    : Key extends keyof A
    ? AtPath<
        A[Key] | (string extends keyof A ? undefined : never), 
        Rest
      >
    : never
  : never
