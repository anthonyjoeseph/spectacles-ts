import { pipe } from 'fp-ts/function'
import * as assert from 'assert'
import { upsert } from '../src'

describe('upsert', () => {
  it('inserts a key', () => {
    const insertKey: { a: { b: number; c: string } } = pipe(
      { a: { b: 123 } },
      upsert(['a', 'c'], 'abc')
    )
    assert.deepStrictEqual(insertKey, { a: { b: 123, c: 'abc' } })
  })
  it('replaces an existing key', () => {
    const replaceKey = pipe(
      { a: { b: 123 } },
      upsert(['a', 'b'], 'abc')
    )
    assert.deepStrictEqual(replaceKey, { a: { b: 'abc' } })
  })
})
