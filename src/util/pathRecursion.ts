import type { Option } from "fp-ts/Option";
import type { Either } from "fp-ts/Either";
import type { IsAny, IsNull, IsRecord, TupleKeyof } from "./predicates";

export type CanRecurse<A> = unknown extends A
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

// check whether B extends A without putting A in the check type
export type B_extends_A<A, B> = true extends CanRecurse<A>
  ? A extends B
    ? true
    : {
        [K in AllKeys<PossiblyExtendible<A, B>>]: K extends keyof A ? A[K] : any;
      } extends UnPartial<PossiblyExtendible<A, B>>
    ? true
    : never
  : never;

export type ValueOf<A> = A[keyof A];
