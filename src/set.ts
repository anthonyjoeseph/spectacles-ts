import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Paths } from './types/Paths'
import type { Inferable, Head } from './types/utils'

export const set =
  <
    Infer,
    Path extends Paths<Infer> extends Inferable ? [...Paths<Infer>] : never,
    H extends Head<Path> extends Inferable ? Head<Path> : never,
    Pick extends Paths<Infer, H> extends string[] ? Paths<Infer, H> : string[],
    Val extends AtPath<Infer, Path>
  >(
    path: Pick extends Paths<Infer, H> ? [...H, [...Pick]] : Path,
    val: Val
  ) =>
  (obj: Infer): Infer => {
    if (isPathLens(path)) {
      return lensFromPath(path).set(val)(obj) as Infer
    }
    return optionalFromPath(path).set(val)(obj) as Infer
  }
