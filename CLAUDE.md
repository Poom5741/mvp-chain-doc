# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Docusaurus site for MVP CHAIN whitepapers that generates both a web documentation site and printable PDF versions. The project uses a template-based system to generate MDX files from fetched on-chain data.

## Development Commands

### Core Development
```bash
# Start development server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

### Content Generation Pipeline
```bash
# Fetch latest on-chain/token data from Etherscan and MVP site
npm run fetch

# Generate MDX docs from templates using fetched data
npm run generate

# Generate Mermaid diagrams as SVGs
npm run figures

# Run complete content preparation pipeline
npm run prepare:docs  # Equivalent to: fetch && generate && figures
```

### PDF Generation
```bash
# Generate PDF whitepapers (requires Pandoc + TeX)
npm run pdf
# Or directly via Make:
make pdf
```

### Complete Build Process
```bash
# Run full pipeline: fetch data, generate docs, format, lint, build site, and create PDFs
npm run all
```

### Code Quality
```bash
# Lint markdown files
npm run lint:md

# Check prose style (requires Vale)
npm run lint:prose

# Format markdown files
npm run format
```

### Migration
```bash
# Convert source markdown from source_docs/ to MDX in docs/
npm run migrate
```

## Architecture

### Content Generation Flow
1. **Data Fetching** (`scripts/fetch-data.js`): Scrapes token data from Etherscan and MVP site availability, saves to `analysis/snapshot.json`
2. **Template Processing** (`scripts/generate-docs.js`): Uses snapshot data to populate MDX templates in `templates/token/` and `templates/chain/`, outputs to `docs/`
3. **Diagram Generation**: Mermaid diagrams in `resource/diagrams/` are converted to SVGs in `static/figures/`
4. **Site Build**: Docusaurus builds static site from generated MDX files
5. **PDF Generation**: Pandoc converts MDX files to PDF with LaTeX styling

### Directory Structure
- `docs/`: Generated MDX files (DO NOT edit directly - they are overwritten)
- `templates/`: Source templates for token and chain whitepapers with `{{VARIABLE}}` placeholders
- `source_docs/`: Source markdown files for migration to MDX
- `resource/`: Supporting materials (diagrams, data)
- `analysis/`: Generated data snapshots and metrics
- `static/`: Static assets including generated figures
- `scripts/`: Build and generation scripts
- `citations/`: Bibliography and CSL style for PDF generation

### Key Technologies
- **Docusaurus v3**: Static site generator with MDX support
- **Mermaid**: Diagram generation (configured for neutral theme)
- **Pandoc + Tectonic**: PDF generation with LaTeX support
- **Tailwind CSS**: Custom styling for UI components
- **KaTeX**: Math rendering in both web and PDF

### Custom Components
The project includes custom React components in `src/components/ui/Docs.tsx`:
- `AnimatedHeading`, `Section`, `Lead`: Typography and layout components
- `Callout`, `Card`, `Figure`: Content presentation components
- `SpecItem`, `SpecList`: Token/chain specification display with copy functionality
- `DisclaimerModal`: Modal for legal disclaimers

### Site Configuration
- Single language (English) with Thai removed in recent refactor
- Mermaid integration with custom neutral theme colors
- Math support via remark-math and rehype-katex
- Custom navbar focusing on Exchange whitepaper
- Token and Chain whitepapers accessible via footer links

## Important Notes

- Always run `npm run fetch` before `npm run generate` - the generation script depends on `analysis/snapshot.json`
- Generated MDX files in `docs/` are overwritten during builds - make changes in `templates/` instead
- PDF generation requires Pandoc with Tectonic engine or XeLaTeX
- The site uses custom CSS variables for theming defined in `src/css/custom.css`
- Mermaid diagrams must be generated to SVGs before including in docs via `npm run figures`