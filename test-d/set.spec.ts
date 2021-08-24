import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import { set } from '../src'
import { Data, data, A, SimpleData, simpleData } from '../tests/shared'

// modifies a definite value
const defSet: SimpleData = pipe(simpleData, set(['a', 'b', '0'], -123))
expectType<SimpleData>(defSet)

// modifies an optional value
const optSet: Data = pipe(
  data,
  set([(v): v is A => v.type === 'A', 'a', '?some', 'c'], -123)
)
expectType<Data>(optSet)
