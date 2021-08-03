import type { Option } from 'fp-ts/Option'
import type { Either } from 'fp-ts/Either'

export type BuildObj<Path extends readonly unknown[], Obj> = Path extends []
  ? Obj
  : Path extends [...infer Rest, infer Key]
  ? Key extends (a: any) => boolean
    ? BuildObj<Rest, Obj | unknown>
    : Key extends readonly string[]
    ? unknown extends Obj
      ? BuildObj<Rest, { [P in Key[number]]: unknown }>
      : BuildObj<Rest, Obj>
    : Key extends number
    ? BuildObj<Rest, Obj[]>
    : Key extends string
    ? Key extends '?'
      ? BuildObj<Rest, Obj | undefined | null>
      : Key extends '?some'
      ? BuildObj<Rest, Option<Obj>>
      : Key extends '?left'
      ? BuildObj<Rest, Either<Obj, unknown>>
      : Key extends '?right'
      ? BuildObj<Rest, Either<unknown, Obj>>
      : BuildObj<Rest, { [k in Key]: Obj }>
    : never
  : never
