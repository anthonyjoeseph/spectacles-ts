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
});
