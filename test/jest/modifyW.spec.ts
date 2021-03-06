import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as assert from "assert";
import { modifyW } from "../../src";
import { data, simpleData } from "../shared";

describe("modifyW", () => {
  it("modifies a definite value", () => {
    const modified = pipe(
      simpleData,
      modifyW("a.b.[0]", (j) => `${j + 4}`)
    );
    assert.deepStrictEqual(modified, { a: { b: ["127", "abc", false], c: "def", d: false }, e: 456 });
  });
  it("modifies an optional value", () => {
    const modified = pipe(
      data,
      modifyW("type:A.a.?some.c", (j) => `${j + 4}`)
    );
    assert.deepStrictEqual(modified, {
      type: "A",
      a: O.some({
        c: "127",
        d: ["def"],
        e: false,
      }),
    });
  });
  it("widens a collection's type", () => {
    const collectionWidensType = pipe(
      { a: [123, 456] },
      modifyW("a.[number]", 0, (j) => `${j + 2}`)
    );
    assert.deepStrictEqual(collectionWidensType, { a: ["125", 456] });
  });
});
