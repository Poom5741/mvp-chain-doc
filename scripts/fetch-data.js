#!/usr/bin/env node
/* Fetch on-chain/token data from Etherscan and MVP site specs; write analysis/snapshot.json and analysis/metrics.md */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { keccak_256 } = require('js-sha3');

const TOKEN_ADDRESS_PLAIN = '0x88888888a98Cb1525A98c354F17EFc8d73EF07A6';
const ETHERSCAN_URL = `https://etherscan.io/token/${TOKEN_ADDRESS_PLAIN}`;
const MVP_SITE_URL = 'https://mvpcha.in/';
const MVP_EXPLORER = 'https://exp.mvpcha.in/';
const MVP_RPC = 'https://rpc.mvpcha.in';
const MVP_CHAIN_ID = 480001;

function toChecksumAddress(address) {
  const addr = address.toLowerCase().replace(/^0x/, '');
  const hash = keccak_256(addr);
  let ret = '0x';
  for (let i = 0; i < addr.length; i++) {
    ret += parseInt(hash[i], 16) >= 8 ? addr[i].toUpperCase() : addr[i];
  }
  return ret;
}

async function fetchText(url, retries = 3, timeout = 10000) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const res = await fetch(url, {
        headers: {
          'User-Agent': 'MVP-Docs/1.0 (+https://mvpcha.in)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
      }

      return await res.text();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn(`Timeout (${timeout}ms) for ${url}, attempt ${i + 1}/${retries}`);
      } else {
        console.warn(`Failed to fetch ${url}: ${error.message}, attempt ${i + 1}/${retries}`);
      }

      if (i === retries - 1) {
        throw error;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

function validateEtherscanData(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.length > 100) {
    errors.push('Invalid or missing token name');
  }

  if (!data.symbol || typeof data.symbol !== 'string' || !/^[A-Z0-9]+$/i.test(data.symbol) || data.symbol.length > 10) {
    errors.push('Invalid or missing token symbol');
  }

  if (data.decimals !== null) {
    const dec = parseInt(data.decimals, 10);
    if (isNaN(dec) || dec < 0 || dec > 18) {
      errors.push('Invalid decimals value');
    }
  }

  if (data.holders !== null) {
    const holders = parseInt(data.holders.replace(/,/g, ''), 10);
    if (isNaN(holders) || holders < 0) {
      errors.push('Invalid holders count');
    }
  }

  if (data.transfers !== null) {
    const transfers = parseInt(data.transfers.replace(/,/g, ''), 10);
    if (isNaN(transfers) || transfers < 0) {
      errors.push('Invalid transfers count');
    }
  }

  if (data.owner && data.owner !== 'Not Public') {
    if (!/^0x[a-fA-F0-9]{40}$/.test(data.owner)) {
      errors.push('Invalid owner address format');
    }
  }

  return errors;
}

function extractEtherscan(html) {
  const $ = cheerio.load(html);
  const text = $.root().text();

  // Name and symbol via og:title if present
  const ogTitle = $('meta[property="og:title"]').attr('content') || '';
  let name = null; let symbol = null;
  const mTitle = ogTitle.match(/Token\s*([^(]+)\s*\(([^)]+)\)/i);
  if (mTitle) { name = mTitle[1].trim(); symbol = mTitle[2].trim(); }

  // Decimals
  const mDec = text.match(/Decimals\s*:?\s*(\d{1,3})/i);
  const decimals = mDec ? mDec[1] : null;

  // Holders
  const mHolders = text.match(/Holders\s*:?\s*([0-9][0-9,]*)/i);
  const holders = mHolders ? mHolders[1] : null;

  // Transfers
  const mTransfers = text.match(/Transfers\s*:?\s*([0-9][0-9,]*)/i);
  const transfers = mTransfers ? mTransfers[1] : null;

  // Total Supply (as displayed string, stop before Holders)
  let totalSupply = null;
  const mSupply = text.match(/Total\s*Supply\s*:?\s*([\s\S]*?)Holders/i);
  if (mSupply) totalSupply = mSupply[1].replace(/\s+/g, ' ').trim();

  // Verified source
  const verified = /Contract Source Code Verified/i.test(text) ? 'yes' : (/Unverified/i.test(text) ? 'no' : 'Not Public');

  // Owner/Admin address if present near 'Owner' keyword
  let owner = 'Not Public';
  const ownerMatch = text.match(/Owner\s*:?\s*(0x[a-fA-F0-9]{40})/);
  if (ownerMatch) owner = ownerMatch[1];

  // Upgradeability / Upgraders / Pausable (best-effort heuristics)
  const upgradeability = /Proxy|Upgradeable|UUPS/i.test(text) ? 'Proxy/Upgradeable (detected)' : 'None/Unknown';
  const upgraders = /Proxy Admin|Admin\s*:?\s*(0x[a-fA-F0-9]{40})/i.exec(text)?.[1] || 'Not Public';
  const pausable = /Pausable/i.test(text) ? 'true (Pausable detected)' : 'Not Public';

  const data = { name, symbol, decimals, holders, transfers, verified, owner, upgraders, upgradeability, pausable, totalSupply };
  const validationErrors = validateEtherscanData(data);

  if (validationErrors.length > 0) {
    console.warn('Etherscan data validation warnings:', validationErrors);
  }

  return data;
}

async function main() {
  const now = new Date();
  const dateUtc = now.toISOString().replace(/\.\d{3}Z$/, 'Z');
  const addrPlain = TOKEN_ADDRESS_PLAIN;
  const addrEip55 = toChecksumAddress(addrPlain);

  let ethData = {};
  try {
    const html = await fetchText(ETHERSCAN_URL);
    ethData = extractEtherscan(html);
  } catch (e) {
    console.error('Failed to fetch/parse Etherscan:', e.message);
    ethData = { name: null, symbol: null, decimals: null, holders: null, transfers: null, verified: 'Not Public', owner: 'Not Public', upgraders: 'Not Public', upgradeability: 'Unknown', pausable: 'Not Public', totalSupply: null };
  }

  // MVP site availability check (values are specified, we just snapshot provenance)
  let mvpOk = false;
  try {
    await fetchText(MVP_SITE_URL);
    mvpOk = true;
  } catch (e) {
    mvpOk = false;
  }

  const snapshot = {
    timestamp_UTC: dateUtc,
    etherscan_url: ETHERSCAN_URL,
    token: {
      address_plain: addrPlain,
      address_eip55: addrEip55,
      ...ethData,
    },
    mvp: {
      site_url: MVP_SITE_URL,
      explorer: MVP_EXPLORER,
      rpc: MVP_RPC,
      chain_id: MVP_CHAIN_ID,
      site_reachable: mvpOk,
    },
  };

  const analysisDir = path.join('analysis');
  if (!fs.existsSync(analysisDir)) fs.mkdirSync(analysisDir, { recursive: true });
  fs.writeFileSync(path.join(analysisDir, 'snapshot.json'), JSON.stringify(snapshot, null, 2));

  const md = [
    '# Metrics Snapshot',
    '',
    `Timestamp (UTC): ${dateUtc}`,
    '',
    '## Token (Etherscan)',
    `- Address (plain): ${addrPlain}`,
    `- Address (EIP-55): ${addrEip55}`,
    `- Name: ${ethData.name ?? 'Not Public'}`,
    `- Symbol: ${ethData.symbol ?? 'Not Public'}`,
    `- Decimals: ${ethData.decimals ?? 'Not Public'}`,
    `- Total Supply: ${ethData.totalSupply ?? 'Not Public'}`,
    `- Holders: ${ethData.holders ?? 'Not Public'}`,
    `- Transfers: ${ethData.transfers ?? 'Not Public'}`,
    `- Verified: ${ethData.verified}`,
    `- Owner/Admin: ${ethData.owner}`,
    `- Upgraders: ${ethData.upgraders}`,
    `- Upgradeability: ${ethData.upgradeability}`,
    `- Pausable/Blacklist: ${ethData.pausable}`,
    '',
    '## Data Provenance',
    `- Etherscan: ${ETHERSCAN_URL}`,
    `- MVP Site: ${MVP_SITE_URL}`,
    `- MVP Explorer: ${MVP_EXPLORER}`,
    `- MVP RPC: ${MVP_RPC}`,
  ].join('\n');
  fs.writeFileSync(path.join(analysisDir, 'metrics.md'), md);
}

main().catch((e) => { console.error(e); process.exit(1); });
