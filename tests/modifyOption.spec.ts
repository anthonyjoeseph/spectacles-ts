import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as assert from 'assert'
import { modifyOption } from '../src'
import { Data, data, A, SimpleData, simpleData } from './shared'

describe('modifyOption', () => {
  it('modifies a definite value (definitely)', () => {
    const modified: SimpleData = pipe(
      simpleData,
      modifyOption(['a', 'b', '0'], (j) => j + 4)
    )
    assert.deepStrictEqual(modified, { a: { b: [127, 'abc', false], c: 'def', d: false}, e: 456 })
  })
  it('modifies an optional value (optionally)', () => {
    const modifyOpted: O.Option<Data> = pipe(
      data,
      modifyOption(
        [(v): v is A => v.type === 'A', 'a', '?some', 'c'],
        (j) => j + 4
      )
    )
    assert.deepStrictEqual(
      modifyOpted,
      O.some({
        type: 'A',
        a: O.some({
          c: 127,
          d: ['def'],
          e: false,
        }),
      })
    )
  })
  it('modifies a traversal (un-optionally)', () => {
    const modifyTraversal = pipe(
      [{ a: O.some(123) }, { a: O.some(456) }],
      modifyOption(
        ['[]>', 'a', '?some'],
        (j) => j + 4
      )
    )
    assert.deepStrictEqual(
      modifyTraversal,
      [
        {
          a: O.some(127)
        },
        {
          a: O.some(460)
        }
      ]
    )
  })
})
