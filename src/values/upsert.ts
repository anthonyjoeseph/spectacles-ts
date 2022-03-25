import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import * as Op from "monocle-ts/lib/Optional";
import { lensFromPath, optionalFromPath, isPathLens } from "../util/monocle";
import { Upsert } from "../types/upsert";

export const upsert: Upsert = (path: string, final: string, val: unknown) => (a: unknown) => {
  if (isPathLens(path as any)) {
    return pipe(
      lensFromPath(path as any),
      L.modify((obj) => ({ ...obj, [final as string]: val }))
    )(a) as any;
  }
  return pipe(
    optionalFromPath(path as any),
    Op.modify((obj) => ({ ...obj, [final as string]: val }))
  )(a) as any;
};
