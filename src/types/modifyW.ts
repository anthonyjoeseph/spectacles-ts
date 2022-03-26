import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { ApplyTraversals, AtPath } from "../util/AtPath";
import type { HasOptional } from "../util/predicates";
import { AddDots } from "../util/segments";

export type ModifyW = <Infer, Path extends Paths<Infer>, RetVal>(
  path: Path & string,
  modFunc: (v: AtPath<Infer, AddDots<Path>, "no-traversals">) => RetVal
) => (
  a: Infer
) => true extends HasOptional<Path>
  ? ApplyTraversals<Build<Path, RetVal | AtPath<Infer, AddDots<Path>>, Infer>, AddDots<Path>>
  : ApplyTraversals<Build<Path, RetVal, Infer>, AddDots<Path>>;
