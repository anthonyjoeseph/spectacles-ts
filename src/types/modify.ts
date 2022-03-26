import type { Paths } from "../util/Paths";
import type { AtPath } from "../util/AtPath";
import { AddDots } from "../util/segments";

export type Modify = <Infer, Path extends Paths<Infer>>(
  path: Path & string,
  modFunc: (v: AtPath<Infer, AddDots<Path>, "no-traversals">) => AtPath<Infer, AddDots<Path>, "no-traversals">
) => (a: Infer) => Infer;
