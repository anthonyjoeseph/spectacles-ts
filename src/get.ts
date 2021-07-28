import { isPathLens, lensFromPath, optionalFromPath } from "./monocle"
import type { Paths, GiveOpt, AtPath } from "./types"

export const get = <
  Infer,
  Path extends 
    // necessary to allow inference
    Paths<Infer> extends (number | string | readonly string[])[] 
      ? Paths<Infer> 
      : never
>(...path: Path): (
  (obj: Infer) => GiveOpt<AtPath<Infer, Path>, Path>
) => {
  if (isPathLens(path)) {
    return lensFromPath(path)
      .get as any
  }
  return optionalFromPath(path)
    .getOption as any
}
