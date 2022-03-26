import { pipe } from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray";
import * as R from "fp-ts/ReadonlyRecord";
import { Ord as StringOrd } from "fp-ts/string";
import * as L from "monocle-ts/lib/Lens";
import * as Op from "monocle-ts/lib/Optional";
import * as Tr from "monocle-ts/lib/Traversal";

export const isPathLens = (path: string): boolean =>
  !path.includes("?") &&
  !path.includes(":") &&
  !path.includes("?some") &&
  !path.includes("?left") &&
  !path.includes("?right") &&
  !path.includes("[]>") &&
  !path.includes("{}>");

export const isPathTraversal = (path: string): boolean => path.includes("[]>") || path.includes("{}>");

export const optionalFromPath = (path: string): Op.Optional<any, any> => {
  const opt = path.split(".").reduce((acc, cur) => {
    if (cur === "?") {
      return pipe(acc, Op.fromNullable);
    } else if (cur === "?some") {
      return pipe(acc, Op.some);
    } else if (cur === "?left") {
      return pipe(acc, Op.left);
    } else if (cur === "?right") {
      return pipe(acc, Op.left);
    } else if (cur.includes("[") && cur.includes("]") && cur.indexOf("[") < cur.indexOf("]")) {
      const component: number = Number.parseInt(cur.substring(cur.indexOf("[") + 1, cur.indexOf("]")), 10);
      return pipe(acc, Op.component(component));
    } else if (cur.includes(":")) {
      const i = cur.indexOf(":");
      const discriminant = cur.substring(0, i);
      const member = cur.substring(i + 1, cur.length);
      return pipe(
        acc,
        Op.filter((a) => a[discriminant] === member)
      );
    }
    return pipe(acc, Op.prop(cur));
  }, Op.id<any>());
  return opt;
};

export const traversalFromPath = (path: string): Tr.Traversal<any, any> => {
  const opt = path.split(".").reduce((acc, cur) => {
    if (cur === "?") {
      return pipe(acc, Tr.fromNullable);
    } else if (cur === "?some") {
      return pipe(acc, Tr.some);
    } else if (cur === "?left") {
      return pipe(acc, Tr.left);
    } else if (cur === "?right") {
      return pipe(acc, Tr.left);
    } else if (cur === "[]>") {
      const a = pipe(acc, Tr.traverse(A.Traversable));
      return a;
    } else if (cur === "{}>") {
      const a = pipe(acc, Tr.traverse(R.getTraversable(StringOrd)));
      return a;
    } else if (cur.includes("[") && cur.includes("]") && cur.indexOf("[") < cur.indexOf("]")) {
      const component: number = Number.parseInt(cur.substring(cur.indexOf("[") + 1, cur.indexOf("]")), 10);
      return pipe(acc, Tr.component(component));
    } else if (cur.includes(":")) {
      const i = cur.indexOf(":");
      const discriminant = cur.substring(0, i);
      const member = cur.substring(i + 1, cur.length);
      return pipe(
        acc,
        Tr.filter((a) => a[discriminant] === member)
      );
    }
    return pipe(acc, Tr.prop(cur));
  }, Tr.id<any>());
  return opt;
};

export const lensFromPath = (path: string): L.Lens<any, any> => {
  const lens = path.split(".").reduce((acc, cur) => {
    if (cur.includes("[") && cur.includes("]") && cur.indexOf("[") < cur.indexOf("]")) {
      const component = cur.substring(cur.indexOf("[") + 1, cur.indexOf("]"));
      return pipe(acc, L.component(Number.parseInt(component, 10)));
    }
    return pipe(acc, L.prop(cur));
  }, L.id<any>());
  return lens;
};
