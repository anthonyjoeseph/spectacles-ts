import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Tr from 'monocle-ts/lib/Traversal'
import { lensFromPath, traversalFromPath, isPathLens } from './monocle'
import type { Paths } from './types/Paths'
import type { Build } from './types/Build'
import type { Inferable } from './types/utils'

export const rename =
  <
    Infer,
    Path extends Paths<Infer, 'rename'> & Inferable,
    NewKey extends string
  >(
    fullPath: [...Path],
    newKey: NewKey
  ) =>
  (a: Infer): Build<Path, Infer, NewKey, 'rename'> => {
    const path = fullPath.slice(0, fullPath.length - 1)
    const final = fullPath[fullPath.length - 1]
    if (isPathLens(path)) {
      return pipe(
        lensFromPath(path as any),
        L.modify(
          ({ [final as string]: val, ...rest }) => 
          {
            return ({ ...rest, [newKey as string]: val })
          }
        )
      )(a) as Build<Path, Infer, NewKey, 'rename'>
    }
    return pipe(
      traversalFromPath(path as any),
      Tr.modify(
        ({ [final as string]: val, ...rest }) => 
        ({ ...rest, [newKey as string]: val })
      )
    )(a) as Build<Path, Infer, NewKey, 'rename'>
  }
