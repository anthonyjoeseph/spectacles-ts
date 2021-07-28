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
exports.modify = void 0;
const function_1 = require("fp-ts/function");
const L = __importStar(require("monocle-ts/lib/Lens"));
const Op = __importStar(require("monocle-ts/lib/Optional"));
const monocle_1 = require("./monocle");
const modify = (path, modFunc) => (a) => {
    if (monocle_1.isPathLens(path)) {
        return function_1.pipe(monocle_1.lensFromPath(path), L.modify(modFunc))(a);
    }
    return function_1.pipe(monocle_1.optionalFromPath(path), Op.modify(modFunc))(a);
};
exports.modify = modify;
