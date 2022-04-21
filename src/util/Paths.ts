import type { Option, Some } from "fp-ts/Option";
import type { Either, Left, Right } from "fp-ts/Either";
import type { IsAny, IsNull, IsRecord, TupleKeyof } from "./predicates";
import type { EscapeSpecialChars } from "./segments";
import type { Cases, Discriminant } from "./sum";

type Operation = "static" | "dynamic" | "upsert";

export type Paths<A, Op extends Operation = "static"> = _Paths<A, { "": A }, Op, Extract<keyof A, string>>;

type _Paths<
  A,
  Recursed,
  Op extends Operation = "static",
  Acc extends string = never,
  It extends unknown[] = []
> = /* It["length"] extends 2
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

type BubbleUp<A extends Record<string, any>, Recursed> = UnionToIntersection<ValueOf<_BubbleUp<A, Recursed>>>;

export type GetParentInterfaces<Key, AllParents> = ValueOf<{
  [K in keyof AllParents as Key extends `${Extract<K, string>}${string}` ? K : never]: AllParents[K];
}>;

export type NewRec<OldRec, A> = {
  [K in keyof A]-?: GetParentInterfaces<K, OldRec> | (true extends CanRecurse<A[K]> ? A[K] : never);
};

export type AllKeys<A> = A extends unknown ? keyof A : never;

export type PossiblyExtendible<A, B> = B extends unknown ? (keyof A extends keyof B ? B : never) : never;

export type UnPartial<A> = {
  [K in keyof Required<A>]: Required<A>[K] | Extract<undefined, A[Extract<K, keyof A>]>;
};

export type B_extends_A<A, B> = A extends B
  ? true
  : {
      [K in AllKeys<PossiblyExtendible<A, B>>]: K extends keyof A ? A[K] : any;
    } extends UnPartial<PossiblyExtendible<A, B>>
  ? true
  : never;

type _BubbleUp<A extends Record<string, any>, Recursed> = {
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
