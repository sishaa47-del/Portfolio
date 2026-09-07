# Manasi Sharma — Portfolio

Brand strategy portfolio. Seven case studies across luxury, digital media,
HR tech, B2B SaaS and D2C, each fold carrying its own palette.

Built with React + Vite + Framer Motion. No CSS framework — the design system
lives in `src/styles/showcase.css`.

## Develop

```bash
npm install
npm run dev
```

## Build targets

| Command | Output | Used for |
|---|---|---|
| `npm run build` | `dist/` | Real hosting (Vercel, Netlify) — clean URLs |
| `npm run build:pages` | `dist/` | GitHub Pages — relative assets + hash routing |
| `npm run build:single` | `dist-single/` | One self-contained HTML file, everything inlined |

GitHub Pages has no rewrite rules, so a deep link like `/work/dot` would 404 on
refresh. The Pages build uses hash routing (`#/work/dot`) and relative asset
paths, which work at a repo subpath and at a custom domain root alike.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Enable it once: **Settings → Pages → Source: GitHub Actions**.

## Artwork

Images live in `src/images/` and are resolved by filename — drop a file in and
it appears, no code change. After adding or replacing artwork:

```bash
npm run images:dims
```

That regenerates `src/lib/image-dims.js`. Those dimensions are load-bearing: an
`<img>` with `height:auto` is 0px tall until it loads, and a 0px-tall element
never intersects the viewport, so `loading="lazy"` never fires and the image
never appears. Reserving the box from the real dimensions breaks that deadlock
and removes layout shift.

## Structure

```
src/
  data/         content — folds, case studies, prototypes
  components/   Slide, Plate, Impact, Sectors, PrototypeEmbed
  components/ui/pulsing-border.tsx   vendored WebGL shader (21st.dev)
  lib/          image resolution, per-fold theming, meta tags
  styles/       the whole design system
```

Each fold declares its own palette (background, text, secondary, accent).
Several supplied colours are pastels that cannot hold white text, so folds
carry their own ink and light folds flip to dark type. Every combination is
verified: body ≥ 6.5:1, secondary ≥ 4.8:1, accent ≥ 4.6:1.
