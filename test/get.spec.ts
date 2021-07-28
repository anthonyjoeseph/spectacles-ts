import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import * as Eq from 'fp-ts/Eq'
import * as O from 'fp-ts/Option'

import { get } from '../src'

interface A { b?: {c: number; d: string; e: boolean }[] }
interface B { b: 'other' }
interface Data { a: A | B }
declare const data: Data

const nested: O.Option<{
  c: number;
  d: string;
}> = pipe(
  data,
  get('a', (v): v is A => v.b === 'other', 'b?', 0, ['c', 'd'] as const)
)

/* const uncurried = get('a', 'b?', 0, ['c', 'e'] as const)({
  a: {
    b: [{ c: 123, e: true }]
  }
})
const polym: <Constructed extends {
  a: {
      b: unknown
  };
}>(c: Constructed) => 
  O.Option<AtPath<Constructed, ['a', 'b']>> = 
  get('a', 'b')
const inferredRetVal: Eq.Eq<{
  a: {
      b: string;
  };
}> = pipe(S.Eq, Eq.contramap(get('a', 'b'))) */