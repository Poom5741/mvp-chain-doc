/* Enhanced config for modern tech documentation */
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";

const siteUrl = process.env.SITE_URL || "https://mvpcha.in";
const config: Config = {
  title: "MVP CHAIN Whitepapers",
  url: siteUrl,
  baseUrl: "/",
  onBrokenLinks: "warn",
  organizationName: "MVP CHAIN",
  projectName: "whitepapers",
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
      onBrokenMarkdownImages: "ignore",
    },
    mdx1Compat: {
      comments: true,
      admonitions: true,
    },
  },
  themes: ["@docusaurus/theme-mermaid"],
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    localeConfigs: {
      en: { label: "English" },
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.ts"),
          include: ["index.mdx", "exchange/**", "token/**", "chain/**"],
          remarkPlugins: [require("remark-math")],
          rehypePlugins: [require("rehype-katex")],
          editUrl: undefined,
          sidebarCollapsible: true,
          sidebarCollapsed: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: false,
      disableSwitch: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["solidity", "rust", "go"],
    },
    navbar: {
      title: "MVP CHAIN",
      style: "dark",
      items: [
        {
          type: "doc",
          docId: "exchange/cover",
          label: "Exchange",
          position: "left",
        },
        {
          type: "dropdown",
          label: "Whitepapers",
          position: "left",
          items: [
            {
              label: "Token",
              to: "/token/00-cover",
            },
            {
              label: "Chain",
              to: "/chain/00-cover",
            },
          ],
        },
        {
          href: "https://github.com/mvpchain",
          label: "GitHub",
          position: "right",
          className: "navbar-github-link",
          "aria-label": "GitHub repository",
        },
        {
          href: "https://mvpcha.in",
          label: "Launch App",
          position: "right",
          className: "navbar-cta-button",
        },
      ],
      hideOnScroll: false,
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Whitepapers",
          items: [
            {
              label: "Exchange",
              to: "/exchange/cover",
            },
            {
              label: "Token",
              to: "/token/00-cover",
            },
            {
              label: "Chain",
              to: "/chain/00-cover",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/mvpchain",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MVP CHAIN.`,
    },
    mermaid: {
      theme: { light: "neutral", dark: "neutral" },
      options: {
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
        themeVariables: {
          primaryColor: "#F59E0B",
          primaryTextColor: "#0F172A",
          primaryBorderColor: "#E2E8F0",
          lineColor: "#64748B",
          sectionBkgColor: "#F8FAFC",
          altSectionBkgColor: "#F1F5F9",
          gridColor: "#E2E8F0",
          secondaryColor: "#94A3B8",
          tertiaryColor: "#CBD5E1",
          background: "transparent",
          mainBkg: "#FFFFFF",
          secondBkg: "#F8FAFC",
          tertiaryBkg: "#F1F5F9",
        },
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  },
  plugins: [],
};

export default config;
