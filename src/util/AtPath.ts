import { Some } from "fp-ts/Option";
import { Left, Right } from "fp-ts/Either";

type Operation = "apply-traversals" | "no-traversals";

export type AtPath<A, Args extends unknown[], Op extends Operation = "apply-traversals"> = unknown extends A
  ? unknown
  : Args extends ""
  ? A
  : Op extends "apply-traversals"
  ? ApplyTraversals<
      Args extends [infer First, ...infer Tail]
        ? AtPath<ApplySegment<A, Extract<First, string>>, Tail, "no-traversals">
        : A,
      Args
    >
  : Args extends [infer First, ...infer Tail]
  ? AtPath<ApplySegment<A, Extract<First, string>>, Tail, Op>
  : A;

export type ApplyTraversals<A, Args extends unknown[]> = Args extends [infer First, ...infer Tail]
  ? First extends `(${string}`
    ? ApplyTraversals<A, Tail>
    : First extends "[]>"
    ? ApplyTraversals<A[], Tail>
    : First extends "{}>"
    ? ApplyTraversals<Record<string, A>, Tail>
    : ApplyTraversals<A, Tail>
  : A;

type ApplySegment<A, Seg extends string> = Seg extends `(${infer Middle})`
  ? A[Extract<Middle, keyof A>]
  : Seg extends "?"
  ? NonNullable<A>
  : Seg extends "?some"
  ? Extract<A, Some<unknown>>["value"]
  : Seg extends "?left"
  ? Extract<A, Left<unknown>>["left"]
  : Seg extends "?right"
  ? Extract<A, Right<unknown>>["right"]
  : Seg extends "[]>" | "[number]"
  ? Extract<A, unknown[]>[number]
  : Seg extends "{}>" | "[string]"
  ? Extract<A, Record<string, unknown>>[string]
  : Seg extends `[${infer TupleIndex}]`
  ? A[Extract<TupleIndex, keyof A>]
  : Seg extends `${infer Discriminant}:${infer Member}`
  ? Extract<A, { [K in Discriminant]: Member }> extends never
    ? A[Extract<Seg, keyof A>]
    : Extract<A, { [K in Discriminant]: Member }>
  : A[Extract<Seg, keyof A>];
