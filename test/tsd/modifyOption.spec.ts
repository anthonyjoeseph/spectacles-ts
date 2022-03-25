import { expectType } from "tsd";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { modifyOption } from "../../src";
import { Data, data, SimpleData, simpleData } from "../shared";

// modifies a definite value (definitely)
const modified = pipe(
  simpleData,
  modifyOption("a.b.0", (j) => j + 4)
);
expectType<SimpleData>(modified);

// modifies an optional value (optionally)
const modifyOpted = pipe(
  data,
  modifyOption("type:A.a._tag:Some.value.c", (j) => j + 4)
);
expectType<O.Option<Data>>(modifyOpted);
