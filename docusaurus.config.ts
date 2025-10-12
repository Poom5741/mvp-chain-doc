/* minimal config */
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'MVP CHAIN Whitepapers',
  url: 'https://mvpcha.in',
  baseUrl: '/',
  favicon: '/img/logo.svg',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  markdown: { mermaid: true },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          include: ['index.mdx', 'token/**', 'chain/**'],
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
        },
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],
  themeConfig: {
    colorMode: { defaultMode: 'light' },
    prism: { theme: prismThemes.github },
    navbar: {
      title: 'MVP CHAIN',
      logo: { alt: 'MVP CHAIN', src: '/img/logo.svg' },
      items: [
        { to: '/token/cover', label: 'Token', position: 'left' },
        { to: '/chain/cover', label: 'Chain', position: 'left' },
      ],
    },
  },
};

export default config;
