import { pipe } from "fp-ts/function";
import { setOption as setOptionOp } from "monocle-ts/Optional";
import { isPathLens, lensFromPath, optionalFromPath } from "../util/monocle";
import { SetOption } from "../types/setOption";

export const setOption: SetOption = (path: string, val: unknown) => (obj: unknown) => {
  if (isPathLens(path as any)) {
    return lensFromPath(path as any).set(val)(obj) as any;
  }
  return pipe(optionalFromPath(path as any), setOptionOp(val))(obj) as any;
};
