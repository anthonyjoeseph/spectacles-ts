import { pipe } from "fp-ts/function";
import * as assert from "assert";
import { remove } from "../../src";

describe("remove", () => {
  it("omit a key", () => {
    const omitKey = pipe({ a: { b: 123, c: "abc" } }, remove("a.b"));
    assert.deepStrictEqual(omitKey, { a: { c: "abc" } });
  });
});
