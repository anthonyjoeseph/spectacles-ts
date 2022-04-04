type ShouldUnescape<S extends string> = S extends `(${infer Rest}`
  ? ShouldUnescape<Rest>
  : S extends `*${string}`
  ? true
  : never;

type FirstSegment<S extends string> = true extends ShouldUnescape<S>
  ? FirstEscapedSegment<S>
  : S extends `(${infer Middle})${string}`
  ? `(${Middle})`
  : S extends `${infer First}.${string}`
  ? First
  : S;

type FirstEscapedSegment<
  S extends string,
  Acc extends string = ""
> = S extends `(${infer Parens}*${infer Middle})${infer Rest}`
  ? Parens extends ""
    ? `(${Acc}${Middle})`
    : FirstEscapedSegment<`${Parens}*${Rest}`, `${Acc}${Middle})`>
  : S extends `(${infer Middle})${string}`
  ? `(${Middle})`
  : S;

type TailSegment<S extends string> = true extends ShouldUnescape<S>
  ? TailEscapedSegment<S>
  : S extends `(${string})${infer Tail}`
  ? Tail extends `.${infer AfterDot}`
    ? AfterDot
    : Tail
  : S extends `${string}.${infer Tail}`
  ? Tail
  : "";

type TailEscapedSegment<S extends string> = S extends `(${infer Parens}*${string})${infer Rest}`
  ? Parens extends ""
    ? Rest extends `.${infer AfterDot}`
      ? AfterDot
      : Rest
    : TailEscapedSegment<`${Parens}*${Rest}`>
  : S;

export type Segments<S extends string, Acc extends string[] = [], First extends string = FirstSegment<S>> = S extends ""
  ? Acc
  : First extends `(${string})`
  ? Segments<TailSegment<S>, Acc extends [] ? [First] : [...Acc, First]>
  : First extends "?"
  ? Segments<TailSegment<S>, Acc extends [] ? ["?"] : [...Acc, "?"]>
  : First extends `${infer First}?`
  ? Segments<TailSegment<S>, Acc extends [] ? [First, "?"] : [...Acc, First, "?"]>
  : First extends `(${infer Middle})?`
  ? Segments<TailSegment<S>, Acc extends [] ? [`(${Middle})`, "?"] : [...Acc, `(${Middle})`, "?"]>
  : Segments<TailSegment<S>, Acc extends [] ? [First] : [...Acc, First]>;

export type EscapeSpecialChars<S extends string> = S extends `${string})${string}`
  ? EscapeParenthesis<S>
  : S extends
      | ""
      | "[]>"
      | "{}>"
      | "({}>)"
      | `[${string}]`
      | `${string}.${string}`
      | `${string}?${string}`
      | `${string}:${string}`
      | `${string}(${string}`
  ? `(${S})`
  : S;

type EscapeParenthesis<S extends string> = `(${StartingParens<S>}*${S})`;

type StartingParens<S extends string, Acc extends string = ""> = S extends `${string})${infer Tail}`
  ? StartingParens<Tail, `${Acc}(`>
  : Acc;
