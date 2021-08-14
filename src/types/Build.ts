import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'

type Operation = 
  | 'static' 
  | 'insert' 
  | 'insertOption' 
  | 'remove'

export type Build<
  Path extends readonly unknown[], 
  Obj,
  Val,
  Op extends Operation = 'static'
> = Path extends []
  ? Obj extends (infer ArrType)[]
    ? Op extends 'insertOption'
      ? NonEmptyArray<ArrType | Val>
      : Op extends 'insert' | 'remove'
        ? (ArrType | Val)[]
        : unknown extends Val ? Obj : Val
    : unknown extends Val ? Obj : Val
  : Path extends [infer Key, ...infer Rest]
  ? BuildInternal<Op, Obj, Val, Key, Rest>
  : never

type BuildInternal<
  Op extends Operation,
  Obj,
  Val,
  Key,
  Rest extends readonly unknown[],
> = BuildRefinement<
  Op, Obj, Val, Key, Rest,
  BuildPick<
    Op, Obj, Val, Key, Rest,
    BuildNumberKey<
      Op, Obj, Val, Key, Rest,
      BuildStringKey<Op, Obj, Val, Key, Rest, never>
    >
  >
>

type BuildRefinement<
  Op extends Operation,
  Obj,
  Val,
  Key,
  Rest extends readonly unknown[],
  Else,
> = Key extends (a: any) => a is infer Ret
? [Ret] extends [Obj] 
  ? Key extends (a: infer A) => boolean 
    ? Build<Rest, Ret, Val, Op> | Exclude<A, Ret> 
    : never
  : never
: Else

type BuildPick<
  Op extends Operation,
  Obj,
  Val,
  Key,
  Rest extends readonly unknown[],
  Else,
> = Key extends readonly string[]
? unknown extends Obj
  ? {
      [P in Key[number]]:
        P extends keyof Obj
          ? Build<Rest, Obj[P], Val, Op>
          : never
    }
  : Rest extends []
    ? Op extends 'remove'
      ? {
        [P in Exclude<keyof Obj, Key[number]>]:
          P extends keyof Obj
            ? Build<Rest, Obj[P], Val, Op>
            : never
      }
      : Build<Rest, Obj, Val, Op>
    : Build<Rest, Obj, Val, Op>
: Else

type BuildNumberKey<
  Op extends Operation,
  Obj,
  Val,
  Key,
  Rest extends readonly unknown[],
  Else,
> = Key extends number
? Obj extends (infer ArrType)[]
  ? Rest extends []
    ? Op extends 'insertOption'
      ? NonEmptyArray<ArrType | Val>
      : Op extends 'insert' | 'remove'
        ? (ArrType | Val)[]
        : Build<Rest, ArrType, Val, Op>[]
    : Build<Rest, ArrType, Val, Op>[]
  : Build<Rest, unknown, Val, Op>[]
: Else

type BuildStringKey<
  Op extends Operation,
  Obj,
  Val,
  Key,
  Rest extends readonly unknown[],
  Else,
> = Key extends string
? BuildNullable<
  Op, Obj, Val, Key, Rest,
  BuildOptional<
    Op, Obj, Val, Key, Rest,
    BuildObject<Op, Obj, Val, Key, Rest>
  >
>
: Else

type BuildNullable<
  Op extends Operation,
  Obj,
  Val,
  Key extends string,
  Rest extends readonly unknown[],
  Else,
> = Key extends '?'
? Build<Rest, NonNullable<Obj>, Val, Op> | undefined | null
: Else

type BuildOptional<
  Op extends Operation,
  Obj,
  Val,
  Key extends string,
  Rest extends readonly unknown[],
  Else,
> = Key extends '?some'
? Obj extends Option<infer Some>
  ? Option<Build<Rest, Some, Val, Op>>
  : Option<Build<Rest, unknown, Val, Op>>
: Key extends '?left'
? Obj extends Either<infer Left, infer Right>
  ? Either<Build<Rest, Left, Val, Op>, Right>
  : Either<Build<Rest, unknown, Val, Op>, unknown>
: Key extends '?right'
? Obj extends Either<infer Left, infer Right>
  ? Either<Left, Build<Rest, Right, Val, Op>> 
  : Either<unknown, Build<Rest, unknown, Val, Op>>
: Else

type BuildObject<
  Op extends Operation,
  Obj,
  Val,
  Key extends string,
  Rest extends readonly unknown[]
> = { 
  [K in (Rest extends []
    ? Op extends 'remove'
      ? Exclude<keyof Obj, Key>
      : Key | keyof Obj
    : Key | keyof Obj)]:
    K extends keyof Obj
      ? K extends Key
        ? Build<Rest, Obj[K], Val, Op>
        : Obj[K]
      : Build<Rest, unknown, Val, Op>
}
