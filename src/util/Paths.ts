import type { Option, Some } from "fp-ts/Option";
import type { Either, Left, Right } from "fp-ts/Either";
import type { IsNull, IsRecord, TupleKeyof } from "./predicates";
import type { EscapeSpecialChars } from "./segments";
import type { Cases, Discriminant } from "./sum";

type Operation = "static" | "dynamic" | "upsert";

export type Paths<A, Op extends Operation = "static"> = _Paths<{ "": A }, Op>;

type _Paths<A, Op extends Operation, Acc extends string = never> = true extends IsRecord<A>
  ? _Paths<keyof A extends never ? unknown : BubbleUp<A>, Op, Acc | Extract<keyof A, string>>
  : Acc;

type BubbleUp<A extends Record<string, any>> = UnionToIntersection<ValueOf<_BubbleUp<A>>>;

type _BubbleUp<A extends Record<string, any>> = {
  [K in keyof A]-?: Match<
    A[K],
    {
      nullable: Record<`${Extract<K, string>}?`, NonNullable<A[K]>>;
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
> = [A] extends [never]
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
