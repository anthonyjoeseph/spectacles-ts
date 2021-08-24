import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

import { set, modify, modifyOption, modifyW, upsert,  } from '../src'

const setDeep = pipe(
  { a: { b: { c: { d: { e: {
    f: { g: { h: { i: { j: {k: { l: 123 } } } } } }
  } } } } } },
  modify(
    ['a', 'b', 'c', 'd'],
    modify(
      ['e', 'f', 'g', 'h'],
      modify(
        ['i', 'j', 'k'],
        set(['l'], 321)
      )
    )
  )
)
expectType<{ a: { b: { c: { d: { e: {
  f: { g: { h: { i: { j: {k: { l: number } } } } } }
} } } } } }>(setDeep)

const modifyOptionDeep = pipe(
  { a: { b: { c: O.some({ d: 123 }) } } },
  modifyOption(
    ['a', 'b', 'c', '?some'],
    set(['d'], 321)
  )
)
expectType<O.Option<{
  a: { b: { c: O.Option<{ d: number }> } } 
}>>(modifyOptionDeep)

const upsertDeep = pipe(
  { a: { b: { c: { d: { e: 123 } } } } },
  modifyW(
    ['a', 'b', 'c', 'd'],
    val => pipe(
      val,
      upsert(['e2'], 'abc')
    )
  )
)
expectType<{ a: { b: { c: { d:
  { e: number} & { readonly e2: string } 
} } } }>(upsertDeep)