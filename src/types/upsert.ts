import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";

export type Upsert = <Infer, Path extends Paths<Infer, "upsert">, Final extends string, Val>(
  path: Path & string,
  final: Final,
  val: Val
) => (a: Infer) => Build<`${Extract<Path, string>}.${Final}`, Val, Infer>;
