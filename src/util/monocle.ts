import { pipe } from "fp-ts/function";
import { fromString } from "fp-ts-std/Number";
import { match } from "fp-ts/Option";
import * as L from "monocle-ts/lib/Lens";
import * as Op from "monocle-ts/lib/Optional";

export const isPathLens = (path: string): boolean => !path.includes("?") && !path.includes(":");

export const optionalFromPath = (path: string): Op.Optional<any, any> => {
  const opt = path.split(".").reduce((acc, cur, index) => {
    if (cur === "?") {
      return pipe(acc, Op.fromNullable);
    } else if (cur.includes(":")) {
      const i = cur.indexOf(":");
      const discriminant = cur.substring(0, i);
      const member = cur.substring(i + 1, cur.length);
      return pipe(
        acc,
        Op.filter((a) => a[discriminant] === member)
      );
    }
    return pipe(
      fromString(cur as string),
      match(
        () => (path[index - 1] === "?key" ? pipe(acc, Op.key(cur as string)) : pipe(acc, Op.prop(cur as string))),
        (tupleIndex) => pipe(acc, Op.component(tupleIndex))
      )
    );
  }, Op.id<any>());
  return opt;
};

export const lensFromPath = (path: string): L.Lens<any, any> => {
  const lens = path.split(".").reduce((acc, cur) => {
    return pipe(
      fromString(cur as string),
      match(
        () => pipe(acc, L.prop(cur as string)),
        (tupleIndex) => pipe(acc, L.component(tupleIndex))
      )
    );
  }, L.id<any>());
  return lens;
};
