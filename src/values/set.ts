import { isPathLens, lensFromPath, optionalFromPath } from "../util/monocle";
import { Set } from "../types/set";

export const set: Set = (path: string, val: unknown) => (obj: unknown) => {
  if (isPathLens(path as any)) {
    return lensFromPath(path as any).set(val)(obj);
  }
  return optionalFromPath(path as any).set(val)(obj);
};
