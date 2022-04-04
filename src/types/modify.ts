import type { Paths } from "../util/Paths";
import type { AtPath } from "../util/AtPath";
import type { AddNullSegments } from "../util/segments";
import type { IndiciesForPath } from "../util/indicies";

export type Modify = <Infer, Path extends Paths<Infer>, Indicies extends unknown[] = IndiciesForPath<Path>>(
  path: Path & string,
  ...args: [
    ...indicies: Indicies,
    modFunc: (
      v: AtPath<Infer, AddNullSegments<Path>, "no-traversals">
    ) => AtPath<Infer, AddNullSegments<Path>, "no-traversals">
  ]
) => (a: Infer) => Infer;
