const path = require('path') 
const math = require('remark-math');
const katex = require('rehype-katex');
// const announcementBarContent = `<a href="/typescript-full-stack-technology-trpc" target="_blank">Typescript 全栈最值得学习的技术栈 TRPC</a>`

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '河山的技术存档',
  titleDelimiter: '-',
  url: 'https://wrm244.gxist.cn',
  baseUrl: '/',
  favicon: '/assets/images/social/avatar.ico',
  organizationName: 'wrm244',
  projectName: 'blog',
  tagline: '学习记录，技术存档',
  onBrokenLinks: 'ignore',  //忽略坏链
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    image: '/assets/images/social/avatar.png',
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: announcementBarContent,
    // },
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
    metadata: [
      {
        name: 'keywords',
        content: '河山',
      },
      {
        name: 'keywords',
        content: 'blog, javascript, nginx, machine learning, react, vue, web',
      },
      {
        name: 'keywords',
        content: '编程爱好者, 计算机研究学习',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: '河山的技术存档',
      logo: {
        alt: '河山',
        src: '/assets/images/social/avatar.png',
        srcDark: '/assets/images/social/avatar.png',//记得加上绝对路径/
      },
      hideOnScroll: true,
      items: [
        {
          label: '博客',
          position: 'left',
          items: [
            {
              label: '标签',
              to: 'tags',
            },
            {
              label: '归档',
              to: 'archive',
            },
          ],
        },
        {
          label: '笔记',
          position: 'left',
          to: 'docs/stack/',
          items: [
            {
              label: '本站的搭建',
              to: 'docs/blog/',
            },
            {
              label: '学习栈',
              to: 'docs/stack/',
            },
          ],
        },
        {
          label: '简历',
          position: 'left',
          to: 'https://wrm244.github.io/resume/',
        },
        {
          label: '导航',
          position: 'left',
          to: 'resource',
        },
        {
          label: '项目',
          position: 'right',
          to: 'project',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '博客',
          items: [
            {
              label: '标签',
              to: 'tags',
            },
            {
              label: '归档',
              to: 'archive',
            },
            
          ],
        },
        {
          title: '学习',
          items: [
           {
              label: '笔记',
              to: 'docs/stack',
            },
            {
              label: '项目',
              to: 'project',
            },
          
        ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: '关于我',
              to: '/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wrm244',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '友链',
              //position: 'right',
              to: 'friends',
            },
            {
              label: '导航',
              //position: 'right',
              to: 'resource',
            },
            {
              html: `<a href="https://docusaurus.io/zh-CN/" target="_blank"><img alt="Built with Docusaurus" style="height:50px;margin-top:0.5rem" src="/assets/images/buildwith.png" /><a/>`,
            },
          ],
        },
      ],
      copyright: `<p>版权所有 © ${new Date().getFullYear()} 河山 此网站使用 <a href="https://docusaurus.io/zh-CN/" target="_blank">Docusaurus</a> 搭建。<p>
      <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" style="color: white">本网站由 <img src="/assets/images/upyun-logo-white.png" width="42px" align="top"/> 提供CDN加速/云存储服务</a></p>`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/vsLight'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
      additionalLanguages: ['java', 'php', 'rust', 'toml'],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    algolia: {
      appId: 'S4YOJK9V4X',
      apiKey: '3bf796bbbc156928d571253bcb25dafc',
      indexName: 'wikiblog',
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {},
    },
    giscus: {
      repo: 'wrm244/wikiblog',
      repoId: 'R_kgDOJYXemg',
      category: 'General',
      categoryId: 'DIC_kwDOJYXems4CV3b4',
      loading: "lazy",
      lang: "zh-CN",
    },
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    socials: {
      github: 'https://github.com/wrm244',
      twitter: 'https://twitter.com/wrm244',
      csdn: 'https://blog.csdn.net/wrm244',
      juejin: 'https://juejin.cn/user/3021907877702814',
      qq: 'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=934978593&website=www.oicqzone.com',
      zhihu: 'https://www.zhihu.com/people/dobet',
    },
  },
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: '河山的技术存档',
      },
    },
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.js',
          // remarkPlugins: [math],
          // rehypePlugins: [katex],
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
      }),
    ],
  ],
  // themes: ['@docusaurus/theme-live-codeblock'],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    // 'docusaurus-plugin-matomo',
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    path.resolve(__dirname, './src/plugin/plugin-baidu-tongji'),
    path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    [
      path.resolve(__dirname, './src/plugin/plugin-content-blog'),
      {
        path: 'blog',
        routeBasePath: '/',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/wrm244/wikiblog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '河山的技术存档',
        blogSidebarCount: 10,
        blogSidebarTitle: '最近更新',
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '河山',
          copyright: `Copyright © ${new Date().getFullYear()} 河山 Built with Docusaurus. class="footer_lin">`,
        },
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        disableInDev: false,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: 'assets/images/social/avatar.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(51 139 255)',
          },
        ],
      },
    ],
  ],
  stylesheets: [
    {
    href: 'https://jsd.onmicrosoft.cn/npm/katex@0.13.24/dist/katex.min.css',
    type: 'text/css',
    integrity:
      'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
    crossorigin: 'anonymous',
  },],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
}

module.exports = config
