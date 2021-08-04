import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as assert from 'assert'
import { get } from '../src'
import { data, A, B, simpleData } from './shared'


describe('get', () => {
  it('gets a definite value', () => {
    const definite = pipe(simpleData, get('a', 'b', '1'))
    assert.deepStrictEqual(definite, 'abc')
  })
  it('can pick', () => {
    const definite = pipe(simpleData, get('a', ['c', 'd']))
    assert.deepStrictEqual(definite, { c: 'def', d: false })
  })
  it('gets an optional value', () => {
    const optional: O.Option<string> = pipe(
      data,
      get((v): v is A => v.type === 'A', 'a', '?some', 'c', '1')
    )
    assert.deepStrictEqual(optional, O.some('abc'))
  })
  it('gets an optional value - unpiped', () => {
    const func = get((v: A | B): v is A => v.type === 'A', 'a', '?some', 'c', '0')
    const optional = func(data)
    assert.deepStrictEqual(optional, O.some(123))
  })
})
