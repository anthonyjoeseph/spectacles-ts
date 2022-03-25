import type { Paths } from "../util/Paths";
import type { AtPath } from "../util/AtPath";

export type Modify = <Infer, Path extends Paths<Infer>>(
  path: Path & string,
  modFunc: (v: AtPath<Infer, Path>) => AtPath<Infer, Path>
) => (a: Infer) => Infer;
