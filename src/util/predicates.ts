import type { Option } from "fp-ts/Option";

export type HasOptional<Args extends string> = true extends HasNull<Args>
  ? true
  : true extends HasSum<Args>
  ? true
  : never;

export type GiveOpt<A, Args extends string> = true extends HasNull<Args>
  ? Option<A>
  : true extends HasSum<Args>
  ? Option<A>
  : A;

export type HasSum<Args> = Args extends `${string}:${string}` ? true : never;

export type HasNull<Args> = Args extends `${string}?${string}` ? true : never;

export type IsNull<A> = undefined extends A ? true : null extends A ? true : never;

export type IsRecord<A> = unknown extends A ? never : [A] extends [Record<string, any>] ? true : never;
