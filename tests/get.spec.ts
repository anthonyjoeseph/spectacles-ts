import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as assert from 'assert'

import { get } from '../src'
import { data, A, simpleData } from './shared'

describe('get', () => {
  it('gets a definite value', () => {
    const definite: string = pipe(simpleData, get('a', 'b', '1'))
    assert.deepStrictEqual(definite, 'abc')
  })
  it('gets an optional value', () => {
    const optional: O.Option<string> = pipe(
      data,
      get((v): v is A => v.type === 'A', 'a', '?some', 'c', '1')
    )
    assert.deepStrictEqual(optional, O.some('abc'))
  })
})
