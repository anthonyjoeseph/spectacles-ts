import type { AtPath } from "../util/AtPath";
import type { Paths } from "../util/Paths";
import { AddNullSegments } from "../util/segments";

export type Set = <Infer, Path extends Paths<Infer>, Val extends AtPath<Infer, AddNullSegments<Path>, "no-traversals">>(
  path: Path & string,
  val: Val
) => (obj: Infer) => Infer;
