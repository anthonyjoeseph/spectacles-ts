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
type b0 = Paths<ParentNode>;
type b1 = Paths<ChildNode>;
type b2 = Paths<Element>;
type b3 = Paths<HTMLElement>;
/*type b4 = Paths<Document>;

declare const b4: b4;

const aaa = b4.Recursed["anchors"];*/

/* 
Obj1 = { a: { b: number, x: boolean }, c: { d: { e: string } } }
Output1 = keyof Obj1 = 'a' | 'c'
Rec1 = { a: { b: number, x: boolean }, c: { d: { e: string } } }
        |
        V
Obj2 = { 'a.b': number, 'a.x': boolean, 'c.d': { e: string } }
Output2 = Output1 | keyof Obj2 = 'a' | 'c' | 'a.b' | 'a.x' | 'c.d'
Rec2 = { 'a.b': { b: number, x: boolean }, 'c.d': { d: { e: string } } }
        |
        V
Obj3 = { 'c.d.e': string }
Output3 = Output2 | keyof Obj3 = 'a' | 'c' | 'a.b' | 'a.x' | 'c.d' | 'c.d.e'
Rec3 = { 'c.d.e': { d: { e: string } } | { e: string } | string }
*/

type GetParentInterfaces<Key, AllParents> = ValueOf<{
  [K in keyof AllParents as Key extends `${Extract<K, string>}${string}` ? K : never]: AllParents[K];
}>;

type NewRec<OldRec, A> = {
  [K in keyof A]-?: GetParentInterfaces<K, OldRec> | (true extends CanRecurse<A[K]> ? A[K] : never);
};

type rec = { "a.b": { b: number; x: boolean }; "c.d": { d: { e: string } } };

type parens = GetParentInterfaces<"c.d.e", rec>;

type newrec = NewRec<rec, { "c.d.e": string }>;

type a1 = Paths<Rec>;
declare const a2: a1;

a2;
type b = NewRec<never, Rec>;

export type Paths<A, Op extends Operation = "static"> = _Paths<A, { "": A }, Op, Extract<keyof A, string>>;

type _Paths<
  A,
  Recursed,
  Op extends Operation = "static",
  Acc extends string = never,
  It extends unknown[] = []
> = It["length"] extends 10
  ? {
      A: A;
      Recursed: Recursed;
      Acc: Acc;
    }
  : true extends IsRecord<A>
  ? _Paths<
      keyof A extends never ? unknown : BubbleUp<A, Recursed>,
      NewRec<Recursed, A>,
      Op,
      Acc | Extract<keyof A, string>,
      [...It, unknown]
    >
  : Acc;

type _Paths1<
  A,
  Recursed,
  Op extends Operation = "static",
  Acc extends string = never,
  It extends unknown[] = []
> = It["length"] extends 1
  ? {
      A: A;
      Recursed: Recursed;
      Acc: Acc;
    }
  : true extends IsRecord<A>
  ? _Paths<
      keyof A extends never ? unknown : BubbleUp<A, Recursed>,
      NewRec<Recursed, A>,
      Op,
      Acc | Extract<keyof A, string>,
      [...It, unknown]
    >
  : Acc;

type BubbleUp<A extends Record<string, any>, Recursed> = UnionToIntersection<ValueOf<_BubbleUp<A, Recursed>>>;

type _BubbleUp<A extends Record<string, any>, Recursed> = {
  [K in keyof A]-?: A[K] extends GetParentInterfaces<K, Recursed>
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
