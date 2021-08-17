import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { modify as modifyTr } from 'monocle-ts/Traversal'
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from './monocle'
import type { Paths } from './types/Paths'
import type { Build } from './types/Build'
import type { AtPath } from './types/AtPath'
import type { GiveOpt, Inferable } from './types/utils'

export const modifyOptionW =
  <
    Infer,
    Path extends Paths<Infer> extends Inferable ? [...Paths<Infer>] : never,
    Pick extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? (keyof AtPath<Infer, Path>)[] | keyof AtPath<Infer, Path> 
      : string[],
    Full extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? [...Path, Pick] | [...Path]
      : [...Path],
    RetVal,
  >(
    path: Full,
    modFunc: (v: AtPath<Infer, Full>) => RetVal
  ) =>
  (a: Infer): ([RetVal] extends [AtPath<Infer, Full>]
    ? Infer
    : GiveOpt<Build<Full, Infer, RetVal, 'static'>, Full>) => {
    if (isPathTraversal(path as any)) {
      return pipe(traversalFromPath(path as any), modifyTr(modFunc as any))(a) as any
    }
    if (isPathLens(path as any)) {
      return pipe(lensFromPath(path as any), L.modify(modFunc as any))(a) as any
    }
    return pipe(optionalFromPath(path as any), Op.modifyOption(modFunc as any))(a) as any
  }
