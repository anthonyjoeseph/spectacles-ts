import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import * as assert from 'assert'
import { insertOption } from '../src'

describe('insert', () => {
  it('inserts a key', () => {
    const insertKey: { a: { b: number; c: string } } = pipe(
      { a: { b: 123 } },
      insertOption(['a', 'c'], 'abc')
    )
    assert.deepStrictEqual(insertKey, { a: { b: 123, c: 'abc' } })
  })
  it('replaces an existing key', () => {
    const replaceKey = pipe(
      { a: { b: 123 } },
      insertOption(['a', 'b'], 'abc')
    )
    assert.deepStrictEqual(replaceKey, { a: { b: 'abc' } })
  })
  it('appends a value to an array', () => {
    const append: { a: NonEmptyArray<number> } = pipe(
      { a: [123] },
      insertOption(['a'], 456)
    )
    assert.deepStrictEqual(append, { a: [123, 456] })
  })
  it('prepends a value to an array', () => {
    const prepend: { a: NonEmptyArray<number> } = pipe(
      { a: [123] },
      insertOption(['a', 0], 456)
    )
    assert.deepStrictEqual(prepend, { a: [456, 123] })
  })
  it('inserts a value into an array (optionally)', () => {
    const insertAt: O.Option<{ a: NonEmptyArray<number> }> = pipe(
      { a: [0, 1] },
      insertOption(['a', 1], 456)
    )
    assert.deepStrictEqual(insertAt, O.some({ a: [0, 456, 1] }))
  })
  it('inserts a value into an array (optionally) (failure case)', () => {
    const insertAt: O.Option<{ a: NonEmptyArray<number> }> = pipe(
      { a: [0, 1] },
      insertOption(['a', 3], 456)
    )
    assert.deepStrictEqual(insertAt, O.none)
  })
})
