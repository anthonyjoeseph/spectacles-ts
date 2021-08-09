import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'
import { IsNull, IsTupleOrRecord, TupleKeyof } from './utils'

export type Paths<A, Op extends 'static' | 'insert' = 'static', Prev extends unknown[] = []> =
  | Prev
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

type NullPaths<A, Op extends 'static' | 'insert', Prev extends unknown[], Else> = true extends IsNull<A>
  ?
      | Prev
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
  Op extends 'static' | 'insert', 
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
  Op extends 'static' | 'insert', 
  Prev extends unknown[],
  Else,
  Key extends keyof A = TupleKeyof<A>
> = true extends IsTupleOrRecord<A>
  ?  (Prev
    | (A extends Record<string, unknown> ? [...Prev, Key[]] : never)
    | (Key extends unknown 
        ? string extends Key
          ? Paths<
            A[Key] | undefined, 
            Op,
            [...Prev, Key | '{}>']
          > 
          : Paths<A[Key], Op, [...Prev, Key]> 
        : never
      ))
  : A extends unknown[] 
    ? Paths<
      A[number], 
      Op,
      [...Prev, number | '[]>']
    > 
    : Else

type OptionPaths<A, Op extends 'static' | 'insert', Prev extends unknown[], Else> = [A] extends [
  Option<infer Some>
]
  ? Paths<Some, Op, [...Prev, '?some']>
  : [A] extends [Either<infer Left, infer Right>]
  ? Paths<Left, Op, [...Prev, '?left']> | Paths<Right, Op, [...Prev, '?right']>
  : Else
