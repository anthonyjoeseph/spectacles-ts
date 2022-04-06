# spectacles-ts 👓
 
Practical Optics • Unfancy monocle-ts 🧐

A facade on top of [monocle-ts](https://github.com/gcanti/monocle-ts) 

[Blog post](https://dev.to/anthonyjoeseph/simple-immutable-data-w-spectacles-4nb5)

[Try it out!](https://codesandbox.io/s/spectacles-ts-experiments-krc1x9?file=/src/experiments.ts)

![prop video](readme-vid.gif)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Installation](#installation)
- [Examples](#examples)
  - [`get`](#get)
  - [`set`](#set)
  - [`setOption`](#setoption)
  - [`upsert`](#upsert)
  - [`remove`](#remove)
  - [`rename`](#rename)
  - [`modify`](#modify)
  - [`modifyOption`](#modifyoption)
  - [`modifyW`](#modifyw)
  - [`modifyOptionW`](#modifyoptionw)
  - [`modifyF`](#modifyf)
- [Operations](#operations)
- [Social Media](#social-media)
<!-- AUTO-GENERATED-CONTENT:END -->

## Installation

```shell
yarn add fp-ts spectacles-ts
```

## Examples

### `get`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gP4deleAg5Dy84AF5kVDQACn44CwA6YAATAB4kEwAuKQZsqDQTZN5aMTgAqGA2AHMAbQBdRUwAPmiASgAaOMSwfDBoohMiDq7ZBJ6g-oYhzvjRyuS0AA9ogAZh1v5ff3g2NAC0ZOz3XlTyyqqm8LggnS8EqrQYY7ZojOykXLgagYYOInbiAscEQGthMK0gA)

```ts
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { get } from 'spectacles-ts'

const gotten = pipe(
  { a: { b: ['abc', 'def'] } },
  get('a.b.[number]', 0)
)
// gotten: O.Option<string>
```

### `set`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcAPK58hEuSp1G1GWG68BQ6PHFTZYeQWIheEDrTQUa9Jhq1sJtAYLYw0UHBI4YAIhIwEoiSAFxwUGgSACa8tACecJQwUMBsAOYA2gC6WPwxaFYSUXAcvClwMUESEYHB-PzlbJXVwRpwALzIqGgAFPxwRgB0wDEAPPUSAHx9AJQANIMjYPhgfUQSRIvLGqNshQAefQCMO3ONzZUMaGhsAMpoMHU1XVU1e5RPG4cJAF7bPptCRzIA)

[immutability-helper equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAVzAEwIYwKZwGZQiOAclBARlQCNgAbYGATwFoALDasDKQgKG+ADtMUbKgDGWACLpUcAN5xUALjlwKy-ghAVOcAL57uyDKOqooWURH4BneGnLKp5XpZvx+GWxmSPpcALyIKOgYABT2qAA0ctxwCsqysXGqCUnJcAAk1hgwyowAjABMAMxpBnG63LoAlEA)

```ts
import { pipe } from 'fp-ts/function'
import { set } from 'spectacles-ts'

const beenSet = pipe(
  { a: ['abc', 'def'] },
  set('a.[number]', 1, 'xyz')
)
// beenSet: { a: string[] }
```

### `setOption`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcAPK58hEuSp1G1GWG68BQ6PHFTZYeQWIheEDrTQUa9Jhq1sJtAYLYw0UHBI4YAIhIwEoiSAFxwUGgSACa8tACecJQwUMBsAOYA2gC6WPwxaFYSUXAcvClwMUESEYHB-PzlbJWUaDD1IQC8yKhoABT8cEYAdMAxADydAHz9AJQANEOjYPhg-UQSRIvLGmNshQAe-QCMO8N7bTCOPGwbhwkAXtv8c43NlQxoaGwAyu0RGQjG68KY1aZwHpXTr9arBOZAA)

```ts
import { pipe } from 'fp-ts/function'
import { setOption } from 'spectacles-ts'

const setOptioned = pipe(
  { a: ['abc', 'def'] },
  setOption('a.[number]', 1, 'xyz')
)
// setOptioned: O.Option<{ a: string[] }>
```

### `upsert`

[immutability-helper equivalents](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAVzAEwIYwKZwGZQiOAclBARlQCNgAbYGATwFoALDasDKQgKG4GMIAOwDO8YCM4wA0hnpwAvHG5xEKdBgAUylXADecVAC49cCsYCMAJgDMcAL72ANNpX6XOo3A2oAlAoB8XrruOnAAdBGozqGhfMaElHw8MfY+7nbaaUA)

```ts
import { pipe } from 'fp-ts/function'
import { upsert } from 'spectacles-ts'

const upserted = pipe(
  { a: { b: 123 } },
  upsert('a', 'c', 'abc')
)
// upserted: { a: { b: number; readonly c: string } }
```

### `remove`

```ts
import { pipe } from 'fp-ts/function'
import { remove } from 'spectacles-ts'

const removed = pipe(
  { a: { b: 123, c: false } },
  remove('a.c')
)
// removed: { a: { b: number } }
```

### `rename`

```ts
import { pipe } from 'fp-ts/function'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import type { Option } from 'fp-ts/Option'
import { rename } from 'spectacles-ts'

const renamed = pipe(
  { a: { b: 123, c: 'abc' } },
  rename('a.c', 'd')
)
// renamed: { a: { b: number; readonly d: string } }
```

### `modify`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcADK58hIiF4QOtNBRr0mMtG0oCh0eOKlwAkvILFSmuo2rmAJnu4wAngMFsYaKDgkODAARCRgJREkALkiGGLYWEAY-LCx+FzUJKAwOXkp4JzCJGNDw-n5c-XgIMG5eCVo4AF5kVDQACn44WQA6YCcAHlKJAD52gEoAGi7esHwwdqIJIimZmR65msWGFenx8sr8uGUnYBxgNCcSoubW9E7umrq2Bsm4NZ6Ts-d2gCtmkZwf4AajgABYpu9uuYehIFoVwvtxkA)

[immutability-helper equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gKEG4xszgASSsVUmcNJiCAEzQ2bnEBQXi0KBwTDgwAERMYEykTAC44KDQTaN5aMSkGYrYWEAZUrABtAF0sfn4OXkp4CDkPLzgAXmRUNAAKfjgLADpgaIAeHLyAPkmASgAaGfmwfDBJohMiHb3ZBbZYgA9JgAZz2cuDgeOGM93NrtiHE1K4D02H04NFckU4KsTF0gSDbNFgDhgGhosUoaNxuhprMBjovNs4BcwHN4YixJMAFajNZwKkAajgABYdoTZkE5iYjmC8t9NkA)

```ts
import { pipe } from 'fp-ts/function'
import { modify } from 'spectacles-ts'

const modified = pipe(
  { a: [{ b: 123 }] },
  modify('a.[number].b', 0, (j) => j + 4)
)
// modified: { a: { b: number }[] }
```

### `modifyOption`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gKEG4xszgASSsVUmcNJiCAEzQ2bnEBQXi0KBwTDgwAERMYEykTAC44KDQTaN5aMSkGYrYWEAZUrABtAF0sfn4OXkp4CDkPLzgAXmRUNAAKfjgLADpgaIAeHLyAPkmASgAaGfmwfDBJohMiHb3ZBbZYgA9JgAZz2cuDgeOGM93NrtiHE1K4D02H04NFckU4KsTF0gSDbNFgDgxNo0NFiu5eCtwWtRuN0NNZgMdF5tnALmA5vDEcjBrxJgArUY4xkAajgABYdmTZkE5iYjmC8t9NkA)

```ts
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { modifyOption } from 'spectacles-ts'

const modifyOptioned = pipe(
  { a: [{ b: 123 }] },
  modifyOption('a.[number].b', 0, (j) => j + 4)
)
// modifyOptioned: O.Option<{ a: { b: number }[] }>
```

### `modifyW`

```ts
import { pipe } from 'fp-ts/function'
import { modifyW } from 'spectacles-ts'

const modifyWidened = pipe(
  { a: 123 } as { a: number | undefined },
  modifyW('a?', (j) => `${j + 2}`)
)
// modifyWidened: { a: string | undefined }
```

### `modifyOptionW`

```ts
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { modifyOptionW } from 'spectacles-ts'

const modifyOptionWidened = pipe(
  { a: 123 } as { a: number | undefined },
  modifyOptionW('a?', (j) => `${j + 2}`)
)
// modifyOptionWidened: O.Option<{ a: string | undefined }>
```

### `modifyF`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcAKK58hEuSrUZwGAAs0UAUOjxxUuABl5BYiF4QOtNBRr0mxtG0q7w+sZOkBJM4tJ7OkZqHwATF24YAE8BQTYYbRwJDgwAEQkYCURJAC4chny2FhAGbSwsfgibCSgMDl5KeDDMiXyMrP5+Btd4CDBuXglaOABeZFQ0AAp+OBMAOmAwgB4OiQA+KYBKABpZhbB8MCmiCSJd-eN5w-6ThnO9ra6eprhLMOAcYDQw-Jl5tSabTLJpQYBsADmOzga3WYwm6Bmc36gzYw2hl3m70+0QAYlN-rj2FxoFsplMAFZbMZwilwOEARgADHAAPyyea2HAwE7JYC0c5wP7zMEQjQ8ulkODMrYXOY+eYSY4tLJPLZAA)

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { modifyF } from 'spectacles-ts'

const modifieFunctored = pipe(
  { a: { b: 123 } },
  modifyF(E.Applicative)(
    'a.b',
    (j) => j > 10 ? E.left<string, never>('fail') : E.right(j - 10)
  )
)
// modifieFunctored: E.Either<string, { a: { b: number } }>
```

## Operations

| usage &nbsp; &nbsp; &nbsp;  | equals | Optional | monocle |
|------|-----|-------|-------|
| `get('a')(x)`| `1` | no | [prop](https://github.com/gcanti/monocle-ts/blob/master/test/Lens.ts#L89) |
| `get('c.[0]')(x)`| `123` | no | [component](https://github.com/gcanti/monocle-ts/blob/master/test/Lens.ts#L119)
| `get('d.[number]', 0)(x)`| `O.some({ e: 123 })` | yes | [index](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L107)
| `get('f.[string]', 'a')(x)` | `O.some([123])` | yes | [key](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L133) |
| `get('g?')(x)` | `O.some(2)` | yes | [fromNullable](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L223) |
| `get('h.?some')(x)` | `O.some(2)` | yes | [some](https://github.com/gcanti/monocle-ts/blob/master/src/Optional.ts#L287)
| `get('i.?left')(x)`| `O.none` | yes | [left](https://github.com/gcanti/monocle-ts/blob/master/test/Prism.ts#L200)
| `get('i.?right')(x)`| `O.some(2)` | yes | [right](https://github.com/gcanti/monocle-ts/blob/master/test/Prism.ts#L192)
| `get('j.shape:circle.radius')(x)`| `O.some(100)` | yes | [filter](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L160)
| `get('d.[]>.e')(x)` | `[123, 456]` | never | [traverse](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L215)<br />`Array` |
| `get('f.{}>.e')(x)` | `[123, 456]` | never | `traverse`<br />`Record`<br/> (keys sorted alpha-<br/>betically) |

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
  j: { shape: "circle"; radius: number } | { shape: "rectangle"; width: number; height: number }
}
const x: Data = {
  a: 1,
  b: 2,
  c: [123, 'abc'],
  d: [{ e: 123 }, { e: 456 }],
  f: { b: { e: 456 }, a: { e: 123 } },
  g: 2,
  h: O.some(2),
  i: E.right(2),
  j: { shape: "circle", radius: 100 }
}
```

## Social Media

Follow me on twitter! [@typesafeFE](https://twitter.com/typesafeFE)