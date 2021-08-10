import type { Option } from 'fp-ts/Option'

export type HasUndesiredKeys<A> = unknown extends A
  ? true
  : A extends number | string | boolean | Promise<any>
  ? true
  : null extends A
  ? true
  : undefined extends A
  ? true
  : never

export type IsNull<A> = undefined extends A
  ? true
  : null extends A
  ? true
  : never

export type GiveOpt<A, Args extends readonly unknown[], Op extends 'static' | 'insert' = 'static'> = true extends HasTraversal<Args[number]> 
  ? A 
  : true extends HasNull<
    Args[number]
  >
  ? Option<A>
  : true extends HasNum<Args[number]>
  ? Op extends 'insert'
    ? 0 extends Args[number]
      ? A
      : Option<A>
    : Option<A>
  : true extends HasRefinement<Args[number]>
  ? Option<A>
  : true extends HasOptional<Args[number]>
  ? Option<A>
  : A

export type HasOptional<Args> = Args extends '?some'
  ? true
  : Args extends '?right'
  ? true
  : Args extends '?left'
  ? true
  : never

export type HasRefinement<K> = K extends (a: any) => boolean ? true : never

export type HasNull<K> = K extends '?' ? true : never

export type HasNum<K> = K extends number ? true : never

export type HasTraversal<K> = K extends '[]>' ? true : K extends '{}>' ? true : never

export type TupleKeyof<A> = Exclude<keyof A, keyof Array<unknown>>

export type Inferable = readonly (
  | number
  | string
  | ((a: never) => boolean)
  | readonly string[]
)[]

export type IsTupleOrRecord<A> = 
  { [K in keyof A]: A[K] } extends Record<string, unknown>
    ? true 
    : A extends [unknown, ...unknown[]]
      ? true
      : never
