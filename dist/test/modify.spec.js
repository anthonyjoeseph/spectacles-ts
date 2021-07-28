"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("fp-ts/function");
const src_1 = require("../src");
const shared_1 = require("./shared");
const modified = function_1.pipe(shared_1.data, src_1.modify(['a', 'b?', 0, 'c'], (j) => j + 4));
