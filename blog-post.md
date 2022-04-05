![Rose-Colored Spectacles](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9f6lyxcav4bct6ie2gum.png)

Do you want to love [immutable data](https://imfaber.me/javascript-functional-programming-immutability/) but think it's a drag?

Are you perplexed by the syntax of [immutability-helper](https://github.com/kolodny/immutability-helper)? Repulsed by [immer.js](https://immerjs.github.io/immer/produce#example)'s use of assignment? Alarmed by [lodash's](https://lodash.com/docs/4.17.15#set) lack of type safety?

Looking for something a little more intuitive, powerful & flexible? Clear up your data w/ `spectacles-ts` ([github repo](https://github.com/anthonyjoeseph/spectacles-ts))!

## Installation

```shell
yarn add fp-ts spectacles-ts
```

## Syntax (featuring [auto-complete](https://github.com/anthonyjoeseph/spectacles-ts/blob/main/readme-vid.gif)!)

```ts
import { pipe } from 'fp-ts/function'
import { set } from 'spectacles-ts'

const oldObj = { a: { b: 123 } }
const newObj = pipe(oldObj, set('a.b', 999))
// oldObj = { a: { b: 123 } }
// newObj = { a: { b: 999 } }
```

It's that simple!

## pipe

You might be wondering what that function called `pipe` is for

It can simplify the use of many nested functions

```ts
import { pipe } from 'fp-ts/function'

const manyfuncs = String(Math.floor(Number.parseFloat("123.456")));
const samething = pipe(
  "123.456",
  Number.parseFloat,
  Math.floor,
  String
);
```

It's a bit easier to read, and type-safe

At the end, I'll explain why `spectacles-ts` uses `pipe`

# Whats fp-ts

You might have noticed a few references to the npm package called [fp-ts](https://www.npmjs.com/package/fp-ts). It's the latest in the line of successon of data utility libraries for javascript

[underscore.js](https://underscorejs.org/) -> [lodash](https://lodash.com/) -> [ramda](https://ramdajs.com/) -> [fantasy land](https://github.com/fantasyland/fantasy-land) -> [fp-ts](https://github.com/gcanti/fp-ts)

`fp-ts` stands for 'functional programming in typescript'. 'Functional programming' just means that it helps with data transformations

Usually functions from `fp-ts` and its [libraries](https://gcanti.github.io/fp-ts/ecosystem/) (including `spectacles-ts`) rely on `pipe`

# What else can spectacles do

## Tuples

You can access the index of a tuple:

```ts
const tup = [123, 'abc'] as [number, string]
const getIndex: number = pipe(tup, set('[0]', 456))
// getIndex = [456, 'abc']
```

## Modification

You can modify a value in relation to its old value:

```ts
import { modify } from 'spectacles-ts'

const mod =
  pipe([{ a: 123 }], modify('[number].a', 0, a => a + 4))
// mod: { a: number }[]
// mod = [{ a: 127 }]
```

You can use this to e.g. append to an array:

```ts
import * as A from 'fp-ts/ReadonlyArray'

const app = pipe(
  { a: [123] },
  modify('a', A.append(456))
)
// app: { a: number[] }
// app = { a: [123, 456] }
```

You can even change a value's type this way:

```ts
import { modifyW } from 'spectacles-ts'
//             ^
//             |
// The 'W' stands for 'widen'
// as in 'widen the type'

const modW =
  pipe([{ a: 123 }, { a: 456 }], modifyW('[number].a', 0, a => `${a + 4}`))
// modW: { a: string | number }[]
// modW = [{ a: '127' }, { a: 456 }]
```

## Traversals

We can traverse an `Array` to collect its nested data

```ts
const a = pipe(
  [{ a: 123 }, { a: 456 }],
  set('[]>.a', 999)
)

// equivalent to:
const a2 = [{ a: 123 }, { a: 456 }].map(set('a', 999))

// a: { a: number }[]
// a2: { a: number }[]
// a = a2 = [{ a: 999 }, { a: 999 }]
```

We can also traverse a `Record`

```ts
const rec = 
  { two: { a: 456 }, one: { a: 123 } } as Record<string, { a: number }>
const a = pipe(rec, set('{}>.a', 999))
// a: Record<string, { a: number }>
// a = { one: { a: 999 }, two: { a: 999 } }
```

## Change Object types

You can change an existing key:

```ts
import { upsert } from 'spectacles-ts'

const obj = pipe(
  { a: { b: 123 } }, 
  upsert(['a', 'b'], 'abc')
)
// obj: { a: { b: string} }
// obj = { a: { b: 'abc' } }
```

Or add a new one:

```ts
const obj = pipe(
  { a: { b: 123 } }, 
  upsert(['a', 'c'], 'abc')
)
// obj: { a: { b: number; c: string } }
// obj = { a: { b: 123, c: 'abc' } }
```

Or remove one of them:

```ts
import { remove } from 'spectacles-ts'

const removedKeys = pipe(
  { nest: { a: 123, b: 'abc', c: false } }, 
  remove('nest.a')
)
// removedKeys: { nest: { b: string, c: boolean } }
// removedKeys = { nest: { b: 'abc', c: false } }
```

Or rename a key:

```ts
import { rename } from 'spectacles-ts'

const renamedKey = pipe(
  { nest: { a: 123 } }, 
  rename('nest', 'a', 'a2')
)
// renamedKey: { nest: { a2: number } }
// renamedKey = { nest: { a2: 123 } }
```

## Array access

We can do `Array` access using a `number` for the index:

```ts
const array: { a: number }[] = [{ a: 123 }]
const a = array[0].a
const a2 = pipe(array, get('[number].a', 0))
//                                       ^
//              The index '0' comes after the path string '[number].a'
```

Since `Array` access at a given index might fail, we use fp-ts's `Option` type

```ts
import * as O from 'fp-ts/Option'

//           |
//           v
const a2: O.Option<number> = pipe(array, get('[number].a', 0))
// a = O.some(123)
``` 

This also gives us a way to know when a 'set' call has failed, using `setOption`:

```ts
import { set, setOption } from 'spectacles-ts'

const silentSuccess = pipe([123], set('[number]', 0, 999))
const silentFailure = pipe([123], set('[number]', 1, 999))
// silentSuccess: number[]
// silentFailure: number[]
// silentSuccess = [999]
// silentFailure = [123]

const noisySuccess = pipe([123], setOption('[number]', 0, 999))
const noisyFailure: O.Option<number[]> = pipe([123], setOption('[number]', 1, 999))
// noisySuccess: O.Option<number[]>
// noisyFailure: O.Option<number[]>
// noisySuccess = O.some([999])
// noisyFailure = O.none
```

Also featuring [modifyOption](https://github.com/anthonyjoeseph/spectacles-ts#modifyoption) and [modifyOptionW](https://github.com/anthonyjoeseph/spectacles-ts#modifyoptionw)

# Whats Option

The `Option` type is a useful alternative to `undefined` because it can nest

Consider the following problem:

```ts
const usernames: (string | undefined)[] = ["anthony", undefined, "stu"]
const atindex = usernames[1]
// atindex = undefined
```

We know that `atindex` is `undefined`, but we don't know what that means 

It could be `undefined` because the user chose to remain anonymous. It could also be `undefined` because the user doesn't exist at all

`Option` gives us a way out

```ts
import { Option } from 'fp-ts/Option'
import { lookup } from 'fp-ts/ReadonlyArray' 
const usernames: Option<string>[] = [O.some("anthony"), O.none, O.some("stu")]
const atindex: Option<Option<string>> = pipe(usernames, lookup(1))
// atindex = O.some(O.none)
```

`atindex = O.some(O.none)` means that the user exists and is anonymous. `atindex = O.none` means that the user doesn't exist in the first place

For this reason `Option` should generally be used instead of `undefined`

The `Option` type is powerful, featuring a [full set of combinators](https://rlee.dev/practical-guide-to-fp-ts-part-2), far more so than `undefined`. They can `map` and `flatten`, just like arrays and objects

`Option` can be a great, simple intro into the joys of `fp-ts`

# OK what else can spectacles do with Option

## Nullables

You can access a [nullable value](https://www.typescriptlang.org/docs/handbook/advanced-types.html#nullable-types):

```ts
interface Obj { a?: { b: number } }
const obj: Obj = { a: { b: 123 } }
const a = pipe(a, get('a?.b'))
// a: O.Option<number>
// a = O.some(123)
```

## Other stuff

You can access a key of a record:

```ts
const rec = { a: 123 } as Record<string, number>
const getKey = pipe(rec, get('[string].a'))
// getKey: O.Option<number>
// getKey = O.some(123)
```

You can refine a discriminated union:

```ts
type Shape = { shape: "circle"; radius: number } | { shape: "rectangle"; width: number; height: number }
const refined = pipe(
   { shape: "circle"; radius: 123 } as Shape,
   get('shape:circle.radius')
)
// refined: O.Option<number>
// refined = O.some(123)
```

And there are [convenience](https://github.com/anthonyjoeseph/spectacles-ts#operations) operations for working with `Option` and [Either](https://rlee.dev/practical-guide-to-fp-ts-part-3) types

## get

You can `get` a value with similar syntax:

```ts
import { get } from 'spectacles-ts'

const num = pipe({ a: { b: 123 } }, get('a.b'))
// num: number
// num = 123

// equivalent to
const num2 = { a: { b: 123 } }.a.b
// num2: number
// num2 = 123
```

The [curried functions](https://javascript.info/currying-partials) from `spectacles-ts` fit in nicely w/ a functional style

That's one reason you might want to use a function like `get`:

```ts
const as = [{ a: 123 }].map(get('a'))
// as: number[]
// as = [123]
```

## `spectacles-ts` vs `monocle-ts`

`spectacles-ts` is built on top of [monocle-ts](https://github.com/gcanti/monocle-ts), which is more powerful and flexible but a little less ergonomic.

Here's a side-by-side comparison between the two.

```ts
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as Op from 'monocle-ts/lib/Optional'

const optional = pipe(
  Op.id<{ a: { b: readonly string[] } }>(),
  Op.prop('a'),
  Op.prop('b'),
  Op.index(0),
)

const nestedMonocle =
  optional.getOption({ a: { b: ['abc', 'def'] } })
// nestedMonocle: O.Option<string>
```

```ts
import { pipe } from 'fp-ts/function'
import { get } from 'spectacles-ts'

const nestedSpectacles = 
  pipe({ a : { b: ['abc', 'def'] } }, get('a.b.[number]', 0))
// nestedSpectacles: O.Option<string>
```

You can see the simplicity that `spectacles-ts` offers

monocle-ts has these advantages:
- `spectacles-ts` only works in piped contexts (except for [get](https://github.com/anthonyjoeseph/spectacles-ts/blob/main/tests/get.spec.ts#L39))
- No limitation on object size
- can [filter](https://github.com/gcanti/monocle-ts/blob/master/test/Lens.ts#L225) (similar to [es6's filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter))
- can traverse on any arbitrary traversable object (aka [Zippers](https://github.com/gcanti/fp-ts-contrib/blob/master/test/Zipper.ts) or [Rose Trees](https://github.com/gcanti/fp-ts/blob/master/test/Tree.ts))
- Can define an [isomorphism](https://github.com/gcanti/monocle-ts/blob/master/test/Iso.ts) between two objects
- works with the [Map](https://github.com/gcanti/monocle-ts/blob/master/test/Ix.ts) type


## Why use pipe for spectacles

Let's see what libraries that don't use `pipe` look like

```ts
import mapValues from 'lodash/mapValues'
import filter from 'lodash/filter'

const data: Record<string, number> = { a: 1, b: 2, c: 3 }

const ugly = filter(
  mapValues(data, (x) => x * 2),
  (x) => x > 2
)
// ugly = { b: 4, c: 6 }
```

This is a bit difficult to read. `mapValues` is nested inside `filter` - this could get messy if we add more functions. We can imagine that this might look much nicer if our data were an array - something like `data.map(x => ..).filter(x => ..)`. Is this possible with an object? 

```ts
import _ from 'lodash'

const chained = _.chain(data)
  .mapValues(x => x * 2)
  .filter(x => x > 1)
  .values()
// chained = { b: 4, c: 6 }
```

Much nicer! But this comes with a caveat - now we are importing all 600KB of lodash for two simple functions

`pipe` gives us the best of both worlds:

```ts
import { pipe } from 'fp-ts/function'
import { map, filter } from 'fp-ts/ReadonlyRecord'

const piped = pipe(
  data,
  map(x => x * 2),
  filter(x => x > 1)
)
// piped = { b: 4, c: 6 }
```

Legibility and economy - that's why we use `pipe` as much as possible

Here's a more in-depth article about [how pipe-able functions work](https://paulgray.net/pipeable-apis/). [Here's one of the original articles](https://medium.com/bootstart/why-using-chain-is-a-mistake-9bc1f80d51ba) motivating their use

## Conclusion

I hope spectacles-ts can help you modify data both immutably & ergonomically!

Follow me on twitter! [@typesafeFE](https://twitter.com/typesafeFE)

## Note

An earlier version of spectacles used tuples for pathnames instead of string literals. This document has been updated to reflect the changes

****

CREDITS:
Logo - [Stuart Leach](https://www.loveleach.com/)