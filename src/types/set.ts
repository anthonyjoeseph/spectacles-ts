import type { AtPath } from "../util/AtPath";
import { IndiciesForPath } from "../util/indicies";
import type { Paths } from "../util/Paths";
import { AddNullSegments } from "../util/segments";

export type Set = <Infer, Path extends Paths<Infer>, Val extends AtPath<Infer, AddNullSegments<Path>, "no-traversals">>(
  path: Path & string,
  ...args: [...IndiciesForPath<Path>, Val]
) => (obj: Infer) => Infer;
