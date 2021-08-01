export type BuildObj<
  Path extends readonly unknown[],
  Obj
> = 
  Path extends []
    ? Obj
    : Path extends [...infer Rest, infer Key]
      ? Key extends readonly string[]
        ? unknown extends Obj 
          ? BuildObj<Rest, { [P in Key[number]]: unknown }>
          : BuildObj<Rest, Obj>
        : Key extends number
          ? BuildObj<Rest, Obj[]>
          : Key extends string 
              ? Key extends '?'
                ? BuildObj<Rest, Obj | undefined>
                : BuildObj<Rest, { [k in Key]: Obj }>
              : never
            : never