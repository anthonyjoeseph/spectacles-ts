import { expectType, expectError } from 'tsd'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Eq from 'fp-ts/Eq'
import { Eq as StringEq } from 'fp-ts/string'
import { get } from '../src'
import { data, A, B, simpleData } from '../tests/shared'

// gets a definite value
const definite = pipe(simpleData, get('a', 'b', '1'))
expectType<string>(definite)

// can pick
const picked = pipe(simpleData, get('a', ['c', 'd']))
expectType<{ c: string; d: boolean }>(picked)

// has checked record access
const record = { a: 123 } as Record<string, number>
const picked2 = pipe(record, get('?key', 'b'))
expectType<O.Option<number>>(picked2)

// can traverse arrays
const traverseArray = pipe([{a: 123}, {a: 456}], get('[]>', 'a'))
expectType<readonly number[]>(traverseArray)

// can traverse records
const traverseRecord = pipe(
  { a: [123], b: [456] } as Record<string, number[]>, 
  get('{}>', 0)
)
expectType<readonly number[]>(traverseRecord)

// gets an optional value
const optional = pipe(
  data,
  get((v): v is A => v.type === 'A', 'a', '?some', 'c', '1')
)
expectType<O.Option<string>>(optional)

// gets an optional value - unpiped
const func = get((v: A | B): v is A => v.type === 'A', 'a', '?some', 'c', '0')
const optional2 = func(data)
expectType<O.Option<number>>(optional2)

const readonlyArr = pipe(
  [123, 456] as readonly number[],
  get(0)
)
expectType<O.Option<number>>(readonlyArr)

const infersEq = pipe(
  StringEq,
  Eq.contramap(get('a', 'b'))
)
expectType<Eq.Eq<{ readonly a: { readonly b: string } }>>(infersEq)

const infersOptionalEq = pipe(
  O.getEq(StringEq),
  Eq.contramap(get('a', 'b', '?'))
)
expectType<Eq.Eq<{ readonly a: { readonly b: string | undefined | null } }>>(infersOptionalEq)

expectError<Eq.Eq<{ a: { b: string | undefined | null } }>>(pipe(
  StringEq,
  Eq.contramap(get('a', 'b', '?'))
))

expectError<Eq.Eq<{ a: { b: string } }>>(pipe(
  O.getEq(StringEq),
  Eq.contramap(get('a', 'b'))
))
