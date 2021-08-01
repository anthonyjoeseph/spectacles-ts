import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'
import { HasUndesiredKeys, IsNull, TupleKeyof } from './utils'

export type Paths<A, Prev extends unknown[] = []> =
  | Prev
  | NullPaths<
      A,
      Prev,
      OptionPaths<
        A,
        Prev,
        RefinementPaths<A, Prev, ObjectPaths<A, Prev, never>>
      >
    >

type NullPaths<A, Prev extends unknown[], Else> = true extends IsNull<A>
  ?
      | Prev
      | OptionPaths<
          A,
          [...Prev, '?'],
          RefinementPaths<
            NonNullable<A>,
            [...Prev, '?'],
            ObjectPaths<NonNullable<A>, [...Prev, '?'], never>
          >
        >
  : Else

type RefinementPaths<
  A extends B,
  Prev extends unknown[],
  Else,
  B = A
> = A extends unknown
  ? [B] extends [A]
    ? Else
    : Prev | ObjectPaths<A, [...Prev, (b: B) => b is A], never>
  : never

type ObjectPaths<
  A,
  Prev extends unknown[],
  Else,
  Key extends keyof A = TupleKeyof<A>
> = true extends HasUndesiredKeys<A>
  ? Else
  :
      | Prev
      | [...Prev, readonly Key[]]
      | (Key extends never
          ? A extends unknown[]
            ? Paths<A[number], [...Prev, number]>
            : never
          : Paths<A[Key], [...Prev, Key]>)

type OptionPaths<A, Prev extends unknown[], Else> = [A] extends [
  Option<infer Some>
]
  ? Paths<Some, [...Prev, '?some']>
  : [A] extends [Either<infer Left, infer Right>]
  ? Paths<Left, [...Prev, '?left']> | Paths<Right, [...Prev, '?right']>
  : Else
