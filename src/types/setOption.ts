import type { AtPath } from "../util/AtPath";
import type { IndiciesForPath } from "../util/indicies";
import type { Paths } from "../util/Paths";
import type { GiveOpt } from "../util/predicates";
import type { AddNullSegments } from "../util/segments";

export type SetOption = <
  Infer,
  Path extends Paths<Infer>,
  Val extends AtPath<Infer, AddNullSegments<Path>, "no-traversals">
>(
  path: Path & string,
  ...args: [...indicies: IndiciesForPath<Path>, val: Val]
) => (obj: Infer) => GiveOpt<Infer, Path>;
