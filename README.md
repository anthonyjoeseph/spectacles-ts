# immutable-ts - EXPERIMENTAL

```ts
import { pipe } from 'fp-ts'
import { prop } from 'immutable-ts'

const nested: Option<{ a: number; b: string }> = pipe(
  { c: [{a: 123, b: 'abc', c: false}] }, 
  prop('c', 0, ['a', 'b'] as const)
)
```

## TODO

- refinements (is this possible?)
- separate 'immutable-ts/non-fp' module that uses `undefined` (rather than `Option`)
- `function set(...)`
- `function insert(...)`
- `function modify(...)`
- `function rename(...)`
- `function omit(...)`