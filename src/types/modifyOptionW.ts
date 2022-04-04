import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { ApplyTraversals, AtPath } from "../util/AtPath";
import type { GiveOpt } from "../util/predicates";
import type { Segments } from "../util/segments";
import type { IndiciesForPath } from "../util/indicies";

export type ModifyOptionW = <Infer, Path extends Paths<Infer>, RetVal, S extends unknown[] = Segments<Path>>(
  path: Path & string,
  ...args: [...indicies: IndiciesForPath<S>, modFunc: (v: AtPath<Infer, S, "no-traversals">) => RetVal]
) => (a: Infer) => GiveOpt<ApplyTraversals<Build<S, RetVal, Infer>, S>, S>;
