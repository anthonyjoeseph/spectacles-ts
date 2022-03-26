import type { AtPath } from "../util/AtPath";
import type { Paths } from "../util/Paths";
import type { GiveOpt } from "../util/predicates";

export type SetOption = <Infer, Path extends Paths<Infer>, Val extends AtPath<Infer, Path, "no-traversals">>(
  path: Path & string,
  val: Val
) => (obj: Infer) => GiveOpt<Infer, Path>;
