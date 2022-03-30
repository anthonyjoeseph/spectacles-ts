// We can't run tsd thru the cli b/c we need to give it a typingsFile
// https://github.com/SamVerschueren/tsd/pull/93

import tsd from "tsd";
import formatter from "tsd/dist/lib/formatter";

(async function () {
  try {
    const diagnostics = await tsd({
      cwd: process.cwd(),
      typingsFile: "dist/index.d.ts",
    });

    if (diagnostics.length > 0) {
      throw new Error(formatter(diagnostics));
    }
  } catch (error: unknown) {
    if (error && typeof (error as Error).message === "string") {
      console.error((error as Error).message);
    }

    process.exit(1);
  }
})();
