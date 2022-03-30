import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import * as Op from "monocle-ts/lib/Optional";
import * as Tr from "monocle-ts/lib/Traversal";
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from "../util/monocle";
import { ModifyOptionW } from "../types/modifyOptionW";

export const modifyOptionW: ModifyOptionW = (path: string, modFunc: (v: any) => unknown) => (a: unknown) => {
  if (isPathLens(path)) {
    return pipe(lensFromPath(path), L.modify(modFunc))(a);
  }
  if (isPathTraversal(path)) {
    return pipe(traversalFromPath(path), Tr.modify(modFunc))(a);
  }
  return pipe(optionalFromPath(path), Op.modifyOption(modFunc))(a);
};
