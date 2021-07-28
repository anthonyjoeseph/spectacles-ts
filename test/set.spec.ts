import { pipe } from 'fp-ts/function'
import { set } from '../src'
import { data } from './shared'

const beenSet = pipe(
  data,
  set(['a', 'b?', 0, 'c'], 123)
)