# immutable-ts - EXPERIMENTAL

Non-composable, non-traversable fluent [monocle-ts](https://github.com/gcanti/monocle-ts) facade

![prop video](readme-vid.gif)

Not yet published to npm, but you can experiment with types/inference in [this playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQ-ACZoOtAIZQMHXpXhDxMcQC5EcFYgYB+VQg6q2LEAzRQA3HCGq5UYGwDmFtKoYQItNOLZYA2gF0sLEEZNjk4NjQ5NCE4AF5kVDQACn44S0VxABo4VOR8MCSicSJsom0SuAAGbJ8iDgqiISIA8Uo4ELkASn5uwT7+akGh4eoB6jgYAE90NsGxkaHBETFJaVl4MHzVAB5cgEk2HFNM3IAFRQALODQADxg0NiE23LTB8NFIyklJiYh1WloEAA7nA7EcpJw0C84OcYBdKNsDuCAHzXO4PJ5wJKGYymOAAHzgNjs9gJcCk4iEvFoP2JDn8nX8OTSLLgWhhlwRSNMqOhaQMaAAbqZ+MikgA6SVgS6qWEXTpxVFJCAMABWqm5UAVsVRAHFgMKAPJgGDbACCMDliMOxw5cOR2TlyMEdnuUBw4g4GAAygQ0ObUQhchSqWwaXAAPpKeyqIi+kBoARpEPUn6C8S0FjOOBm-iYfiu0wer1wAByvAwSBTYZ+UfEMeI5YiRCCU3QcGN3F4AbicHj-rNqMJTah-DbGAAEq0AKqPSLAKRCADSaEmCMHvbNaPujzaOJMUFy7JgUCzuVUW9uO8xdPs0OPp6hrIv24xbVc7k8bD5bImj5-L5Xm+ML4CAwCUP6XiTM6rKsg+Z6wSyqgerQEGCOOdrwrsaRmtkZxSIKr67nA7AANZsMCbBMvE-gnGkK5rr2pGrhAOA5nRHYmgxbTxJ2DGsQGoq9rkU6ULOIiUAu0TcT2QHEShEHMiy7I+GaARyZiqlQFA4iTNsZEUUCbDIn4P7sma2m6XK66OgRMGwaoP5pISPiSuKpwEdk1bhtx-imYhzlYk5LLcURmIGZRwVwR2arWea2QKWgtlCtk3H2QFsGEkkfGrm0Gl7kKeJRQF7IRMKUBKRliGqIasWcvFf5ZslgrZDla7It0VVIe85XBZ13VlSKY7TBgFk6ZMcW5Je6LEWNun6Ww5GUQ6+FCmFbQRUZ1FwP4QnxLkLluR5KXhEYB7+WScVmj4+6mH4NRHZ5p24lAfj2W8hK1aqV0JRmEHNdkAAqLBgB4-E4AGzrDe2X2TThHHgZ261wB+HheBxx2EflJGLYZVEBDR925KF8TMZMrE5ntSmHZKmOpblF1ZT+iMmsjJ5ZpVsHsikXVpLOEAmtsaXI2TFO5rzymYQiTaliwALiAwHjmj4-OC2lb0PbTT3cW9nNdQKvVdf1GWqDzEtwKF2Oi2xW7FdFV0+DrmvudrDO8ubcAGyKEvG3AvQYRaVpTRxFn2HlM3hbjlG7ai+04VAYfI7t0Xi91ofh9ebQ+GCeIMdkbk5xVABKkQwBd0UMcj3k-Ek1s5oy5dc2oPinKC3gMTdZ13X4F4twE+Ymxbq7I7dh5deZyObfjv6B5cyuj-dcAl3IqJe2PVWqKrpoMaiVssTbetVfBGDY6JnZC6u6Xm+ZlpzzLcsSIrA4qxRauXxrS+l1fEsXrfcLK1vC+0FF7LxgN-DePVva8zXuhEacB9RGkFrhHMCcM7ASnv4WOuR2Ynwjm0M+SDUGdxerre8nEuxsB7NCVQODkaiVliAc0RCF7gPZJ2HglCNwAUptDDAbUBIbniEGNIjs25wDrmpMgOgcYiBwHYaIyNrpLgCGQpcyNby-gAAYABIEBLkwFoTRntIEVWoSYvMPgJGmV4XAAh29Y4W2RjohAhdIwGKMcfYxg1Dw2PoUYIWDi1HY1Hr+WhMCbGAKXIEpxujXEMXcb+SuqglywPbMDUGaBwbmknlHLautYi5AAKI3DECwEQ2EWQSI4mkCRlk9JT3ssiIAA)

## Examples

### `get` (formerly `prop`)

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gKEG4xszgABSsVWzZ7R2cNJiCoYEoQAUE2GDQoHBMODABBKQYAfgAuOCg0EwATXloxRA4SthYQBnSAbjgKksoYeLYAc3a0EoYICEcTNiwAbQBdLBS0jKyMACF8kqIIGAALdKJ54FT0zOy4ABETGBMpExK8gB84Ncx+CrQHEzK4Dl5ujsvbucAfx+D82H8IHIPF44ABeZCoNAACn4cAsADpgBUADwXK4APiRAEoADSojFgfBgJFEExEUnk2TonDAWiLJFIgBuRJKnLgCTgeVh+LgnPRDDgAEJYfDNjs9gy0UzKZCaQx6WSlWBmcoAHIsWi0EwMRyajGHN4ADyRAAZFRSqZQaRwiCTiBV6fwiSCwX82GhumhOhYdNiEOS0fU4I1mm0Ix0uj1DgN+JgRfDITovOi+mgYO5eEiKgCiUA)

```ts
import { pipe } from 'fp-ts/function'
import type { Option } from 'fp-ts/Option'
import { get } from 'immutable-ts'

interface A { b?: {c: number; d: string; e: boolean }[] }
interface B { b: 'other' }
interface Data { a: A | B }
declare const data: Data

const nested: O.Option<{
  c: number;
  d: string;
}> = pipe(
  data,
  get('a', (v): v is A => v.b !== 'other', 'b?', 0, ['c', 'd'] as const)
)
```


### `set`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcAPJhc+QkRC8IHWmgo16TOd14TaAwWxhooOCRwwARCTAmJJALkQMA-K6hoJAE160AJ6IHK5sLCAM5gDccL6ulDBQwGwA5rForgwQEBoSbFgA2gC6WFj8vmjqEt5wHLyJcfYSrnYO-Pz1bI0QYPpshnAAvMioaAAU-HCyYAB0wL4APG0SAHzjAJQANFMzs2D4YONEEkTbu3L7h8cMZzvTl3gEAHIstLQSDBr3eymVAB7jAAM5wecwOvUoxw4RC2xF8Z34Gw6XUaUTQbAAymgYK1msM4L1+oZZpQceMEKE4AAWACsADY4fF4WgcERMBtxr5mhsgA)

[immutability-helper equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAVzAEwIYwKZwGZQiOAclBARlQCNgAbYGATwFoALDasDKQgKG+ADtMUbKgDGWACLpUcAN5xUALjkUA-MqgZUyCP2r05o5fwQgKnANxxkygM4woAgOZWMyihAjUt-OAF8AbQBdf39uZAxRalRNOFFde2tpZSlyXnj+RP4MewwbOFSZAF5EFHQMAAo0cgAaOW44BWVZBsa4CmbWtrgABk7u7oASVDAwfWUKgDcASjgigD44CpaBgaM4ABYAVgA2Gq7V62VCCOxCfcO2tzhJgDoMA+6-acewp9a-bmegA)

```ts
import { pipe } from 'fp-ts/function'
import { set } from 'immutable-ts'

interface Data { a: {b?: {c: number; d: string; e: boolean }[] } }
declare const data: Data

const beenSet: Data = pipe(
  data,
  set(['a', 'b?', 0, ['c', 'd'] as const], {c: 456, d: 'def'})
)
```

### `modify`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcAPJhc+QkRC8IHWmgo16TOd14TaAodHjipcAJIKCxUlrqNqlgCZo23GAE8Bgj2igcCQ4MABEJGAlESQAuRAYAfjioNAkXXlovRA44thYQBgCAbjgXOMoYKGA2AHMStDiGCAgNCTYsAG0AXSwsfjd1CRS4Dl4K0oiJOPDI-n5RtnGIMH02QzgAXmRUNAAKfjhZMAA6YBcAHhmJAD5dgEoAGgOj47B8MF2iCSJH57lX96fBg-J6Hf54AgAORYtFoEgYGlBL2qbgAHrsAAy-MEnN7LT4cH78O5zBbjFQuYA4YBoMpwK6bbbofaHZarQwPOB-E4UqleXYAK021zgQoA1HAACyPLmHSzHCQfFyTEl3IA)

[immutability-helper equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAVzAEwIYwKZwGZQiOAclBARlQCNgAbYGATwFoALDasDKQgKG+ADtMUbKgDGWACLpUcAN5xUALjkUA-MqgZUyCP2r05o5fwQgKnANxxkygM4woAgOZWMyihAjUt-OAF8AbQBdf39uZAxRalRNOFFde2tpZSlyXnj+RP4MewwbOFSZAF5EFHQMAAo0cgAaOW44BWVZBsa4CmbWtrgABk7u7qN6gYGAElQwMH1lCoArAEo4IoA+OFm4AGo4ABYugb89xoPu47C-eaA)

```ts
import { pipe } from 'fp-ts/function'
import { set } from 'immutable-ts'

interface Data { a: {b?: {c: number; d: string; e: boolean }[] } }
declare const data: Data

const modified: Data = pipe(
  data,
  modify(['a', 'b?', 0, 'c'], (j) => j + 4)
)
```

### `modifyOption`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gKEG4xszgASSsVUmcNJiCAEzQ2bnEBQXi0KBwTDgwAERMYEykTAC5EBgB+Yqg0E2jeWjFEDmK2FhAGVIBuOGjiyhgoYDYAc060YoYICEcTNiwAbQBdRUx+fg5eXrgIOQ8vOABeZFQ0AAp+OAsAOmBogB4cvIA+Y4BKABozy7B8MGOiEyI3h9ZBcvltfgwAe9zsC8AQAHIsWi0EwMRxQy4DWIAD2OAAZAdCwCDvr8OAD+M8VrEHCZKnA1mwNtFckU4PcTCsGRtbNFgDgxNo0N0LDo7iyHvtDuhTuctjovK84ECiTy+QLtrxjgArfYSnUAajgABY3krzkELiYfsy8pTnkA)

```ts
import { pipe } from 'fp-ts/function'
import type { Option } from 'fp-ts/Option'
import { set } from 'immutable-ts'

interface Data { a: {b?: {c: number; d: string; e: boolean }[] } }
declare const data: Data

const modifyOpted: Option<Data> = pipe(
  data,
  modifyOption(['a', 'b?', 0, 'c'], (j) => j + 4)
)
```

## TODO

- tuple access (code is written but causes tsc memory overflow)
- `null` support for nullable keys (not just `undefined`)
- support for `Option` & `Either` chaining (monocle `Optional.some` and `Optional.right` functions)
- get rid of need for `as const` assertion in 'Pick' tuple
- separate 'immutable-ts/non-fp' module that returns `Retval | undefined` (rather than `Option<Retval>`)
- `function insert(...)`
- `function rename(...)`
- `function omit(...)`