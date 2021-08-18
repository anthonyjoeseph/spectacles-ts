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
    Path extends Paths<Infer> extends Inferable ? [...Paths<Infer>] : never,
    Pick extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? (keyof AtPath<Infer, Path>)[] | keyof AtPath<Infer, Path> 
      : string[],
    Full extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? [...Path, Pick] | [...Path]
      : [...Path],
    Val extends AtPath<Infer, Full, 'unpack'>,
  >(
    path: Full,
    modFunc: (v: Val) => Val
  ) =>
  (a: Infer): Infer => {
    if (isPathLens(path as any)) {
      return pipe(lensFromPath(path as any), L.modify(modFunc))(a) as Infer
    }
    return pipe(traversalFromPath(path as any), modifyTr(modFunc))(a) as Infer
  }
