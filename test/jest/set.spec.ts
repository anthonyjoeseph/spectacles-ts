import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as assert from "assert";
import { set } from "../../src";
import { Data, data, SimpleData, simpleData } from "../shared";

describe("set", () => {
  it("modifies a definite value", () => {
    const defSet: SimpleData = pipe(simpleData, set("a.b.[0]", -123));
    assert.deepStrictEqual(defSet, { a: { b: [-123, "abc", false], c: "def", d: false }, e: 456 });
  });
  it("modifies an optional value", () => {
    const optSet: Data = pipe(data, set("type:A.a.?some.c", -123));
    const optSet2: Data = pipe(data, set("type:A.a.?some.d.[number]", 0, "cde"));
    assert.deepStrictEqual(optSet, {
      type: "A",
      a: O.some({
        c: -123,
        d: ["def"],
        e: false,
      }),
    });
  });
});
