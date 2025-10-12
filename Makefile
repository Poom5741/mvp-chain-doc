SITE_OUT=build
PDF_TOKEN=dist/mvp-token.pdf
PDF_CHAIN=dist/mvp-chain.pdf
TOKEN_FILES=docs/token/00-cover.mdx docs/token/01-abstract.mdx docs/token/02-introduction.mdx docs/token/03-specification.mdx docs/token/04-economics.mdx docs/token/05-distribution.mdx docs/token/06-market.mdx docs/token/07-security.mdx docs/token/08-legal.mdx docs/token/references.mdx
CHAIN_FILES=docs/chain/00-cover.mdx docs/chain/01-abstract.mdx docs/chain/02-architecture.mdx docs/chain/03-specification.mdx docs/chain/04-security.mdx docs/chain/05-governance.mdx docs/chain/06-ecosystem.mdx docs/chain/07-legal.mdx docs/chain/references.mdx

all: site pdf

site:
	npm install --no-fund --no-audit
	npx docusaurus build

pdf:
	# Ensure data, docs, and figures are generated
	npm install --no-fund --no-audit
	npm run fetch
	npm run generate
	npm run figures
	# Prepare temporary copies with figure path fixes for Pandoc
	rm -rf tmp/pdf && mkdir -p tmp/pdf/token tmp/pdf/chain dist
	cp $(TOKEN_FILES) tmp/pdf/token/
	cp $(CHAIN_FILES) tmp/pdf/chain/
	perl -pi -e 's#\]\(/figures/#\]\(static/figures/#g' tmp/pdf/token/*.mdx tmp/pdf/chain/*.mdx
	# Build Token PDF
    pandoc tmp/pdf/token/*.mdx \
      --from=markdown+tex_math_dollars+tex_math_single_backslash \
	  --resource-path=.:static \
	  --pdf-engine=xelatex \
	  --toc --toc-depth=3 \
	  --metadata date="`date +%Y-%m-%d`" \
	  --bibliography citations/library.bib \
	  --csl citations/style.csl \
	  -o $(PDF_TOKEN)
	# Build Chain PDF
    pandoc tmp/pdf/chain/*.mdx \
      --from=markdown+tex_math_dollars+tex_math_single_backslash \
	  --resource-path=.:static \
	  --pdf-engine=xelatex \
	  --toc --toc-depth=3 \
	  --metadata date="`date +%Y-%m-%d`" \
	  --bibliography citations/library.bib \
	  --csl citations/style.csl \
	  -o $(PDF_CHAIN)

clean:
	rm -rf build dist tmp/pdf
