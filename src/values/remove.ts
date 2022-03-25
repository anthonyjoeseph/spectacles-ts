import { pipe } from "fp-ts/function";
import { omit } from "fp-ts-std/Record";
import * as L from "monocle-ts/lib/Lens";
import * as Op from "monocle-ts/lib/Optional";
import { lensFromPath, optionalFromPath, isPathLens } from "../util/monocle";
import type { Remove } from "../types/remove";

export const remove: Remove = (fullPath: string) => (a: unknown) => {
  const segments = fullPath.split(".");
  const path = segments.slice(0, segments.length - 1).join(".");
  const final = segments[segments.length - 1];
  if (isPathLens(path as any)) {
    return pipe(
      lensFromPath(path as any),
      L.modify((obj) => omit(Array.isArray(final) ? final : [final])(obj))
    )(a);
  }
  return pipe(
    optionalFromPath(path as any),
    Op.modify((obj) => omit(Array.isArray(final) ? final : [final])(obj))
  )(a);
};
