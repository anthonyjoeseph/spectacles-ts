import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { AtPath } from "../util/AtPath";
import type { HasOptional } from "../util/predicates";

export type ModifyW = <Infer, Path extends Paths<Infer>, RetVal>(
  path: Path & string,
  modFunc: (v: AtPath<Infer, Path>) => RetVal
) => (
  a: Infer
) => true extends HasOptional<Path> ? Build<Path, RetVal | AtPath<Infer, Path>, Infer> : Build<Path, RetVal, Infer>;
