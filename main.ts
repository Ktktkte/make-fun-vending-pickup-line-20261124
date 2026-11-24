import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
// The pickup line lives next to this script, never in the working directory.
const pickupLine = readFileSync(join(here, "entry.txt"), "utf8");

// Gate: exactly one line, 1-200 characters, as the competition requires.
if (pickupLine.length < 1 || pickupLine.length > 200) {
  throw new Error("entry must be 1-200 characters");
}
if (pickupLine.includes("\n")) {
  throw new Error("entry must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), pickupLine);
