import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { get } from '../src'
import { data, A, B, simpleData } from '../tests/shared'

// gets a definite value
const definite = pipe(simpleData, get('a', 'b', '1'))
expectType<string>(definite)

// can pick
const picked = pipe(simpleData, get('a', ['c', 'd']))
expectType<{ c: string; d: boolean }>(picked)

// can traverse
const traverse = pipe([{a: 123}, {a: 456}], get('[]>', 'a'))
expectType<number[]>(traverse)

// has checked record access
const record = { a: 123 } as Record<string, number>
const picked2 = pipe(record, get('?key', 'b'))
expectType<O.Option<number>>(picked2)

// gets an optional value
const optional: O.Option<string> = pipe(
  data,
  get((v): v is A => v.type === 'A', 'a', '?some', 'c', '1')
)
expectType<O.Option<string>>(optional)

// gets an optional value - unpiped
const func = get((v: A | B): v is A => v.type === 'A', 'a', '?some', 'c', '0')
const optional2 = func(data)
expectType<O.Option<number>>(optional2)
