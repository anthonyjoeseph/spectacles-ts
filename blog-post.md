![Rose-Colored Spectacles](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9f6lyxcav4bct6ie2gum.png)

Do you want to love [immutable data](https://imfaber.me/javascript-functional-programming-immutability/) but think it's a drag?

Are you perplexed by the syntax of [immutability-helper](https://github.com/kolodny/immutability-helper)? Repulsed by [immer.js](https://immerjs.github.io/immer/produce#example)'s use of assignment? Alarmed by [lodash's](https://lodash.com/docs/4.17.15#set) lack of type safety?

Looking for something a little more intuitive, powerful & flexible? Clear up your data w/ `spectacles-ts` ([github repo](https://github.com/anthonyjoeseph/spectacles-ts))!


## IDEAS

## setOption as motivation for Option

let's say we want to clear out the value of 'a'

```ts
declare const data: { a: number } | undefined
const f = pipe(data, setOption('?.a.?', 2))
// f: Option<{ a: number } | undefined>
```

if f is `Some`, then we know that `data.a` had previously contained a number. If it's `None`, that means that `data.a` had contained 'undefined'

if we used `undefined`, 'f' would have the type `number | undefined`

this would leave us no way to know if the operation had failed, or if 

## Installation

```shell
yarn add fp-ts spectacles-ts
```

## Syntax (featuring [auto-complete](https://github.com/anthonyjoeseph/spectacles-ts/blob/main/readme-vid.gif)!)

```ts
import { pipe } from 'fp-ts'
import { set } from 'spectacles-ts'

const oldObj = { a: { b: 123 } }
const newObj = pipe(oldObj, set("a.b", 999))
// oldObj = { a: { b: 123 } }
// newObj = { a: { b: 999 } }
```

It's that simple!

(If `pipe` syntax is unfamiliar checkout this [quick explanation](https://rlee.dev/practical-guide-to-fp-ts-part-1))

You can `get` a value with similar syntax:

```ts
import { get } from 'spectacles-ts'

const num: number = pipe({ a: { b: 123 } }, get("a.b"))

// equivalent to
const num2: number = { a: { b: 123 } }.a.b

// num = num2 = 123
```

## Functional Programming (fp)

`spectacles-ts` integrates seamlessly with the [fp-ts ecosystem](https://gcanti.github.io/fp-ts/ecosystem/) (it's built on top of the excellent [monocle-ts](https://github.com/gcanti/monocle-ts) library)

Its [curried functions](https://paulgray.net/pipeable-apis/) fit in nicely w/ a functional style

That's one reason you might want to use a function like `get`:

```ts
const as: number[] = [{ a: 123 }].map(get('a'))
// as = [123]
```

## Array access

We can do `Array` access using a `number` for the index:

```ts
const a = pipe([{ a: 123 }], get(0, 'a'))
```

Since `Array` access at a given index might fail, we use fp-ts's `Option` type

```ts
import * as O from 'fp-ts/Option'

//           |
//           v
const a: O.Option<number> = pipe([{ a: 123 }], get(0, 'a'))
// a = O.some(123)
```

The `Option` type is powerful, featuring a [full set of combinators](https://rlee.dev/practical-guide-to-fp-ts-part-2). It can be a great, simple intro into the joys of fp-ts

This also gives us a way to know when a 'set' call has failed, using `setOption`:

```ts
import { set, setOption } from 'spectacles-ts'

const silentSuccess: number[] = pipe([123], set([0], 999))
const silentFailure: number[] = pipe([123], set([1], 999))
// silentSuccess = [999]
// silentFailure = [123]

const noisySuccess: O.Option<number[]> = pipe([123], setOption([0], 999))
const noisyFailure: O.Option<number[]> = pipe([123], setOption([1], 999))
// noisySuccess = O.some([999])
// noisyFailure = O.none
```

## Traversals

We can traverse an `Array` to collect its nested data

```ts
const a: number[] = pipe(
  [{ a: 123 }, { a: 456 }],
  get("[]>.a")
)

// equivalent to:
const a2: number[] = [{ a: 123 }, { a: 456 }].map(get('a'))

// a = a2 = [123, 456]
```

Or to make a change across all of its values

```ts
const a: { a: number }[] = pipe(
  [{ a: 123 }, { a: 456 }],
  set(["[]>.a"], 999)
)

// a = [{ a: 999 }, { a: 999 }]
```

We can also traverse a `Record`. The keys are sorted alphabetically

```ts
const rec = 
  { two: { a: 456 }, one: { a: 123 } } as Record<string, { a: number }>
const a: number[] = pipe(rec, get("{}>.a"))

// a = [123, 456]
```

## Modification

You can modify a value in relation to its old value:

```ts
import { modify } from 'spectacles-ts'

const mod: { a: number }[] =
  pipe([{ a: 123 }], modify([0, 'a'], a => a + 4))
// mod = [{ a: 127 }]
```

You can use this to e.g. append to an array:

```ts
import * as A from 'fp-ts/ReadonlyArray'

const app: { a: number[] } = pipe(
  { a: [123] },
  modify("a", A.append(456))
)
// app = { a: [123, 456] }
```

You can even change a value's type this way:

```ts
import { modifyW } from 'spectacles-ts'
//             ^
//             |
// The 'W' stands for 'widen'
// as in 'widen the type'

const modW: { a: string | number }[] =
  pipe([{ a: 123 }], modifyW([0, 'a'], a => `${a + 4}`))
// mod = { a: '127' }
```

Also featuring [modifyOption](https://github.com/anthonyjoeseph/spectacles-ts#modifyoption) and [modifyOptionW](https://github.com/anthonyjoeseph/spectacles-ts#modifyoptionw)

## Change Object types

You can change an existing key:

```ts
import { upsert } from 'spectacles-ts'

const obj: { a: { b: string} } = pipe(
  { a: { b: 123 } }, 
  upsert("a", "b", 'abc')
)
// obj = { a: { b: 'abc' } }
```

Or add a new one:

```ts

const obj: { a: { b: number; c: string } } = pipe(
  { a: { b: 123 } }, 
  upsert("a", "c" 'abc')
)
// obj = { a: { b: 123, c: 'abc' } }
```

Or remove one of them:

```ts
import { remove } from 'spectacles-ts'

const removedKeys: { nest: { b: string } } = pipe(
  { nest: { a: 123, b: 'abc', c: false } }, 
  remove("nest.a")
)
// removedKeys = { nest: { b: 'abc' } }
```

Or rename a key:

```ts
import { rename } from 'spectacles-ts'

const renamedKey: { nest: { a2: number } } = pipe(
  { nest: { a: 123 } }, 
  rename("nest.a", "a2")
)
// renamedKey = { nest: { a2: 123 } }
```

## Other stuff

You can access the index of a tuple:

```ts
const tup = [123, 'abc'] as [number, string]
const getIndex: number = pipe(tup, get('0'))
// getIndex = 123
```

You can access a [nullable value](https://www.typescriptlang.org/docs/handbook/advanced-types.html#nullable-types):

```ts
interface Obj { a?: { b: number } }
const obj: Obj = { a: { b: 123 } }
const a: O.Option<number> = pipe(a, get('a', '?', 'b'))
// a = O.some(123)
```

You can refine a union type:

```ts
const refined: O.Option<number> = pipe(
   { a: 123 } as { a: string | number },
   get('a', (a): a is number => typeof a === 'number')
)
// refined = O.some(123)
```

And there are [convenience](https://github.com/anthonyjoeseph/spectacles-ts#operations) operations for working with `Option` and [Either](https://rlee.dev/practical-guide-to-fp-ts-part-3) types

## `spectacles-ts` vs `monocle-ts`

`spectacles-ts` is built on top of [monocle-ts](https://github.com/gcanti/monocle-ts), which is more powerful and flexible but a little less ergonomic.

Here's a direct comparison between the two.

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

const nestedMonocle: O.Option<string> =
  optional.getOption({ a: { b: ['abc', 'def'] } })
```

```ts
import { pipe } from 'fp-ts/function'
import { get } from 'spectacles-ts'

const nestedSpectacles: O.Option<string> = 
  pipe({ a : { b: ['abc', 'def'] } }, get('a', 'b', 0))
```

You can see the simplicity that `spectacles-ts` offers

monocle-ts has these advantages:
- `spectacles-ts` only works in piped contexts (except for [get](https://github.com/anthonyjoeseph/spectacles-ts/blob/main/tests/get.spec.ts#L39))
- No limitation on object size
- can [filter](https://github.com/gcanti/monocle-ts/blob/master/test/Lens.ts#L225) (similar to [es6's filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter))
- can traverse on any arbitrary traversable object (aka [Zippers](https://github.com/gcanti/fp-ts-contrib/blob/master/test/Zipper.ts) or [Rose Trees](https://github.com/gcanti/fp-ts/blob/master/test/Tree.ts))
- Can define an [isomorphism](https://github.com/gcanti/monocle-ts/blob/master/test/Iso.ts) between two objects
- works with the [Map](https://github.com/gcanti/monocle-ts/blob/master/test/Ix.ts) type

## Conclusion

I hope spectacles-ts can help you modify data both immutably & ergonomically!

****

CREDITS:
Logo - [Stuart Leach](https://www.loveleach.com/)