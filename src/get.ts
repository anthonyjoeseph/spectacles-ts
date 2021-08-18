import { pipe } from 'fp-ts/function'
import { getAll } from 'monocle-ts/Traversal'
import { isPathLens, isPathTraversal, lensFromPath, optionalFromPath, traversalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Build } from './types/Build'
import type { Paths } from './types/Paths'
import type { GiveOpt, Inferable } from './types/utils'

export const get = <
  Infer,
  Path extends unknown extends Infer
    ? Inferable
    : Paths<Infer> extends Inferable
      ? Paths<Infer>
      : never,
  Pick extends AtPath<Infer, Path> extends Record<string, unknown> 
    ? (keyof AtPath<Infer, Path>)[] | keyof AtPath<Infer, Path> 
    : string[],
  Full extends AtPath<Infer, Path> extends Record<string, unknown> 
    ? [...Path, Pick] | Path
    : Path,
  Ret
>(
  ...path: Full
): unknown extends Ret
  ? <Constructed extends Build<Full, unknown, unknown>>(
      obj: Constructed
    ) => GiveOpt<AtPath<Constructed, Full>, Full>
  : (
    obj: unknown extends Infer 
      ? Build<Full, unknown, Ret> 
      : Infer
  ) => unknown extends Infer 
    ? Ret 
    : GiveOpt<AtPath<Infer, Full>, Full> => {
  if (isPathTraversal(path as any)) {
    return (obj: any) => pipe(traversalFromPath(path as any), getAll(obj)) as any
  }
  if (isPathLens(path as any)) {
    return lensFromPath(path as any).get as any
  }
  return optionalFromPath(path as any).getOption as any
}
