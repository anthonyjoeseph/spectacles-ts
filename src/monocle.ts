import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'

export const isPathLens = (
  path: readonly (number | string | readonly string[] | ((a: any) => boolean))[]
): path is (string | readonly string[])[] => !path.some(
  p => typeof p === 'function' || typeof p === 'number' || (typeof p === 'string' && p.endsWith('?'))
)

export const optionalFromPath = (
  path: readonly (number | string | readonly string[] | ((a: any) => boolean))[]
): Op.Optional<any, any> => {
  const opt = path.reduce(
    (acc, cur) => {
      if (typeof cur === 'function') {
        return pipe(acc, Op.filter(cur))
      } else if (Array.isArray(cur)) {
        return pipe(acc, Op.props(...(cur as [string, string])))
      } else if (typeof cur === 'number') {
        return pipe(acc, Op.index(cur))
      } else if (typeof cur === 'string' && cur.endsWith('?')) {
        return pipe(acc, Op.prop(cur.slice(0, cur.length - 1)), Op.fromNullable)
      }
      return pipe(acc, Op.prop(cur as string))
    },
    Op.id<any>()
  )
  return opt
}

export const lensFromPath = (
  path: readonly (string | readonly string[])[]
): L.Lens<any, any> => {
  const lens = path.reduce(
    (acc, cur) => {
      if (Array.isArray(cur)) {
        return pipe(acc, L.props(...(cur as [string, string])))
      }
      return pipe(acc, L.prop(cur as string))
    },
    L.id<any>()
  )
  return lens
}