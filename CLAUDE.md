# Web Porto — Project Guide

## Architecture
- **Production (Vercel Static)**: Root [index.html](index.html), [style.css](style.css), `Images/`, and `cv/`. Changes pushed to `main` deploy directly from root in ~2–4s.
- **Component Sandbox (`my-app/`)**: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui structure used to prototype and validate components (`components/ui/*`) before integrating into the static portfolio.

## Essential Commands (`my-app/`)
```bash
cd my-app
npm run lint          # ESLint check
npx tsc --noEmit      # TypeScript typecheck
npm test              # Node test runner (__tests__/)
npm run build         # Production Next.js Turbopack build
```

## Conventions
- Preserve intentional user color accents in `index.html` and `style.css` (pill navbar hover gradients, mobile drawer gradient icons, `[data-glow]` reactive borders, and section color accents).
- Always declare `-webkit-mask*` vendor prefixes **before** standard `mask*` properties in CSS.
- Never interpolate user input into `innerHTML`; use `textContent`.
- Keep all interactive controls keyboard-accessible (`:focus-visible`, `Enter`/`Space`, `Escape`).
