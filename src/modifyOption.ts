import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Paths } from './types/Paths'
import type { GiveOpt, Inferable } from './types/utils'

export const modifyOption =
  <
    Infer,
    Path extends Paths<Infer> extends Inferable ? [...Paths<Infer>] : never,
    Val extends AtPath<Infer, Path>
  >(
    path: Path,
    modFunc: (v: Val) => Val
  ) =>
  (a: Infer): GiveOpt<Infer, Path> => {
    if (isPathLens(path)) {
      return pipe(lensFromPath(path), L.modify(modFunc))(a) as GiveOpt<
        Infer,
        Path
      >
    }
    return pipe(optionalFromPath(path), Op.modifyOption(modFunc))(a) as GiveOpt<
      Infer,
      Path
    >
  }
