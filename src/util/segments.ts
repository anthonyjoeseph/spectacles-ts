export type LastSegment<S> = S extends `${string}.${infer Tail}` ? LastSegment<Tail> : S;
export type InitSegment<S, Acc extends string = ""> = S extends `${infer Head}.${infer Tail}`
  ? InitSegment<Tail, Acc extends "" ? Head : `${Acc}.${Head}`>
  : Acc;

export type AddDots<S extends string> = S extends `${string}?${string}` ? _AddDots<S, ""> : S;

type _AddDots<S extends string, Acc extends string> = S extends `${infer Head}?${infer Tail}`
  ? Tail extends `some${infer Rest}`
    ? _AddDots<Rest, `${Acc}${Head}?some`>
    : Tail extends `left${infer Rest}`
    ? _AddDots<Rest, `${Acc}${Head}?left`>
    : Tail extends `right${infer Rest}`
    ? _AddDots<Rest, `${Acc}${Head}?right`>
    : `${Acc}${Head}` extends ""
    ? _AddDots<Tail, `?`>
    : _AddDots<Tail, `${Acc}${Head}.?`>
  : `${Acc}${S}`;
