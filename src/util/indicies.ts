import { AddNullSegments, FirstSegment, TailSegment } from "./segments";
export type IndiciesForPath<P extends string> = _IndiciesForPath<AddNullSegments<P>>;

type _IndiciesForPath<P extends string, Acc extends unknown[] = []> = FirstSegment<P> extends ""
  ? Acc
  : FirstSegment<P> extends "[number]"
  ? _IndiciesForPath<TailSegment<P>, [...Acc, number]>
  : _IndiciesForPath<TailSegment<P>, Acc>;
