import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { isPathLens, lensFromPath, optionalFromPath } from "./monocle"
import type { Paths, GiveOpt, BuildObj } from "./types"

export const modifyOption = <
  Val
>(
  modFunc: (v: Val) => Val
) => <
  Infer extends BuildObj<Path, Val>,
  Path extends 
    // necessary to allow inference
    Paths<Infer> extends (number | string | readonly string[])[] 
      ? Paths<Infer> 
      : never
>(...path: Path) => 
  (a: Infer) => {
  if (isPathLens(path)) {
    return pipe(
      lensFromPath(path),
      L.modify(modFunc)
    )(a) as GiveOpt<Infer, Path>
  }
  return pipe(
    optionalFromPath(path),
    Op.modifyOption(modFunc)
  )(a) as GiveOpt<Infer, Path>
}