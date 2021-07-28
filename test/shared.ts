export interface Data { a: {b?: {c: number; d: string; e: boolean }[] } }
export const data: Data = {
  a: {
    b: [{
      c: 123,
      d: 'abc',
      e: false
    }]
  }
}