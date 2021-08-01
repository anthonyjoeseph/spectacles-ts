import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Paths } from './types/Paths'
import type { GiveOpt } from './types/utils'

export const get = <
  Infer,
  Path extends Paths<Infer> extends readonly (
    | // necessary to allow inference
    number
    | string
    | ((a: any) => boolean)
    | readonly string[]
  )[]
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
