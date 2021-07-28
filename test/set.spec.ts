import { pipe } from 'fp-ts/function'
import { set } from '../src'

interface Data { a: {b?: {c: number; d: string; e: boolean }[] } }
declare const data: Data

const beenSet: Data = pipe(
  data,
  set({c: 456, d: 'def'})('a', 'b?', 0, ['c', 'd'] as const)
)