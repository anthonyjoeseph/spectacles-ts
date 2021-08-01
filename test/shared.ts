export interface A { 
  type: 'A'
  a: {
    c: [number, string, boolean]; 
    d: string; 
    e: boolean 
  }[]; 
}
export interface B { type: 'B' }
export type Data = A | B
export const data: Data = {
  type: "A",
  a: [{
    c: [123, 'abc', false],
    d: 'def',
    e: false,
  }]
}