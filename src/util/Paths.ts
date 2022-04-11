import type { Option, Some } from "fp-ts/Option";
import type { Either, Left, Right } from "fp-ts/Either";
import type { IsAny, IsNull, IsRecord, TupleKeyof } from "./predicates";
import type { EscapeSpecialChars } from "./segments";
import type { Cases, Discriminant } from "./sum";
import { TestNode, TestNode2, TestNodeListOf2 } from "./StructBreadth";

type Operation = "static" | "dynamic" | "upsert";

interface Rec {
  a?: Rec;
  b?: Rec[];
}

//type t0 = TestNode2;
type t0 = Element;
type t1 = BubbleUp<t0, t0 | RecordChildren<t0>>;
type t2 = RecordChildren<t1>;
type t3 = BubbleUp<t1, t0 | t2>;
type t4 = RecordChildren<t3>;
// type t5 = BubbleUp<t3, t0 | t2 | t4>;
// type t6 = RecordChildren<t5>;
// type t7 = BubbleUp<t5, t0 | t2 | t6 | t6>;
// type t8 = RecordChildren<t7>;
// type t9 = BubbleUp<t5, t0 | t2 | t6 | t6 | t8>;
// type t10 = RecordChildren<t9>;
// type t11 = BubbleUp<t9, t0 | t2 | t6 | t6 | t8 | t10>;
// type u1 = Paths<TestNode>;
// type u2 = Paths<Node>;
// type u3 = ChildNode;
// type t2 = Paths<ParentNode>;
// type t3 = Paths<ChildNode>;
// type t5 = Paths<HTMLElement>;

declare const u: Specials<t3>;
u[""];

type a8 = Pick<t3, "parentNode?.childNodes">;

type a9 = _BubbleUp<t8, t0>;
// type t10 = BubbleUp<t5, Rec>;

export type Paths<A, Op extends Operation = "static"> = _Paths<{ "": A }, { "": A }, Op>;

type Specials<A> = {
  [K in keyof A as [A[K]] extends [Record<string, any>]
    ? A[K] extends (...args: any[]) => unknown
      ? never
      : K
    : never]-?: A[K];
};

type RecordChildren<A> = {
  [K in keyof A]-?: [A[K]] extends [Record<string, any>]
    ? A[K] extends (...args: any[]) => unknown
      ? never
      : A[K]
    : never;
}[keyof A];

type _Paths<
  A,
  Recursed,
  Op extends Operation,
  Acc extends string = never,
  It extends unknown[] = []
> = true extends IsRecord<A>
  ? _Paths<
      keyof A extends never ? unknown : BubbleUp<A, Recursed>,
      Recursed | RecordChildren<A>,
      Op,
      Acc | Extract<keyof A, string>,
      [...It, unknown]
    >
  : Acc;

type NoAnds<A> = { [K in keyof A]: A[K] };

type BubbleUp<A extends Record<string, any>, Recursed> = NoAnds<UnionToIntersection<ValueOf<_BubbleUp<A, Recursed>>>>;

type _BubbleUp<A extends Record<string, any>, Recursed> = {
  [K in keyof A]-?: Match<
    A[K],
    {
      nullable: NonNullable<A[K]> extends Recursed ? never : { [K1 in `${Extract<K, string>}?`]: NonNullable<A[K]> };
      struct: {
        [K2 in keyof A[K] as A[K][K2] extends Recursed
          ? never
          : `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}${EscapeSpecialChars<
              Extract<K2, string>
            >}`]: A[K][K2];
      };
      tuple: {
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

// Credit to Stefan Baumgartner
// https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

type ValueOf<A> = A[keyof A];
