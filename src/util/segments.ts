type ShouldUnescape<S extends string> = S extends `(${infer Rest}`
  ? ShouldUnescape<Rest>
  : S extends `*${string}`
  ? true
  : never;

export type FirstSegment<S extends string> = true extends ShouldUnescape<S>
  ? FirstEscapedSegment<S>
  : S extends `(${infer Middle})${string}`
  ? `(${Middle})`
  : S extends `${infer First}.${string}`
  ? First
  : S;

type FirstEscapedSegment<
  S extends string,
  Acc extends string = "*"
> = S extends `(${infer Parens}*${infer Middle})${infer Rest}`
  ? Parens extends ""
    ? `(${Acc}${Middle})`
    : FirstEscapedSegment<`${Parens}*${Rest}`, `(${Acc}${Middle})`>
  : S extends `(${infer Middle})${string}`
  ? `(${Middle})`
  : S;

export type TailSegment<S extends string> = true extends ShouldUnescape<S>
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

export type InitSegment<S, Acc extends string = ""> = S extends `(${string}`
  ? TailEscapedSegment<S> extends ""
    ? Acc
    : InitSegment<TailEscapedSegment<S>, Acc extends "" ? FirstEscapedSegment<S> : `${Acc}.${FirstEscapedSegment<S>}`>
  : S extends `${infer Head}.${infer Tail}`
  ? InitSegment<Tail, Acc extends "" ? Head : `${Acc}.${Head}`>
  : Acc;

export type LastSegment<S> = S extends `(${string}`
  ? TailEscapedSegment<S> extends ""
    ? S
    : LastSegment<TailEscapedSegment<S>>
  : S extends `${string}.${infer Tail}`
  ? LastSegment<Tail>
  : S;

export type AddNullSegments<S extends string, Acc extends string = ""> = S extends ""
  ? Acc
  : FirstSegment<S> extends `(${string})`
  ? AddNullSegments<TailSegment<S>, Acc extends "" ? FirstSegment<S> : `${Acc}.${FirstSegment<S>}`>
  : FirstSegment<S> extends "?"
  ? AddNullSegments<TailSegment<S>, Acc extends "" ? "?" : `${Acc}.?`>
  : FirstSegment<S> extends `${infer First}?`
  ? AddNullSegments<TailSegment<S>, Acc extends "" ? `${First}.?` : `${Acc}.${First}.?`>
  : FirstSegment<S> extends `(${infer Middle})?`
  ? AddNullSegments<TailSegment<S>, Acc extends "" ? `(${Middle}).?` : `${Acc}.(${Middle}).?`>
  : AddNullSegments<TailSegment<S>, Acc extends "" ? FirstSegment<S> : `${Acc}.${FirstSegment<S>}`>;

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

export type UnescapeParenthesis<
  S extends string,
  Acc extends string = ""
> = S extends `(${infer Parens}*${infer Middle})${infer Rest}`
  ? Parens extends ""
    ? `${Acc}${Middle}`
    : UnescapeParenthesis<`${Parens}*${Rest}`, `${Acc}${Middle})`>
  : S extends `(${infer Middle})`
  ? Middle
  : S;
