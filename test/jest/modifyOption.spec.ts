import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as assert from "assert";
import { modifyOption } from "../../src";
import { Data, data, SimpleData, simpleData } from "../shared";

describe("modifyOption", () => {
  it("modifies a definite value (definitely)", () => {
    const modified: SimpleData = pipe(
      simpleData,
      modifyOption("a.b.0", (j) => j + 4)
    );
    assert.deepStrictEqual(modified, { a: { b: [127, "abc", false], c: "def", d: false }, e: 456 });
  });
  it("modifies an optional value (optionally)", () => {
    const modifyOpted: O.Option<Data> = pipe(
      data,
      modifyOption("type:A.a._tag:Some.value.c", (j) => j + 4)
    );
    assert.deepStrictEqual(
      modifyOpted,
      O.some({
        type: "A",
        a: O.some({
          c: 127,
          d: ["def"],
          e: false,
        }),
      })
    );
  });
});
