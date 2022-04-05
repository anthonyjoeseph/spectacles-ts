import type { Option } from "fp-ts/Option";
import type { AtPath } from "../util/AtPath";
import type { Build } from "../util/Build";
import type { IndiciesForPath } from "../util/indicies";
import type { Paths } from "../util/Paths";
import type { GiveOpt, HasOptional } from "../util/predicates";
import type { Segments } from "../util/segments";

export type Get = <
  Infer,
  Path extends unknown extends Infer ? string : Paths<Infer>,
  Ret extends unknown extends Infer ? unknown : GiveOpt<AtPath<Infer, S>, S>,
  S extends unknown[] = Segments<Path>
>(
  path: Path & string,
  ...indicies: IndiciesForPath<S>
) => unknown extends Infer
  ? unknown extends Ret
    ? <Constructed extends Build<S, unknown>>(obj: Constructed) => GiveOpt<AtPath<Constructed, S>, S>
    : true extends HasOptional<S>
    ? (obj: Build<S, [Ret] extends [Option<infer A>] ? A : unknown>) => Ret
    : (obj: Build<S, Ret>) => Ret
  : (obj: Infer) => Ret;
