import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { isPathLens, lensFromPath, optionalFromPath } from "./monocle"
import type { Paths, GiveOpt, AtPath } from "./types"

export const modifyOption = <
  Infer,
  Path extends Paths<Infer>,
  Val extends AtPath<Infer, Path>
>(path: Path, modFunc: (v: Val) => Val) => 
  (a: Infer) => {
  const narrowPath = path as (string | number | readonly string[])[]
  if (isPathLens(narrowPath)) {
    return pipe(
      lensFromPath(narrowPath),
      L.modify(modFunc)
    )(a) as GiveOpt<Infer, Path>
  }
  return pipe(
    optionalFromPath(narrowPath),
    Op.modifyOption(modFunc)
  )(a) as GiveOpt<Infer, Path>
}