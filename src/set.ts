import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Paths } from './types/Paths'
import type { Inferable } from './types/utils'

export const set =
  <
    Infer,
    Path extends Paths<Infer> extends Inferable
      ? [...Paths<Infer>]
      : never,
    Val extends AtPath<Infer, Path>
  >(
    path: Path,
    val: Val
  ) =>
  (obj: Infer): Infer => {
    if (isPathLens(path)) {
      return lensFromPath(path).set(val)(obj) as Infer
    }
    return optionalFromPath(path).set(val)(obj) as Infer
  }
