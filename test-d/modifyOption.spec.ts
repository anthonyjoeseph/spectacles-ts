import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { modifyOption } from '../src'
import { Data, data, A, SimpleData, simpleData } from '../tests/shared'

// modifies a definite value (definitely)', () => {
const modified = pipe(
  simpleData,
  modifyOption(['a', 'b', '0'], (j) => j + 4)
)
expectType<SimpleData>(modified)

// modifies an optional value (optionally)', () => {
const modifyOpted = pipe(
  data,
  modifyOption(
    [(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'],
    (j) => j + 4
  )
)
expectType<O.Option<Data>>(modifyOpted)

// modifies a traversal (un-optionally)', () => {
const modifyTraversal = pipe(
  [{ a: O.some(123) }, { a: O.some(456) }],
  modifyOption(
    ['[]>', 'a', '?some'],
    (j) => j + 4
  )
)
expectType<{ a: O.Option<number>; }[]>(modifyTraversal)