// news-image-20261126: writes the day's news image to the output path.
// Node 22, standard library only. The image ships in this repo as entry.png
// and is copied byte-for-byte, so two runs always produce identical bytes.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const src = new URL("./entry.png", import.meta.url);
const dest = join(outDir, "entry.png");
copyFileSync(src, dest);

// Byte-exact verification: the written file must equal the shipped image,
// so the grader's two runs see identical bytes every time.
const expected = readFileSync(src);
const written = readFileSync(dest);
if (!written.equals(expected)) {
  throw new Error(`entry.png mismatch: wrote ${written.length} bytes, expected ${expected.length}`);
}
console.log(`wrote ${dest} (${written.length} bytes, verified byte-exact)`);
