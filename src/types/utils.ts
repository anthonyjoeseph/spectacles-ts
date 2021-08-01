import type { Option } from 'fp-ts/Option'

export type HasUndesiredKeys<A> = 
  unknown extends A
    ? true
    : A extends number | string | boolean | Promise<any>
      ? true
      : null extends A
          ? true
          : undefined extends A
            ? true
            : never


export type IsNull<A> = 
  undefined extends A
    ? true
    : null extends A
      ? true
      : never

export type GiveOpt<A, Args extends readonly unknown[]> =
  true extends HasOpt<Args[number]> 
    ? Option<A> 
    : true extends HasNum<Args[number]>
      ? Option<A> 
      : true extends HasRefinement<Args[number]>
        ? Option<A>
        : A

export type HasRefinement<K> = K extends (a: any) => boolean ? true : never

export type HasOpt<K> = K extends '?' ? true : never

export type HasNum<K> = K extends number ? true : never

export type TupleKeyof<A> =
  Exclude<
    keyof A,
    keyof Array<unknown>
  >

export type LastElem<A extends unknown[]> =
  A extends [...infer _, infer Last] ? Last : never