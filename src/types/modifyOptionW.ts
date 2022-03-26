import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { ApplyTraversals, AtPath } from "../util/AtPath";
import type { GiveOpt } from "../util/predicates";

export type ModifyOptionW = <Infer, Path extends Paths<Infer>, RetVal>(
  path: Path & string,
  modFunc: (v: AtPath<Infer, Path, "no-traversals">) => RetVal
) => (a: Infer) => GiveOpt<ApplyTraversals<Build<Path, RetVal, Infer>, Path>, Path>;
