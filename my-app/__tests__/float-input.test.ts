import test from "node:test";
import assert from "node:assert";
import FloatInput from "../components/ui/float-input";
import { FloatInputDemo } from "../components/ui/float-input-demo";

test("FloatInput component is defined and is a callable component function", () => {
  assert.strictEqual(typeof FloatInput, "function");
});

test("FloatInputDemo component is defined and is a callable function", () => {
  assert.strictEqual(typeof FloatInputDemo, "function");
});
