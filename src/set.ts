import { isPathLens, lensFromPath, optionalFromPath } from './monocle'
import type { AtPath } from './types/AtPath'
import type { Paths } from './types/Paths'
import type { Inferable } from './types/utils'

export const set =
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
  (obj: Infer): Infer => {
    if (isPathLens(path as any)) {
      return lensFromPath(path as any).set(val)(obj) as Infer
    }
    return optionalFromPath(path as any).set(val)(obj) as Infer
  }
