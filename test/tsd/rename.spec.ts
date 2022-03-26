import { expectError, expectType } from "tsd";
import type { Option } from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { rename } from "../../src";
import { Data, B } from "../shared";

// rename a key
const renamed = pipe({ a: { oldKey: 123, b: "abc" } }, rename("a.oldKey", "newKey"));

expectType<{ a: { b: string } & { readonly newKey: number } }>(renamed);

// don't suggest nullable-narrowing 'leaves'
declare const nullable: { a?: { b: number; c: string } };
expectType<{ a?: { c: string } & { readonly z: number } }>(pipe(nullable, rename("a?.b", "z")));
expectError(pipe(nullable, rename("a?", "z")));

// don't suggest sum narrowing leaves
declare const data: Data;
expectType<
  | B
  | {
      z: Option<{
        c: number;
        d: string[];
        e: boolean;
      }>;
      type: "A";
    }
>(pipe(data, rename("type:A.a", "z")));
expectError(pipe(data, rename("type:A", "z")));
