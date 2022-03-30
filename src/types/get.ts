import type { Option } from "fp-ts/Option";
import type { AtPath } from "../util/AtPath";
import type { Build } from "../util/Build";
import type { Paths } from "../util/Paths";
import type { GiveOpt, HasOptional } from "../util/predicates";
import { AddNullSegments } from "../util/segments";

export type Get = <
  Infer,
  Path extends unknown extends Infer ? string : Paths<Infer>,
  Ret extends unknown extends Infer ? unknown : GiveOpt<AtPath<Infer, AddNullSegments<Path>>, AddNullSegments<Path>>
>(
  path: Path & string
) => unknown extends Infer
  ? unknown extends Ret
    ? <Constructed extends Build<Path, unknown>>(
        obj: Constructed
      ) => GiveOpt<AtPath<Constructed, AddNullSegments<Path>>, AddNullSegments<Path>>
    : true extends HasOptional<Path>
    ? (obj: Build<Path, [Ret] extends [Option<infer A>] ? A : unknown>) => Ret
    : (obj: Build<Path, Ret>) => Ret
  : (obj: Infer) => Ret;
