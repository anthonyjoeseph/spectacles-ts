import type { Option, Some } from "fp-ts/Option";
import type { Either, Left, Right } from "fp-ts/Either";
import type { IsNull, IsRecord, IsNonTupleArray, TupleKeyof, IsNonStructRecord } from "./predicates";
import { EscapeSpecialChars, LastSegment } from "./segments";
import type { Cases, Discriminant } from "./sum";

// Credit to Stefan Baumgartner
// https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

type RecordChildren<A> = keyof {
  [K in TupleKeyof<A> as true extends IsRecord<A[K]>
    ? Discriminant<A[K]> extends never
      ? true extends IsNonTupleArray<A[K]>
        ? never
        : true extends IsNonStructRecord<A[K]>
        ? never
        : K
      : never
    : never]: unknown;
};

type SumChildren<A> = keyof {
  [K in TupleKeyof<A> as Discriminant<A[K]> extends never ? never : K]: unknown;
};

type NullableChildren<A> = keyof {
  [K in TupleKeyof<A> as true extends IsNull<A[K]> ? K : never]: unknown;
};

type ArrayChildren<A> = keyof {
  [K in TupleKeyof<A> as true extends IsNonTupleArray<A[K]> ? K : never]: unknown;
};

type NonStructRecordChildren<A> = keyof {
  [K in TupleKeyof<A> as true extends IsNonStructRecord<A[K]> ? K : never]: unknown;
};

type BubbleUp<A extends Record<string, any>> = UnionToIntersection<
  | {
      [K in RecordChildren<A>]: {
        [K2 in TupleKeyof<A[K]> as A[K] extends unknown[]
          ? K extends ""
            ? `[${Extract<K2, string>}]`
            : `${Extract<K, string>}.[${Extract<K2, string>}]`
          : K extends ""
          ? Extract<K2, string>
          : `${Extract<K, string>}.${Extract<K2, string>}`]: A[K][K2];
      };
    }[RecordChildren<A>]
  | {
      [K in NullableChildren<A>]-?: {
        [K2 in K as `${Extract<K, string>}?`]: NonNullable<A[K]>;
      };
    }[NullableChildren<A>]
>;

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

type ExtractChangeableKeys<K> = K extends string
  ? LastSegment<K> extends `${string}:${string}`
    ? never
    : LastSegment<K> extends `${string}?${string}`
    ? never
    : K
  : never;

type UpsertableKeys<A> = Extract<
  keyof {
    [K in keyof A as true extends IsRecord<A[K]> ? K : never]: unknown;
  },
  string
>;

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
          : ExtractChangeableKeys<keyof A>)
    >
  : Acc;
