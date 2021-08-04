import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { Paths } from './types/Paths'
import type { AtPath } from './types/AtPath'
import type { Inferable, Head } from './types/utils'

export const modify =
  <
    Infer,
    Path extends Paths<Infer> extends Inferable ? [...Paths<Infer>] : never,
    H extends Head<Path> extends Inferable ? Head<Path> : never,
    Pick extends Paths<Infer, H> extends string[] ? Paths<Infer, H> : string[],
    Val extends AtPath<Infer, Path>,
  >(
    path: string[] extends Pick ? Path : [...H, [...Pick]],
    modFunc: (v: Val) => Val
  ) =>
  (a: Infer): Infer => {
    if (isPathLens(path)) {
      return pipe(lensFromPath(path), L.modify(modFunc))(a) as Infer
    }
    return pipe(optionalFromPath(path), Op.modify(modFunc))(a) as Infer
  }
