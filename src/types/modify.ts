import type { Paths } from "../util/Paths";
import type { AtPath } from "../util/AtPath";
import type { Segments } from "../util/segments";
import type { IndiciesForPath } from "../util/indicies";

export type Modify = <
  Infer,
  Path extends Paths<Infer>,
  S extends unknown[] = Segments<Path>,
  A = AtPath<Infer, S, "no-traversals">
>(
  path: Path & string,
  ...args: [...indicies: IndiciesForPath<S>, modFunc: (v: A) => A]
) => (a: Infer) => Infer;
