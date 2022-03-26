import { pipe } from "fp-ts/function";
import { setOption as setOptionOp } from "monocle-ts/Optional";
import { set as setTr } from "monocle-ts/Traversal";
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from "../util/monocle";
import { SetOption } from "../types/setOption";

export const setOption: SetOption = (path: string, val: unknown) => (obj: unknown) => {
  if (isPathLens(path)) {
    return lensFromPath(path).set(val)(obj);
  }
  if (isPathTraversal(path)) {
    return pipe(traversalFromPath(path), setTr(val))(obj);
  }
  return pipe(optionalFromPath(path), setOptionOp(val))(obj);
};
