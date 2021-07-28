import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import * as Eq from 'fp-ts/Eq'
import * as O from 'fp-ts/Option'

import { get } from '../src'
import type { AtPath } from '../src/types'
import { data } from './shared'

const piped = pipe(
  data,
  get('a', 'b?', 0, ['c', 'e'] as const)
)
const uncurried = get('a', 'b?', 0, ['c', 'e'] as const)({
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
}> = pipe(S.Eq, Eq.contramap(get('a', 'b')))