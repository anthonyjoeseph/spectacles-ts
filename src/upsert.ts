import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Tr from 'monocle-ts/lib/Traversal'
import { lensFromPath, traversalFromPath, isPathLens } from './monocle'
import type { Paths } from './types/Paths'
import type { Build } from './types/Build'
import type { Inferable } from './types/utils'

export const upsert =
  <
    Infer,
    Path extends Paths<Infer, 'upsert'> extends Inferable
      ? [...Paths<Infer, 'upsert'>]
      : never,
    Val
  >(
    fullPath: Path,
    val: Val
  ) =>
  (a: Infer): Build<Path, Infer, Val> => {
    const path = fullPath.slice(0, fullPath.length - 1)
    const final = fullPath[fullPath.length - 1]
    if (isPathLens(path)) {
      return pipe(
        lensFromPath(path as any),
        L.modify((obj) => ({ ...obj, [final as string]: val }))
      )(a) as Build<Path, Infer, Val>
    }
    return pipe(
      traversalFromPath(path as any),
      Tr.modify((obj) => ({ ...obj, [final as string]: val }))
    )(a) as Build<Path, Infer, Val>
  }
