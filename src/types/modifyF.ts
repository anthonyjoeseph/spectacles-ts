import { Applicative, Applicative1, Applicative2, Applicative3 } from "fp-ts/lib/Applicative";
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from "fp-ts/lib/HKT";
import type { Paths } from "../util/Paths";
import type { AtPath } from "../util/AtPath";
import { AddNullSegments } from "../util/segments";

export type ModifyF = {
  <F extends URIS3>(F: Applicative3<F>): <
    R,
    E,
    Infer,
    Path extends Paths<Infer>,
    Val extends AtPath<Infer, AddNullSegments<Path>, "no-traversals">
  >(
    path: Path & string,
    modFunc: (v: Val) => Kind3<F, R, E, Val>
  ) => (a: Infer) => Kind3<F, R, E, Infer>;
  <F extends URIS2>(F: Applicative2<F>): <
    E,
    Infer,
    Path extends Paths<Infer>,
    Val extends AtPath<Infer, AddNullSegments<Path>, "no-traversals">
  >(
    path: Path & string,
    modFunc: (v: Val) => Kind2<F, E, Val>
  ) => (a: Infer) => Kind2<F, E, Infer>;
  <F extends URIS>(F: Applicative1<F>): <
    Infer,
    Path extends Paths<Infer>,
    Val extends AtPath<Infer, AddNullSegments<Path>, "no-traversals">
  >(
    path: Path & string,
    modFunc: (v: Val) => Kind<F, Val>
  ) => (a: Infer) => Kind<F, Infer>;
  <F>(F: Applicative<F>): <
    Infer,
    Path extends Paths<Infer>,
    Val extends AtPath<Infer, AddNullSegments<Path>, "no-traversals">
  >(
    path: Path & string,
    modFunc: (v: Val) => HKT<F, Val>
  ) => (a: Infer) => HKT<F, Infer>;
};
