# Build (tail recursive)

```ts
_Obj1 = { a: { b: number, x: boolean }, c: { d: { e: string } } }
Obj1 = [
  { path: ['a']; value: { b: number, x: boolean} },
  { path: ['c']; value: { d: { e: string } }
]
Output1 = ['a'] | ['c']
        |
        V
Obj2 = [
  { path: ['a', 'b']; value: number },
  { path: ['a', 'x']; value: boolean }
  { path: ['c', 'd']; value: { e: string } }
]
Output2 = ['a', 'b'] | ['a', 'x'] | ['c', 'd']
        |
        V
Obj3 = [
  { path: ['c', 'd', 'e']; value: string }
]
Output3 = ['c', 'd', 'e']

```