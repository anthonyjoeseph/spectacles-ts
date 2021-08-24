import * as O from 'fp-ts/Option'


export interface SimpleData {
  a: {
    b: [number, string, boolean]
    c: string
    d: boolean
  }
  e: number
}
export const simpleData: SimpleData = {
  a: {
    b: [123, 'abc', false],
    c: 'def',
    d: false,
  },
  e: 456,
}

export interface A {
  type: 'A'
  a: O.Option<{
    c: number
    d: string[]
    e: boolean
  }>
}
export interface B { type: 'B' }
export type Data = A | B
export const data: Data = {
  type: 'A',
  a: O.some({
    c: 123,
    d: ['def'],
    e: false,
  }),
}
