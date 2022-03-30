import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import { modify as modifyTr } from "monocle-ts/Traversal";
import { isPathLens, lensFromPath, traversalFromPath } from "../util/monocle";
import { ModifyW } from "../types/modifyW";

export const modifyW: ModifyW = (path: string, modFunc: (v: any) => unknown) => (a: unknown) => {
  if (isPathLens(path)) {
    return pipe(lensFromPath(path), L.modify(modFunc))(a);
  }
  return pipe(traversalFromPath(path), modifyTr(modFunc))(a);
};
