import type { Option, Some } from "fp-ts/Option";
import type { Either, Left, Right } from "fp-ts/Either";
import type { IsAny, IsNull, IsRecord, TupleKeyof } from "./predicates";
import type { EscapeSpecialChars } from "./segments";
import type { Cases, Discriminant } from "./sum";

type Operation = "static" | "dynamic" | "upsert";

type a = Paths<{ a: { b: { c: { d: number } } } }>;

interface Rec {
  a?: Rec;
  b?: Rec[];
}
// type t2 = Paths<Document>;
type t3 = Paths<ChildNode>;
type t19 = Paths<Element>;
type t7 = Document;
type t8 = RecordChildren<t7>;
type t9 = BubbleUp<t7, t7 | t8>;
type t10 = RecordChildren<t9>;
type t11 = BubbleUp<t9, t7 | t8 | t10>;

type t14 = _Paths<BubbleUp<t7, t7 | t8>, t7 | t8 | RecordChildren<BubbleUp<t7, t7 | t8>>>;
type t15 = Paths<HTMLElement>;
// type t14 = RecordChildren<t13>;
//type t15 = _Paths<t13, t7 | t8 | t10 | t12 | t14, "static">;

export type Paths<A, Op extends Operation = "static"> = _Paths<A, A, Op, Extract<keyof A, string>>;

type _Paths<A, Recursed, Op extends Operation = "static", Acc extends string = never> = true extends IsRecord<A>
  ? _Paths<
      keyof A extends never ? unknown : BubbleUp<A, Recursed>,
      Recursed | RecordChildren<BubbleUp<A, Recursed>>,
      Op,
      Acc | Extract<keyof A, string>
    >
  : Acc;

type BubbleUp<A extends Record<string, any>, Recursed> = UnionToIntersection<ValueOf<_BubbleUp<A, Recursed>>>;

type _BubbleUp<A extends Record<string, any>, Recursed> = {
  [K in keyof A]-?: Match<
    A[K],
    {
      nullable: NonNullable<A[K]> extends Recursed ? never : { [K1 in `${Extract<K, string>}?`]: NonNullable<A[K]> };
      struct: A[K] extends Recursed
        ? never
        : {
            [K2 in keyof A[K] as A[K][K2] extends Recursed
              ? never
              : `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}${EscapeSpecialChars<
                  Extract<K2, string>
                >}`]: A[K][K2];
          };
      tuple: A[K] extends Recursed
        ? never
        : {
            [K2 in TupleKeyof<A[K]> as A[K][K2] extends Recursed
              ? never
              : `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}[${Extract<K2, string>}]`]: A[K][K2];
          };
      record: A[K][string] extends Recursed
        ? never
        : Record<`${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}${"[string]" | "{}>"}`, A[K][string]>;
      array: A[K][number] extends Recursed
        ? never
        : Record<`${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}${"[number]" | "[]>"}`, A[K][number]>;
      option: Extract<A[K], Some<unknown>>["value"] extends Recursed
        ? never
        : Record<
            `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}?some`,
            Extract<A[K], Some<unknown>>["value"]
          >;
      either: (Extract<A[K], Left<unknown>>["left"] extends Recursed
        ? never
        : Record<
            `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}?left`,
            Extract<A[K], Left<unknown>>["left"]
          >) &
        (Extract<A[K], Right<unknown>>["right"] extends Recursed
          ? never
          : Record<
              `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}?right`,
              Extract<A[K], Right<unknown>>["right"]
            >);
      sum: BubbleSum<A[K], Extract<K, string>>;
      other: never;
    }
  >;
};

type BubbleSum<
  A,
  Acc extends string,
  Case extends { tag: string; cases: string } = Extract<Cases<A>, { tag: string; cases: string }>
> = Case extends unknown
  ? ValueOf<{
      [K in Case["tag"]]: {
        [K2 in Case["cases"] as `${Acc}${Acc extends "" ? "" : "."}${Extract<K, string>}:${Extract<K2, string>}`]: Omit<
          Extract<A, { [_ in K]: K2 }>,
          K
        >;
      };
    }>
  : never;

type Match<
  A,
  Matches extends {
    struct: unknown;
    record: unknown;
    tuple: unknown;
    array: unknown;
    nullable: unknown;
    option: unknown;
    either: unknown;
    sum: unknown;
    other: unknown;
  }
> = unknown extends A
  ? Matches["other"]
  : IsAny<A> extends true
  ? Matches["other"]
  : [A] extends [never]
  ? Matches["other"]
  : A extends (...a: any[]) => unknown
  ? Matches["other"]
  : true extends IsNull<A>
  ? Matches["nullable"]
  : [A] extends [Option<unknown>]
  ? Matches["option"]
  : [A] extends [Either<unknown, unknown>]
  ? Matches["either"]
  : Discriminant<A> extends never
  ? [A] extends [readonly unknown[]]
    ? TupleKeyof<A> extends never
      ? Matches["array"]
      : Matches["tuple"]
    : string extends keyof A
    ? Matches["record"]
    : true extends IsRecord<A>
    ? Matches["struct"]
    : Matches["other"]
  : Matches["sum"];

type CanRecurse<A> = unknown extends A
  ? never
  : IsAny<A> extends true
  ? never
  : [A] extends [never]
  ? never
  : A extends (...a: any[]) => unknown
  ? never
  : true extends IsNull<A>
  ? never
  : [A] extends [Option<unknown>]
  ? never
  : [A] extends [Either<unknown, unknown>]
  ? never
  : [A] extends [readonly unknown[]]
  ? TupleKeyof<A> extends never
    ? never
    : true
  : string extends keyof A
  ? never
  : true extends IsRecord<A>
  ? true
  : never;

// Credit to Stefan Baumgartner
// https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

type ValueOf<A> = A[keyof A];

type Specials<A> = {
  [K in keyof A as [A[K]] extends [Record<string, any>]
    ? A[K] extends (...args: any[]) => unknown
      ? never
      : K
    : never]-?: A[K];
};
type NonSpecials<A> = {
  [K in keyof A as [A[K]] extends [Record<string, any>]
    ? A[K] extends (...args: any[]) => unknown
      ? K
      : never
    : K]-?: A[K];
};

type RecordChildren<A> = {
  [K in keyof A]-?: [A[K]] extends [Record<string, any>]
    ? A[K] extends (...args: any[]) => unknown
      ? never
      : A[K]
    : never;
}[keyof A];

type NoAnds<A> = { [K in keyof A]: A[K] };
