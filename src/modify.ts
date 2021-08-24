import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import { modify as modifyTr } from 'monocle-ts/Traversal'
import { isPathLens, lensFromPath, traversalFromPath } from './monocle'
import type { Paths } from './types/Paths'
import type { AtPath } from './types/AtPath'
import type { Inferable } from './types/utils'

export const modify =
  <
    Infer,
    Path extends Paths<Infer> & Inferable
  >(
    path: [...Path],
    modFunc: <
      InferBuffer extends AtPath<Infer, Path, 'unpack'>, 
      Val extends InferBuffer,
    >(v: Val) => Val | AtPath<Infer, Path, 'unpack'>
  ) =>
  (a: Infer): Infer => {
    if (isPathLens(path as any)) {
      return pipe(lensFromPath(path as any), L.modify(modFunc as any))(a) as Infer
    }
    return pipe(traversalFromPath(path as any), modifyTr(modFunc as any))(a) as Infer
  }
