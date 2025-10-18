/* Enhanced config with token and chain whitepapers */
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

const siteUrl = process.env.SITE_URL || 'https://mvpcha.in';
const config: Config = {
  title: 'MVP CHAIN Whitepapers',
  url: siteUrl,
  baseUrl: '/',
  onBrokenLinks: 'warn',
  markdown: { mermaid: true, hooks: { onBrokenMarkdownLinks: 'warn', onBrokenMarkdownImages: 'ignore' } },
  themes: ['@docusaurus/theme-mermaid'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: { label: 'English' },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          include: ['index.mdx', 'exchange/**', 'token/**', 'chain/**'],
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
        },
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],
  themeConfig: {
    colorMode: { defaultMode: 'light', respectPrefersColorScheme: false, disableSwitch: false },
    prism: { theme: prismThemes.github },
    navbar: {
      title: 'MVP CHAIN',
      items: [
        { type: 'doc', docId: 'exchange/cover', label: 'Exchange', position: 'left' },
        {
          type: 'dropdown',
          label: 'Whitepapers',
          position: 'left',
          items: [
            { to: '/token/token-cover', label: 'Token' },
            { to: '/chain/chain-cover', label: 'Chain' },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Whitepapers',
          items: [
            { label: 'Exchange', to: '/exchange/cover' },
            { label: 'Token', to: '/token/token-cover' },
            { label: 'Chain', to: '/chain/chain-cover' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MVP CHAIN.`,
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'neutral' },
      options: {
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
        themeVariables: {
          primaryColor: '#F59E0B',
          primaryTextColor: '#111827',
          lineColor: '#374151',
          background: 'transparent',
        },
      },
    },
  },
};

export default config;