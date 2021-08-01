import { pipe } from 'fp-ts/function'
import { modify } from '../src'
import { Data, data, A } from './shared'

const modified: Data = pipe(
  data,
  modify([(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'], (j) => j + 4)
)