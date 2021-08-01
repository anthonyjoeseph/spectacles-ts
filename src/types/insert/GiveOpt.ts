import type { Option } from 'fp-ts/Option'
import type { HasNum, HasNull, HasRefinement, HasOptional } from '../utils'

export type GiveOpt<A, Args extends readonly unknown[]> = true extends HasNull<
  Args[number]
>
  ? Option<A>
  : true extends HasNum<Args[number]>
  ? 0 extends Args[number]
    ? A
    : Option<A>
  : true extends HasRefinement<Args[number]>
  ? Option<A>
  : true extends HasOptional<Args[number]>
  ? Option<A>
  : A
