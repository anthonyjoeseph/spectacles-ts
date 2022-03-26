import type { Option } from "fp-ts/Option";
import { AddDots } from "./segments";

export type TupleKeyof<A> = Exclude<keyof A, keyof Array<unknown>>;

export type GiveOpt<A, Args extends string> = true extends HasTraversals<AddDots<Args>>
  ? A
  : true extends HasNull<AddDots<Args>>
  ? Option<A>
  : true extends HasSum<AddDots<Args>>
  ? Option<A>
  : A;

export type HasOptional<Args extends string> = true extends HasNull<AddDots<Args>>
  ? true
  : true extends HasSum<AddDots<Args>>
  ? true
  : never;

export type HasSum<Args extends string> = AddDots<Args> extends `${string}:${string}` ? true : never;

export type HasNull<Args extends string> = AddDots<Args> extends `${string}?${string}` ? true : never;

export type HasTraversals<Args extends string> = AddDots<Args> extends `${string}[]>${string}` ? true : never;

export type IsNull<A> = undefined extends A ? true : null extends A ? true : never;

export type IsRecord<A> = unknown extends A ? never : [A] extends [Record<string, any>] ? true : never;

export type IsNonTupleArray<A> = [A] extends [unknown[]] ? (TupleKeyof<A> extends never ? true : never) : never;

export type IsNonStructRecord<A> = string extends keyof A ? true : never;
