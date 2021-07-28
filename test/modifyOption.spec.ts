import { pipe } from 'fp-ts/function'
import type { Option } from 'fp-ts/Option'
import { modifyOption } from '../src'

interface Data { a: {b?: {c: number; d: string; e: boolean }[] } }
declare const data: Data

const modifyOpted: Option<Data> = pipe(
  data,
  modifyOption((j: number) => j + 4)('a', 'b?', 0, 'c')
)