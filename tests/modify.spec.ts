import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as assert from 'assert'
import { modify } from '../src'
import { Data, data, A, SimpleData, simpleData } from './shared'

describe('modify', () => {
  it('modifies a definite value', () => {
    const modified: SimpleData = pipe(
      simpleData,
      modify(['a', 'b', '0'], (j) => j + 4)
    )
    assert.deepStrictEqual(modified, { a: { b: [127, 'abc', false], c: 'def', d: false}, e: 456 })
  })
  it('modifies an optional value', () => {
    const modified: Data = pipe(
      data,
      modify(
        [(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'],
        (j) => j + 4
      )
    )
    assert.deepStrictEqual(modified, {
      type: 'A',
      a: O.some({
        c: [127, 'abc', false],
        d: ['def'],
        e: false,
      }),
    })
  })
})
