import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as assert from "assert";
import { modifyOptionW } from "../../src";
import { data, simpleData } from "../shared";

describe("modifyOptionW", () => {
  it("modifies a definite value", () => {
    const modified = pipe(
      simpleData,
      modifyOptionW("a.b.[0]", (j) => `${j + 4}`)
    );
    assert.deepStrictEqual(modified, { a: { b: ["127", "abc", false], c: "def", d: false }, e: 456 });
  });
  it("modifies an optional value", () => {
    const modified = pipe(
      data,
      modifyOptionW("type:A.a.?some.c", (j) => `${j + 4}`)
    );
    assert.deepStrictEqual(
      modified,
      O.some({
        type: "A",
        a: O.some({
          c: "127",
          d: ["def"],
          e: false,
        }),
      })
    );
  });
  it("modifies an array traversal", () => {
    const modifyArrayTraversal = pipe(
      [{ a: O.some(123) }, { a: O.some(456) }],
      modifyOptionW("[]>.a.?some", (j) => `${j + 4}`)
    );
    assert.deepStrictEqual(modifyArrayTraversal, [{ a: O.some("127") }, { a: O.some("460") }]);
  });
  it("modifies a record traversal", () => {
    const modifyRecordTraversal = pipe(
      { a: 123, b: 456 } as Record<string, number>,
      modifyOptionW("{}>", (j) => `${j + 4}`)
    );
    assert.deepStrictEqual(modifyRecordTraversal, { a: "127", b: "460" });
  });
  it("widens a collection's type", () => {
    const collectionWidensType = pipe(
      { a: [123, 456] },
      modifyOptionW("a.[number]", 0, (j) => `${j + 2}`)
    );
    assert.deepStrictEqual(collectionWidensType, O.some({ a: ["125", 456] }));
  });
});
