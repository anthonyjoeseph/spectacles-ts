import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { modifyW } from '../src'
import { data, A, B, simpleData } from '../tests/shared'

const modifiedDefinite = pipe(
  simpleData,
  modifyW(['a', 'b', '0'], (j) => `${j + 2}`)
)
expectType<{
  a: {
      b: [string, string, boolean];
      c: string;
      d: boolean;
  };
  e: number;
}>(modifiedDefinite)

const modifyOptional = pipe(
  data,
  modifyW(
    [(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'],
    (j) => `${j + 4}`
  )
)
expectType<B | {
  a: O.Option<{
      e: boolean;
      c: [string | number, string, boolean];
      d: string[];
  }>;
  type: "A";
}>(modifyOptional)

const optionalWidensType = pipe(
  { a: 123 } as { a: number | undefined },
  modifyW(['a', '?'], (j) => `${j + 2}`)
)
expectType<{ a: string | number | undefined }>(optionalWidensType)

const collectionWidensType = pipe(
  { a: [123, 456] },
  modifyW(['a', 0], (j) => `${j + 2}`)
)
expectType<{ a: (string | number)[] }>(collectionWidensType)

const preservesReadonlyArr = pipe(
  [123, 456] as readonly number[],
  modifyW([0], (j) => `${j + 2}`)
)
expectType<readonly (number | string)[]>(preservesReadonlyArr)
