import { pipe } from "fp-ts/function";
import { setOption as setOptionOp } from "monocle-ts/Optional";
import { set as setTr } from "monocle-ts/Traversal";
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from "../util/monocle";
import { SetOption } from "../types/setOption";

export const setOption: SetOption =
  (path: string, ...args: unknown[]) =>
  (obj: unknown) => {
    const indicies = args.slice(0, args.length - 1);
    const val = args[args.length - 1];
    if (isPathLens(path)) {
      return lensFromPath(path).set(val)(obj);
    }
    if (isPathTraversal(path)) {
      return pipe(traversalFromPath(path, indicies), setTr(val))(obj);
    }
    return pipe(optionalFromPath(path, indicies), setOptionOp(val))(obj);
  };
