import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import { remove } from '../src'

// omit a key
const omitKey = pipe(
  { a: { b: 123, c: 'abc' } },
  remove('a', 'b')
)
expectType<{ a: { c: string } }>(omitKey)

// omit several keys
const omitManyKeys = pipe(
  { a: { b: 123, c: 'abc', d: false } },
  remove('a', ['b', 'c'])
)
expectType<{ a: { d: boolean } }>(omitManyKeys)
