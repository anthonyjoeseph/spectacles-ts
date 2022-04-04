import { expectType, expectError } from "tsd";
import { pipe } from "fp-ts/function";
import { upsert } from "../../src";

// inserts a key
const insertKey = pipe({ a: { b: 123 } }, upsert("a", "c", "abc"));
expectType<{ a: { b: number } & { readonly c: string } }>(insertKey);

// replaces an existing key
const replaceKey = pipe({ a: { b: 123, f: false } }, upsert("a", "b", "abc"));
expectType<{ a: { b: string; f: boolean } }>(replaceKey);

// preserves 'readonly' annotations
const preservesReadonlyKeys = pipe(
  { a: { b: 123, f: false } as { readonly b: number; f: boolean } },
  upsert("a", "b", true)
);
expectType<{ a: { readonly b: boolean; f: boolean } }>(preservesReadonlyKeys);

// don't suggest non-record 'leaves'
declare const nullable: { a?: { b: number; c: string } };
expectType<typeof nullable>(pipe(nullable, upsert("a?", "b", 123)));
expectError(pipe(nullable, upsert("a", "a", 123)));
expectError(pipe(nullable, upsert("a?.c", "a", 123)));

// insert into record type
const insertInsideCollection = pipe(
  { a: { x: { b: 123 }, y: { b: 456 } } as Record<string, { b: number }> },
  upsert(["a", "?key", "z", "b"], "789")
);
expectType<{ a: Record<string, { b: string | number }> }>(insertInsideCollection);
