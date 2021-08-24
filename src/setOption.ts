import { pipe } from 'fp-ts/function'
import { setOption as setOptionOp } from 'monocle-ts/Optional'
import { set as setTr } from 'monocle-ts/Traversal'
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Paths } from './types/Paths'
import type { GiveOpt, Inferable } from './types/utils'

export const setOption =
  <
    Infer,
    Path extends Paths<Infer> & Inferable,
    Val extends AtPath<Infer, Path, 'unpack'>
  >(
    path: [...Path],
    val: Val
  ) =>
  (obj: Infer): GiveOpt<Infer, Path> => {
    if (isPathTraversal(path as any)) {
      return pipe(traversalFromPath(path as any), setTr(val))(obj) as any
    }
    if (isPathLens(path as any)) {
      return lensFromPath(path as any).set(val)(obj) as any
    }
    return pipe(optionalFromPath(path as any), setOptionOp(val))(obj) as any
  }
