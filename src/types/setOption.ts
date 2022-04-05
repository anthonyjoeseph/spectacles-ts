import type { AtPath } from "../util/AtPath";
import type { IndiciesForPath } from "../util/indicies";
import type { Paths } from "../util/Paths";
import type { GiveOpt } from "../util/predicates";
import type { Segments } from "../util/segments";

export type SetOption = <
  Infer,
  Path extends Paths<Infer>,
  Val extends AtPath<Infer, S, "no-traversals">,
  S extends unknown[] = Segments<Path>
>(
  path: Path & string,
  ...args: [...indicies: IndiciesForPath<S>, val: Val]
) => (obj: Infer) => GiveOpt<Infer, S>;
