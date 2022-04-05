export type IndiciesForPath<P extends unknown[], Acc extends unknown[] = []> = P extends [infer First, ...infer Tail]
  ? First extends "[number]"
    ? IndiciesForPath<Tail, [...Acc, number]>
    : First extends "[string]"
    ? IndiciesForPath<Tail, [...Acc, string]>
    : IndiciesForPath<Tail, Acc>
  : Acc;
