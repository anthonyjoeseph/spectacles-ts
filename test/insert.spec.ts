import { pipe } from 'fp-ts/function'
import type { Option } from 'fp-ts/Option'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { insert } from '../src'

const insertKey: { a: { b: number; c: string } } = 
  pipe(
    { a: { b: 123 } },
    insert(['a', 'c'], 'abc')
  )
 
const append: { a: NonEmptyArray<number> } = 
  pipe(
    { a: [123] },
    insert(['a'], 456)
  )

const prepend: { a: NonEmptyArray<number> } = 
  pipe(
    { a: [123] },
    insert(['a', 0], 456)
  )

const insertAt: Option<{ a: NonEmptyArray<number> }> = 
  pipe(
    { a: [1, 2, 3, 4, 5, 6] },
    insert(['a', 4], 456)
  )