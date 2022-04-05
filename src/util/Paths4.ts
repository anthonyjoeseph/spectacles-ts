import type { Option, Some } from "fp-ts/Option";
import type { Either, Left, Right } from "fp-ts/Either";
import type { IsNull, IsRecord, IsNonTupleArray, TupleKeyof, IsNonStructRecord } from "./predicates";
import { EscapeSpecialChars } from "./segments";
import type { Cases, Discriminant } from "./sum";
import { Data, SimpleData } from "../../test/shared";

type a = Paths<SimpleData>;

export type Paths<A, Op extends Operation = "static"> = _Paths<{ path: ""; atPath: A }>;

type _Paths<A extends { path: string; atPath: unknown }, Acc extends string = ""> = {
  path: any;
  atPath: any;
} extends A
  ? _Paths<BubbleUp<A>, `${Acc}1`>
  : Acc;

type BubbleUp<A extends { path: string; atPath: unknown }> = A extends unknown
  ? true extends IsNull<A["atPath"]>
    ? {
        path: `${A["path"]}${A["path"] extends "" ? "" : "."}?`;
        atPath: NonNullable<A["atPath"]>;
      }
    : Discriminant<A["atPath"]> extends never
    ? [A["atPath"]] extends [readonly unknown[]]
      ? TupleKeyof<A["atPath"]> extends never
        ? {
            path: `${A["path"]}${A["path"] extends "" ? "" : "."}${"[]>" | "[number]"}`;
            atPath: A["atPath"][number];
          }
        : {
            [K in TupleKeyof<A["atPath"]>]: {
              path: `${A["path"]}${A["path"] extends "" ? "" : "."}[${Extract<K, string>}]`;
              atPath: A["atPath"][K];
            };
          }[TupleKeyof<A["atPath"]>]
      : string extends keyof A["atPath"]
      ? {
          path: `${A["path"]}${A["path"] extends "" ? "" : "."}${"[string]" | "{}>"}`;
          atPath: Extract<A["atPath"], Record<string, unknown>>[string];
        }
      : true extends IsRecord<A["atPath"]>
      ? {
          [K in keyof A["atPath"]]: {
            path: `${A["path"]}${A["path"] extends "" ? "" : "."}${EscapeSpecialChars<Extract<K, string>>}`;
            atPath: A["atPath"][K];
          };
        }[keyof A["atPath"]]
      : never
    : Option<any> extends A["atPath"]
    ? {
        path: `${A["path"]}${A["path"] extends "" ? "" : "."}?some`;
        atPath: Extract<A["atPath"], Some<unknown>>["value"];
      }
    : Either<any, any> extends A["atPath"]
    ?
        | {
            path: `${A["path"]}${A["path"] extends "" ? "" : "."}?left`;
            atPath: Extract<A["atPath"], Left<unknown>>["left"];
          }
        | {
            path: `${A["path"]}${A["path"] extends "" ? "" : "."}?right`;
            atPath: Extract<A["atPath"], Right<unknown>>["right"];
          }
    : BubbleSum<A>
  : never;

type BubbleSum<
  A extends { path: string; atPath: unknown },
  Case extends { tag: string; cases: string } = Extract<Cases<A["atPath"]>, { tag: string; cases: string }>
> = Case extends unknown
  ? {
      [K in Case["tag"]]: {
        [K2 in Case["cases"]]: {
          path: `${A["path"]}${A["path"] extends "" ? "" : "."}${Extract<K, string>}:${Extract<K2, string>}`;
          atPath: Omit<Extract<A["atPath"], { [_ in K]: K2 }>, K>;
        };
      }[Case["cases"]];
    }[Case["tag"]]
  : never;

type Operation = "static" | "dynamic" | "upsert";
type Type = { a: { b: number; c: boolean }; d: { e: { f: string } } };

type t1 = { path: ""; atPath: Type };

type t2 = BubbleUp<t1>;
type t3 = BubbleUp<t2>;
type t4 = BubbleUp<t3>;

type t5 = t1["path"] | t2["path"] | t3["path"] | t4["path"];
type t6 = Paths<Type>;
