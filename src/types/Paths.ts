import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'
import { IsNull, IsTupleOrRecord, TupleKeyof } from './utils'

type Operation = 
| 'static'
| 'upsert'
| 'remove'
| 'rename'

export type Paths<A, Op extends Operation = 'static', Prev extends unknown[] = []> =
  | (Op extends 'static' ? Prev : never)
  | NullPaths<
      A,
      Op,
      Prev,
      OptionPaths<
        A,
        Op,
        Prev,
        RefinementPaths<A, Op, Prev, ObjectPaths<A, Op, Prev, never>>
      >
    >

type NullPaths<A, Op extends Operation, Prev extends unknown[], Else> = true extends IsNull<A>
  ?
      | (Op extends 'static' ? Prev : never)
      | [...Prev, '?']
      | OptionPaths<
          A,
          Op,
          [...Prev, '?'],
          RefinementPaths<
            NonNullable<A>,
            Op,
            [...Prev, '?'],
            ObjectPaths<NonNullable<A>, Op, [...Prev, '?'], never>
          >
        >
  : Else

type RefinementPaths<
  A extends B,
  Op extends Operation, 
  Prev extends unknown[],
  Else,
  B = A
> = A extends unknown
  ? [B] extends [A]
    ? Else
    : Prev | ObjectPaths<A, Op, [...Prev, (b: B) => b is A], never>
  : never

type ObjectPaths<
  A,
  Op extends Operation, 
  Prev extends unknown[],
  Else,
  Key extends keyof A = TupleKeyof<A>
> = true extends IsTupleOrRecord<A>
  ?  ((Op extends 'static' ? Prev : never)
    | (A extends Array<unknown> 
        ? never 
        : (
          | (Op extends 'static' | 'remove' ? [...Prev, Key[]] : never)
          | (Op extends 'upsert' 
            ? string extends Key
              ? never
              : [...Prev, string] 
            : never)
        ))
    | (Key extends never 
        ? never
        : string extends Key
          ? Paths<
            A[Key], 
            Op,
            (
              | [...Prev, '{}>']
              | [...Prev, '?key', string]
            )
          > 
          : (
            | Paths<A[Key], Op, [...Prev, Key]> 
            | (Op extends 'rename' | 'remove'
              ? [...Prev, Key]
              : never)
          )
      ))
  : A extends unknown[] 
    ? Paths<
      A[number], 
      Op,
      [...Prev, number | '[]>']
    > 
    : Else

type OptionPaths<A, Op extends Operation, Prev extends unknown[], Else> = [A] extends [
  Option<infer Some>
]
  ? Paths<Some, Op, [...Prev, '?some']>
  : [A] extends [Either<infer Left, infer Right>]
  ? Paths<Left, Op, [...Prev, '?left']> | Paths<Right, Op, [...Prev, '?right']>
  : Else
