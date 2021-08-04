import { pipe } from 'fp-ts/function'
import { fromString } from 'fp-ts-std/Number'
import * as O from 'fp-ts/Option'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'

export const isPathLens = (
  path: readonly (number | string | readonly string[] | ((a: never) => boolean))[]
): path is (string | readonly string[])[] =>
  !path.some(
    (p) =>
      typeof p === 'function' ||
      typeof p === 'number' ||
      (typeof p === 'string' && p.startsWith('?'))
  )

export const optionalFromPath = (
  path: readonly (number | string | readonly string[] | ((a: never) => boolean))[]
): Op.Optional<any, any> => {
  const opt = path.reduce((acc, cur) => {
    if (typeof cur === 'function') {
      return pipe(acc, Op.filter(cur as any))
    } else if (Array.isArray(cur)) {
      return pipe(acc, Op.props(...(cur as [string, string])))
    } else if (typeof cur === 'number') {
      return pipe(acc, Op.index(cur))
    } else if (cur === '?') {
      return pipe(acc, Op.fromNullable)
    } else if (cur === '?some') {
      return pipe(acc, Op.some)
    } else if (cur === '?right') {
      return pipe(acc, Op.right)
    } else if (cur === '?left') {
      return pipe(acc, Op.left)
    }
    return pipe(
      fromString(cur as string),
      O.match(
        () => pipe(acc, Op.prop(cur as string)),
        (tupleIndex) => pipe(acc, Op.component(tupleIndex))
      )
    )
  }, Op.id<any>())
  return opt
}

export const lensFromPath = (
  path: readonly (string | readonly string[])[]
): L.Lens<any, any> => {
  const lens = path.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return pipe(acc, L.props(...(cur as [string, string])))
    }
    return pipe(
      fromString(cur as string),
      O.match(
        () => pipe(acc, L.prop(cur as string)),
        (tupleIndex) => pipe(acc, L.component(tupleIndex))
      )
    )
  }, L.id<any>())
  return lens
}
