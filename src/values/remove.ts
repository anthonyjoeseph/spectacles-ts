import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import * as Tr from "monocle-ts/lib/Traversal";
import { lensFromPath, traversalFromPath, isPathLens } from "../util/monocle";
import type { Remove } from "../types/remove";

export const remove: Remove = (fullPath: string) => (a: unknown) => {
  const segments = fullPath.split(".");
  const path = segments.slice(0, segments.length - 1).join(".");
  const final = segments[segments.length - 1];
  if (isPathLens(path as any)) {
    return pipe(
      lensFromPath(path as any),
      L.modify((obj) => {
        const omitted = { ...obj };
        delete omitted[final as string];
        return omitted;
      })
    )(a);
  }
  return pipe(
    traversalFromPath(path as any, []),
    Tr.modify((obj) => {
      const omitted = { ...obj };
      delete omitted[final as string];
      return omitted;
    })
  )(a);
};
