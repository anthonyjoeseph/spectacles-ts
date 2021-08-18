import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'

type Operation = 
  | 'static'
  | 'remove'
  | 'rename'
  | 'modifyW'

export type Build<
  Path extends readonly unknown[], 
  Obj,
  Val,
  Op extends Operation = 'static'
> = Path extends []
  ? unknown extends Val ? Obj : Val
  : Path extends [infer Key, ...infer Rest]
  ? BuildInternal<Op, Obj, Val, Key, Rest>
  : never

export type BuildInternal<
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

export type BuildRefinement<
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

export type BuildPick<
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

export type BuildNumberKey<
  Op extends Operation,
  Obj,
  Val,
  Key,
  Rest extends readonly unknown[],
  Else,
> = Key extends number
? Obj extends readonly (infer ArrType)[]
  ? Obj extends unknown[]
    ? Build<Rest, ArrType, Val, Op>[]
    : readonly Build<Rest, ArrType, Val, Op>[]
  : Build<Rest, unknown, Val, Op>[]
: Key extends '[]>'
  ? Obj extends readonly (infer ArrType)[]
    ? Val extends (infer ValType)[]
      ? Obj extends unknown[]
        ? Build<Rest, ArrType, ValType, Op>[]
        : readonly Build<Rest, ArrType, ValType, Op>[]
      : Obj extends unknown[]
        ? Build<Rest, ArrType, Val, Op>[]
        : readonly Build<Rest, ArrType, Val, Op>[]
    : Build<Rest, unknown, Val, Op>[]
  : Else

export type BuildStringKey<
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
    BuildRecord<
      Op,
      Obj,
      Val,
      Key,
      Rest,
      BuildTuple<
        Op,
        Obj,
        Val,
        Key,
        Rest,
        BuildObject<Op, Obj, Val, Key, Rest>
      >
    >
  >
>
: Else

export type BuildNullable<
  Op extends Operation,
  Obj,
  Val,
  Key extends string,
  Rest extends readonly unknown[],
  Else,
> = Key extends '?'
? (
  | Build<Rest, NonNullable<Obj>, Val, Op> 
  | (undefined extends Obj ? undefined : never)
  | (null extends Obj ? null : never)
)
: Else

export type BuildOptional<
  Op extends Operation,
  Obj,
  Val,
  Key extends string,
  Rest extends readonly unknown[],
  Else,
> = Key extends '?some'
? [Obj] extends [Option<infer Some>]
  ? Option<Build<Rest, Some, Val, Op>>
  : Option<Build<Rest, unknown, Val, Op>>
: Key extends '?left'
? [Obj] extends [Either<infer Left, infer Right>]
  ? Either<Build<Rest, Left, Val, Op>, Right>
  : Either<Build<Rest, unknown, Val, Op>, unknown>
: Key extends '?right'
? [Obj] extends [Either<infer Left, infer Right>]
  ? Either<Left, Build<Rest, Right, Val, Op>> 
  : Either<unknown, Build<Rest, unknown, Val, Op>>
: Else

export type BuildRecord<
  Op extends Operation,
  Obj,
  Val,
  Key extends string,
  Rest extends readonly unknown[],
  Else
> = Key extends '?key'
? Rest extends [string, ...infer Rest2]
  ? Obj extends Record<string, infer RecordVal> 
    ? Record<string, Build<Rest2, RecordVal, Val, Op>>
    : never
  : never
: Key extends '{}>'
? Obj extends Record<string, infer RecType>
  ? [Val] extends [Record<string, infer ValType>]
    ? Record<string, Build<Rest, RecType, ValType, Op>>
    : Record<string, Build<Rest, RecType, Val, Op>>
  : Record<string, Build<Rest, unknown, Val, Op>>
: Else

export type BuildTuple<
  Op extends Operation,
  Obj,
  Val,
  Key extends string,
  Rest extends readonly unknown[],
  Else
> = Obj extends unknown[]
? {
  [K in keyof Obj]:
    K extends Key
      ? Build<Rest, Obj[K], Val, Op>
      : Obj[K]
}
: Else

export type BuildObject<
  Op extends Operation,
  Obj,
  Val,
  Key extends string,
  Rest extends readonly unknown[]
> = BuildObjectKey<
  Op, Obj, Val, Key, Rest,
  Rest extends []
    ? Op extends 'remove' | 'rename'
      ? Exclude<keyof Obj, Key>
      : keyof Obj
    : keyof Obj
> & (Key extends keyof Obj ? unknown : {
  readonly [K in (Key | (Op extends 'rename' ? Val extends string ? Val : never : never))]: 
    Op extends 'rename'
      ? K extends Val
        ? Key extends keyof Obj 
          ? Build<Rest, Obj[Key], unknown, Op> 
          : never
        : Build<Rest, unknown, Val, Op>
      : Build<Rest, unknown, Val, Op>
})

type BuildObjectKey<
  Op extends Operation,
  Obj,
  Val,
  Key extends string,
  Rest extends readonly unknown[],
  Keys extends keyof Obj
> = { 
[K in Keys]: K extends Key
  ? Build<Rest, Obj[K], Val, Op>
  : Obj[K]
}
