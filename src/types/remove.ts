import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";

export type Remove = <Infer, Path extends Paths<Infer, "dynamic">>(
  fullPath: Path & string
) => (a: Infer) => Build<Path, unknown, Infer, string, "remove">;
