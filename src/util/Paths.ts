import type { Option, Some } from "fp-ts/Option";
import type { Either, Left, Right } from "fp-ts/Either";
import type { IsAny, IsNull, IsRecord, TupleKeyof } from "./predicates";
import type { EscapeSpecialChars } from "./segments";
import type { Cases, Discriminant } from "./sum";
import { B_extends_A, GetParentInterfaces, NewRec } from "./pathRecursion";

type Operation = "static" | "dynamic" | "upsert";

export type Paths<A, Op extends Operation = "static"> = _Paths<A, { "": A }, Op, never>;

export type _Paths<
  A,
  Recursed,
  Op extends Operation = "static",
  Acc extends string = never,
  It extends unknown[] = []
> = /* It["length"] extends 3
  ? {
      A: A;
      Recursed: Recursed;
      Acc: Acc;
    }
  :  */ true extends IsRecord<A>
  ? _Paths<
      keyof A extends never ? unknown : BubbleUp<A, Recursed>,
      NewRec<Recursed, A>,
      Op,
      Acc | Extract<keyof A, string>,
      [...It, unknown]
    >
  : Acc;

export type BubbleUp<A extends Record<string, any>, Recursed> = UnionToIntersection<ValueOf<_BubbleUp<A, Recursed>>>;

export type _BubbleUp<A extends Record<string, any>, Recursed> = {
  [K in keyof A]-?: true extends B_extends_A<A[K], GetParentInterfaces<K, Recursed>>
    ? never
    : Match<
        A[K],
        {
          nullable: { [K1 in `${Extract<K, string>}?`]: NonNullable<A[K]> };
          struct: {
            [K2 in keyof A[K] as `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}${EscapeSpecialChars<
              Extract<K2, string>
            >}`]: A[K][K2];
          };
          tuple: {
            [K2 in TupleKeyof<A[K]> as `${Extract<K, string>}${Extract<K, string> extends "" ? "" : "."}[${Extract<
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
export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

export type ValueOf<A> = A[keyof A];
