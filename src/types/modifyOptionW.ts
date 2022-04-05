import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { AtPath } from "../util/AtPath";
import type { GiveOpt, HasIndexedAccess } from "../util/predicates";
import type { Segments } from "../util/segments";
import type { IndiciesForPath } from "../util/indicies";

export type ModifyOptionW = <
  Infer,
  Path extends Paths<Infer>,
  RetVal,
  S extends unknown[] = Segments<Path>,
  A = AtPath<Infer, S, "no-traversals">
>(
  path: Path & string,
  ...args: [...indicies: IndiciesForPath<S>, modFunc: (v: A) => RetVal]
) => (a: Infer) => GiveOpt<Build<S, true extends HasIndexedAccess<S> ? RetVal | AtPath<Infer, S> : RetVal, Infer>, S>;
