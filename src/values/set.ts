import { pipe } from "fp-ts/function";
import * as Tr from "monocle-ts/lib/Traversal";
import { isPathLens, lensFromPath, traversalFromPath } from "../util/monocle";
import { Set } from "../types/set";

export const set: Set =
  (path: string, ...args: unknown[]) =>
  (obj: unknown) => {
    const indicies = args.slice(0, args.length - 1);
    const val = args[args.length - 1];
    if (isPathLens(path as any)) {
      return lensFromPath(path as any).set(val)(obj);
    }
    return pipe(traversalFromPath(path as any), Tr.set(val))(obj);
  };
