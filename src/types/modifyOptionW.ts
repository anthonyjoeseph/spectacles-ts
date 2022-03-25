import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { AtPath } from "../util/AtPath";
import type { GiveOpt } from "../util/predicates";

export type ModifyOptionW = <Infer, Path extends Paths<Infer>, RetVal>(
  path: Path & string,
  modFunc: (v: AtPath<Infer, Path>) => RetVal
) => (a: Infer) => GiveOpt<Build<Path, RetVal, Infer>, Path>;
