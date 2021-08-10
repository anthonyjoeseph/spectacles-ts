import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as assert from 'assert'
import { setOption } from '../src'
import { data, A, simpleData } from './shared'

describe('setOption', () => {
  it('modifies a definite value', () => {
    const defSet = pipe(simpleData, setOption(['a', 'b', '0'], -123))
    assert.deepStrictEqual(defSet, { a: { b: [-123, 'abc', false], c: 'def', d: false}, e: 456 })
  })
  it('modifies an optional value', () => {
    const optSet = pipe(
      data,
      setOption([(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'], -123)
    )
    assert.deepStrictEqual(optSet, O.some({
      type: 'A',
      a: O.some({
        c: [-123, 'abc', false],
        d: ['def'],
        e: false,
      }),
    }))
  })
})
