# YourChain Whitepaper Docs

This repository contains a Docusaurus site and a Pandoc pipeline to produce a printable PDF whitepaper.

## Quick Start

- Install Node >=18 and npm >=9
- Install Pandoc >=3.1 and a TeX engine (xelatex)
- Run `npm run all` to format, lint, build the site, and generate the PDF.

## Migration

- Place source markdown under `source_docs/` and run `node scripts/migrate.js` to convert into MDX in `docs/`.

## CI

- GitHub Actions validates prose/style, builds the site, and uploads `dist/whitepaper.pdf`.