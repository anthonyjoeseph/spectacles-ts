"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("fp-ts/function");
const src_1 = require("../src");
const nested = function_1.pipe(data, src_1.get('a', (v) => v.b === 'other', 'b?', 0, ['c', 'd']));
/* const uncurried = get('a', 'b?', 0, ['c', 'e'] as const)({
  a: {
    b: [{ c: 123, e: true }]
  }
})
const polym: <Constructed extends {
  a: {
      b: unknown
  };
}>(c: Constructed) =>
  O.Option<AtPath<Constructed, ['a', 'b']>> =
  get('a', 'b')
const inferredRetVal: Eq.Eq<{
  a: {
      b: string;
  };
}> = pipe(S.Eq, Eq.contramap(get('a', 'b'))) */ 
