import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import { modify as modifyTr } from 'monocle-ts/Traversal'
import { isPathLens, lensFromPath, traversalFromPath } from './monocle'
import type { Paths } from './types/Paths'
import type { Build } from './types/Build'
import type { AtPath } from './types/AtPath'
import type { HasOptional, Inferable } from './types/utils'


export const modifyW =
  <
    Infer,
    Path extends Paths<Infer> & Inferable,
    RetVal,
  >(
    path: [...Path],
    modFunc: (v: AtPath<Infer, Path, 'unpack'>) => RetVal
  ) =>
  (a: Infer): (true extends HasOptional<Path>
      ? Build<Path, Infer, RetVal | AtPath<Infer, Path, 'unpack'>, 'static'>
      : Build<Path, Infer, RetVal, 'static'>) => {
    if (isPathLens(path as any)) {
      return pipe(lensFromPath(path as any), L.modify(modFunc as any))(a) as any
    }
    return pipe(traversalFromPath(path as any), modifyTr(modFunc as any))(a) as any
  }
