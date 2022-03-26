type EnforceLiteral<A> = string extends A ? never : true;

export type Discriminant<A extends B, B = A> = A extends Record<string, any>
  ? [B] extends [A]
    ? never
    : [keyof A & keyof B] extends [never]
    ? never
    : true extends EnforceLiteral<A[keyof A & keyof B]>
    ? Extract<keyof A & keyof B, string>
    : true extends EnforceLiteral<B[keyof A & keyof B]>
    ? Extract<keyof A & keyof B, string>
    : never
  : never;

type Members<A, Discriminant extends string> = Extract<A, { [K in Discriminant]: unknown }>[Discriminant];

export type Cases<A, Dis extends string | number = Discriminant<A>> = Dis extends string
  ? {
      tag: Dis;
      cases: Members<A, Dis>;
    }
  : never;
