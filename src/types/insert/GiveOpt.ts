import type { Option } from 'fp-ts/Option'
import type { HasNum, HasOpt, HasRefinement } from '../utils'

export type GiveOpt<A, Args extends readonly unknown[]> =
  true extends HasOpt<Args[number]> 
    ? Option<A> 
    : true extends HasNum<Args[number]>
      ? 0 extends Args[number] ? A : Option<A> 
      : true extends HasRefinement<Args[number]>
        ? Option<A>
        : A
