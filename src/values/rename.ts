import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import * as Tr from "monocle-ts/lib/Traversal";
import { lensFromPath, traversalFromPath, isPathLens } from "../util/monocle";
import { Rename } from "../types/rename";

export const rename: Rename = (fullPath: string, newKey: string) => (a: unknown) => {
  const segments = fullPath.split(".");
  const path = segments.slice(0, segments.length - 1).join(".");
  const final = segments[segments.length - 1];
  if (isPathLens(path)) {
    return pipe(
      lensFromPath(path as any),
      L.modify(({ [final as string]: val, ...rest }) => ({ ...rest, [newKey as string]: val }))
    )(a);
  }
  return pipe(
    traversalFromPath(path),
    Tr.modify(({ [final as string]: val, ...rest }) => ({ ...rest, [newKey as string]: val }))
  )(a);
};
