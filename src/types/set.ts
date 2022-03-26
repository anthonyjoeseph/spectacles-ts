import type { AtPath } from "../util/AtPath";
import type { Paths } from "../util/Paths";

export type Set = <Infer, Path extends Paths<Infer>, Val extends AtPath<Infer, Path, "no-traversals">>(
  path: Path & string,
  val: Val
) => (obj: Infer) => Infer;
