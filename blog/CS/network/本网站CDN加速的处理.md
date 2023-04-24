---
title: 本网站CDN加速的处理
description: 在优化个人主页的时候发现cdn的处理很智能，记录学习一下
slug: /blog/CS/network/CDN
authors: RiverMountain
tags: [CDN,computer-science]
keywords: [network,cdn]
date: 2023/04/25
hide_table_of_contents: false
last_update:
  date: 2023/04/25
---
## 本网站CDN加速的处理


![](assets/本网站CDN加速的处理/image-20230425003649.png)

本来这个网站的cdn服务是挂载在腾讯云的，因为实验室之前购买了云主机与cdn流量包，只用了一点流量还未过期，所以就顺便资源利用最大化直接使用了腾讯云cdn服务。使用后体验感觉不愧是大厂云服务，ping的延迟基本在15ms以下，虽然速度可嘉，但在几天的使用下来发现，实验室所购买的流量包是国内的，不对国外区域提供，离谱的是，在我利用站长工具测速的时候，国内一片绿，国外的一片红！墙上加墙，循环了属于是。当然还有其他缺点，比如他的收费细项太多太杂了，总会莫名其妙的扣钱，看个账单还看不出是哪里扣费用。以至于在其他平台寻找下家，最后选定了有开发者联盟支持的又拍云。

<!-- truncate -->

---

`提示：以下是本篇文章正文内容，下面案例可供参考`

# 一、pandas是什么？

示例：pandas 是基于NumPy 的一种工具，该工具是为了解决数据分析任务而创建的。

# 二、使用步骤

## 1.引入库

代码如下（示例）：

```c

import numpy as np

import pandas as pd

import matplotlib.pyplot as plt

import seaborn as sns

import warnings

warnings.filterwarnings('ignore')

import ssl

ssl._create_default_https_context = ssl._create_unverified_context

```

## 2.读入数据

代码如下（示例）：

```c

data = pd.read_csv(

'https://labfile.oss.aliyuncs.com/courses/1283/adult.data.csv')

print(data.head())

```

该处使用的url网络请求的数据。

---

# 总结

提示：这里对文章进行总结：

例如：以上就是今天要讲的内容，本文仅仅简单介绍了pandas的使用，而pandas提供了大量能使我们快速便捷地处理数据的函数和方法。
  
