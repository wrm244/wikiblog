---
id: Docusaurus-guides
slug: /Docusaurus-guides
title: Docusaurus 部署手册
authors: RiverMountain
date: 2023/01/21
last_update:
  date: 2023/01/21
keywords: ['guides', 'Docusaurus', 'Docusaurus-guides']
---

import LinkList from "@site/src/components/LinkList"

- 这里记录着我搭建 [Docusaurus](https://docusaurus.io/) 的部分踩坑过程，希望能够给正在搭建 Docusaurus 的小伙伴一些帮助，可行性均进行过验证。

- 本博客使用的是 [Docusaurus 2.x](https://docusaurus.io/zh-CN/blog/2022/08/01/announcing-docusaurus-2.0) 版本，是基于 [docusaurus-theme-zen](https://github.com/wrm244/docusaurus-theme-zen) 主题。如果你喜欢我这个主题，源码是开源的，可以直接 fork 或者 git clone 均可，也可以通过 [Vercel](https://vercel.com/new/clone?repository-url=https://github.com/wrm244/docusaurus-theme-zen/tree/main&project-name=blog&repo-name=blog) 一键部署

**👇 建议多翻阅文官文档，或许会有你需要的答案**
<LinkList
  data={[
    {
      title: "Docusaurus 中文",
      link: "https://docusaurus.io/zh-CN/docs",
    },
  ]}
/>
以下是分章节预览：

import DocCardList from '@theme/DocCardList'; import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
