import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import { modify as modifyOp } from "monocle-ts/Optional";
import { isPathLens, lensFromPath, optionalFromPath } from "../util/monocle";
import { ModifyW } from "../types/modifyW";

export const modifyW: ModifyW = (path: string, modFunc: (v: any) => unknown) => (a: unknown) => {
  if (isPathLens(path as any)) {
    return pipe(lensFromPath(path as any), L.modify(modFunc as any))(a) as any;
  }
  return pipe(optionalFromPath(path as any), modifyOp(modFunc as any))(a) as any;
};
