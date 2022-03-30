import type { AtPath } from "../util/AtPath";
import type { Paths } from "../util/Paths";
import { AddNullSegments } from "../util/segments";

export type Set = <Infer, Path extends Paths<Infer>>(path: Path & string, val: unknown) => (obj: Infer) => Infer;
