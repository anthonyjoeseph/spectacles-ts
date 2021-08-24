import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { modifyOptionW } from '../src'
import { data, A, B, simpleData } from '../tests/shared'

const modifiesDefinite = pipe(
  simpleData,
  modifyOptionW(['a', 'b', '0'], (j) => `${j + 2}`)
)
expectType<{
  a: {
      b: [string, string, boolean];
      c: string;
      d: boolean;
  };
  e: number;
}>(modifiesDefinite)

const modifiesOptional = pipe(
  data,
  modifyOptionW(
    [(v): v is A => v.type === 'A', 'a', '?some', 'c'],
    (j) => `${j + 4}`
  )
)
expectType<O.Option<B | {
  type: "A";
  a: O.Option<{
      c: string;
      d: string[];
      e: boolean;
  }>;
}>>(modifiesOptional)

const modifyArrayTraversal = pipe(
  [{ a: O.some(123) }, { a: O.some(456) }],
  modifyOptionW(
    ['[]>', 'a', '?some'],
    (j) => `${j + 4}`
  )
)
expectType<{ a: O.Option<string>; }[]>(modifyArrayTraversal)

const modifyRecordTraversal = pipe(
  { a: 123, b: 456 } as Record<string, number>,
  modifyOptionW(
    ['{}>'],
    (j) => `${j + 4}`
  )
)
expectType<Record<string, string>>(modifyRecordTraversal)

const optionalReplacesType = pipe(
  { a: 123 } as { a: number | undefined },
  modifyOptionW(['a', '?'], (j) => `${j + 2}`)
)
expectType<O.Option<{ a: string | undefined }>>(optionalReplacesType)


const collectionWidensType = pipe(
  { a: [123, 456] },
  modifyOptionW(['a', 0], (j) => `${j + 2}`)
)
expectType<O.Option<{ a: (string | number)[] }>>(collectionWidensType)
