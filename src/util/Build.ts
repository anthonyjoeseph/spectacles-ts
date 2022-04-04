import { Option } from "fp-ts/Option";
import { Either, Left, Right } from "fp-ts/Either";
import type { AtPath } from "./AtPath";
import { IsRecord } from "./predicates";

type Operation = "augment" | "remove";

export type Build<
  Segments extends unknown[],
  Output,
  Original = unknown,
  NewKey extends string = string,
  Op extends Operation = "augment"
> = _Build<Segments, Output, Original, NewKey, Op>;

type _Build<
  Segments extends unknown[],
  Output,
  Original,
  NewKey extends string,
  Op extends Operation
> = Segments extends [...infer Init, infer Last]
  ? _Build<
      Init,
      BuildSegment<Extract<Last, string>, AtPath<Original, Init, "no-traversals">, Output, NewKey, Op>,
      Original,
      string,
      "augment"
    >
  : Output;

type BuildSegment<Segment extends string, Old, New, NewKey extends string, Op extends Operation> = unknown extends Old
  ? FromScratch<Segment, New>
  : Augment<Segment, Old, New, NewKey, Op>;

type FromScratch<Segment extends string, New> = OnSegment<
  Segment,
  {
    null: New | undefined | null;
    option: Option<New>;
    left: Either<New, never>;
    right: Either<never, New>;
    arrayIndex: New[];
    recordIndex: Record<string, New>;
    traversal: New[];
    sum: Segment extends `${infer Discriminant}:${string}`
      ? {
          readonly [K in Exclude<keyof New, Discriminant>]+?: New[K];
        } & { readonly [K in Discriminant]: string }
      : never;
    tuple: New[] & { readonly [K in Segment]: New };
    record: { readonly [K in Segment extends `(${infer Middle})` ? Middle : Segment]: New };
  }
>;

type Augment<Segment extends string, Old, New, NewKey extends string, Op extends Operation> = OnSegment<
  Segment,
  {
    null: New | (undefined extends Old ? undefined : never) | (null extends Old ? null : never);
    option: Option<New>;
    left: Either<New, Extract<Old, Right<unknown>>["right"]>;
    right: Either<Extract<Old, Left<unknown>>["left"], New>;
    arrayIndex: New[];
    recordIndex: Record<string, New>;
    traversal: New[];
    sum: Segment extends `${infer Discriminant}:${infer Member}`
      ?
          | {
              [K in Discriminant | keyof New]: K extends keyof New ? New[K] : Member;
            }
          | Exclude<Old, Record<Discriminant, Member>>
      : never;
    tuple: Segment extends `[${infer TupleKey}]` ? AugmentRecord<TupleKey, Old, New, NewKey, Op> : never;
    record: true extends IsRecord<Old>
      ? AugmentRecord<Segment extends `(${infer Middle})` ? Middle : Segment, Old, New, NewKey, Op>
      : never;
  }
>;

type AugmentRecord<Segment extends string, Old, New, NewKey extends string, Op extends Operation> = RecordSegment<
  NewKey,
  Op,
  {
    remove: {
      [K in Exclude<keyof Old, Segment>]: Old[K];
    };
    rename: { [K in Exclude<keyof Old, Segment>]: Old[K] } & { readonly [K in NewKey]: New };
    upsert: Segment extends keyof Old
      ? {
          [K in keyof Old]: K extends Segment ? New : K extends keyof Old ? Old[K] : never;
        }
      : Old & {
          readonly [K in Segment]: New;
        };
  }
>;

type OnSegment<
  S extends string,
  Handler extends {
    null: unknown;
    option: unknown;
    left: unknown;
    right: unknown;
    arrayIndex: unknown;
    recordIndex: unknown;
    traversal: unknown;
    sum: unknown;
    tuple: unknown;
    record: unknown;
  }
> = S extends `(${string}`
  ? Handler["record"]
  : S extends "?"
  ? Handler["null"]
  : S extends "?some"
  ? Handler["option"]
  : S extends "?left"
  ? Handler["left"]
  : S extends "?right"
  ? Handler["right"]
  : S extends `${string}:${string}`
  ? Handler["sum"]
  : S extends "[number]"
  ? Handler["arrayIndex"]
  : S extends "[string]"
  ? Handler["recordIndex"]
  : S extends "[]>"
  ? Handler["traversal"]
  : S extends "{}>"
  ? Handler["traversal"]
  : S extends `[${string}]`
  ? Handler["tuple"]
  : Handler["record"];

type RecordSegment<
  NewKey extends string,
  Op extends Operation,
  Handler extends {
    remove: unknown;
    rename: unknown;
    upsert: unknown;
  }
> = Op extends "remove" ? Handler["remove"] : string extends NewKey ? Handler["upsert"] : Handler["rename"];
