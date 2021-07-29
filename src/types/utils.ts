import type { Option } from 'fp-ts/Option'

export type HasUndesiredKeys<A> = 
  unknown extends A
    ? true
    : A extends number
      ? true
      : A extends string
        ? true
        : A extends boolean
          ? true
          : A extends Promise<any>
            ? true
            : false

export type GiveOpt<A, Args extends readonly unknown[]> =
  true extends HasOpt<Args[number]> 
    ? Option<A> 
    : true extends HasNum<Args[number]>
      ? Option<A> 
      : true extends HasRefinement<Args[number]>
        ? Option<A>
        : A

export type OptKeyof<A> = {
  [K in keyof A]-?: undefined extends A[K] 
    ? K extends string ? `${K}?` : never 
    : never
}[keyof A]

export type HasRefinement<K> = K extends (a: any) => boolean ? true : never

export type HasOpt<K> = K extends `${infer _}?` ? true : never

export type HasNum<K> = K extends number ? true : never

export type Unopt<K> = K extends `${infer Key}?` ? Key : K

export type TupleKeyof<A extends unknown[]> =
  Exclude<
    keyof A,
    keyof Array<unknown>
  >

export type LastElem<A extends unknown[]> =
  A extends [...infer _, infer Last] ? Last : never