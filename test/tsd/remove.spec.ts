import { expectType, expectError } from "tsd";
import { pipe } from "fp-ts/function";
import { remove } from "../../src";
import { B, Data } from "../shared";

// omit a key
const omitKey = pipe({ a: { b: 123, c: "abc" } }, remove("a.b"));
expectType<{ a: { c: string } }>(omitKey);

// don't suggest nullable-narrowing 'leaves'
declare const nullable: { a?: { b: number; c: string } };
expectType<{ a?: { c: string } }>(pipe(nullable, remove("a.?.b")));
expectError(pipe(nullable, remove("a.?")));

// don't suggest sum narrowing leaves
declare const data: Data;
expectType<B | { type: "A" }>(pipe(data, remove("type:A.a")));
expectError(pipe(data, remove("type:A")));
