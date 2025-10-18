#!/usr/bin/env node
/* Generate MDX docs from templates using analysis/snapshot.json */
const fs = require('fs')
const path = require('path')

const SNAPSHOT = path.join('analysis', 'snapshot.json')

function loadSnapshot() {
  if (!fs.existsSync(SNAPSHOT))
    throw new Error('Missing analysis/snapshot.json. Run: npm run fetch')
  return JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8'))
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

function replaceAll(content, map) {
  return content.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_m, key) =>
    key in map ? String(map[key]) : `{{${key}}}`
  )
}

function generateFromTemplates(kind, files, map) {
  const tplDir = path.join('templates', kind)
  const outDir = path.join('docs', kind)
  ensureDir(outDir)
  for (const f of files) {
    const src = path.join(tplDir, f)
    const dst = path.join(outDir, f)
    const txt = fs.readFileSync(src, 'utf8')
    const out = replaceAll(txt, map)
    fs.writeFileSync(dst, out)
  }
}

function main() {
  const snap = loadSnapshot()
  const map = {
    DATE_UTC: snap.timestamp_UTC,
    ETHERSCAN_URL: snap.etherscan_url,
    MVP_SITE_URL: snap.mvp.site_url,
    MVP_EXPLORER: snap.mvp.explorer,
    MVP_RPC: snap.mvp.rpc,
    MVP_CHAIN_ID: snap.mvp.chain_id,
    TOKEN_ADDRESS_PLAIN: snap.token.address_plain,
    TOKEN_ADDRESS_EIP55: snap.token.address_eip55,
    TOKEN_NAME: snap.token.name || 'Not Public',
    TOKEN_SYMBOL: snap.token.symbol || 'Not Public',
    TOKEN_DECIMALS: snap.token.decimals || 'Not Public',
    TOKEN_VERIFIED: snap.token.verified || 'Not Public',
    TOKEN_OWNER: snap.token.owner || 'Not Public',
    TOKEN_UPGRADERS: snap.token.upgraders || 'Not Public',
    TOKEN_UPGRADEABILITY: snap.token.upgradeability || 'Unknown',
    TOKEN_PAUSABLE: snap.token.pausable || 'Not Public',
    TOKEN_TOTAL_SUPPLY: snap.token.totalSupply || 'Not Public',
    TOKEN_HOLDERS: snap.token.holders || 'Not Public',
    TOKEN_TRANSFERS: snap.token.transfers || 'Not Public',
  }

  const tokenFiles = [
    '00-cover.mdx',
    '01-abstract.mdx',
    '02-introduction.mdx',
    '03-specification.mdx',
    '04-economics.mdx',
    '05-distribution.mdx',
    '06-market.mdx',
    '07-security.mdx',
    '08-legal.mdx',
    'references.mdx',
  ]
  const chainFiles = [
    '00-cover.mdx',
    '01-abstract.mdx',
    '02-architecture.mdx',
    '03-specification.mdx',
    '04-security.mdx',
    '05-governance.mdx',
    '06-ecosystem.mdx',
    '07-legal.mdx',
    'references.mdx',
  ]

  generateFromTemplates('token', tokenFiles, map)
  generateFromTemplates('chain', chainFiles, map)
}

main()
