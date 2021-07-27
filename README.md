# immutable-ts - EXPERIMENTAL

Non-composable, non-traversable fluent [monocle-ts](https://github.com/gcanti/monocle-ts) facade

Not yet published to npm, but you can experiment with types/inference in [this playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQ-ACZoOtAIZQMHXpXhDxMcQC5EcFYgYB+VQg6q2LEAzRQA3HCGq5UYGwDmFtKoYQItNOLZYA2gF0sLEEZNjk4NjQ5NCE4AF5kVDQACn44S0VxABo4VOR8MCSicSJsom0SuAAGbJ8iDgqiISIA8Uo4ELkASn5uwT7+akGh4eoB6jgYAE90NsGxkaHBETFJaVl4MHzVAB5cgEk2HFNM3IAFRQALODQADxg0NiE23LTB8NFIyklJiYh1WloEAA7nA7EcpJw0C84OcYBdKNsDuCAHzXO4PJ5wJKGYymOAAHzgNjs9gJcCk4iEvFoP2JDn8nX8OTSLLgWhhlwRSNMqOhaQMaAAbqZ+MikgA6SVgS6qWEXTpxVFJCAMABWqm5UAVsVRAHFgMKAPJgGDbACCMDliMOxw5cOR2TlyMEdnuUBw4g4GAAygQ0ObUQhchSqWwaXAAPpKeyqIi+kBoARpEPUn6C8S0FjOOBm-iYfiu0wer1wAByvAwSBTYZ+UfEMeI5YiRCCU3QcGN3F4AbicHj-rNqMJTah-DbGAAEq0AKqPSLAKRCADSaEmCMHvbNaPujzaOJMUFy7JgUCzuVUW9uO8xdPs0OPp6hrIv24xbVc7k8bD5bImj5-L5Xm+ML4CAwCUP6XiTM6rKsg+Z6wSyqgerQEGCOOdrwrsaRmtkZxSIKr67nA7AANZsMCbBMvE-gnGkK5rr2pGrhAOA5nRHYmgxbTxJ2DGsQGoq9rkU6ULOIiUAu0TcT2QHEShEHMiy7I+GaARyZiqlQFA4iTNsZEUUCbDIn4P7sma2m6XK66OgRMGwaoP5pISPiSuKpwEdk1bhtx-imYhzlYk5LLcURmIGZRwVwR2arWea2QKWgtlCtk3H2QFsGEkkfGrm0Gl7kKeJRQF7IRMKUBKRliGqIasWcvFf5ZslgrZDla7It0VVIe85XBZ13VlSKY7TBgFk6ZMcW5Je6LEWNun6Ww5GUQ6+FCmFbQRUZ1FwP4QnxLkLluR5KXhEYB7+WScVmj4+6mH4NRHZ5p24lAfj2W8hK1aqV0JRmEHNdkAAqLBgB4-E4AGzrDe2X2TThHHgZ261wB+HheBxx2EflJGLYZVEBDR925KF8TMZMrE5ntSmHZKmOpblF1ZT+iMmsjJ5ZpVsHsikXVpLOEAmtsaXI2TFO5rzymYQiTaliwALiAwHjmj4-OC2lb0PbTT3cW9nNdQKvVdf1GWqDzEtwKF2Oi2xW7FdFV0+DrmvudrDO8ubcAGyKEvG3AvQYRaVpTRxFn2HlM3hbjlG7ai+04VAYfI7t0Xi91ofh9ebQ+GCeIMdkbk5xVABKkQwBd0UMcj3k-Ek1s5oy5dc2oPinKC3gMTdZ13X4F4twE+Ymxbq7I7dh5deZyObfjv6B5cyuj-dcAl3IqJe2PVWqKrpoMaiVssTbetVfBGDY6JnZC6u6Xm+ZlpzzLcsSIrA4qxRauXxrS+l1fEsXrfcLK1vC+0FF7LxgN-DePVva8zXuhEacB9RGkFrhHMCcM7ASnv4WOuR2Ynwjm0M+SDUGdxerre8nEuxsB7NCVQODkaiVliAc0RCF7gPZJ2HglCNwAUptDDAbUBIbniEGNIjs25wDrmpMgOgcYiBwHYaIyNrpLgCGQpcyNby-gAAYABIEBLkwFoTRntIEVWoSYvMPgJGmV4XAAh29Y4W2RjohAhdIwGKMcfYxg1Dw2PoUYIWDi1HY1Hr+WhMCbGAKXIEpxujXEMXcb+SuqglywPbMDUGaBwbmknlHLautYi5AAKI3DECwEQ2EWQSI4mkCRlk9JT3ssiIAA)

## Example

```ts
import { pipe } from 'fp-ts'
import { prop } from 'immutable-ts'

declare const data: { a: {b?: {c: number; d: string; e: boolean }[] } }

const nested: Option<{ c: number; d: string }> = pipe(
  data, 
  prop('a', 'b?', 0, ['c', 'd'] as const)
)
```

## TODO

- add non-piped polymorphic `prop` overloads ([see here](https://github.com/gcanti/fp-ts/pull/1454#issuecomment-822622706))
- get rid of need for `as const` assertion in 'Pick' tuple
- refinements (is this possible?)
- separate 'immutable-ts/non-fp' module that uses `undefined` (rather than `Option`)
- `function set(...)`
- `function insert(...)`
- `function modify(...)`
- `function rename(...)`
- `function omit(...)`