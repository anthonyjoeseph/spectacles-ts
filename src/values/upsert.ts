/** @since 1.0.7 */
import { pipe } from "fp-ts/function";
import * as L from "monocle-ts/lib/Lens";
import * as Tr from "monocle-ts/lib/Traversal";
import { lensFromPath, traversalFromPath, isPathLens } from "../util/monocle";
import { Upsert } from "../types/upsert";

/**
 * `upsert`
 *
 * @since 1.0.7
 * @example
 *   // TODO;
 */
export const upsert: Upsert =
  (path: string, final: string, ...args: unknown[]) =>
  (a: unknown) => {
    const indicies = args.slice(0, args.length - 1);
    const val = args[args.length - 1];
    if (isPathLens(path as any)) {
      return pipe(
        lensFromPath(path as any),
        L.modify((obj) => ({ ...obj, [final as string]: val }))
      )(a) as any;
    }
    return pipe(
      traversalFromPath(path as any, indicies),
      Tr.modify((obj) => ({ ...obj, [final as string]: val }))
    )(a) as any;
  };
