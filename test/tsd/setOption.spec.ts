import { expectType } from "tsd";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { setOption } from "../../src";
import { Data, data, SimpleData, simpleData } from "../shared";

// modifies a definite value
const defSet = pipe(simpleData, setOption("a.b.0", -123));
expectType<SimpleData>(defSet);

// modifies an optional value
const optSet = pipe(data, setOption("type:A.a._tag:Some.value.c", -123));
expectType<O.Option<Data>>(optSet);
