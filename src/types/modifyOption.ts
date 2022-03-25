import type { AtPath } from "../util/AtPath";
import type { Paths } from "../util/Paths";
import type { GiveOpt } from "../util/predicates";

export type ModifyOption = <Infer, Path extends Paths<Infer>>(
  path: Path & string,
  modFunc: (v: AtPath<Infer, Path>) => AtPath<Infer, Path>
) => (a: Infer) => GiveOpt<Infer, Path>;
