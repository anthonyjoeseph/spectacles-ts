# immutable-ts - EXPERIMENTAL

```ts
import { pipe } from 'fp-ts'
import { prop } from 'immutable-ts'

declare const data: { a: {b?: {c: number; d: string; e: boolean }[] } }

const nested: Option<{ c: number; d: string }> = pipe(
  data, 
  prop('a', 'b?', 0, ['c', 'd'] as const)
)
```

## TODO

- add non-piped polymorphic `prop` overloads ([see here](https://github.com/gcanti/fp-ts/pull/1454#issuecomment-822622706))
- get rid of need for `as const` assertion in 'Pick' tuple
- refinements (is this possible?)
- separate 'immutable-ts/non-fp' module that uses `undefined` (rather than `Option`)
- `function set(...)`
- `function insert(...)`
- `function modify(...)`
- `function rename(...)`
- `function omit(...)`