import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import { rename } from '../src'

// rename a key
const renamed = pipe(
  { a: { old: 123, b: 'abc' } },
  rename(['a', 'old'], 'new')
)
renamed.a.new
expectType<{ a: { new: number, b: string } }>(renamed)
