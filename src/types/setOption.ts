import type { AtPath } from "../util/AtPath";
import type { Paths } from "../util/Paths";
import type { GiveOpt } from "../util/predicates";
import { AddDots } from "../util/segments";

export type SetOption = <Infer, Path extends Paths<Infer>, Val extends AtPath<Infer, AddDots<Path>, "no-traversals">>(
  path: Path & string,
  val: Val
) => (obj: Infer) => GiveOpt<Infer, Path>;
