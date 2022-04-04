import type { Option } from "fp-ts/Option";

export type TupleKeyof<A> = Exclude<keyof A, keyof Array<unknown>>;

export type GiveOpt<A, Args extends unknown[]> = true extends HasTraversals<Args>
  ? A
  : true extends HasNull<Args>
  ? Option<A>
  : true extends HasSum<Args>
  ? Option<A>
  : A;

export type HasOptional<Args extends unknown[]> = true extends HasNull<Args>
  ? true
  : true extends HasSum<Args>
  ? true
  : never;

type HasSum<Args extends unknown[]> = Args extends [infer First, ...infer Tail]
  ? First extends `(${string})`
    ? HasSum<Tail>
    : First extends `${string}:${string}`
    ? true
    : First extends "[number]"
    ? true
    : HasSum<Tail>
  : never;

type HasNull<Args extends unknown[]> = Args extends [infer First, ...infer Tail]
  ? First extends `(${string})`
    ? HasNull<Tail>
    : First extends `${string}?${string}`
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

export type IsNull<A> = undefined extends A ? true : null extends A ? true : never;

export type IsRecord<A> = unknown extends A ? never : [A] extends [Record<string, any>] ? true : never;

export type IsNonTupleArray<A> = [A] extends [unknown[]] ? (TupleKeyof<A> extends never ? true : never) : never;

export type IsNonStructRecord<A> = string extends keyof A ? true : never;
