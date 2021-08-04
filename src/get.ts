import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import { BuildObj } from './types/BuildObj'
import type { Paths } from './types/Paths'
import type { GiveOpt, Inferable, Head } from './types/utils'

export const get = <
  Infer,
  Path extends unknown extends Infer
    ? Inferable
    : Paths<Infer> extends Inferable
      ? Paths<Infer>
      : never,
  H extends Head<Path> extends Inferable ? Head<Path> : never,
  Pick extends Paths<Infer, H> extends string[] ? Paths<Infer, H> : string[],
>(
  ...path: string[] extends Pick ? Path : [...H, [...Pick]]
  // this gives autocomplete, but doesn't pipe for some reason:
  // ...path: Pick extends Paths<Infer, H> ? [...H, [...Pick]] : Path
): unknown extends Infer
  ? <Constructed extends BuildObj<Path, unknown>>(
      obj: Constructed
    ) => GiveOpt<AtPath<Constructed, Path>, Path>
  : (obj: Infer) => GiveOpt<AtPath<Infer, Path>, Path> => {
  if (isPathLens(path as any)) {
    return lensFromPath(path as any).get as any
  }
  return optionalFromPath(path as any).getOption as any
}
