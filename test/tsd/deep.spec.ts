import { expectType } from "tsd";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

import { set, setOption, upsert } from "../../src";

const setDeep = pipe(
  {
    a: {
      b: {
        c: {
          d: {
            e: {
              f: { g: { h: { i: { j: { k: { l: 123 } } } } } },
            },
          },
        },
      },
    },
  },
  set("a.b.c.d.e.f.g.h.i.j.k.l", 321)
);
expectType<{
  a: {
    b: {
      c: {
        d: {
          e: {
            f: { g: { h: { i: { j: { k: { l: number } } } } } };
          };
        };
      };
    };
  };
}>(setDeep);

const modifyOptionDeep = pipe({ a: { b: { c: O.some({ d: 123 }) } } }, setOption("a.b.c.?some.d", 321));
expectType<
  O.Option<{
    a: { b: { c: O.Option<{ d: number }> } };
  }>
>(modifyOptionDeep);

const upsertDeep = pipe({ a: { b: { c: { d: { e: 123 } } } } }, upsert("a.b.c.d", "e2", "abc"));
expectType<{
  a: {
    b: {
      c: {
        d: { e: number } & { readonly e2: string };
      };
    };
  };
}>(upsertDeep);
