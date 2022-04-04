import type { AtPath } from "../util/AtPath";
import type { IndiciesForPath } from "../util/indicies";
import type { Paths } from "../util/Paths";
import type { GiveOpt } from "../util/predicates";
import type { AddNullSegments } from "../util/segments";

export type ModifyOption = <Infer, Path extends Paths<Infer>>(
  path: Path & string,
  ...args: [
    ...indicies: IndiciesForPath<Path>,
    modFunc: (
      v: AtPath<Infer, AddNullSegments<Path>, "no-traversals">
    ) => AtPath<Infer, AddNullSegments<Path>, "no-traversals">
  ]
) => (a: Infer) => GiveOpt<Infer, AddNullSegments<Path>>;
