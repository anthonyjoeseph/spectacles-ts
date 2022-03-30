import { expectType } from "tsd";
import { pipe } from "fp-ts/function";

import { get } from "../../src";

const specialCharKeys = pipe(
  {
    "": {
      "colon:char": {
        "end?": {
          "?front": {
            "middle?middle": {
              "[]>": {
                "{}>": {
                  "ending).parenthesis": 123,
                },
              },
            },
          },
        },
      },
    },
  },
  get("().(colon:char).(end?).(?front).(middle?middle).([]>).({}>).((*ending).parenthesis)")
);
expectType<number>(specialCharKeys);
