---
title: values/get.ts
nav_order: 1
parent: Modules
---

## get overview

Added in v1.0.7

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [get](#get)

---

# utils

## get

`get` monocle-ts Optional equivalent

**Signature**

```ts
export declare const get: Get
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { get } from 'spectacles-ts'

const gotten = pipe({ a: { b: ['abc', 'def'] } }, get('a.b.[number]', 0))
console.log(gotten)
```

Added in v1.0.7
