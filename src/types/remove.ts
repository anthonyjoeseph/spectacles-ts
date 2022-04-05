import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import { Segments } from "../util/segments";

export type Remove = <Infer, Path extends Paths<Infer, "dynamic">>(
  fullPath: Path & string
) => (a: Infer) => Build<Segments<Path>, unknown, Infer, string, "remove">;
