import { Some } from "fp-ts/Option";
import { Left, Right } from "fp-ts/Either";

type Operation = "apply-traversals" | "no-traversals";

export type AtPath<A, Args extends string, Op extends Operation = "apply-traversals"> = unknown extends A
  ? unknown
  : Args extends ""
  ? A
  : Op extends "apply-traversals"
  ? ApplyTraversals<
      Args extends `${infer Key}.${infer Rest}`
        ? AtPath<ApplySegment<A, Key>, Rest, "no-traversals">
        : ApplySegment<A, Args>,
      Args
    >
  : Args extends `${infer Key}.${infer Rest}`
  ? AtPath<ApplySegment<A, Key>, Rest, Op>
  : ApplySegment<A, Args>;

export type ApplyTraversals<A, Args extends string> = Args extends ""
  ? A
  : Args extends `${string}[]>${infer Tail}`
  ? ApplyTraversals<A[], Tail>
  : Args extends `${string}{}>${infer Tail}`
  ? ApplyTraversals<Record<string, A>, Tail>
  : A;

type ApplySegment<A, Seg extends string> = Seg extends "?"
  ? NonNullable<A>
  : Seg extends "?some"
  ? Extract<A, Some<unknown>>["value"]
  : Seg extends "?left"
  ? Extract<A, Left<unknown>>["left"]
  : Seg extends "?right"
  ? Extract<A, Right<unknown>>["right"]
  : Seg extends "[]>"
  ? Extract<A, unknown[]>[number]
  : Seg extends "{}>"
  ? Extract<A, Record<string, unknown>>[string]
  : Seg extends `[${infer TupleIndex}]`
  ? A[Extract<TupleIndex, keyof A>]
  : Seg extends `${infer Discriminant}:${infer Member}`
  ? Extract<A, { [K in Discriminant]: Member }> extends never
    ? A[Extract<Seg, keyof A>]
    : Extract<A, { [K in Discriminant]: Member }>
  : A[Extract<Seg, keyof A>];
