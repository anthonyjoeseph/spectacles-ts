import { isPathLens, lensFromPath, optionalFromPath } from "./monocle"
import type { AtPath } from "./types/AtPath"
import type { Paths } from "./types/Paths"
import type { GiveOpt } from "./types/utils"

export const get = <
  Infer,
  Path extends 
    // necessary to allow inference
    Paths<Infer> extends readonly (number | string | ((a: any) => boolean) | readonly string[])[] 
      ? Paths<Infer>
      : never,
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
