import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { ApplyTraversals, AtPath } from "../util/AtPath";
import type { GiveOpt } from "../util/predicates";
import type { AddNullSegments } from "../util/segments";
import type { IndiciesForPath } from "../util/indicies";

export type ModifyOptionW = <Infer, Path extends Paths<Infer>, RetVal>(
  path: Path & string,
  ...args: [
    ...indicies: IndiciesForPath<Path>,
    modFunc: (v: AtPath<Infer, AddNullSegments<Path>, "no-traversals">) => RetVal
  ]
) => (a: Infer) => GiveOpt<ApplyTraversals<Build<Path, RetVal, Infer>, Path>, Path>;
