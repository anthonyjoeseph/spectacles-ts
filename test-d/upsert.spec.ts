import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import { upsert } from '../src'

// inserts a key
const insertKey = pipe(
  { a: { b: 123 } },
  upsert(['a', 'c'], 'abc')
)
expectType<{ a: { b: number, c: string } }>(insertKey)

// replaces an existing key
const replaceKey = pipe(
  { a: { b: 123, f: false } },
  upsert(['a', 'b'], 'abc')
)
expectType<{ a: { b: string; f: boolean } }>(replaceKey)
