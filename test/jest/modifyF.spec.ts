import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
import * as assert from "assert";
import { modifyF } from "../../src";
import { simpleData } from "../shared";

describe("modifyF", () => {
  it("modifies a value", () => {
    const modified = pipe(
      simpleData,
      modifyF(E.Applicative)("a.b.[0]", (b) => (b < 100 ? E.right<never, number>(100) : E.left("never mind")))
    );
    assert.deepStrictEqual(modified, E.left("never mind"));
  });
});
