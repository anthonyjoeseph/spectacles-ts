# immutable-ts - EXPERIMENTAL

```ts
import { prop } from 'immutable-ts'

interface Struct { 
  three?: { 
    four: string 
  } 
}
const full: Struct = {
  three: {
    four: '33'
  }
}
const nested = // <-- correctly inferred as 'string | undefined'
  prop(
    full
  )('?three', 'four') // <-- autocomplete for a variable # of fields
```

## Note

Currently the fn parameters are backwards (ideally they'd be data-last)

This is due to a limitation in typescript ([github issue](https://github.com/microsoft/TypeScript/issues/45174))

## TODO

- arg is function = refinements (is this possible?)
- separate 'immutable-ts/non-fp' module that uses `undefined` (rather than `Option`)
- `function set(...)`
- `function insert(...)`
- `function modify(...)`
- `function rename(...)`
- `function omit(...)`