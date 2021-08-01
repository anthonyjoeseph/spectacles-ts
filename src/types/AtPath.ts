export type AtPath<
  A,
  Args extends readonly unknown[]
> = 
  Args extends readonly []
    ? A
    : Args extends readonly [infer Key, ...infer Rest]
      ? Key extends (a: any) => a is infer A
        ? AtPath<A, Rest>
        : Key extends readonly (keyof A)[]
          ? { [P in Key[number]]: A[P] }
          : Key extends number
            ? A extends unknown[] ? AtPath<A[number], Rest> : never
            : Key extends '?'
              ? AtPath<NonNullable<A>, Rest>
              : Key extends keyof A
                ? AtPath<A[Key], Rest>
                : never
      : never