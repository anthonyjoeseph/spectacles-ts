import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { AtPath } from "../util/AtPath";
import type { HasIndexedAccess } from "../util/predicates";
import type { Segments } from "../util/segments";
import type { IndiciesForPath } from "../util/indicies";

export type ModifyW = <
  Infer,
  Path extends Paths<Infer>,
  RetVal,
  S extends unknown[] = Segments<Path>,
  A = AtPath<Infer, S, "no-traversals">
>(
  path: Path & string,
  ...args: [...indicies: IndiciesForPath<S>, modFunc: (v: A) => RetVal]
) => (a: Infer) => Build<S, true extends HasIndexedAccess<S> ? RetVal | AtPath<Infer, S> : RetVal, Infer>;
