import type { AtPath } from "../util/AtPath";
import { IndiciesForPath } from "../util/indicies";
import type { Paths } from "../util/Paths";
import { Segments } from "../util/segments";

export type Set = <
  Infer,
  Path extends Paths<Infer>,
  Val extends AtPath<Infer, S, "no-traversals">,
  S extends unknown[] = Segments<Path>
>(
  path: Path & string,
  ...args: [...indicies: IndiciesForPath<S>, val: Val]
) => (obj: Infer) => Infer;
