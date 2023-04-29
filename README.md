
## 河山的技术存档 (website) [<img src="https://wrm244.github.io/svg/logo_large.svg" width="90" height="90" align="right">](https://wrm244.gxist.cn/)

![GitHub last commit](https://img.shields.io/github/last-commit/wrm244/wrm244.github.io?label=update&logo=github) [![Netlify Status](https://api.netlify.com/api/v1/badges/5db8174d-fe3f-4ada-a963-5a52a131788c/deploy-status)](https://app.netlify.com/sites/wrm244/deploys) [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

<p align=center>
Build with 🦖<a href="https://docusaurus.io/">Docusaurus</a> Theme use <a href="https://github.com/wrm244/docusaurus-theme-zen">Docusaurus-theme-zen<a> 
<a href="https://wrm244.github.io">🖥 Online Preview</a>
</p>

<p align=center>
<a href="https://docusaurus.io/zh-CN/" target="_blank"><img alt="Built with Docusaurus" width="141" height="50" src="https://wrm244.github.io/assets/images/buildwith.png" /></a> <a href="https://www.netlify.com/" target="_blank"><img alt="Built with Netlify" height:"50px" src="https://wrm244.github.io/assets/images/netlify-color-accent.svg" /></a>     
</p>

## 介绍

这是一个我用来记录和分享我的学习心得、个人感悟和创意项目的网站。你可以在这里找到我关于编程、设计、人工智能等各种主题的笔记和博客，也可以看到我参与或制作的一些有趣的项目，你可以使用该[主题](https://github.com/wrm244/docusaurus-theme-zen)对你的个人页面进行搭建。该技术存档使用🦖 <a href="https://docusaurus.io/">Docusaurus</a>搭建，遵循[EPL-1.0](./LICENSE)协议。


## 代码结构


```bash
├── blog                           # 博客
│   ├── first-blog.md
│   └── authors.yml                # 作者信息(可以多个作者)
├── docs                           # 文档/笔记
│   └── stack
│         └──introduction.md       # 笔记介绍
├── data                           # 项目/导航/友链数据
│   ├── friend.ts                  # 友链
│   ├── project.ts                 # 项目
│   └── resource.ts                # 资源导航
├── i18n                           # 国际化
├── src
│   ├── components                 # 组件
│   ├── css                        # 自定义CSS
│   ├── pages                      # 自定义页面
│   ├── plugin                     # 自定义插件
│   └── theme                      # 自定义主题组件
├── static                         # 静态资源文件
│   └── assets                     # 静态文件
├── docusaurus.config.js           # 站点的配置信息
├── sidebars.js                    # 文档的侧边栏
├── package.json
└── yarn.lock                      # 建议使用yarn保留
```

## 安装

请访问主题仓库进行部署属于自己的网站[Docusaurus-theme-zen](https://github.com/wrm244/docusaurus-theme-zen)


## Github Action CI
该流程会同步部署到云服务器与GitHub Pages上面：
```yml
name: ci

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Use Node.js v18.5
        uses: actions/setup-node@v3
        with:
          node-version: '18.5.0'
     #node cache
      - name: Cache node modules
        uses: actions/cache@v1
        id: cache
        with:
          path: node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      - name: Install Dependencies
        if: steps.cache.outputs.cache-hit != 'true'
        run: yarn install
      
      - name: Build Project
        run: |
          yarn run build
    #search脚本      
      - name: Get the content of docsearch.json as config
        id: algolia_config
        run: echo "::set-output name=config::$(cat docsearch.json | jq -r tostring)"

      - name: Run docsearch-scraper
        env:
          ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}
        run: |
          docker run \
            --env APPLICATION_ID=${ALGOLIA_APP_ID} \
            --env API_KEY=${ALGOLIA_API_KEY} \
            --env "CONFIG=${CONFIG}" \
            algolia/docsearch-scraper

    #ssh同步./build 文件夹到云服务器
      - name: SSH Deploy
        uses: easingthemes/ssh-deploy@v2.2.11
        env:
          SSH_PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
          ARGS: '-avzr --delete'
          SOURCE: './build'
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: 'root'
          TARGET: '/www/wwwroot/wrm244'

    #同步到github pages上面      
      - name: Github page Deploy
        uses: wrm244/docusaurus-deploy-action@master # 使用专门部署 Hexo 到 GitHub pages 的 action
        env:
          PERSONAL_TOKEN: ${{ secrets.PERSION_TOKEN }} # secret 名
          PUBLISH_REPOSITORY: wrm244/wrm244.github.io # 公共仓库，格式：GitHub 用户名/仓库名
          BRANCH: wikiblog # 分支，填 gh-pages 就行
          PUBLISH_DIR: ./build # 部署 public 目录下的文件
```


## 协议

[EPL-1.0](./LICENSE) © 河山 100%
