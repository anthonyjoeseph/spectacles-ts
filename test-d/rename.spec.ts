import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import { rename } from '../src'

// rename a key
const renamed = pipe(
  { a: { oldKey: 123, b: 'abc' } },
  rename(['a', 'oldKey'], 'newKey')
)

expectType<{ a: { b: string } & { readonly newKey: number } }>(renamed)
