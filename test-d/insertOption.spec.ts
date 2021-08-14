import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { insertOption } from '../src'

// inserts a key
const insertKey = pipe(
  { a: { b: 123 } },
  insertOption(['a', 'c'], 'abc')
)
expectType<{ a: { b: number, c: string } }>(insertKey)

// replaces an existing key
const replaceKey = pipe(
  { a: { b: 123, f: false } },
  insertOption(['a', 'b'], 'abc')
)
expectType<{ a: { b: string; f: boolean } }>(replaceKey)

// appends a value to an array
const append = pipe(
  { a: [123] },
  insertOption(['a'], 456)
)

expectType<{ a: NonEmptyArray<number> }>(append)

// prepends a value to an array
const prepend = pipe(
  { a: [123] },
  insertOption(['a', 0], 456)
)
expectType<{ a: NonEmptyArray<number> }>(prepend)

// inserts a value into an array (optionally)
const insertAt = pipe(
  { a: [0, 1] },
  insertOption(['a', 1], 456)
)
expectType<O.Option<{ a: NonEmptyArray<number> }>>(insertAt)

