import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { isPathLens, lensFromPath, optionalFromPath } from "./monocle"
import type { Paths } from './types/Paths'
import type { AtPath } from './types/AtPath'

export const modify = <
  Infer,
  Path extends 
    Paths<Infer> extends readonly (string | number | readonly string[] | ((a: any) => boolean))[]
      ? Paths<Infer>
      : never,
  Val extends AtPath<Infer, Path>
>(path: readonly [...Path], modFunc: (v: Val) => Val) => 
  (a: Infer) => {
  if (isPathLens(path)) {
    return pipe(
      lensFromPath(path),
      L.modify(modFunc)
    )(a) as Infer
  }
  return pipe(
    optionalFromPath(path),
    Op.modify(modFunc)
  )(a) as Infer
}