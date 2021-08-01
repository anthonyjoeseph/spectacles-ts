import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import * as Eq from 'fp-ts/Eq'
import * as O from 'fp-ts/Option'

import { get } from '../src'
import { data, A } from './shared'

const nested: O.Option<string> = pipe(
  data,
  get((v): v is A => v.type === 'A', 'a', 0, 'c', '1'),
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