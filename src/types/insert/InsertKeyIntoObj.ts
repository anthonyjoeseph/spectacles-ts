import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'

export type InsertKeyIntoObj<
  Obj,
  Path extends readonly unknown[],
  Val
> = Path extends [infer Key]
  ? Key extends string
    ? Key extends keyof Obj
      ? Obj[Key] extends (infer ArrType)[]
        ? {
            [K in keyof Obj]: K extends Key ? NonEmptyArray<ArrType> : Obj[K]
          }
        : {
            [K in keyof Obj]: K extends K ? Obj[K] | Val : Obj[K]
          }
      : {
          [K in keyof Obj | Key]: K extends keyof Obj ? Obj[K] : Val
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
    : Key extends '?some'
    ? Obj extends Option<infer Some>
      ? Option<InsertKeyIntoObj<Some, Rest, Val>>
      : never
    : Key extends '?right'
    ? Obj extends Either<infer Left, infer Right>
      ? Either<Left, InsertKeyIntoObj<Right, Rest, Val>>
      : never
    : Key extends '?left'
    ? Obj extends Either<infer Left, infer Right>
      ? Either<InsertKeyIntoObj<Left, Rest, Val>, Right>
      : never
    : {
        [K in keyof Obj]: Key extends K
          ? InsertKeyIntoObj<Obj[Key], Rest, Val>
          : Obj[K]
      }
  : never
