import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as assert from "assert";
import { get } from "../../src";
import { data, simpleData } from "../shared";

describe("get", () => {
  it("gets a definite value", () => {
    const definite = pipe(simpleData, get("a.b.1"));
    assert.deepStrictEqual(definite, "abc");
  });
  it("gets an optional value", () => {
    const optional = pipe(data, get("type:A.a._tag:Some.value.c"));
    assert.deepStrictEqual(optional, O.some(123));
  });
  it("gets an optional value - unpiped", () => {
    const func = get("type:A.a._tag:Some.value.c");
    const optional = func(data);
    assert.deepStrictEqual(optional, O.some(123));
  });
});
