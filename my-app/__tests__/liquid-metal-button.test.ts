import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

const liquidButtonPath = path.resolve(process.cwd(), "components/ui/liquid-metal-button.tsx");
const integrationHeroPath = path.resolve(process.cwd(), "components/ui/integration-hero.tsx");
const testimonialsPath = path.resolve(process.cwd(), "components/ui/circular-testimonials.tsx");
const rootPackagePath = path.resolve(process.cwd(), "package.json");

test("LiquidMetalButton integrates @paper-design/shaders with WebGL budget, IntersectionObserver, and reduced-motion guard", () => {
  const source = fs.readFileSync(liquidButtonPath, "utf8");
  assert.match(source, /@paper-design\/shaders/);
  assert.match(source, /MAX_ACTIVE_WEBGL_SHADERS/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /ResizeObserver/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /liquid-metal-css-bg/);
});

test("Portfolio React UI components adopt LiquidMetalButton consistently", () => {
  const heroSource = fs.readFileSync(integrationHeroPath, "utf8");
  const testimonialsSource = fs.readFileSync(testimonialsPath, "utf8");
  const pkg = JSON.parse(fs.readFileSync(rootPackagePath, "utf8"));

  assert.ok(pkg.dependencies["@paper-design/shaders"]);
  assert.ok(pkg.dependencies["lucide-react"]);
  assert.ok(pkg.dependencies["clsx"]);
  assert.ok(pkg.dependencies["tailwind-merge"]);

  assert.match(heroSource, /LiquidMetalButton/);
  assert.match(testimonialsSource, /LiquidMetalButton/);
});
