import { isPathLens, lensFromPath, optionalFromPath } from "../util/monocle";
import { Get } from "../types/get";

export const get: Get = (path: string) => {
  if (isPathLens(path as any)) {
    return lensFromPath(path as any).get as any;
  }
  return optionalFromPath(path as any).getOption as any;
};
