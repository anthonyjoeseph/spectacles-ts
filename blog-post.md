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

[Try it out here!](https://codesandbox.io/s/spectacles-ts-experiments-krc1x9?file=/src/experiments.ts)

(For more info on  `pipe` and `fp-ts`, check out the appendix)

## Nullables

You can set a [nullable value](https://www.typescriptlang.org/docs/handbook/advanced-types.html#nullable-types) using a `?`, similar to [optional chaining syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) in native js:

```ts
interface Obj { a?: { b: number } }
const obj: Obj = { a: { b: 123 } }
const a = pipe(a, set('a?.b', 456))
// a = { a: { b: 456 } }
```

## Tuples

You can change at an index of a tuple:

```ts
const tup = [123, 'abc'] as const
const getIndex = pipe(tup, set('[0]', 456))
// getIndex = [456, 'abc']
```

(Here are quick guides if you're unfamiliar with [tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types) or [`as const` assertions](https://www.benmvp.com/blog/use-cases-typescript-const-assertions/))

## Discriminated Union

You can refine a discriminated union:

```ts
type Shape = { shape: "circle"; radius: number } | { shape: "rectangle"; width: number; height: number }
const shape: Shape = { shape: "circle"; radius: 123 }
const refined = pipe(shape, set('shape:circle.radius', 456))
// refined = { shape: "circle"; radius: 456 }
```

(If you're not sure what a discriminated union is, [here's a quick intro](https://basarat.gitbook.io/typescript/type-system/discriminated-unions))

## Traversals

We can traverse an `Array` to change its nested data

```ts
const a = pipe(
  [{ a: 123 }, { a: 456 }],
  set('[]>.a', 999)
)

// equivalent to:
const a2 = [{ a: 123 }, { a: 456 }].map(set('a', 999))

// a = a2 = [{ a: 999 }, { a: 999 }]
```

We can also traverse a `Record`

```ts
const rec: Record<string, { a: number }> = 
  { two: { a: 456 }, one: { a: 123 } }
const a = pipe(rec, set('{}>.a', 999))
// a = { one: { a: 999 }, two: { a: 999 } }
```


## Indexed Arrays

We can change the value of an `Array` at a particular index using `[number]`. To preserve auto-complete, we have to pass in the index `number` as a separate argument:

```ts
const array: { a: number }[] = [{ a: 123 }]
const a2 = pipe(array, set('[number].a', 0, 456))
//                                       ^
//              The index '0' comes after the path string '[number].a'
```

Each 'index' in a path gets its own value argument

```ts
const nestedArray = [[], [{ a: 123 }]]
const a2 = pipe(nestedArray, set('[number].[number].a', 1, 0, 456))
//                                                ^  ^
//                         Similar to nestedArray[1][0].a
```

You can set the value at an index of a Record in a similar way

```ts
const rec: Record<string, number> = { a: 123 }
const setKey = pipe(rec, set('[string]', 'a', 456))
// setKey = { a: 456 }
```

## Modification

You can modify a value in relation to its old value:

```ts
import { modify } from 'spectacles-ts'

const mod =
  pipe({ a: { b: 123 } }, modify('a.b', a => a + 4))
// mod: { a: { b: number } }
// mod = { a: { b: 127 } }
```

You can use this to e.g. append to an array

```ts
import * as A from 'fp-ts/ReadonlyArray'

const app = pipe(
  { a: [123] },
  modify('a', A.append(456))
)
// app: { a: number[] }
// app = { a: [123, 456] }
```

(For more on fp-ts, check out the appendix)

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

And there are [convenience](https://github.com/anthonyjoeseph/spectacles-ts#operations) operations for working with `Option` and [Either](https://rlee.dev/practical-guide-to-fp-ts-part-3) types

## Change Object types

You can change an existing key:

```ts
import { upsert } from 'spectacles-ts'

const obj = pipe(
  { a: { b: 123 } }, 
  upsert('a', 'b', 'abc')
)
// obj: { a: { b: string} }
// obj = { a: { b: 'abc' } }
```

Or add a new one:

```ts
const obj = pipe(
  { a: { b: 123 } }, 
  upsert('a', 'c', 'abc')
)
// obj: { a: { b: number; c: string } }
// obj = { a: { b: 123, c: 'abc' } }
```

Or remove one of them:

```ts
import { remove } from 'spectacles-ts'

const removedKey = pipe(
  { nest: { a: 123, b: 'abc', c: false } }, 
  remove('nest.a')
)
// removedKey: { nest: { b: string, c: boolean } }
// removedKey = { nest: { b: 'abc', c: false } }
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

## get

You can also `get` a value

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

## Option

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

(In case the `Option` type is unfamiliar, check out the appendix for a bit more info)

Also featuring [modifyOption](https://github.com/anthonyjoeseph/spectacles-ts#modifyoption) and [modifyOptionW](https://github.com/anthonyjoeseph/spectacles-ts#modifyoptionw)

## Conclusion

I hope spectacles-ts can help you modify data both immutably & ergonomically!

Follow me on twitter! [@typesafeFE](https://twitter.com/typesafeFE)

# Appendix: functional programming

## Whats fp-ts

You might have noticed a few references to the npm package called [fp-ts](https://www.npmjs.com/package/fp-ts). It's the latest in the line of successon of data utility libraries for javascript

[underscore.js](https://underscorejs.org/) -> [lodash](https://lodash.com/) -> [ramda](https://ramdajs.com/) -> [fantasy land](https://github.com/fantasyland/fantasy-land) -> [fp-ts](https://github.com/gcanti/fp-ts)

`fp-ts` stands for 'functional programming in typescript'. 'Functional programming' is just a style that emphasizes data transformations and type-safety

Usually functions from `fp-ts` and its [libraries](https://gcanti.github.io/fp-ts/ecosystem/) (including `spectacles-ts`) rely on `pipe`

## pipe

You might be wondering what that function called `pipe` is for

It can simplify the use of many nested functions

```ts
import { pipe } from 'fp-ts/function'

const manyfuncs = String(Math.floor(Number.parseFloat("123.456")));
const samething = pipe(
  "123.456",
  Number.parseFloat,
  Math.round,
  String
);
```

It's a bit easier to read in this format. We start with a string, then it's parsed into a number, then rounded, and then converted back into a string. It almost looks like a bulleted list!

## Why use pipe for spectacles

Let's see what libraries that don't use `pipe` look like

```ts
import { mapValues, filter } from 'lodash'

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


# Whats Option

The `Option` type is a useful alternative to `undefined` because it can nest

Consider the following problem:

```ts
const usernames: (string | undefined)[] = ["anthony", undefined, "stu"]
const atindex = usernames[4]
// atindex = undefined
```

We know that `atindex` is `undefined`, but we don't know what that means 

It could be `undefined` because the user chose to remain anonymous. In this case, though, it's `undefined` because the user doesn't exist at all

`Option` gives us a way to represent both of these cases

```ts
import { Option } from 'fp-ts/Option'
import { lookup } from 'fp-ts/ReadonlyArray' 
const usernames: Option<string>[] = [O.some("anthony"), O.none, O.some("stu")]
const atindex: Option<Option<string>> = pipe(usernames, lookup(1))
// atindex = O.some(O.none)
```

`atindex = O.some(O.none)` means that the user exists and is anonymous. `atindex = O.none` means that the user never existed in the first place

For this reason `Option` should generally be used instead of `undefined`

The `Option` type is more powerful than `undefined`. `Options` can `map` and `flatten`, just like arrays and objects, [and much more](https://rlee.dev/practical-guide-to-fp-ts-part-2)

`Option` can be a great, simple intro into the joys of `fp-ts`

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

## Note

An earlier version of spectacles used tuples for pathnames instead of string literals. This document has been updated to reflect the changes

****

CREDITS:
Logo - [Stuart Leach](https://www.loveleach.com/)