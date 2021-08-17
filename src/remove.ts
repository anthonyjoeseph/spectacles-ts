import { pipe } from 'fp-ts/function'
import { omit } from 'fp-ts-std/Record'
import * as L from 'monocle-ts/lib/Lens'
import * as Tr from 'monocle-ts/lib/Traversal'
import { lensFromPath, traversalFromPath, isPathLens } from './monocle'
import type { Paths } from './types/Paths'
import type { AtPath } from './types/AtPath'
import type { Build } from './types/Build'
import type { Inferable } from './types/utils'

export const remove =
  <
    Infer,
    Path extends Paths<Infer, 'remove'> extends Inferable
      ? Paths<Infer, 'remove'>
      : never,
    Pick extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? (keyof AtPath<Infer, Path>)[] | keyof AtPath<Infer, Path> 
      : string[],
    Full extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? [...Path, Pick] | Path
      : Path
  >(
    ...fullPath: Full
  ) =>
  (a: Infer): Build<Full, Infer, unknown, 'remove'> => {
    const path = fullPath.slice(0, fullPath.length - 1)
    const final = fullPath[fullPath.length - 1]
    if (isPathLens(path as any)) {
      return pipe(
        lensFromPath(path as any),
        L.modify((obj) => omit(Array.isArray(final) ? final : [final])(obj))
      )(a) as Build<Full, Infer, unknown, 'remove'>
    }
    return pipe(
      traversalFromPath(path as any),
      Tr.modify((obj) => omit(Array.isArray(final) ? final : [final])(obj))
    )(a) as Build<Full, Infer, unknown, 'remove'>
  }
``