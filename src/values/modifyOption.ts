import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import * as Op from "monocle-ts/lib/Optional";
import { isPathLens, lensFromPath, optionalFromPath } from "../util/monocle";
import { ModifyOption } from "../types/modifyOption";

export const modifyOption: ModifyOption = (path: string, modFunc: (v: any) => unknown) => (a: unknown) => {
  if (isPathLens(path as any)) {
    return pipe(lensFromPath(path as any), L.modify(modFunc))(a);
  }
  return pipe(optionalFromPath(path as any), Op.modifyOption(modFunc))(a);
};
