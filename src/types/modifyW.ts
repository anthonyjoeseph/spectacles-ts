import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { ApplyTraversals, AtPath } from "../util/AtPath";
import type { HasOptional } from "../util/predicates";
import type { Segments } from "../util/segments";
import type { IndiciesForPath } from "../util/indicies";

export type ModifyW = <Infer, Path extends Paths<Infer>, RetVal, S extends unknown[] = Segments<Path>>(
  path: Path & string,
  ...args: [...indicies: IndiciesForPath<S>, modFunc: (v: AtPath<Infer, S, "no-traversals">) => RetVal]
) => (
  a: Infer
) => true extends HasOptional<S>
  ? ApplyTraversals<Build<S, RetVal | AtPath<Infer, S>, Infer>, S>
  : ApplyTraversals<Build<S, RetVal, Infer>, S>;
