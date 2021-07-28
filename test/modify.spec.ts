import { pipe } from 'fp-ts/function'
import { modify } from '../src'

interface Data { a: {b?: {c: number; d: string; e: boolean }[] } }
declare const data: Data

const modified: Data = pipe(
  data,
  modify((j: number) => j + 4)('a', 'b?', 0, 'c')
)