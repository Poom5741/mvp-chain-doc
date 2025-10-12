/* minimal config */
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'YourChain Whitepaper',
  url: 'https://yourchain.org',
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
      title: 'YourChain',
      logo: { alt: 'YourChain', src: '/img/logo.svg' },
    },
  },
};

export default config;