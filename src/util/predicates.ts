import type { Option } from "fp-ts/Option";
import { AddNullSegments, FirstSegment, TailSegment } from "./segments";

export type TupleKeyof<A> = Exclude<keyof A, keyof Array<unknown>>;

export type GiveOpt<A, Args extends string> = true extends HasTraversals<AddNullSegments<Args>>
  ? A
  : true extends HasNull<AddNullSegments<Args>>
  ? Option<A>
  : true extends HasSum<AddNullSegments<Args>>
  ? Option<A>
  : A;

export type HasOptional<Args extends string> = true extends HasNull<AddNullSegments<Args>>
  ? true
  : true extends HasSum<AddNullSegments<Args>>
  ? true
  : never;

type HasSum<Args extends string> = Args extends ""
  ? never
  : FirstSegment<Args> extends `(${string}`
  ? HasSum<TailSegment<Args>>
  : FirstSegment<Args> extends `${string}:${string}`
  ? true
  : FirstSegment<Args> extends "[number]"
  ? true
  : HasSum<TailSegment<Args>>;

type HasNull<Args extends string> = Args extends ""
  ? never
  : FirstSegment<Args> extends `(${string}`
  ? HasNull<TailSegment<Args>>
  : FirstSegment<Args> extends `${string}?${string}`
  ? true
  : HasNull<TailSegment<Args>>;

type HasTraversals<Args extends string> = Args extends ""
  ? never
  : FirstSegment<Args> extends `(${string}`
  ? HasTraversals<TailSegment<Args>>
  : FirstSegment<Args> extends "[]>" | "{}>"
  ? true
  : HasTraversals<TailSegment<Args>>;

export type IsNull<A> = undefined extends A ? true : null extends A ? true : never;

export type IsRecord<A> = unknown extends A ? never : [A] extends [Record<string, any>] ? true : never;

export type IsNonTupleArray<A> = [A] extends [unknown[]] ? (TupleKeyof<A> extends never ? true : never) : never;

export type IsNonStructRecord<A> = string extends keyof A ? true : never;
