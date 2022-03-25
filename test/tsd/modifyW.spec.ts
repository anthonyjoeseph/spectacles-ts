import { expectType } from "tsd";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { modifyW } from "../../src";
import { data, B, simpleData } from "../shared";

const modifiedDefinite = pipe(
  simpleData,
  modifyW("a.b.0", (j) => `${j + 2}`)
);
expectType<{
  a: {
    b: [string, string, boolean];
    c: string;
    d: boolean;
  };
  e: number;
}>(modifiedDefinite);

const modifyOptional = pipe(
  data,
  modifyW("type:A.a.?some.c", (j) => `${j + 4}`)
);
expectType<
  | B
  | {
      a: O.Option<{
        c: string | number;
        d: string[];
        e: boolean;
      }>;
      type: "A";
    }
>(modifyOptional);

const optionalWidensType = pipe(
  { a: 123 } as { a: number | undefined },
  modifyW("a.?", (j) => `${j + 2}`)
);
expectType<{ a: string | number | undefined }>(optionalWidensType);
