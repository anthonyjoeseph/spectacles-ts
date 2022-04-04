import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import { modify as modifyTr } from "monocle-ts/Traversal";
import { isPathLens, lensFromPath, traversalFromPath } from "../util/monocle";
import { ModifyW } from "../types/modifyW";

export const modifyW: ModifyW =
  (path: string, ...args: unknown[]) =>
  (a: unknown) => {
    const indicies = args.slice(0, args.length - 1);
    const modFunc: (v: any) => unknown = args[args.length - 1] as any;
    if (isPathLens(path)) {
      return pipe(lensFromPath(path), L.modify(modFunc))(a);
    }
    return pipe(traversalFromPath(path, indicies), modifyTr(modFunc))(a);
  };
