import { pipe } from 'fp-ts/function'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'

export const isPathLens = (
  path: (number | string | readonly string[])[]
): path is (string | readonly string[])[] => !path.some(
  p => typeof p === 'number' || (typeof p === 'string' && p.endsWith('?'))
)

export const optionalFromPath = (
  path: (number | string | readonly string[])[]
): Op.Optional<any, any> => {
  const opt = path.reduce(
    (acc, cur) => {
      if (Array.isArray(cur)) {
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
  path: (string | readonly string[])[]
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