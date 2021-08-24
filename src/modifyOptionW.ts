import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { modify as modifyTr } from 'monocle-ts/Traversal'
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from './monocle'
import type { Paths } from './types/Paths'
import type { Build } from './types/Build'
import type { AtPath } from './types/AtPath'
import type { GiveOpt, HasCollection, Inferable } from './types/utils'

export const modifyOptionW =
  <
    Infer,
    Path extends Paths<Infer> & Inferable,
    RetVal,
  >(
    path: [...Path],
    modFunc: (v: AtPath<Infer, Path, 'unpack'>) => RetVal
  ) =>
  (a: Infer): (true extends HasCollection<Path[number]>
      ? GiveOpt<Build<Path, Infer, RetVal | AtPath<Infer, Path, 'unpack'>, 'static'>, Path>
      : GiveOpt<Build<Path, Infer, RetVal, 'static'>, Path>) => {
    if (isPathTraversal(path as any)) {
      return pipe(traversalFromPath(path as any), modifyTr(modFunc as any))(a) as any
    }
    if (isPathLens(path as any)) {
      return pipe(lensFromPath(path as any), L.modify(modFunc as any))(a) as any
    }
    return pipe(optionalFromPath(path as any), Op.modifyOption(modFunc as any))(a) as any
  }
