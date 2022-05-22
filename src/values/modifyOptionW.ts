/** @since 1.0.7 */
import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import * as Op from "monocle-ts/lib/Optional";
import * as Tr from "monocle-ts/lib/Traversal";
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from "../util/monocle";
import { ModifyOptionW } from "../types/modifyOptionW";

/**
 * `modifyOptionW`
 *
 * @since 1.0.7
 * @example
 *   // TODO;
 */
export const modifyOptionW: ModifyOptionW =
  (path: string, ...args: unknown[]) =>
  (a: unknown) => {
    const indicies = args.slice(0, args.length - 1);
    const modFunc: (v: any) => unknown = args[args.length - 1] as any;
    if (isPathLens(path)) {
      return pipe(lensFromPath(path), L.modify(modFunc))(a);
    }
    if (isPathTraversal(path)) {
      return pipe(traversalFromPath(path, indicies), Tr.modify(modFunc))(a);
    }
    return pipe(optionalFromPath(path, indicies), Op.modifyOption(modFunc))(a);
  };
