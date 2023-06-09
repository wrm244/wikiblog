---
id: HDFS文件存储原理
slug: /2HDFS文件存储原理
title: 2 HDFS文件存储原理
author: RiverMountain  
date: 2023/06/13
tags: [大数据,hadoop,HDFS]  
keywords: [大数据,hadoop,HDFS]
description: Hadoop分布式文件系统的存储原理
last_update:
  date: 2023/06/13
---

## 统一管理单位

问题： 文件大小不一不利于统一管理

解决办法：分块，统一单位，称为：block块
> 每个block大小为256MB(可以配置文件修改)

## 冗余备份

问题：如果某个块丢失了怎么办？

解决办法： 通过多个副本备份，放在不同的服务器
> 每个块都有两个备份，分发到其他服务器


## 配置副本数量
### 添加 hdfs-site.xml 配置
```xml
<property>
    <name>dfs.replication</name>
    <value>3</value> %%默认是3个，默认不用配置%%
</property>
```
> 请修改所有服务器上的配置

### 命令修改
```bash
hadoop fs -D dfs.replication=2 -put <args>
# -D 参数暂时修改该命令执行的配置
```

对于已经存在的文件，修改dfs.replication配置不会生效

可以使用：
```bash
hadoop fs -setrep [-R] 2 path
```


#### fsck命令验证副本数
```bash
hdfs fsck path [-files [-blocks [-location]]]
# files参数表示输出文件状态
# 以下是比较小文件的备份状态
[hadoop@node1 ~]$ hdfs fsck /hello.txt -files -blocks -locations
Connecting to namenode via http://node1:9870/fsck?ugi=hadoop&files=1&blocks=1&locations=1&path=%2Fhello.txt
FSCK started by hadoop (auth:SIMPLE) from /192.168.3.133 for path /hello.txt at Tue Jun 13 17:39:09 CST 2023

/hello.txt 6 bytes, replicated: replication=2, 1 block(s):  OK
0. BP-234544642-192.168.3.133-1686635010728:blk_1073741826_1003 len=6 Live_repl=2  [DatanodeInfoWithStorage[192.168.3.134:9866,DS-d5a764ea-4632-45e1-9617-77c897195a1e,DISK], DatanodeInfoWithStorage[192.168.3.133:9866,DS-d0dc74c6-3b69-446c-8170-17e8eaaa5de3,DISK]]
```

以下是``/hadoop-3.3.5.tar.gz``文件在服务器上的备份状态
```bash
[hadoop@node1 ~]$ hadoop fs -ls -h /
Found 4 items
-rw-r--r--   3 hadoop supergroup    673.8 M 2023-06-13 17:46 /hadoop-3.3.5.tar.gz
-rw-r--r--   2 hadoop supergroup          6 2023-06-13 17:37 /hello.txt
drwxr-xr-x   - hadoop supergroup          0 2023-06-13 16:05 /home
drwx------   - hadoop supergroup          0 2023-06-13 14:53 /user
[hadoop@node1 ~]$ hdfs fsck /hadoop-3.3.5.tar.gz -files -blocks -locations
Connecting to namenode via http://node1:9870/fsck?ugi=hadoop&files=1&blocks=1&locations=1&path=%2Fhadoop-3.3.5.tar.gz
FSCK started by hadoop (auth:SIMPLE) from /192.168.3.133 for path /hadoop-3.3.5.tar.gz at Tue Jun 13 17:48:34 CST 2023

/hadoop-3.3.5.tar.gz 706533213 bytes, replicated: replication=3, 3 block(s):  OK
0. BP-234544642-192.168.3.133-1686635010728:blk_1073741827_1004 len=268435456 Live_repl=3  [DatanodeInfoWithStorage[192.168.3.134:9866,DS-d5a764ea-4632-45e1-9617-77c897195a1e,DISK], DatanodeInfoWithStorage[192.168.3.133:9866,DS-d0dc74c6-3b69-446c-8170-17e8eaaa5de3,DISK], DatanodeInfoWithStorage[192.168.3.135:9866,DS-a90469a0-e9fc-4749-8287-d7ab2ab8e4c8,DISK]]
1. BP-234544642-192.168.3.133-1686635010728:blk_1073741828_1005 len=268435456 Live_repl=3  [DatanodeInfoWithStorage[192.168.3.134:9866,DS-d5a764ea-4632-45e1-9617-77c897195a1e,DISK], DatanodeInfoWithStorage[192.168.3.135:9866,DS-a90469a0-e9fc-4749-8287-d7ab2ab8e4c8,DISK], DatanodeInfoWithStorage[192.168.3.133:9866,DS-d0dc74c6-3b69-446c-8170-17e8eaaa5de3,DISK]]
2. BP-234544642-192.168.3.133-1686635010728:blk_1073741829_1006 len=169662301 Live_repl=3  [DatanodeInfoWithStorage[192.168.3.135:9866,DS-a90469a0-e9fc-4749-8287-d7ab2ab8e4c8,DISK], DatanodeInfoWithStorage[192.168.3.134:9866,DS-d5a764ea-4632-45e1-9617-77c897195a1e,DISK], DatanodeInfoWithStorage[192.168.3.133:9866,DS-d0dc74c6-3b69-446c-8170-17e8eaaa5de3,DISK]]
```
> 以上文件 replicated: replication=3, 3 block(s):  OK 有三个本体block，总的有9个block。

当我关闭node2的电源时，检查文件状态，他仍然是可以读取的：
```bash
Status: HEALTHY
 Number of data-nodes:  3
 Number of racks:               1
 Total dirs:                    0
 Total symlinks:                0

Replicated Blocks:
 Total size:    706533213 B
 Total files:   1
 Total blocks (validated):      3 (avg. block size 235511071 B)
 Minimally replicated blocks:   3 (100.0 %)
 Over-replicated blocks:        0 (0.0 %)
 Under-replicated blocks:       0 (0.0 %)
 Mis-replicated blocks:         0 (0.0 %)
 Default replication factor:    3
 Average block replication:     3.0
 Missing blocks:                0
 Corrupt blocks:                0
 Missing replicas:              0 (0.0 %)
 Blocks queued for replication: 0

Erasure Coded Block Groups:
 Total size:    0 B
 Total files:   0
 Total block groups (validated):        0
 Minimally erasure-coded block groups:  0
 Over-erasure-coded block groups:       0
 Under-erasure-coded block groups:      0
 Unsatisfactory placement block groups: 0
 Average block group size:      0.0
 Missing block groups:          0
 Corrupt block groups:          0
 Missing internal blocks:       0
 Blocks queued for replication: 0
FSCK ended at Tue Jun 13 18:03:49 CST 2023 in 2 milliseconds
```

## 设置block大小
### 添加 hdfs-site.xml 配置
```xml
<property>
    <name>dfs.blocksize</name>
    <value>268435456</value> %%256MB%%
</property>
```
> 请修改所有服务器上的配置

## NameNode
> 负责记录整理文件block块关系

### edits文件
>流水账，记录hdfs每次操作，有时间，路径，文件大小等。

- 有多个edits也是防止单个记录文件过大，那问题是如何查找检索文件？
- 请注意，流水账的意思是记录了修改不了，也就是如果你的文件被删除，他会记录新的，但不一定是最终状态。
- 所以对edits进行压缩，压缩的是每个事务(文件)的最终状态。
### fsimage 文件
> 将全部edits文件合并压缩后得到的文件，所以你查看文件的信息是读取fsimage

**文件生成步骤**：
- 不存在该文件，将全部edits合并为第一个fsimage
- 如存在，将全部的edits和已存在的fsimage进行合并，形成新的fsimage

### 文件合并控制参数

- dfs.namenode.checkpoint.period 默认3600s，一个小时
- dfs.namenode.checkpoint.txns 默认100w次事务执行一次

### SecondaryNameNode(辅助程序)

> edits由NameNode生成，合并由辅助程序执行（如果辅助程序不开启，会卡顿，没程序合并）

## 数据写入

### 数据的写入流程

![](assets/2%20HDFS文件存储原理/image-20230615202040.png)

1. 客户端写入请求(hadoop fs、hdfs dfs)，客户端向NameNode发起请求
2. NameNode审核权限、空间等，满足条件允许写入，告知地址
3. 客户端向指定的DataNode发送数据包（找一个发送）
4. 后续由NameNode通知完成副本的复制备份
5. 写入完成客户端通知NameNode，NameNode做元数据记录（edits）

  
:::tip  
- NameNode不负责数据写入，只负责事务记录和权限审批
- 客户端直接向1台DataNode写数据，选择网络距离最近的
- 数据块备份复制由DataNode之间自行完成
:::


## 数据读取

![](assets/2%20HDFS文件存储原理/image-20230615203343.png)

