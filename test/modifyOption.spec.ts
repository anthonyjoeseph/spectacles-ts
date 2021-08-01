import { pipe } from 'fp-ts/function'
import type { Option } from 'fp-ts/Option'
import { modifyOption } from '../src'
import { Data, data, A } from './shared'

const modifyOpted: Option<Data> = pipe(
  data,
  modifyOption([(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'], (j) => j + 4)
)