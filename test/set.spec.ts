import { pipe } from 'fp-ts/function'
import { set } from '../src'
import { Data, data, A } from './shared'

const beenSet: Data = pipe(
  data,
  set([(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'], 123)
)