SITE_OUT=build
PDF_OUT=dist/whitepaper.pdf
PANDOC_MD=$(shell ls docs/*.mdx)

all: site pdf

site:
	npm ci
	npx docusaurus build

pdf:
	mkdir -p dist
	pandoc $(PANDOC_MD) \
	  --from=gfm+tex_math_dollars+tex_math_single_backslash \
	  --pdf-engine=xelatex \
	  --toc --toc-depth=3 \
	  --metadata date="`date +%Y-%m-%d`" \
	  --bibliography citations/library.bib \
	  --csl citations/style.csl \
	  -o $(PDF_OUT)

clean:
	rm -rf build dist