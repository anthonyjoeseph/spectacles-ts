import type { AtPath } from "./AtPath";
import { IsRecord } from "./predicates";
import { InitSegment, LastSegment } from "./segments";
// credit to Joe Calzaretta
// from https://stackoverflow.com/a/70526775
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "";
type NonZero = Exclude<Digit, "0" | "">;
type LessThanAThousand = "0" | `${NonZero}${Digit}${Digit}`;

type Operation = "augment" | "remove";

export type Build<
  Path extends string,
  Output,
  Original = unknown,
  NewKey extends string = string,
  Op extends Operation = "augment"
> = Path extends ""
  ? Output
  : Build<
      InitSegment<Path>,
      BuildSegment<LastSegment<Path>, AtPath<Original, InitSegment<Path>>, Output, NewKey, Op>,
      Original,
      string,
      "augment"
    >;

type BuildSegment<Segment extends string, Old, New, NewKey extends string, Op extends Operation> = unknown extends Old
  ? FromScratch<Segment, New>
  : Augment<Segment, Old, New, NewKey, Op>;

type FromScratch<Segment extends string, New> = OnSegment<
  Segment,
  {
    null: New | undefined | null;
    sum: Segment extends `${infer Discriminant}:${string}`
      ? {
          [K in Exclude<keyof New, Discriminant>]+?: New[K];
        } & { [K in Discriminant]: string }
      : never;
    record: Segment extends LessThanAThousand ? New[] & { [K in Segment]: New } : { readonly [K in Segment]: New };
  }
>;

type Augment<Segment extends string, Old, New, NewKey extends string, Op extends Operation> = OnSegment<
  Segment,
  {
    null: New | (undefined extends Old ? undefined : never) | (null extends Old ? null : never);
    sum: Segment extends `${infer Discriminant}:${infer Member}`
      ?
          | {
              [K in Discriminant | keyof New]: K extends keyof New ? New[K] : Member;
            }
          | Exclude<Old, Record<Discriminant, Member>>
      : never;
    record: true extends IsRecord<Old> ? AugmentRecord<Segment, Old, New, NewKey, Op> : never;
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
    sum: unknown;
    record: unknown;
  }
> = S extends "?" ? Handler["null"] : S extends `${string}:${string}` ? Handler["sum"] : Handler["record"];

type RecordSegment<
  NewKey extends string,
  Op extends Operation,
  Handler extends {
    remove: unknown;
    rename: unknown;
    upsert: unknown;
  }
> = Op extends "remove" ? Handler["remove"] : string extends NewKey ? Handler["upsert"] : Handler["rename"];
