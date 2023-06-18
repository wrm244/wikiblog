---
id: 3 分布式计算SQL体系
slug: /3分布式计算SQL体系
title: 3 分布式计算SQL体系
author: RiverMountain  
date: 2023/06/18
tags: [大数据,hadoop,SQL,Hive]
keywords: [大数据,hadoop,SQL,Hive]
description: 分布式计算SQL体系
last_update:
  date: 2023/06/18
---

## Hive
> 主要功能是将SQL翻译成MapReduce

![](assets/4%20分布式计算SQL体系/image-20230618134642.png)

## 模拟实现Hive

![](assets/4%20分布式计算SQL体系/image-20230618134734.png)

针对SQL:
```sql
SELECT city, COUNT(*) FROM t_user GROUP BY city
```

![](assets/4%20分布式计算SQL体系/image-20230618143439.png)

:::tip
针对文本文件，需要对文件生成映射才可以查找计算
:::

针对以上分析构建SQL计算，需要拥有：
- 元数据管理功能（数据位置，数据文件，数据描述）
- SQL解析器（分析SQL，SQL转换MR）

![](assets/4%20分布式计算SQL体系/image-20230618143807.png)

## Hive 基础架构

![](assets/4%20分布式计算SQL体系/image-20230618143932.png)

- Metastore-元数据存储
- Driver驱动程序（SQL解析器）
- 用户接口

## Hive 部署

:::tip
Hive 本身是单机工具，只需部署在一台服务器上
:::

### 规划

| 服务                       | 机器        |
| -------------------------- | ----------- |
| Hive程序                   | 部署在node1 |
| 关系性数据库（元数据映射） | 部署在node1            |

