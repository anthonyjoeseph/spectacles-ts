# immutable-ts

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