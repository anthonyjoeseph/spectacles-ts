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
    const picked = pipe(simpleData, get('a', ['c', 'd']))
    assert.deepStrictEqual(picked, { c: 'def', d: false })
  })
  it('has checked record access', () => {
    const record = { a: 123 } as Record<string, number>
    const picked = pipe(record, get('?key', 'b'))
    assert.deepStrictEqual(picked, O.none)
  })
  it('can traverse arrays', () => {
    const traverse = pipe([{a: 123}, {a: 456}], get('[]>', 'a'))
    assert.deepStrictEqual(traverse, [123, 456])
  })
  it('can traverse records', () => {
    const traverseRecord = pipe(
      { a: [123], b: [456] } as Record<string, number[]>, 
      get('{}>', 0)
    )
    assert.deepStrictEqual(traverseRecord, [123, 456])
  })
  it('gets an optional value', () => {
    const optional = pipe(
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
