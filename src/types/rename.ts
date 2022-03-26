import type { Paths } from "../util/Paths";
import type { Build } from "../util/Build";
import { AtPath } from "../util/AtPath";
import { AddDots } from "../util/segments";

export type Rename = <Infer, Path extends Paths<Infer, "dynamic">, NewKey extends string>(
  fullPath: Path & string,
  newKey: NewKey
) => (a: Infer) => Build<Path, AtPath<Infer, AddDots<Path>>, Infer, NewKey>;
