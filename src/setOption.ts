import { pipe } from 'fp-ts/function'
import { set as setTr } from 'monocle-ts/Traversal'
import { setOption as setOptionOp } from 'monocle-ts/Optional'
import { isPathLens, lensFromPath, optionalFromPath, isPathTraversal, traversalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Paths } from './types/Paths'
import type { GiveOpt, Inferable } from './types/utils'

export const setOption =
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
    val: Val
  ) =>
  (obj: Infer): GiveOpt<Infer, Full> => {
    if (isPathTraversal(path as any)) {
      return pipe(traversalFromPath(path as any), setTr(val))(obj) as any
    }
    if (isPathLens(path as any)) {
      return lensFromPath(path as any).set(val)(obj) as any
    }
    return pipe(optionalFromPath(path as any), setOptionOp(val))(obj) as any
  }
