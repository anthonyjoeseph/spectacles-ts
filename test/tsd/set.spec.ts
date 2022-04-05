import { expectType } from "tsd";
import { pipe } from "fp-ts/function";
import { set } from "../../src";
import { Data, data, SimpleData, simpleData } from "../shared";

// modifies a definite value
const defSet = pipe(simpleData, set("a.b.[0]", -123));
expectType<SimpleData>(defSet);

// modifies an optional value
const optSet = pipe(data, set("type:A.a.?some.c", -123));
expectType<Data>(optSet);
