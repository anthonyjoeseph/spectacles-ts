"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lensFromPath = exports.optionalFromPath = exports.isPathLens = void 0;
const function_1 = require("fp-ts/function");
const L = __importStar(require("monocle-ts/lib/Lens"));
const Op = __importStar(require("monocle-ts/lib/Optional"));
const isPathLens = (path) => !path.some(p => typeof p === 'function' || typeof p === 'number' || (typeof p === 'string' && p.endsWith('?')));
exports.isPathLens = isPathLens;
const optionalFromPath = (path) => {
    const opt = path.reduce((acc, cur) => {
        if (typeof cur === 'function') {
            return function_1.pipe(acc, Op.filter(cur));
        }
        else if (Array.isArray(cur)) {
            return function_1.pipe(acc, Op.props(...cur));
        }
        else if (typeof cur === 'number') {
            return function_1.pipe(acc, Op.index(cur));
        }
        else if (typeof cur === 'string' && cur.endsWith('?')) {
            return function_1.pipe(acc, Op.prop(cur.slice(0, cur.length - 1)), Op.fromNullable);
        }
        return function_1.pipe(acc, Op.prop(cur));
    }, Op.id());
    return opt;
};
exports.optionalFromPath = optionalFromPath;
const lensFromPath = (path) => {
    const lens = path.reduce((acc, cur) => {
        if (Array.isArray(cur)) {
            return function_1.pipe(acc, L.props(...cur));
        }
        return function_1.pipe(acc, L.prop(cur));
    }, L.id());
    return lens;
};
exports.lensFromPath = lensFromPath;
