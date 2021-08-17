# glasses-ts - EXPERIMENTAL

Practical Optics. Unfancy monocles

A facade on top of [monocle-ts](https://github.com/gcanti/monocle-ts) 

![prop video](readme-vid.gif)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Examples](#examples)
  - [`get`](#get)
  - [`set`](#set)
  - [`modify`](#modify)
  - [`modifyOption`](#modifyoption)
  - [`insert`](#insert)
- [TODO](#todo)
- [TSC Issues](#tsc-issues)
<!-- AUTO-GENERATED-CONTENT:END -->

## Examples

### `get`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gP5oAHsLwwGwwaFA4JhwYAIKI-HCiEmgAXMTRAgkmqe68ADwI8QlwHKkA2mwsIAxhADRwlDBQwQDmdQwQEI4mbAC6hQkAJqkNTWzNpX1FcClw7Z1o3YWYAHz8mL4BBnDBoeGRGABCUuLoqUQHRFgbgYmSACImMCZwALxwsQA+cAf8A2gOJigGA4vAacAGjyycAeT34-BBbDBEDkHi8r2QqDQAApCrIAHTAAa5GEmZZYgCUNVxYDxOGAtF2WKxADdyalmdtzLEXss4My8ScMABCF5vIjpSnUvFgfBgLFEExESUJfGUAhoKkqmky5HyjhKzUWPEg-RsNAhLEARkl5LhCLBZoaaCGFh0uRGLV5b2ROi8eOaaBgOTYWIhT3JQA)

```ts
import { pipe } from 'fp-ts/function'
import type { Option } from 'fp-ts/Option'
import { get } from 'immutable-ts'

export interface A {
  type: 'A'
  a: O.Option<{
    c: [number, string, boolean]
    d: string[]
    e: boolean
  }>
}
export interface B { type: 'B' }
export type Data = A | B
declare const data: Data

const nested: O.Option<string> = pipe(
  data,
  get((v): v is A => v.type === 'A', 'a', '?some', 'c', '1')
)

const polymorphicFn = get((v): v is A => v.type === 'A', 'a', '?some', 'c', '1')
const polymorphicVal: O.Option<string> = polymorphicFn(data)

const pick: { b: number; d: boolean } = pipe(
  { a: { b: 123, c: 'abc', d: false } },
  get('a', ['b', 'd'])
)
```

### `set`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcADK58hIiF4QOtNBRr0mMtG0oDBbGGig4JHDABEJMCYkkAuBw2dsWIBqaxZ+AEzQ1CSgMDl5KeD9bCWcbO35+MP14dX04AF5kVDQACn44WQA6YD8AHjiJAD4cgEoAGnyisHwwHKIJInrGmULmiFaiBk6GmoSkiLgvPQBlNBhY6Iy4VMpCyjmcsgBGACYAZhqcqLsaoA)

[immutability-helper equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAVzAEwIYwKZwGZQiOAclBARlQCNgAbYGATwFoALDasDKQgKG+ADtMUbKgDGWACLpUcAN5xUALjlwKy-ghAVOcAL57uyDKOqooWURH4BneGnLKp5XpZvx+GWxmSPpcALyIKOgYABT2qAA0ctxwCsqysXGqCUnJcAAk1hgwyowAjABMAMxpBnG63LoAlEA)

```ts
import { pipe } from 'fp-ts/function'
import { set } from 'immutable-ts'

const beenSet: { a: { b: number } } = pipe(
  { a: { b: 123 } },
  set(['a', 'b'], -123)
)
```

### `modify`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcADK58hIiF4QOtNBRr0mMtG0oCh0eOKlwAkvILFSmuo2rmAJnu4wAngMFsYaKDgkODAARCRgJREkALkiGGLYWEAY-LCx+FzUJKAwOXkp4JzCJGNDw-n5c-XgIMG5eCVo4AF5kVDQACn44WQA6YCcAHlKJAD52gEoAGi7esHwwdqIJIimZmR65msWGFenx8sr8uGUnYBxgNCcSoubW9E7umrq2Bsm4NZ6Ts-d2gCtmkZwf4AajgABYpu9uuYehIFoVwvtxkA)

[immutability-helper equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAVzAEwIYwKZwGZQiOAclBARlQCNgAbYGATwFoALDasDKQgKG+ADtMUbKgDGWACLpUcAN5xUALjlwKy-ghAVOcAL57uyDKOqooWURH4BneGnLKp5XpZvx+GWxmSPpcALyIKOgYABT2qAA0ctxwCsqysXGqCUnJcAAkqGBg1PTKoQBWAJQBAHxwhXAA1HAALGkGcbrcusVAA)

```ts
import { pipe } from 'fp-ts/function'
import { set } from 'immutable-ts'

const modified: { a: { b: number } } = pipe(
  { a: { b: 123 } },
  modify(['a', 'b'], (j) => j + 4)
)
```

### `modifyOption`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gKEG4xszgASSsVUmcNJiCAEzQ2bnEBQXi0KBwTDgwAERMYEykTAC44KDQTaN5aMSkGYrYWEAZUrABtAF0sfn4OXkp4CDkPLzgAXmRUNAAKfjgLADpgaIAeHLyAPkmASgAaGfmwfDBJohMiHb3ZBbZYgA9JgAZz2cuDgeOGM93NrtiHE1K4D02H04NFckU4KsTF0gSDbNFgDgxNo0NFiu5eCtwWtRuN0NNZgMdF5tnALmA5vDEcjBrxJgArUY4xkAajgABYdmTZkE5iYjmC8t9NkA)

```ts
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { set } from 'immutable-ts'

const modifyOpted: O.Option<{ a: { b: number }[] }> = pipe(
  { a: [{ b: 123 }] },
  modifyOption(['a', 0, 'b'], (j) => j + 4)
)
```

### `insert`

[immutability-helper equivalents](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAVzAEwIYwKZwGZQiOAclBARlQCNgAbYGATwFoALDasDKQgKG4GMIAOwDO8YCM4wA0hnpwAvHG5xEKdBgAUylXADecVAC49cCsYCMAJgDMcAL72ANNpX6XOo3A2oAlAoB8XrruOnAAdBGozqGhfMaElHw8MfY+7nbaafxCogZgHILICkoqSGiYWqH6ngDaVtYAuk7uwSmerSlwACRgCMLMxjUALACsAGwN0TEZoTNwWQIi8GBQGAVFitpl6pU61YP1TXZTriEGxt5+8oHD447hkQ3pmbyLueLCkgCC8JulahUWuc4HV7pZ7tZ7kN7iN7hNmlUzu0ziohsYOp1up8YMZRmMUfYznMVHMfEA)

```ts
import { pipe } from 'fp-ts/function'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import type { Option } from 'fp-ts/Option'
import { insert } from 'immutable-ts'

const insertKey: { a: { b: number; c: string } } = pipe(
  { a: { b: 123 } },
  insert(['a', 'c'], 'abc')
)

const expandKey: { a: { b: number | string } } = pipe(
  { a: { b: 123 } },
  insert(['a', 'b'], 'abc')
)

const append: { a: NonEmptyArray<number> } = pipe(
  { a: [123] },
  insert(['a'], 456)
)

const prepend: { a: NonEmptyArray<number> } = pipe(
  { a: [123] },
  insert(['a', 0], 456)
)

const insertAt: Option<{ a: NonEmptyArray<number> }> = pipe(
  { a: [1, 2, 3, 4, 5, 6] },
  insert(['a', 4], 456)
)
```

## Operations

| usage &nbsp; &nbsp; &nbsp;  | equals | Optional | monocle |
|------|-----|-------|-------|
| `get('a')(x)`| `123` | no | `prop` |
| `get(['a', 'b'])(x)` | `{ a: 1, b: 2 }` | no | `props` |
| `get('c', '0')(x)`| `123` | no | `component`
| `get('d', 0)(x)`| `O.some({ e: 123 })` | yes | `index`
| `get('f', '?key', 'a')(x)` | `O.some([123])` | yes | `key` |
| `get('g', '?')(x)` | `O.some(2)` | yes | `fromNullable` |
| `get('h', '?some')(x)` | `O.some(2)` | yes | `some`
| `get('i', '?left')(x)`| `O.none` | yes | `left`
| `get('i', '?right')(x)`| `O.some(2)` | yes | `right`
| `get('j', (a): a is number => typeof a === 'number')(x)`| `O.some(2)` | yes | `filter`
| `get('d', '[]>', 'e')(x)` | `[123, 456]` | never | `traverse`<br />`Array` |
| `get('f', '{}>', 0)(x)` | `{ a: 123, b: 456 }` | never | `traverse`<br />`Record` |


Assuming:

```ts
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
interface Data {
  a: number
  b: number
  c: [number, string]
  d: { e: number }[]
  f: Record<string, number[]>
  g?: number
  h: O.Option<number>
  i: E.Either<string, number>
  j: number | string
}
const x: Data = {
  a: 1,
  b: 2,
  c: [123, 'abc'],
  d: [{ e: 123 }, { e: 456 }],
  f: { a: [123], b: [456] },
  g: 2,
  h: O.some(2),
  i: E.right(2),
  j: 2
}
```
## TODO

- Build:
  - preserve `readonly` fields & arrays
  - `{}>` traversals
  - Infer constructed value from return type (e.g. for building `Eq` instances)

## TSC Issues

- [Restrict the intellisense/auto completion of mapped tuples depending on the first element of the tuple](https://github.com/microsoft/TypeScript/issues/43824)
- [Increase type instantiation depth limit](https://github.com/microsoft/TypeScript/pull/45025) (maybe would help some cases?)

## [Alternative Names + discussion](NAMES.md)
