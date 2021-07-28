import type { HasOpt, Unopt } from "./utils";

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
              ? true extends HasOpt<Key>
                ? BuildObj<Rest, { [k in Unopt<Key>]?: Obj }>
                : BuildObj<Rest, { [k in Unopt<Key>]: Obj }>
              : never
            : never