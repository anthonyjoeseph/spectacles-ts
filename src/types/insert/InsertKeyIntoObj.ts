import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import type { HasOpt } from "../utils";

export type InsertKeyIntoObj<
  Obj,
  Path extends readonly unknown[],
  Val
> = 
  Path extends [infer Key]
    ? Key extends string 
      ? Key extends keyof Obj
        ? Obj[Key] extends (infer ArrType)[]
          ? { 
              [K in keyof Obj]:
                K extends Key 
                  ? NonEmptyArray<ArrType>
                  : Obj[K]
            }
          : never
        : { 
            [K in (keyof Obj) | Key]: 
              K extends keyof Obj ? Obj[K] : Val 
          } 
      : Key extends number
        ? Obj extends (infer ArrType)[]
          ? NonEmptyArray<ArrType>
          : never
        : never
    : Path extends [infer Key, ...infer Rest]
      ? Key extends (a: any) => a is infer A
        ? InsertKeyIntoObj<A, Rest, Val> | Exclude<Obj, A>
        : Key extends '?'
          ? InsertKeyIntoObj<NonNullable<Obj>, Rest, Val> | undefined
          : { 
              [K in keyof Obj]: 
                Key extends K 
                  ? InsertKeyIntoObj<Obj[Key], Rest, Val> 
                  : Obj[K] 
            }
      : never

type test = InsertKeyIntoObj<
  { a: { b: boolean[] } | {b: string} }, 
  ['a', '?', (a: unknown) => a is { b: boolean[] }, 'b', 0], 
  Promise<number>
>

