import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import { isPathLens, lensFromPath, traversalFromPath } from "../util/monocle";
import { ModifyF } from "../types/modifyF";

export const modifyF: ModifyF =
  (F: any) =>
  (path: string, ...args: unknown[]) =>
  (a: unknown) => {
    const indicies = args.slice(0, args.length - 1);
    const modFunc: (v: any) => unknown = args[args.length - 1] as any;
    if (isPathLens(path)) {
      return pipe(lensFromPath(path), L.modifyF(F)(modFunc as any))(a);
    }
    return traversalFromPath(path, indicies).modifyF(F)(modFunc as any)(a);
  };
