"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const monocle_1 = require("./monocle");
const set = (path, val) => (obj) => {
    if (monocle_1.isPathLens(path)) {
        return monocle_1.lensFromPath(path)
            .set(val)(obj);
    }
    return monocle_1.optionalFromPath(path)
        .set(val)(obj);
};
exports.set = set;
