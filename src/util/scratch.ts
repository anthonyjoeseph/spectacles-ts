import { Paths, _Paths, BubbleUp, _BubbleUp, UnionToIntersection, ValueOf } from "./Paths";
import { AllKeys, B_extends_A, PossiblyExtendible, UnPartial, GetParentInterfaces, NewRec } from "./pathRecursion";

export type Element2 = {
  readonly ownerDocument: Document;
};

type b26 = Paths<{ ownerDocument: Document }>;

// declare const yyy: b26["Recursed"];

// const a = yyy["ownerDocument.ownerDocument?"];
type ab1 = B_extends_A<
  Document,
  {
    ownerDocument: Document;
  }
>;

type a = Paths<{ a: { b: { c: number } }; x: { c: number } }>;
type b = Paths<Rec>;

interface Rec {
  a: Rec;
}

interface Rec2 extends Rec {
  b: Rec;
}

declare const rec: Rec2;

rec.a.a.a.a;

type r0 = _Paths<Rec, { "": Rec }, "static", Extract<keyof Rec, string>, []>;

type bup1 = _BubbleUp<Rec, { "": Rec }>;

type bup2 = B_extends_A<Rec[], Rec>;
type bup3 = {
  [K in AllKeys<PossiblyExtendible<Rec[], Rec>>]: K extends keyof Rec[] ? Rec[][K] : any;
};
type bup4 = UnPartial<PossiblyExtendible<Rec[], Rec>>;

type r1 = _Paths<bup1, NewRec<{ "": Rec }, Rec>, "static", Extract<keyof Rec, string>>;
//
//
//
//
//
//
//
//
//
//

/* type z0 = B_extends_A<Rec, Rec2>;
type z1 = B_extends_A<{ a?: number }, Rec2>;
type z2 = z0 extends UnPartial<Rec2> ? 1 : 0;
type z3 = z1 extends UnPartial<Rec2> ? 1 : 0; */
type z96 = { a: number | undefined } extends { a?: Rec } ? 1 : 0;

type p0 = ` ${keyof HTMLInputElement}`;
//type b0 = Paths<ChildNode>;
//type b1 = Paths<ParentNode>;
//type b2 = Paths<Element>;
//type b3 = Paths<HTMLElement>;
// type b4 = Paths<HTMLElement & { a: number }>;
//type b5 = Paths<HTMLInputElement>;
//type b24 = Paths<{ ownerDocument: Document }>;
// type b25 = Paths<Element2 & { a: number }>;
// type b6 = Paths<Window>;
// type b7 = Paths<Document>;
// declare const b3: b2;
declare const doc: Document;

// b3 === "ownerDocument.documentElement";

/* const aaa = b3.Recursed["ownerDocument.activeElement?"]; */
/*type b5 = Paths<Document>;



const aaa = b5.Recursed["anchors"];*/

/* 
Obj1 = { a: { b: number, x: boolean }, c: { d: { e: string } } }
Output1 = keyof Obj1 = 'a' | 'c'
Rec1 = { a: { b: number, x: boolean }, c: { d: { e: string } } }
        |
        V
Obj2 = { 'a.b': number, 'a.x': boolean, 'c.d': { e: string } }
Output2 = Output1 | keyof Obj2 = 'a' | 'c' | 'a.b' | 'a.x' | 'c.d'
Rec2 = { 'a.b': { b: number, x: boolean }, 'c.d': { d: { e: string } } }
        |
        V
Obj3 = { 'c.d.e': string }
Output3 = Output2 | keyof Obj3 = 'a' | 'c' | 'a.b' | 'a.x' | 'c.d' | 'c.d.e'
Rec3 = { 'c.d.e': { d: { e: string } } | { e: string } | string }
*/

type rec = { "a.b": { b: number; x: boolean }; "c.d": { d: { e: string } } };

type parens = GetParentInterfaces<"c.d.e", rec>;

type newrec = NewRec<rec, { "c.d.e": string }>;

type a1 = Paths<Rec>;
declare const a2: a1;

interface Document2 {
  readonly documentElement: HTMLElement;
  // readonly head: HTMLHeadElement;
  // readonly embeds: HTMLCollectionOf<HTMLEmbedElement>;
  // readonly forms: HTMLCollectionOf<HTMLFormElement>;
  // readonly images: HTMLCollectionOf<HTMLImageElement>;
  // readonly doctype: DocumentType | null;
}

// type b27 = Paths<{ ownerDocument: Document2 }>;
type b28 = Paths<Document2>;
