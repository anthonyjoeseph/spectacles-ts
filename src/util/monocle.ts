import { pipe } from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray";
import * as R from "fp-ts/ReadonlyRecord";
import { Ord as StringOrd } from "fp-ts/string";
import * as L from "monocle-ts/lib/Lens";
import * as Op from "monocle-ts/lib/Optional";
import * as Tr from "monocle-ts/lib/Traversal";

export const isPathLens = (path: string): boolean =>
  !split(path).some(
    (s) =>
      ["?", "?some", "?left", "right", "[]>", "{}>", "[number]"].includes(s) || (!s.startsWith("(") && s.includes(":"))
  );

export const isPathTraversal = (path: string): boolean => split(path).some((s) => ["[]>", "{}>"].includes(s));

const lastSegment = (path: string): string => {
  if (path === "") {
    return path;
  }
  const escapeable = path.match(/\((.*)\*(.*)\)$/);
  if (escapeable) {
    return escapeable[2] as string;
  }
  const escapeable2 = path.match(/\((.*)\)$/);
  if (escapeable2) {
    return escapeable2[0] as string;
  }
  const finalSegment = path.match(/(.*)\.(.*)/);
  if (finalSegment) {
    return finalSegment[2] as string;
  }
  return path;
};

const initSegment = (path: string): string => {
  if (path === "") {
    return path;
  }
  const escapeable = path.match(/(.*)\.\((.*)\*(.*)\)$/);
  if (escapeable) {
    return escapeable[1] as string;
  }
  return path.substring(0, path.lastIndexOf(lastSegment(path)) - 1);
};

const splitIntoSegments = (path: string, acc: string[] = []): string[] => {
  const init = initSegment(path);
  const last = lastSegment(path);
  if (init === "") {
    return [last, ...acc];
  }
  return splitIntoSegments(init, [last, ...acc]);
};

const split = (path: string): string[] => {
  const segments = splitIntoSegments(path, []);
  return segments.flatMap((segment) => {
    if (
      segment.includes("?some") ||
      segment.includes("?left") ||
      segment.includes("?right") ||
      !segment.includes("?")
    ) {
      return [segment];
    } else {
      const before = segment.substring(0, segment.length - 1);
      if (before.length > 0) {
        return [before, "?"];
      }
      return ["?"];
    }
  });
};

export const optionalFromPath = (path: string, _indicies: unknown[]): Op.Optional<any, any> => {
  const indicies = [..._indicies];
  const opt = split(path).reduce((acc, cur) => {
    if (cur === "?") {
      return pipe(acc, Op.fromNullable);
    } else if (cur === "?some") {
      return pipe(acc, Op.some);
    } else if (cur === "?left") {
      return pipe(acc, Op.left);
    } else if (cur === "?right") {
      return pipe(acc, Op.left);
    } else if (cur === "[number]") {
      return pipe(acc, Op.index(indicies.shift() as number));
    } else if (cur === "[string]") {
      return pipe(acc, Op.key(indicies.shift() as string));
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

export const traversalFromPath = (path: string, _indicies: unknown[]): Tr.Traversal<any, any> => {
  const indicies = [..._indicies];
  const opt = split(path).reduce((acc, cur) => {
    if (cur === "?") {
      return pipe(acc, Tr.fromNullable);
    } else if (cur === "?some") {
      return pipe(acc, Tr.some);
    } else if (cur === "?left") {
      return pipe(acc, Tr.left);
    } else if (cur === "?right") {
      return pipe(acc, Tr.left);
    } else if (cur === "[number]") {
      return pipe(acc, Tr.index(indicies.shift() as number));
    } else if (cur === "[string]") {
      return pipe(acc, Tr.key(indicies.shift() as string));
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
  const lens = split(path).reduce((acc, cur) => {
    if (cur.includes("[") && cur.includes("]") && cur.indexOf("[") < cur.indexOf("]")) {
      const component = cur.substring(cur.indexOf("[") + 1, cur.indexOf("]"));
      return pipe(acc, L.component(Number.parseInt(component, 10)));
    }
    return pipe(acc, L.prop(cur));
  }, L.id<any>());
  return lens;
};
