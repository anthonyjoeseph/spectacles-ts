import { pipe } from "fp-ts/function";
import * as Tr from "monocle-ts/lib/Traversal";
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from "../util/monocle";
import { Get } from "../types/get";

export const get: Get = (path: string) => {
  if (isPathLens(path)) {
    return lensFromPath(path).get;
  }
  if (isPathTraversal(path)) {
    return (v: unknown) => {
      return pipe(traversalFromPath(path), Tr.getAll(v));
    };
  }
  return optionalFromPath(path).getOption;
};
