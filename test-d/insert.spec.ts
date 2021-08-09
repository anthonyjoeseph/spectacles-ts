import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { insert } from '../src'

// inserts a key
const insertKey = pipe(
  { a: { b: 123 } },
  insert(['a', 'c'], 'abc')
)
expectType<{ a: { b: number, c: string } }>(insertKey)

// expands an existing key
const expandKey = pipe(
  { a: { b: 123 } },
  insert(['a', 'b'], 'abc')
)
expectType<{ a: { b: string | number } }>(expandKey)

// appends a value to an array
const append = pipe(
  { a: [123] },
  insert(['a'], 456)
)
expectType<{ a: NonEmptyArray<number> }>(append)

// prepends a value to an array
const prepend = pipe(
  { a: [123] },
  insert(['a', 0], 456)
)
expectType<{ a: NonEmptyArray<number> }>(prepend)

// inserts a value into an array (optionally)
const insertAt = pipe(
  { a: [0, 1] },
  insert(['a', 1], 456)
)
expectType<O.Option<{ a: NonEmptyArray<number> }>>(insertAt)

