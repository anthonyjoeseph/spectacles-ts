import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import { isPathLens, lensFromPath, traversalFromPath } from "../util/monocle";
import { ModifyF } from "../types/modifyF";

export const modifyF: ModifyF =
  (F: any) =>
  (path: any, modFunc: (v: any) => any) =>
  (a: any): any => {
    if (isPathLens(path)) {
      return pipe(lensFromPath(path), L.modifyF(F)(modFunc as any))(a);
    }
    return traversalFromPath(path).modifyF(F)(modFunc as any)(a);
  };
