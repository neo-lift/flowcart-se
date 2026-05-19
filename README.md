# FlowCart marketing site

Vite + React homepage for FlowCart, with section components in `./components` and HTML fragments in `./components/html`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Structure

- `components/` — React section components (TopBar, Hero, Features, etc.)
- `components/html/` — Section markup extracted from the original static page
- `components/ui/` — Shared UI primitives (Button, Container, …)
- `src/styles/global.css` — Global styles and design tokens
- `src/hooks/useMotion.js` — Scroll animations and interactions

The original static files are kept as `index.legacy.html`, `styles.css`, and `script.js` for reference.
