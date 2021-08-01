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
    assert.deepStrictEqual(modified, {
      a: { b: [127, 'abc', false] },
      c: 'def',
    })
  })
  it('modifies an optional value (optionally)', () => {
    const modifyOpted: O.Option<Data> = pipe(
      data,
      modifyOption(
        [(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'],
        (j) => j + 4
      )
    )
    assert.deepStrictEqual(
      modifyOpted,
      O.some({
        type: 'A',
        a: O.some({
          c: [127, 'abc', false],
          d: ['def'],
          e: false,
        }),
      })
    )
  })
})
