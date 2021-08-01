import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Paths } from './types/Paths'
import type { GiveOpt, Inferable } from './types/utils'

export const get = <
  Infer,
  Path extends Paths<Infer> extends Inferable
    ? Paths<Infer>
    : never
>(
  ...path: Path
): ((obj: Infer) => GiveOpt<AtPath<Infer, Path>, Path>) => {
  if (isPathLens(path)) {
    return lensFromPath(path).get as any
  }
  return optionalFromPath(path).getOption as any
}
