import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import type { IndiciesForPath } from "../util/indicies";

export type Upsert = <Infer, Path extends Paths<Infer, "upsert">, Final extends string, Val>(
  path: Path & string,
  final: Final,
  ...args: [...indicies: IndiciesForPath<Path>, val: Val]
) => (a: Infer) => Build<`${Extract<Path, string>}.${Final}`, Val, Infer>;
