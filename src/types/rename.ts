import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import { AtPath } from "../util/AtPath";
import { Segments } from "../util/segments";

export type Rename = <
  Infer,
  Path extends Paths<Infer, "dynamic">,
  NewKey extends string,
  S extends unknown[] = Segments<Path>
>(
  fullPath: Path & string,
  newKey: NewKey
) => (a: Infer) => Build<S, AtPath<Infer, S>, Infer, NewKey>;
