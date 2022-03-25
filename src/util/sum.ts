type EnforceLiteral<A> = A extends string ? (string extends A ? never : A) : never;

export type Discriminant<A extends B, B = A> = A extends Record<string, any>
  ? [B] extends [A]
    ? never
    : [keyof A & keyof B] extends [never]
    ? never
    : EnforceLiteral<keyof A & keyof B>
  : never;

type Members<A, Discriminant extends string> = Extract<A, { [K in Discriminant]: unknown }>[Discriminant];

export type Cases<A, Dis extends string | number = Discriminant<A>> = Dis extends string
  ? {
      tag: Dis;
      cases: Members<A, Dis>;
    }
  : never;
