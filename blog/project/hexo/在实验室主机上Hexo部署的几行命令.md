---
slug: /blog/project/hexo/about-deploy-prompt
title: 关于在此网站部署的几行命令
date: 2023-04-12 14:09:58
tags: [linux,hexo]
authors: RiverMountain
---
```bash
#在实验室主机上的PATH环境
export PATH="$PATH:/www/server/nodejs/v18.15.0/bin"
hexo clean
hexo generate
hexo deploy
```
