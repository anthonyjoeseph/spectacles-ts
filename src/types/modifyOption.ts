import type { AtPath } from "../util/AtPath";
import type { Paths } from "../util/Paths";
import type { GiveOpt } from "../util/predicates";
import { AddNullSegments } from "../util/segments";

export type ModifyOption = <Infer, Path extends Paths<Infer>>(
  path: Path & string,
  modFunc: (
    v: AtPath<Infer, AddNullSegments<Path>, "no-traversals">
  ) => AtPath<Infer, AddNullSegments<Path>, "no-traversals">
) => (a: Infer) => GiveOpt<Infer, AddNullSegments<Path>>;
