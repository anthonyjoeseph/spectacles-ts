import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { isPathLens, lensFromPath, optionalFromPath } from "./monocle"
import type { Paths, AtPath } from "./types"

export const modify = <
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
    )(a) as Infer
  }
  return pipe(
    optionalFromPath(narrowPath),
    Op.modify(modFunc)
  )(a) as Infer
}