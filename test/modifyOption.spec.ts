import { pipe } from 'fp-ts/function'
import type { Option } from 'fp-ts/Option'
import { modifyOption } from '../src'
import { Data, data } from './shared'

const modifyOpted: Option<Data> = pipe(
  data,
  modifyOption(['a', 'b?', 0, 'c'] as const, (j) => j + 4)
)