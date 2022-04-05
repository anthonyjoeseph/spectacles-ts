import type { Option, Some } from "fp-ts/Option";
import type { Either, Left, Right } from "fp-ts/Either";
import type { IsNull, IsRecord, TupleKeyof } from "./predicates";
import type { EscapeSpecialChars } from "./segments";
import type { Cases, Discriminant } from "./sum";

type Operation = "static" | "dynamic" | "upsert";

export type Paths<A, Op extends Operation = "static"> = _Paths<{ "": A }, Op>;

type _Paths<A, Op extends Operation, Acc extends string = never> = true extends IsRecord<A>
  ? _Paths<
      keyof A extends never ? unknown : BubbleUp<A>,
      Op,
      | Acc
      | (Op extends "static"
          ? Extract<keyof A, string>
          : Op extends "upsert"
          ? UpsertableKeys<A>
          : ExtractChangeableKeys<A>)
    >
  : Acc;

type BubbleUp<A extends Record<string, any>> = UnionToIntersection<ValueOf<_BubbleUp<A>>>;

type _BubbleUp<A extends Record<string, any>> = {
  [K in TupleKeyof<A>]-?: Match<
    A[K],
    {
      nullable: Record<`${Extract<K, string>}?`, NonNullable<A[K]>>;
      struct: {
        [K2 in keyof A[K] as `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}${EscapeSpecialChars<
          Extract<K2, string>
        >}`]: A[K][K2];
      };
      tuple: {
        [K2 in keyof A[K] as `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}[${Extract<
          K2,
          string
        >}]`]: A[K][K2];
      };
      record: Record<
        `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}${"[string]" | "{}>"}`,
        A[K][string]
      >;
      array: Record<
        `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}${"[number]" | "[]>"}`,
        A[K][number]
      >;
      option: Record<
        `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}?some`,
        Extract<A[K], Some<unknown>>["value"]
      >;
      either: Record<
        `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}?left`,
        Extract<A[K], Left<unknown>>["left"]
      > &
        Record<
          `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}?right`,
          Extract<A[K], Right<unknown>>["right"]
        >;
      sum: BubbleSum<A[K]>;
      other: never;
    }
  >;
};

type BubbleSum<
  A,
  Case extends { tag: string; cases: string } = Extract<Cases<A>, { tag: string; cases: string }>
> = UnionToIntersection<
  Case extends unknown
    ? {
        [K in Case["tag"]]: {
          [K2 in Case["cases"] as `${Extract<K, string>}:${Extract<K2, string>}`]: Omit<
            Extract<A, { [_ in K]: K2 }>,
            K
          >;
        };
      }[Case["tag"]]
    : never
>;

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
> = Discriminant<A> extends never
  ? [A] extends [readonly unknown[]]
    ? TupleKeyof<A> extends never
      ? Matches["array"]
      : Matches["tuple"]
    : string extends keyof A
    ? Matches["record"]
    : true extends IsRecord<A>
    ? Matches["struct"]
    : true extends IsNull<A>
    ? Matches["nullable"]
    : Matches["other"]
  : Option<any> extends A
  ? Matches["option"]
  : Either<any, any> extends A
  ? Matches["either"]
  : Matches["sum"];

type UpsertableKeys<A> = Extract<
  keyof {
    [K in keyof A as true extends IsRecord<A[K]> ? K : never]: unknown;
  },
  string
>;

type ExtractChangeableKeys<A> = Extract<
  keyof {
    [K in keyof A as true extends IsNull<A[K]> ? never : Discriminant<A[K]> extends never ? K : never]: unknown;
  },
  string
>;

// Credit to Stefan Baumgartner
// https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

type ValueOf<A> = A[keyof A];
