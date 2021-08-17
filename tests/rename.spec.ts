import { pipe } from 'fp-ts/function'
import * as assert from 'assert'
import { rename } from '../src'

describe('rename', () => {
  it('renames a key', () => {
    const renamed = pipe(
      { a: { old: 123, b: 'abc' } },
      rename(['a', 'old'], 'new')
    )
    assert.deepStrictEqual(renamed, { a: { new: 123, b: 'abc' } })
  })
})
