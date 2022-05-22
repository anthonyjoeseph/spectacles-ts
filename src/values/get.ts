/** @since 1.0.7 */
import { pipe } from "fp-ts/function";
import * as Tr from "monocle-ts/lib/Traversal";
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from "../util/monocle";
import { Get } from "../types/get";

/**
 * `get` monocle-ts Optional equivalent
 *
 * @since 1.0.7
 * @example
 *   import { pipe } from "fp-ts/function";
 *   import { get } from "spectacles-ts";
 *
 *   const gotten = pipe({ a: { b: ["abc", "def"] } }, get("a.b.[number]", 0));
 *   console.log(gotten);
 */
export const get: Get = (path: string, ...indicies: unknown[]) => {
  if (isPathLens(path)) {
    return lensFromPath(path).get;
  }
  if (isPathTraversal(path)) {
    return (v: unknown) => {
      return pipe(traversalFromPath(path, indicies), Tr.getAll(v));
    };
  }
  return optionalFromPath(path, indicies).getOption;
};
