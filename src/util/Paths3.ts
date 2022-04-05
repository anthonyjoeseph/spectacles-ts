import type { Option, Some } from "fp-ts/Option";
import type { Either, Left, Right } from "fp-ts/Either";
import type { IsNull, IsRecord, IsNonTupleArray, TupleKeyof, IsNonStructRecord } from "./predicates";
import { EscapeSpecialChars } from "./segments";
import type { Cases, Discriminant } from "./sum";
import { Data, SimpleData } from "../../test/shared";

type Join<S extends unknown[], Acc extends string = ""> = S extends [infer First, ...infer Tail]
  ? Join<Tail, Acc extends "" ? Extract<First, string> : `${Acc}.${Extract<First, string>}`>
  : Acc;

type a = Paths<Data>;

export type Paths<A, Op extends Operation = "static"> = _Paths<{ path: []; atPath: A }>;

type _Paths<
  A extends { path: unknown[]; atPath: unknown },
  Acc extends unknown[] = never,
  Bubbled extends { path: unknown[]; atPath: unknown } = BubbleUp<A>
> = Bubbled["path"] extends never ? Acc | A["path"] : _Paths<Bubbled, Acc | A["path"]>;

type BubbleUp<A extends { path: unknown[]; atPath: unknown }> = A extends unknown
  ? true extends IsNull<A["atPath"]>
    ? {
        path: [...A["path"], "?"];
        atPath: NonNullable<A["atPath"]>;
      }
    : Discriminant<A["atPath"]> extends never
    ? [A["atPath"]] extends [readonly unknown[]]
      ? TupleKeyof<A["atPath"]> extends never
        ? {
            path: [...A["path"], "[]>"] | [...A["path"], "[number]"];
            atPath: A["atPath"][number];
          }
        : {
            [K in TupleKeyof<A["atPath"]>]: {
              path: [...A["path"], `[${Extract<K, string>}]`];
              atPath: A["atPath"][K];
            };
          }[TupleKeyof<A["atPath"]>]
      : string extends keyof A["atPath"]
      ? {
          path: [...A["path"], "{}>"] | [...A["path"], "[string]"];
          atPath: Extract<A["atPath"], Record<string, unknown>>[string];
        }
      : true extends IsRecord<A["atPath"]>
      ? {
          [K in keyof A["atPath"]]: {
            path: [...A["path"], EscapeSpecialChars<Extract<K, string>>];
            atPath: A["atPath"][K];
          };
        }[keyof A["atPath"]]
      : never
    : Option<any> extends A["atPath"]
    ? {
        path: [...A["path"], "?some"];
        atPath: Extract<A["atPath"], Some<unknown>>["value"];
      }
    : Either<any, any> extends A["atPath"]
    ?
        | {
            path: [...A["path"], "?left"];
            atPath: Extract<A["atPath"], Left<unknown>>["left"];
          }
        | {
            path: [...A["path"], "?right"];
            atPath: Extract<A["atPath"], Right<unknown>>["right"];
          }
    : BubbleSum<A>
  : never;

type BubbleSum<
  A extends { path: unknown[]; atPath: unknown },
  Case extends { tag: string; cases: string } = Extract<Cases<A["atPath"]>, { tag: string; cases: string }>
> = Case extends unknown
  ? {
      [K in Case["tag"]]: {
        [K2 in Case["cases"]]: {
          path: [...A["path"], `${Extract<K, string>}:${Extract<K2, string>}`];
          atPath: Omit<Extract<A["atPath"], { [_ in K]: K2 }>, K>;
        };
      }[Case["cases"]];
    }[Case["tag"]]
  : never;

type Operation = "static" | "dynamic" | "upsert";
type Type = { a: { b: number; c: boolean }; d: { e: { f: string } } };

type t1 = { path: []; atPath: Type };

type t2 = BubbleUp<t1>;
type t3 = BubbleUp<t2>;
type t4 = BubbleUp<t3>;

type t5 = t1["path"] | t2["path"] | t3["path"] | t4["path"];
type t6 = Paths<Type>;
