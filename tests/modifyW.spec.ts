import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as assert from 'assert'
import { modifyW } from '../src'
import { data, A, simpleData } from './shared'

describe('modifyW', () => {
  it('modifies a definite value', () => {
    const modified = pipe(
      simpleData,
      modifyW(['a', 'b', '0'], (j) => `${j + 4}`)
    )
    assert.deepStrictEqual(modified, { a: { b: ['127', 'abc', false], c: 'def', d: false}, e: 456 })
  })
  it('modifies an optional value', () => {
    const modified = pipe(
      data,
      modifyW(
        [(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'],
        (j) => `${j + 4}`
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
