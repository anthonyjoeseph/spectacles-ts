import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import * as Op from "monocle-ts/lib/Optional";
import { isPathLens, lensFromPath, optionalFromPath } from "../util/monocle";
import { ModifyOptionW } from "../types/modifyOptionW";

export const modifyOptionW: ModifyOptionW = (path: string, modFunc: (v: any) => unknown) => (a: unknown) => {
  if (isPathLens(path as any)) {
    return pipe(lensFromPath(path as any), L.modify(modFunc as any))(a) as any;
  }
  return pipe(optionalFromPath(path as any), Op.modifyOption(modFunc as any))(a) as any;
};
