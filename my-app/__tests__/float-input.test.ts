import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

const floatInputPath = path.resolve(process.cwd(), "components/ui/float-input.tsx");
const floatInputDemoPath = path.resolve(process.cwd(), "components/ui/float-input-demo.tsx");

test("FloatInput component exists and exports default function with accessible attributes", () => {
  const source = fs.readFileSync(floatInputPath, "utf8");
  assert.match(source, /export default function FloatInput\(/);
  assert.match(source, /aria-label=\{label\}/);
  assert.match(source, /htmlFor=\{inputId\}/);
});

test("FloatInputDemo component exists and exports FloatInputDemo", () => {
  const source = fs.readFileSync(floatInputDemoPath, "utf8");
  assert.match(source, /export function FloatInputDemo\(/);
  assert.match(source, /import FloatInput from "@\/components\/ui\/float-input"/);
});
