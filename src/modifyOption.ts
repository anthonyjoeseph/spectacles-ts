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
    Pick extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? (keyof AtPath<Infer, Path>)[] | keyof AtPath<Infer, Path> 
      : string[],
    Full extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? [...Path, Pick] | [...Path]
      : [...Path],
    Val extends AtPath<Infer, Full>
  >(
    path: Full,
    modFunc: (v: Val) => Val
  ) =>
  (a: Infer): GiveOpt<Infer, Full> => {
    if (isPathLens(path as any)) {
      return pipe(lensFromPath(path as any), L.modify(modFunc))(a) as GiveOpt<
        Infer,
        Full
      >
    }
    return pipe(optionalFromPath(path as any), Op.modifyOption(modFunc))(a) as GiveOpt<
      Infer,
      Full
    >
  }
