# Build (tail recursive)

```ts
Obj1 = { a: { b: number, x: boolean }, c: { d: { e: string } } }
Output1 = keyof Obj1 = 'a' | 'c'
        |
        V
Obj2 = { 'a.b': number, 'a.x': boolean, 'c.d': { e: string } }
Output2 = Output1 | keyof Obj2 = 'a' | 'c' | 'a.b' | 'a.x' | 'c.d'
        |
        V
Obj3 = { 'c.d.e': string }
Output3 = Output2 | keyof Obj3 = 'a' | 'c' | 'a.b' | 'a.x' | 'c.d' | 'c.d.e'


 
{ a: { b?: number, x: boolean }, c?: { d: { e: string } }; f?: number }
'a' | 'c' | 'f' | 'c.?' | 'f.?'
        |
        V
{ 'a.b': number | undefined, 'a.x': boolean, 'c.?.d': { e: string } }
'a.b' | 'a.x' | 'c.?.d' | 'a.b.?'
        |
        V
{ 'c.?.d.e': string }
'c.?.d.e'


{ a: { b?: number, x: boolean }, c?: { d: { e: string } }; f?: number }
'a' | 'c' | 'f'
        |
        V
{ 'a.b': number | undefined, 'a.x': boolean, 'c.?': { d: { e: string } }; "f.?": number }
'a.b' | 'a.x' | 'c.?' | 'f.?'
        |
        V
{ 'a.b.?': number, 'c.?.d': { e: string } }
'a.b.?' | 'c.?.d'
        |
        V
{ 'c.?.d.e': string }
'c.?.d.e'


const result = pipe(
  { a: { 'b[number]': 'abc' } }
  get('a.b[number]')
)

const result = pipe(
  { a: { 'b[number]': [{ c: 3 }, { c: 4 }, { c: 5 }] } }
  get('a.b\[number\].c', 2)
)

const result = pipe(
  { a: { b: [{ c: 3 }, { c: 4 }, { c: 5 }] } }
  get(['a', 'b', 2, 'c'])
)
// result = Some<5>

```

# Build (tail recursive)

```ts
'a.b.c'
string

       V

'a.b'
{ c: string }

       V

'a'
{ b: { c: string } }

       V

''
{ a: { b: { c: string } } }

```


# Augment (tail recursive)

uses AtPath of the 'head'
replaces the key at 'end' w/ the accumulator

```ts
'a.b'
'c'
{ a: { b: { c: number; d: boolean }; e: boolean } }
string

       V

'a'
'b'
{ a: { b: { c: number; d: boolean }; e: boolean } }
{ c: string; d: boolean }

       V

''
'a'
{ a: { b: { c: number; d: boolean }; e: boolean } }
{ b: { c: string; d: boolean }; e: boolean }

       V

{ a: { b: { c: string; d: boolean }; e: boolean } }
```

# Augment (non tail recursive?)

```ts
'a.b.c'
{ a: { b: { c: number; d: boolean } } }
string

       V

'b.c'
{ b: { c: number; d: boolean } }
sring

       V

'c'
{ c: number; d: boolean }
string

       V

''
{ c: string; d: boolean }

       ^

{ b: { c: string; d: boolean } }

       ^

{ a: { b: { c: string; d: boolean } } }

```

