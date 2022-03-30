import type { Paths } from "../util/Paths";
import type { AtPath } from "../util/AtPath";
import { AddNullSegments } from "../util/segments";

export type Modify = <Infer, Path extends Paths<Infer>>(
  path: Path & string,
  modFunc: (
    v: AtPath<Infer, AddNullSegments<Path>, "no-traversals">
  ) => AtPath<Infer, AddNullSegments<Path>, "no-traversals">
) => (a: Infer) => Infer;
