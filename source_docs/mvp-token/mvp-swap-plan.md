# MVP Swap — Project-owned DEX Plan

Purpose
- Provide a direct purchase path for MVP and deepen liquidity for the ecosystem.
- Operate natively on MVP CHAIN for low fees and fast settlement.

Scope
- Initial core pair: `MVP/USDT` (evaluate stablecoin support and bridging).
- Additional pairs (as needed): MVP/WETH (bridged), MVP/stablecoins.
- AMM design: Uniswap-style AMM (v2/v3 evaluation); start simple, evolve as needed.

Liquidity and Treasury
- Liquidity seeded from project treasury.
- Target depth sufficient to support typical gas purchasing flows.
- Fee policy: to be defined (e.g., 0.30% baseline; can adjust).
- LP incentives: none initially; focus on utility and stability.

Deployment
- Network: Ethereum Mainnet (Phase 1).
- Future: Consider MVP CHAIN deployment once bridge or native environment is finalized.
- Contracts: Factory, Router, Pair (AMM), ERC-20 tokens.
- Frontend: Minimal swap UI with wallet connect, network detection, pair selection.
- Monitoring: Price, liquidity, and volume dashboards.

User Flow
- Connect wallet on Ethereum Mainnet.
- Select `MVP/USDT` pair and input USDT amount.
- Confirm swap; receive MVP for gas usage.

Integration and Bridging
- For users starting on Ethereum Mainnet: maintain pathway to buy MVP on Uniswap V4.
- Bridging to MVP CHAIN is not available currently; evaluate future options.

Risk and Operations
- Impermanent loss and market volatility for LPs.
- Operational risks of AMM contracts and routing.
- Compliance considerations for access and UI language.

Roadmap
- Phase 1: Deploy base AMM, seed liquidity, launch swap UI.
- Phase 2: Add analytics, expand pairs, optimize fees.
- Phase 3: Consider routing improvements and cross-chain liquidity options.

Notes
- This plan is project-defined and complements the site’s existing Uniswap V4 pathway.