import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { Paths } from './types/Paths'
import type { AtPath } from './types/AtPath'
import type { Inferable } from './types/utils'

export const modify =
  <
    Infer,
    Path extends Paths<Infer> extends Inferable
      ? [...Paths<Infer>]
      : never,
    Val extends AtPath<Infer, Path>
  >(
    path: Path,
    modFunc: (v: Val) => Val
  ) =>
  (a: Infer): Infer => {
    if (isPathLens(path)) {
      return pipe(lensFromPath(path), L.modify(modFunc))(a) as Infer
    }
    return pipe(optionalFromPath(path), Op.modify(modFunc))(a) as Infer
  }
