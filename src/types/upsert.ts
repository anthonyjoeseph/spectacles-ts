import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { IndiciesForPath } from "../util/indicies";
import { Segments } from "../util/segments";

export type Upsert = <
  Infer,
  Path extends Paths<Infer, "upsert">,
  Final extends string,
  Val,
  S extends unknown[] = Segments<Path>
>(
  path: Path & string,
  final: Final,
  ...args: [...indicies: IndiciesForPath<S>, val: Val]
) => (a: Infer) => Build<[...S, Final], Val, Infer>;
