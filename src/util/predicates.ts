import type { Option } from "fp-ts/Option";

export type TupleKeyof<A> = Exclude<keyof A, keyof Array<unknown>>;

export type GiveOpt<A, Args extends unknown[]> = true extends HasTraversals<Args>
  ? A
  : true extends HasNull<Args>
  ? Option<A>
  : true extends HasSum<Args>
  ? Option<A>
  : true extends HasIndexedAccess<Args>
  ? Option<A>
  : A;

export type HasOptional<Args extends unknown[]> = true extends HasNull<Args>
  ? true
  : true extends HasSum<Args>
  ? true
  : true extends HasIndexedAccess<Args>
  ? true
  : never;

export type HasIndexedAccess<Args extends unknown[]> = Args extends [infer First, ...infer Tail]
  ? First extends "[number]"
    ? true
    : First extends "[string]"
    ? true
    : HasIndexedAccess<Tail>
  : never;

type HasSum<Args extends unknown[]> = Args extends [infer First, ...infer Tail]
  ? First extends `(${string})`
    ? HasSum<Tail>
    : First extends `${string}:${string}`
    ? true
    : HasSum<Tail>
  : never;

type HasNull<Args extends unknown[]> = Args extends [infer First, ...infer Tail]
  ? First extends `(${string})`
    ? HasNull<Tail>
    : First extends `${string}?`
    ? true
    : First extends `?some`
    ? true
    : First extends `?left`
    ? true
    : First extends `?right`
    ? true
    : HasNull<Tail>
  : never;

type HasTraversals<Args extends unknown[]> = Args extends [infer First, ...infer Tail]
  ? First extends `(${string})`
    ? HasTraversals<Tail>
    : First extends "[]>" | "{}>"
    ? true
    : HasTraversals<Tail>
  : never;

// credit to Joe Calzaretta
// https://stackoverflow.com/a/49928360
export type IsAny<A> = (A extends never ? true : false) extends false ? false : true;

export type IsNull<A> = Extract<A, undefined | null> extends never ? never : true;

export type IsRecord<A> = [A] extends [Record<string, any>] ? true : never;

export type IsNonTupleArray<A> = [A] extends [readonly unknown[]]
  ? TupleKeyof<A> extends never
    ? true
    : never
  : never;

export type IsNonStructRecord<A> = string extends keyof A ? true : never;

export type IsRecursive<A> = {
  [K in keyof A]: IsRecord<A[K]> extends true ? (A extends A[K] ? true : never) : never;
}[keyof A];

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

export type Flatten<A, R = RecordChildren<A>> = keyof R extends never ? unknown : A & R;

type RecordChildren<A> = { [K in keyof A as IsRecord<A[K]> extends true ? K : never]: A[K] };

type t0 = IsRecursive<Rec>;
type t1 = IsRecursive<NestedRec>;
type t2 = RecordChildren<Simple>;
type t3 = Flatten<Simple>;

interface Rec {
  a: Rec;
}

interface NestedRec {
  b?: {
    a: NestedRec;
  }[];
}

interface Simple {
  a: {
    b: number;
  };
  b: {
    b: number;
  };
}
