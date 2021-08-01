import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import { BuildObj } from './types/BuildObj'
import type { Paths } from './types/Paths'
import type { GiveOpt, Inferable } from './types/utils'

export const get = <
  Infer,
  Path extends unknown extends Infer
    ? Inferable
    : Paths<Infer> extends Inferable
    ? Paths<Infer>
    : never
>(
  ...path: Path
): unknown extends Infer
  ? <Constructed extends BuildObj<Path, unknown>>(
      obj: Constructed
    ) => GiveOpt<AtPath<Constructed, Path>, Path>
  : (obj: Infer) => GiveOpt<AtPath<Infer, Path>, Path> => {
  if (isPathLens(path)) {
    return lensFromPath(path).get as any
  }
  return optionalFromPath(path).getOption as any
}
