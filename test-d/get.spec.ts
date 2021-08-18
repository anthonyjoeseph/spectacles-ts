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
expectType<number[]>(traverseArray)

// can traverse records
const traverseRecord = pipe(
  { a: [123], b: [456] } as Record<string, number[]>, 
  get('{}>', 0)
)
expectType<Record<string, number>>(traverseRecord)

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
expectType<Eq.Eq<{ a: { b: string } }>>(infersEq)

const infersOptionalEq = pipe(
  O.getEq(StringEq),
  Eq.contramap(get('a', 'b', '?'))
)
expectType<Eq.Eq<{ a: { b: string | undefined | null } }>>(infersOptionalEq)

expectError<Eq.Eq<{ a: { b: string | undefined | null } }>>(pipe(
  StringEq,
  Eq.contramap(get('a', 'b', '?'))
))

expectError<Eq.Eq<{ a: { b: string } }>>(pipe(
  O.getEq(StringEq),
  Eq.contramap(get('a', 'b'))
))

// reference:
// https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcAMq58hEuSp1G1SjCjA2AcwFDo8cVLgBRAI7yCxUhRr0mFgfzQAPYfA68NyfGDgAvHAAPPxwcAAKEjAAFnBuMGhsACbSANZoAJ4QOHAAkmw4aFDxrokp0mxoAG7FcAD8cBpaunAAXHAZ2bkFRVAANHBh+YXF-cMASmgw-AB8ABRg0TEdUbEAlIGzcPPzEAwAVh1IANoA0nDakcsAuh3saWwQAO5sWJsB2-sHJ0uxN5sTMMHk9XqVyqk4FMZuFwo1ghEILRMuCkpDTmlLm81jE7nAQS83pgFt9VkjMh9tojkSccTchrD2jthozSZ0sjkRn1URU4FVaiVGhisdd-h1oVgmb1iiy4JTRXEEmj0hyeqNBVzirTbkzofx+F42D43ABGQLIVBoeYyAB0FkGFhths0EhAEjAiz88yIbFdaCI60DcGo1FKJo6FmCSF9IDQHWa2h0WFmBu88DcACZzWAvT6-QHg6HMx0EeSeei+X77mxHoTk3tDmTkfLqZkTnnY0QbqmjenXABmbOW+YIGNxuD9zCDHMQD0d-1BkOSFgwCBecC0aYYHDQYhj5w942uAAsQ-Q83bO4gXck0kNGmnuYADAHNku3MeOgAiK9foA