const path = require('path')
// const math = require('remark-math');
// const katex = require('rehype-katex');
//const announcementBarContent = `🎉欢迎来到我的主页`

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
      theme: { light: 'neutral', dark: 'forest' },
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      showLinenums: true,
    },
    metadata: [
      {
        name: 'keywords',
        content: '河山',
      },
      {
        name: 'keywords',
        content: 'blog,machine learning,javascript, nginx,, react, vue, web',
      },
      {
        name: 'keywords',
        content: ' 计算机研究学习，编程爱好者',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: '河山的技术存档',
      logo: {
        alt: '河山',
        src: '/assets/images/social/avatar.png',
        srcDark: '/assets/images/social/avatar.png',//记得加上绝对路径/
      },
      hideOnScroll: false,
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
            {
              label: '随笔',
              to: 'tags/lifestyle',
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
          label: '链接',
          position: 'left',
          items: [
            {
              label: '导航',
              to: 'resource',
              },
        {
          label: '简历',
          to: 'https://wrm244.gxist.cn/resume/',
        },
            {
            label: '幻灯片',
            to: 'https://wrm244.gitee.io/slide/',
            },
          ],
        },
        
        {
          label: '镜像',
          position: 'left',
          items: [
            {
              label: '服务器',
              to: 'https://wrm244.gxist.cn',
            },
            {
              label: 'Cloudflare',
              to: 'https://wikiblog.pages.dev',
            },
            {
              label: 'Netlify',
              to: 'https://wrm244.netlify.app',
            },
            {
              label: 'GP',
              to: 'https://wrm244.github.io',
            },
          ],
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
            {
              label: '随笔',
              to: 'tags/lifestyle',
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
            {
              label: '幻灯片',
              href: 'https://wrm244.gitee.io/slide/',
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
              label: '镜像站点',
              href: 'https://wrm244.netlify.app',
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
              html: `<a href="https://docusaurus.io/zh-CN/" target="_blank"><img alt="Built with Docusaurus" style="height:50px;margin-top:0.5rem" src="/assets/images/buildwith.png" /></a> <a href="https://www.netlify.com/" target="_blank"><img alt="Built with Netlify" style="height:50px;margin-top:0.5rem" src="/assets/images/netlify-color-accent.svg" /></a>`,
            },
          ],
        },
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} 河山, 此网站使用 <a href="https://docusaurus.io/zh-CN/" target="_blank">Docusaurus</a> 搭建<br/>
      <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" style="color: white">本网站由 <img alt="upyunlogo" src="/assets/images/upyun-logo-white.png" width="48px" align="top"/> 提供CDN加速/云存储服务</a>
      <span id="runtime_span"></span>
      <script type="text/javascript">function show_runtime(){window.setTimeout("show_runtime()",1000);X=new 
      Date("10/16/2022 8:22:00");
      Y=new Date();T=(Y.getTime()-X.getTime());M=24*60*60*1000;
      a=T/M;A=Math.floor(a);b=(a-A)*24;B=Math.floor(b);c=(b-B)*60;C=Math.floor((b-B)*60);D=Math.floor((c-C)*60);
      runtime_span.innerHTML="<br>本站已运行: "+A+"天"+B+"小时"+C+"分"+D+"秒"}show_runtime();</script>`,
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
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: '#eef9fd',
        dark: 'rgb(50, 50, 50)',
      },
      config: {
        magin: 10,
        scrollOffset: 0,
      },
    },
    giscus: {
      repo: 'wrm244/wrm244.github.io',
      repoId: 'R_kgDOJU98qQ',
      category: 'General',
      categoryId: 'DIC_kwDOJU98qc4CV3d1',
      loading: "lazy",
      lang: "zh-CN",
    },
    // myAutogeneratedSidebar: [
    //   {
    //     type: 'autogenerated',
    //     dirName: '.', // '.' 即当前的文档文件夹
    //   },
    // ],
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
        content: '河山的技术存档，博客与项目',
      },
    },
    // {//先加载字体
    //   tagName: 'link',
    //   attributes: {
    //     rel: 'preload',
    //     // href: 'https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@200;300;400;500;600;700;900&display=swap',
    //     as: 'font',
    //   },
    // },
    {//先加载主页LOGO图片
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/assets/images/social/avatar.png',
        as: 'image',
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
  themes: ['@docusaurus/theme-live-codeblock'],
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
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
        postsPerPage: 6,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '河山',
          copyright: `Copyright © ${new Date().getFullYear()} 河山 Built with Docusaurus.`,
        },
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 75,
        disableInDev: false,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: [
          'appInstalled',
          'queryString',
          'standalone',
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
            content: '#0086f1',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'assets/images/social/avatar.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: 'assets/images/social/avatar.png',
            color: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: 'assets/images/social/avatar.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#000',
          },
        ],
      },
    ],
  ],
  // stylesheets: [
  //   {
  //   href: 'https://jsd.onmicrosoft.cn/npm/katex@0.13.24/dist/katex.min.css',
  //   type: 'text/css',
  //   integrity:
  //     'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
  //   crossorigin: 'anonymous',
  // },],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        language: ["zh","en"],
        indexBlog: true,
        indexPages: true,
        indexDocs: true,
      }),
    ],
  ],
}

module.exports = config