/** @since 1.0.7 */
import { pipe } from "fp-ts/function";
import { setOption as setOptionOp } from "monocle-ts/Optional";
import { set as setTr } from "monocle-ts/Traversal";
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from "../util/monocle";
import { SetOption } from "../types/setOption";

/**
 * `setOption`
 *
 * @since 1.0.7
 * @example
 *   // TODO;
 */
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
