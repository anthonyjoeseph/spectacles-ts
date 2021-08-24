import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import { modify } from '../src'
import { Data, data, A, SimpleData, simpleData } from '../tests/shared'

// modifies a definite value
const modified: SimpleData = pipe(
  simpleData,
  modify(['a', 'b', '0'], (j) => j + 4)
)
expectType<SimpleData>(modified)

// modifies an optional value
const modified2: Data = pipe(
  data,
  modify(
    [(v): v is A => v.type === 'A', 'a', '?some', 'c'],
    (j) => j + 4
  )
)
expectType<Data>(modified2)