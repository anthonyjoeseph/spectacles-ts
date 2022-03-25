import { expectType } from "tsd";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { modifyOptionW } from "../../src";
import { data, B, simpleData } from "../shared";

const modifiesDefinite = pipe(
  simpleData,
  modifyOptionW("a.b.[0]", (j) => `${j + 2}`)
);
expectType<{
  a: {
    b: [string, string, boolean];
    c: string;
    d: boolean;
  };
  e: number;
}>(modifiesDefinite);

const modifiesOptional = pipe(
  data,
  modifyOptionW("type:A.a.?some.c", (j) => `${j + 4}`)
);
expectType<
  O.Option<
    | B
    | {
        type: "A";
        a: O.Option<{
          c: string;
          d: string[];
          e: boolean;
        }>;
      }
  >
>(modifiesOptional);

const optionalReplacesType = pipe(
  { a: 123 } as { a: number | undefined },
  modifyOptionW("a.?", (j) => `${j + 2}`)
);
expectType<O.Option<{ a: string | undefined }>>(optionalReplacesType);
