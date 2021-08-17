import { pipe } from 'fp-ts/function'
import { fromString } from 'fp-ts-std/Number'
import { match } from 'fp-ts/Option'
import { Traversable as ArrayTraversable } from 'fp-ts/ReadonlyArray'
import { Traversable as RecordTraversable } from 'fp-ts/ReadonlyRecord'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import * as Tr from 'monocle-ts/lib/Traversal'
import { Inferable } from './types/utils'

export const isPathTraversal = (
  path: Inferable
): boolean => path.some(
  p => typeof p === 'string' && (p === '[]>' || p === '{}>')
)

export const isPathLens = (
  path: Inferable
): path is (string | readonly string[])[] =>
  !path.some(
    (p) =>
      typeof p === 'function' ||
      typeof p === 'number' ||
      (typeof p === 'string' && p.startsWith('?'))
  )

export const traversalFromPath = (
  path: readonly (number | string | readonly string[] | ((a: never) => boolean))[]
): Tr.Traversal<any, any> => {
  const opt = path.reduce((acc, cur, index) => {
    if (typeof cur === 'function') {
      return pipe(acc, Tr.filter(cur as any))
    } else if (Array.isArray(cur)) {
      return pipe(acc, Tr.props(...(cur as [string, string])))
    } else if (typeof cur === 'number') {
      return pipe(acc, Tr.index(cur))
    } else if (cur === '?') {
      return pipe(acc, Tr.fromNullable)
    } else if (cur === '?some') {
      return pipe(acc, Tr.some)
    } else if (cur === '?right') {
      return pipe(acc, Tr.right)
    } else if (cur === '?left') {
      return pipe(acc, Tr.left)
    } else if (cur === '[]>') {
      return pipe(acc, Tr.traverse(ArrayTraversable))
    } else if (cur === '{}>') {
      return pipe(acc, Tr.traverse(RecordTraversable))
    } else if (cur === '?key') {
      return acc
    }
    return pipe(
      fromString(cur as string),
      match(
        () => path[index - 1] === '?key'
          ? pipe(acc, Tr.key(cur as string))
          : pipe(acc, Tr.prop(cur as string)),
        (tupleIndex) => pipe(acc, Tr.component(tupleIndex))
      )
    )
  }, Tr.id<any>())
  return opt
}

export const optionalFromPath = (
  path: readonly (number | string | readonly string[] | ((a: never) => boolean))[]
): Op.Optional<any, any> => {
  const opt = path.reduce((acc, cur, index) => {
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
    } else if (cur === '?key') {
      return acc
    }
    return pipe(
      fromString(cur as string),
      match(
        () => path[index - 1] === '?key'
        ? pipe(acc, Op.key(cur as string))
        : pipe(acc, Op.prop(cur as string)),
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
      match(
        () => pipe(acc, L.prop(cur as string)),
        (tupleIndex) => pipe(acc, L.component(tupleIndex))
      )
    )
  }, L.id<any>())
  return lens
}
