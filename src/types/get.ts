import type { Some } from "fp-ts/Option";
import type { AtPath } from "../util/AtPath";
import type { Build } from "../util/Build";
import type { Paths } from "../util/Paths";
import type { GiveOpt, HasOptional } from "../util/predicates";
import { AddDots } from "../util/segments";

export type Get = <
  Infer,
  Path extends unknown extends Infer ? string : Paths<Infer>,
  Ret extends unknown extends Infer ? unknown : GiveOpt<AtPath<Infer, AddDots<Path>>, AddDots<Path>>
>(
  path: Path & string
) => unknown extends Infer
  ? unknown extends Ret
    ? <Constructed extends Build<Path, unknown>>(
        obj: Constructed
      ) => GiveOpt<AtPath<Constructed, AddDots<Path>>, AddDots<Path>>
    : true extends HasOptional<Path>
    ? (obj: Build<Path, OptionType<Ret>>) => Ret
    : (obj: Build<Path, Ret>) => Ret
  : (obj: Infer) => Ret;

type OptionType<S> = Extract<S, Some<unknown>>["value"];
