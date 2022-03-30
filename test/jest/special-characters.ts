import * as assert from "assert";
import { pipe } from "fp-ts/function";

import { get } from "../../src";

describe("special characters", () => {
  it("uses an escaped path", () => {
    const specialCharKeys = pipe(
      {
        "": {
          "colon:char": {
            "end?": {
              "?front": {
                "middle?middle": {
                  "[]>": {
                    "{}>": 123,
                  },
                },
              },
            },
          },
        },
      },
      get("().(colon:char).(end?).(?front).(middle?middle).([]>)")
    );
    assert.deepStrictEqual(specialCharKeys, 123);
  });
});
