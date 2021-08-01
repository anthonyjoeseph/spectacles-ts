import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { insertAt } from 'fp-ts/Array'
import * as L from 'monocle-ts/lib/Lens'
import * as Op from 'monocle-ts/lib/Optional'
import { lensFromPath, optionalFromPath } from "./monocle"
import type { InsertablePaths } from './types/insert/InsertablePaths'
import type { InsertKeyIntoObj } from './types/insert/InsertKeyIntoObj'
import type { GiveOpt } from './types/insert/GiveOpt'

const isPathLens = (
  path: readonly (number | string | readonly string[] | ((a: any) => boolean))[]
): path is (string | readonly string[])[] => !path.some(
  p => typeof p === 'function' 
    || (typeof p === 'number' && p !== 0) 
    || (typeof p === 'string' && p.startsWith('?'))
)

export const insert = <
  Infer,
  Path extends 
    InsertablePaths<Infer> extends readonly (string | number | readonly string[] | ((a: any) => boolean))[]
      ? InsertablePaths<Infer> | [string]
      : never,
  Val
>(fullPath: readonly [...Path], val: Val) => 
  (a: Infer) => {
  const path = fullPath.slice(0, fullPath.length - 1)
  const final = fullPath[fullPath.length - 1]
  if (typeof final === 'number' && final > 0) {
    return pipe(
      optionalFromPath(path).getOption(a),
      O.chain(insertAt(final as number, val))
    ) as GiveOpt<InsertKeyIntoObj<Infer, Path, Val>, Path>
  }
  if (isPathLens(path)) {
    return pipe(
      lensFromPath(path),
      L.modify(
        obj => Array.isArray(obj[final])
          ? { ...obj, [final as string]: [...obj[final], val] }
          : Array.isArray(obj)
            ? [val, ...obj]
            : ({...obj, [final as string]: val})
      )
    )(a) as GiveOpt<InsertKeyIntoObj<Infer, Path, Val>, Path>
  }
  return pipe(
    optionalFromPath(path),
    Op.modify(
      obj => 
        Array.isArray(obj[final])
          ? final === 0 
            ? [val, ...obj]
            : { ...obj, [final as string]: [...obj[final], val] }
          : ({...obj, [final as string]: val})
    )
  )(a) as GiveOpt<InsertKeyIntoObj<Infer, Path, Val>, Path>
}