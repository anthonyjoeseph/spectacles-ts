import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import { modifyF as modifyFOpt } from "monocle-ts/lib/Optional";
import { isPathLens, lensFromPath, optionalFromPath } from "../util/monocle";
import { ModifyF } from "../types/modifyF";

export const modifyF: ModifyF =
  (F: any) =>
  (path: any, modFunc: (v: any) => any) =>
  (a: any): any => {
    if (isPathLens(path as any)) {
      return pipe(lensFromPath(path as any), L.modifyF(F)(modFunc as any))(a) as any;
    }
    return pipe(optionalFromPath(path as any), modifyFOpt(F)(modFunc as any))(a) as any;
  };
