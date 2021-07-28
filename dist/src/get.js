"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const monocle_1 = require("./monocle");
const get = (...path) => {
    if (monocle_1.isPathLens(path)) {
        return monocle_1.lensFromPath(path)
            .get;
    }
    return monocle_1.optionalFromPath(path)
        .getOption;
};
exports.get = get;
