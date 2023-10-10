const path = require('path')
const math = require('remark-math');
const katex = require('rehype-katex');
//const announcementBarContent = `🎉欢迎来到我的主页`

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '河山的技术存档',
  titleDelimiter: '-',
  url: 'https://wrm244.gxist.cn',
  baseUrl: '/',
  favicon: '/svg/logo_large.svg',
  organizationName: 'wrm244',
  projectName: 'blog',
  tagline: '学习记录，技术存档',
  onBrokenLinks: 'ignore',  //忽略坏链
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    image: '/svg/logo_large.svg',
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

        name: 'description',
        content: '这是一个我用来记录和分享我的学习心得、个人感悟和创意项目的网站。你可以在这里找到我关于编程、设计、人工智能等各种主题的笔记和博客，也可以看到我参与或制作的一些有趣的项目。',

      },
      {
        name: 'keywords',
        content: 'blog,machine learning,javascript, nginx,, react, vue, web',
      },
      {
        name: 'keywords',
        content: '河山',
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
        alt: '河山logo',
        src: '/svg/logo_round.svg',
        srcDark: '/svg/logo_round.svg',//记得加上绝对路径/
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
            {
              label: '随笔',
              to: 'tags/lifestyle',
            },
          ],
        },
        {
          label: '笔记',
          position: 'left',
          items: [
            {
              label: '本站的搭建',
              to: 'docs/blog/',
            },
            {
              label: '专业课程',
              to: 'docs/course/',
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
          href: 'https://wrm244.gxist.cn/resume/',
        },
            {
            label: '幻灯片',
            to: 'https://wrm244.gitee.io/slides/',
            },
            {
              label: '本站主题',
              href: 'https://github.com/wrm244/docusaurus-theme-zen',
              },
              {
                label: '网站服务状态',
                // href: 'https://stats.uptimerobot.com/O04WDUN7lL',
                href: 'https://wrm244.gxist.cn/state'
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
              href: 'https://wrm244.gitee.io/slides/',
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
            {
              label: '本站主题',
              href: 'https://github.com/wrm244/docusaurus-theme-zen',
              },
            
            {
              label: '网站统计数据',
              href: 'https://analytics.umami.is/share/V8NiQd30wnyOEYb0/RM\'s%20Technical%20Archive',
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
              label: '网站服务状态',
              // href: 'https://stats.uptimerobot.com/O04WDUN7lL',
              href: 'https://wrm244.gxist.cn/state',
            },
            {
              html: `<a href="https://docusaurus.io/zh-CN/" title="Built with Docusaurus" target="_blank"><img alt="Built with Docusaurus" style="height:50px;margin-top:0.5rem" src="/assets/images/buildwith.png" /></a> <a href="https://www.netlify.com/" title="Built with Netlify" target="_blank"><img alt="Built with Netlify" style="height:50px;margin-top:0.5rem" src="/assets/images/netlify-color-accent.svg" /></a>`,
            },
          ],
        },
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} 河山, 此网站使用 <a title="访问docusaurus" href="https://docusaurus.io/zh-CN/" style="color: #ebedf0" target="_blank">Docusaurus</a> 搭建<br/>
      <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" style="color: #ebedf0">本网站由 <img alt="upyunlogo" src="/assets/images/upyun-logo-white.png" width="48px" align="top"/> 提供CDN加速/云存储服务</a>
      <a href="https://ipw.cn/ipv6webcheck/?site=wrm244.gxist.cn" title="本站支持IPv6访问" target='_blank'><img style='width:48px;vertical-align:middle' alt="本站支持IPv6访问" src="/svg/ipv6.svg"></a>
      <span id="runtime_span"></span>
      <script type="text/javascript">function show_runtime(){window.setTimeout("show_runtime()",1000);X=new 
      Date("10/16/2022 8:22:00");
      Y=new Date();T=(Y.getTime()-X.getTime());M=24*60*60*1000;
      a=T/M;A=Math.floor(a);b=(a-A)*24;B=Math.floor(b);c=(b-B)*60;C=Math.floor((b-B)*60);D=Math.floor((c-C)*60);
      runtime_span.innerHTML="<br>本站已运行: "+A+"天"+B+"小时"+C+"分"+D+"秒  "}show_runtime();</script>
      <a href="https://wrm244.gxist.cn/state/" title="Website Uptime Monitoring" target="_blank"><img alt="updatetime" src="https://app.statuscake.com/button/index.php?Track=6856212&Days=7&Design=5"/></a>
      <br/>
      <a href="https://beian.miit.gov.cn" style="color: #ebedf0" target="_blank">桂ICP备2023000559号-1 </a>
      `,
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
      twitter: 'mailto:wrm244@qq.com',
      csdn: 'https://blog.csdn.net/wrm244',
      juejin: 'https://juejin.cn/user/3021907877702814',
      qq: 'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=934978593&website=wrm244.gxist.cn',
      zhihu: 'https://www.zhihu.com/people/dobet',
    },
  },
  clientModules: [require.resolve('./src/clientModules/routeModules.ts')],
  headTags: [
    // {//先加载主页LOGO图片
    //   tagName: 'link',
    //   attributes: {
    //     rel: 'preload',
    //     href: '/avatar.png',
    //     as: 'image',
    //   },
    // },
    // {
    //   tagName: 'script',
    //   attributes: {
    //     type: 'text/javascript',
    //   },
    //   innerHTML: `
    //   (function(){
    //     var el = document.createElement("script");
    //     el.src = "https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?d8f124cd7935068f963519fa2c5a1f9ad1987d8e4e573e54121a342f95ae26d030632485602430134f60bc55ca391050b680e2741bf7233a8f1da9902314a3fa";
    //     el.id = "ttzz";
    //     var s = document.getElementsByTagName("script")[0];
    //     s.parentNode.insertBefore(el, s);
    //     })(window)
    //   `,
    // },
    {
      tagName: 'script',
      attributes: {
        defer: "true",
        src: 'https://analytics.umami.is/script.js',
        'data-website-id': '6a499294-2682-4ef7-aa0a-413ba17b9e1d'
      }
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
          remarkPlugins: [math],
          rehypePlugins: [katex],
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
    [
      path.resolve(__dirname, './src/plugin/plugin-content-blog'),
      {
        path: 'blog',
        routeBasePath: '/',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/wrm244/wikiblog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '这是一个我用来记录和分享我的学习心得、个人感悟和创意项目的网站。你可以在这里找到我关于编程、设计、人工智能等各种主题的笔记和博客，也可以看到我参与或制作的一些有趣的项目。',
        blogSidebarCount: 10,
        blogSidebarTitle: '最近更新',
        postsPerPage: 6,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '河山的技术存档博客',
          description: '河山的技术存档博客订阅源',
          language: 'zh-CN',
          copyright: `Copyright © ${new Date().getFullYear()} 河山 Built with Docusaurus.`,
        },
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        name: "assets/images/[name].[ext]",
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
            href: '/svg/logo_round.svg',
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
            href: '/svg/logo_round.svg',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/svg/logo_round.svg',
            color: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: '/svg/logo_round.svg',
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
