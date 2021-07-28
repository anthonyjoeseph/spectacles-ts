import { isPathLens, lensFromPath, optionalFromPath } from "./monocle"
import type { Paths, BuildObj } from "./types"

export const set = <
  Val
>(
  val: Val
) => <
  Infer extends BuildObj<Path, Val>,
  Path extends 
    // necessary to allow inference
    Paths<Infer> extends (number | string | readonly string[])[] 
      ? Paths<Infer> 
      : never
>(...path: Path) => 
  (obj: Infer) =>
  {
  if (isPathLens(path)) {
    return lensFromPath(path)
      .set(val)(obj) as Infer
  }
  return optionalFromPath(path)
    .set(val)(obj) as Infer
}