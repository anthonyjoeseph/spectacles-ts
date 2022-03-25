export type AtPath<A, Args extends string> = unknown extends A
  ? unknown
  : Args extends ""
  ? A
  : Args extends `${infer Key}.${infer Rest}`
  ? AtPath<ApplySegment<A, Key>, Rest>
  : ApplySegment<A, Args>;

type ApplySegment<A, Seg extends string> = Seg extends "?"
  ? NonNullable<A>
  : Seg extends `${infer Discriminant}:${infer Member}`
  ? Extract<A, { [K in Discriminant]: Member }> extends never
    ? A[Extract<Seg, keyof A>]
    : Extract<A, { [K in Discriminant]: Member }>
  : A[Extract<Seg, keyof A>];
