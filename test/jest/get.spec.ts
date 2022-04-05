import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as assert from "assert";
import { get } from "../../src";
import { data, simpleData } from "../shared";

describe("get", () => {
  it("gets a definite value", () => {
    const definite = pipe(simpleData, get("a.b.[1]"));
    assert.deepStrictEqual(definite, "abc");
  });
  it("can traverse arrays", () => {
    const traverse = pipe([{ a: 123 }, { a: 456 }], get("[]>.a"));
    assert.deepStrictEqual(traverse, [123, 456]);
  });
  it("has indexed array access", () => {
    const record = [{ a: 123 }];
    const picked = pipe(record, get("[number].a", 0));
    assert.deepStrictEqual(picked, O.some(123));
  });
  it("has indexed record access", () => {
    const record = { a: 123 } as Record<string, number>;
    const picked = pipe(record, get("[string]", "b"));
    assert.deepStrictEqual(picked, O.none);
  });
  it("can traverse arrays", () => {
    const traverse = pipe([{ a: 123 }, { a: 456 }], get("[]>.a"));
    assert.deepStrictEqual(traverse, [123, 456]);
  });
  it("can traverse records (sorting keys)", () => {
    const traverseRecord = pipe({ b: { z: 456 }, a: { z: 123 } } as Record<string, { z: number }>, get("{}>.z"));
    assert.deepStrictEqual(traverseRecord, [123, 456]);
  });
  it("gets an optional value", () => {
    const a = { a: 123 } as { a: number | undefined };
    const optional = pipe(a, get("a?"));
    assert.deepStrictEqual(optional, O.some(123));
  });
  it("narrows a sum type value", () => {
    const optional = pipe(data, get("type:A.a.?some.c"));
    assert.deepStrictEqual(optional, O.some(123));
  });
  it("gets an optional value - unpiped", () => {
    const func = get("type:A.a.?some.c");
    const optional = func(data);
    assert.deepStrictEqual(optional, O.some(123));
  });
});
