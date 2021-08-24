import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { modify as modifyTr } from 'monocle-ts/Traversal'
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Paths } from './types/Paths'
import type { GiveOpt, Inferable } from './types/utils'

export const modifyOption =
  <
    Infer,
    Path extends Paths<Infer> & Inferable,
  >(
    path: [...Path],
    modFunc: <
      InferBuffer extends AtPath<Infer, Path, 'unpack'>, 
      Val extends InferBuffer
    >(v: Val) => Val | AtPath<Infer, Path, 'unpack'>
  ) =>
  (a: Infer): GiveOpt<Infer, Path> => {
    if (isPathTraversal(path as any)) {
      return pipe(traversalFromPath(path as any), modifyTr(modFunc))(a) as GiveOpt<
        Infer,
        Path
      >
    }
    if (isPathLens(path as any)) {
      return pipe(lensFromPath(path as any), L.modify(modFunc))(a) as GiveOpt<
        Infer,
        Path
      >
    }
    return pipe(optionalFromPath(path as any), Op.modifyOption(modFunc))(a) as GiveOpt<
      Infer,
      Path
    >
  }
