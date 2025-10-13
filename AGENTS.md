# Repository Guidelines

## Project Structure & Module Organization
- `docs/` — MDX content; page order via numeric prefixes (e.g., `docs/01-abstract.mdx`).
- `docusaurus.config.ts`, `sidebars.ts` — site configuration; `src/css/custom.css` for styling.
- `citations/` — `library.bib`, `style.csl` used for PDF references.
- `scripts/migrate.js` — migrates `source_docs/*.md` to `docs/*.mdx` (admonitions, images, anchors).
- `Makefile` — `site` (builds docs) and `pdf` (Pandoc → `dist/whitepaper.pdf`).

## Build, Test, and Development Commands
- `npm start` — run local dev server.
- `npm run build` — production build to `build/`.
- `npm run serve` — serve the built site.
- `npm run format` — Prettier for `docs/**/*.mdx`.
- `npm run lint:md` — Markdownlint checks; `npm run lint:prose` — Vale checks.
- `make site` — `npm ci` + Docusaurus build; `make pdf` — generate PDF (Pandoc + XeLaTeX required).
- `node scripts/migrate.js` — convert `source_docs/` to MDX in `docs/`.
- `npm run all` — format, lint, build, and generate PDF.

## Coding Style & Naming Conventions
- MDX with Docusaurus admonitions: `:::note|tip|warning|important` … `:::`.
- Math via KaTeX: `$inline$`, `$$block$$` (remark-math/rehype-katex enabled).
- Filenames: `NN-title.mdx` to control order; ensure unique headings and meaningful slugs.
- Formatting: Prettier defaults; Markdownlint line length 120 (`.markdownlint.json`); keep 2-space indentation.

## Testing Guidelines
- Run `npm run format && npm run lint:md && npm run lint:prose` before PRs.
- `npm run build` must succeed (broken links throw); preview with `npm start`.
- For PDF issues, run `make pdf` locally to verify citations and rendering.

## Commit & Pull Request Guidelines
- Commits: short, imperative subject (≤72 chars), e.g., "Add tokenomics draft"; include scope when helpful.
- PRs: clear description, linked issues, notable changes, and screenshots/PDF diffs for visual updates.
- Checklist: ran `npm run all`, no stray files in `build/` or `dist/`.

## Security & Configuration Tips
- Require Node ≥18, Pandoc ≥3.1, and a TeX engine (`xelatex`).
- Do not commit `build/` or `dist/`; CI publishes the PDF artifact via GitHub Actions.
