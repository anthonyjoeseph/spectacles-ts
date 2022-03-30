import { expectType } from "tsd";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
import { modifyF } from "../../src";
import { SimpleData, simpleData } from "../shared";

// modifies a definite value
const modified = pipe(
  simpleData,
  modifyF(E.Applicative)("a.b.[0]", (b) => (b > 30 ? E.right(40) : E.left("never mind")))
);
expectType<E.Either<string, SimpleData>>(modified);
