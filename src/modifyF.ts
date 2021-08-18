import { pipe } from 'fp-ts/function'
import { Applicative, Applicative1, Applicative2, Applicative3 } from 'fp-ts/lib/Applicative'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import * as L from 'monocle-ts/lib/Lens'
import { isPathLens, lensFromPath, traversalFromPath } from './monocle'
import type { Paths } from './types/Paths'
import type { AtPath } from './types/AtPath'
import type { Inferable } from './types/utils'

export const modifyF: {
  <F extends URIS3>(F: Applicative3<F>): <
    R, E,
    Infer,
    Path extends Paths<Infer> extends Inferable ? [...Paths<Infer>] : never,
    Pick extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? (keyof AtPath<Infer, Path>)[] | keyof AtPath<Infer, Path> 
      : string[],
    Full extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? [...Path, Pick] | [...Path]
      : [...Path],
    Val extends AtPath<Infer, Full, 'unpack'>
  >(path: Full, modFunc: (v: Val) => Kind3<F, R, E, Val>) => (a: Infer) => Kind3<F, R, E, Infer>
  <F extends URIS2>(F: Applicative2<F>): <
    E,
    Infer,
    Path extends Paths<Infer> extends Inferable ? [...Paths<Infer>] : never,
    Pick extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? (keyof AtPath<Infer, Path>)[] | keyof AtPath<Infer, Path> 
      : string[],
    Full extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? [...Path, Pick] | [...Path]
      : [...Path],
    Val extends AtPath<Infer, Full, 'unpack'>
  >(path: Full, modFunc: (v: Val) => Kind2<F, E, Val>) => (a: Infer) => Kind2<F, E, Infer>
  <F extends URIS>(F: Applicative1<F>): <
    Infer,
    Path extends Paths<Infer> extends Inferable ? [...Paths<Infer>] : never,
    Pick extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? (keyof AtPath<Infer, Path>)[] | keyof AtPath<Infer, Path> 
      : string[],
    Full extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? [...Path, Pick] | [...Path]
      : [...Path],
    Val extends AtPath<Infer, Full, 'unpack'>,
  >(path: Full, modFunc: (v: Val) => Kind<F, Val>) => (a: Infer) => Kind<F, Infer>
  <F>(F: Applicative<F>): <
    Infer,
    Path extends Paths<Infer> extends Inferable ? [...Paths<Infer>] : never,
    Pick extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? (keyof AtPath<Infer, Path>)[] | keyof AtPath<Infer, Path> 
      : string[],
    Full extends AtPath<Infer, Path> extends Record<string, unknown> 
      ? [...Path, Pick] | [...Path]
      : [...Path],
    Val extends AtPath<Infer, Full, 'unpack'>,
  >(path: Full, modFunc: (v: Val) => HKT<F, Val>) => (a: Infer) => HKT<F, Infer>
} = (F: any) => (
    path: any,
    modFunc: (v: any) => any
  ) =>
  (a: any): any => {
    if (isPathLens(path as any)) {
      return pipe(lensFromPath(path as any), L.modifyF(F)(modFunc as any))(a) as any
    }
    return traversalFromPath(path as any).modifyF(F)(modFunc as any)(a) as any
  }
