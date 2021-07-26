# immutable-ts - EXPERIMENTAL

```ts
import { prop } from 'immutable-ts'

const full: {
  a?: {
    one: boolean
    two: string
    three: number
  }[],
  b: number
} = {a:[{one: true,two: 'abc',three: 123}],b:2}

const nested: Option<{
  one: boolean;
  three: number
}> = prop(full)('a?', 0, ['one', 'three'])
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