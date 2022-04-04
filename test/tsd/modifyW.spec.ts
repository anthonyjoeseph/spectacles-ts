import { expectType } from "tsd";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { modifyW } from "../../src";
import { data, B, simpleData } from "../shared";

const modifiedDefinite = pipe(
  simpleData,
  modifyW("a.b.[0]", (j) => `${j + 2}`)
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
        c: string;
        d: string[];
        e: boolean;
      }>;
      type: "A";
    }
>(modifyOptional);

const optionalReplacesType = pipe(
  { a: 123 } as { a: number | undefined },
  modifyW("a?", (j) => `${j + 2}`)
);
expectType<{ a: string | undefined }>(optionalReplacesType);

const collectionWidensType = pipe(
  { a: [123, 456] },
  modifyW("a.[number]", 0, (j) => `${j + 2}`)
);
expectType<{ a: (string | number)[] }>(collectionWidensType);

const preservesReadonlyArr = pipe(
  [123, 456] as readonly number[],
  modifyW("[number]", 0, (j) => `${j + 2}`)
);
expectType<readonly (number | string)[]>(preservesReadonlyArr);
