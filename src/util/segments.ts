export type LastSegment<S> = S extends `${string}.${infer Tail}` ? LastSegment<Tail> : S;
export type InitSegment<S, Acc extends string = ""> = S extends `${infer Head}.${infer Tail}`
  ? InitSegment<Tail, Acc extends "" ? Head : `${Acc}.${Head}`>
  : Acc;
