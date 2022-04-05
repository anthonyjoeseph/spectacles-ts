import type { AtPath } from "../util/AtPath";
import type { IndiciesForPath } from "../util/indicies";
import type { Paths } from "../util/Paths";
import type { GiveOpt } from "../util/predicates";
import type { Segments } from "../util/segments";

export type ModifyOption = <
  Infer,
  Path extends Paths<Infer>,
  S extends unknown[] = Segments<Path>,
  A = AtPath<Infer, S, "no-traversals">
>(
  path: Path & string,
  ...args: [...indicies: IndiciesForPath<S>, modFunc: (v: A) => A]
) => (a: Infer) => GiveOpt<Infer, S>;
