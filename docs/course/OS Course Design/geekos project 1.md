---
id: geekos-project-1
slug: /geekos-project-1
title: geekos project 1
author: RiverMountain  
date: 2023/04/27
tags: [操作系统]  
keywords: [geekos]
description: 熟悉ELF文件格式，了解GeekOS系统如何将ELF格式的可执行程序装入到内存建立内核进程并运行的实现技术。
last_update:
  date: 2023/04/27
---  

# geekos project 1

## 目的
熟悉ELF文件格式，了解GeekOS系统如何将ELF格式的可执行程序装入到内存，建立内核进程并运行的实现技术。

## 要求
修改/geekos/elf.c文件：在函数Parse_ELF_Executable()中添加代码，分析ELF格式的可执行文件（包括分析得出ELF文件头、程序头，获取可执行文件长度，代码段、数据段等信息），并填充Exe_Format数据结构中的域值。

## ELF文件格式

![](assets/geekos%20project%201/image-20230427094309.png)
![](assets/geekos%20project%201/image-20230427094934.png)

## GeekOS的内核进程对象
```c title="GeekOS的内核进程对象"
include/kthread.h中定义，具体结构如下：
struct Kernel_Thread {
    ulong_t esp;			 // 进程的内核栈esp指针
    volatile ulong_t numTicks;		 // 计时器
    int priority;		  // 进程优先级
    DEFINE_LINK(Thread_Queue, Kernel_Thread);// 指针指向进程队列下一进程
    void* stackPage;	  // 内核栈页指针
    struct User_Context* userContext; // 用户进程上下文
    struct Kernel_Thread* owner; 		 // 父进程指针
    int refCount;		  // 引用计数
    bool alive;			  // 是否活跃
    struct Thread_Queue joinQueue;	 // 加入队列
    int exitCode;		  // 返回代码
    int pid;				  // 进程ID
    DEFINE_LINK(All_Thread_List, Kernel_Thread); // 全局进程链表指针 #define MAX_TLOCAL_KEYS 128
    const void* tlocalData[MAX_TLOCAL_KEYS];	// 本地信息
    int currentReadyQueue;	 // 进程当前所在的运行队列的索引编号
    bool blocked;		  // 是否被阻塞
};
```
## 内核线程的建立流程
![](assets/geekos%20project%201/image-20230427094631.png)

![](assets/geekos%20project%201/image-20230427094642.png)

通过Read_Fully函数将ELF可执行文件读入内存缓冲区；通过Parse_ELF_Executable函数解析ELF文件， 并通过Spawn_Program函数执行ELF文件。最后通过Free函数释放内存缓冲区。


```c title="Exe_Format和Exe_Segment的定义在elf.h"
struct　Exe_Format{
    struct Exe_Segment segmentList[EXE_MAX_SEGMENTS];
    int numSegments;    //定义了ELF文件中段的个数
    ulong_t entryAddr;  //代码入口地址 
}; 
struct Exe_Segment{
    ulong_t offsetInFile;   //段在可执行文件中的偏移值
    ulong_t lengthInFile;   //段在可执行文件中的长度 
    ulong_t startAddress;   //段在内存中的起始地址 
    ulong_t sizeInMemory;   //段在内存中的大小 
    int protFlags;          //保护标志
};
```

## Parse_ELF_Excutable函数

```c title="Parse_ELF_Excutable函数"
int Parse_ELF_Executable(char *exeFileData, ulong_t exeFileLength,struct Exe_Format *exeFormat)
参数：exeFileData——已装入内存的可执行文件所占用空间的起始地址
     exeFileLength——可执行文件长度
     exeFormat——保存分析得到的elf文件信息的结构体指针
```

## 本项目测试文件是a.c

在项目1的./src/user目录下有一个a.c文件，编译GeekOS后可以得到可执行程序a.exe，并写进PFAT文件系统，路径为c/a.exe。项目将此作为待装入的可执行文件，启动Bochs运行a.exe。

## 实现

1. 修改/project1/src/geekos/elf.c 文件中的 Parse_ELF_Executable()函数，实现对 ELF 格式文件的分析，并将分析结果保存到 Exe_Format 结构体中，以便系统使用。

```c title="/project1/src/geekos/elf.c"
int Parse_ELF_Executable(char *exeFileData, ulong_t exeFileLength,struct Exe_Format *exeFormat)
{
    //利用ELF头部结构体指向可执行文件头部，便于获取相关信息
    elfHeader *ehdr = (elfHeader*)exeFileData;
    //段的个数
    exeFormat->numSegments = ehdr->phnum;
    //代码入口地址
    exeFormat->entryAddr = ehdr->entry;
    //获取头部表在文件中的位置，便于读取信息
    programHeader *phdr = (programHeader*)(exeFileData + ehdr->phoff);
    //填充Exe_Segment
    unsigned int i;
    for(i = 0; i < exeFormat->numSegments; i++, phdr++)
    {
        struct Exe_Segment *segment = &exeFormat->segmentList[i];
        //获取该段在文件中的偏移量*
        segment->offsetInFile = phdr->offset;
        //获取该段的数据在文件中的长度
        segment->lengthInFile = phdr->fileSize;
        //获取该段在用户内存中的起始地址
        segment->startAddress = phdr->vaddr;
        //获取该段在内存中的大小
        segment->sizeInMemory = phdr->memSize;
        //获取该段的保护标志位
        segment->protFlags = phdr->flags;
    }
    return 0;
}
```

2. 修改/project1/src/geekos/lprog.c 文件中的 Spawn_Program()函数，将其中的 virtSize 局部变量修改为静态全局变量，即在文件头部添加“static unsigned long virtSize;”一行代码。
3. 修改 lprog.c 文件中的 Printrap_Handler()函数，将其改为如下内容：
```c title="lprog.c"
static void Printrap_Handler( struct Interrupt_State* state )
{
    char *msg;
    /* 此处修改以下内容以正确显示 a.c 中的局部变量 */
    if (state->eax <= virtSize)
        msg = (char *)virtSpace + state->eax;
    else
        msg = (char *)state->eax;
    print(msg);
    g_needReschedule = true;
    return;
}
```
5. 进入“/project1/build/”目录，在终端中执行“bochs”命令，启动运行后得到如下结果：
![](assets/geekos%20project%201/image-20230427091614.png)

## 作业题

1. ELF文件格式包括什么内容？
> 答：ELF文件由4部分组成，分别是ELF头（ELF header）、程序头部表（Program header table）、节区（Section）和节头部表（Section header table）。
2. 如何由ELF文件建立一个可运行的进程单位？
> 答：ELF文件是保存在GeekOS的PFAT文件系统中，首先需要将文件读入内存缓冲区，解析程序段和数据段等将其装入内存，之后建立进程执行装入内存相应的代码。
3. 在GeekOS系统中建立一个内核级线程应该建立什么相应实体单元？

4. 在GeekOS系统内核中，如何运行建立好的线程？
> 答：GeekOS操作系统为不同状态下的进程准备了不同的进程队列：就绪队列s_runQueue，等待队列s_reaperWaitQueue，销毁队列s_graveyardQueue，而运行态的只有一个g_currentThread指针指向哪个进程哪个进程就处于运行态。系统启动之后，会从Entry入口执行Main函数，执行到Init_Scheduler()函数时会建立3个最开始的进程Main、Idle和Reaper，同时调度Main。Idle在就绪队列队尾，当无进程可调度时Idle就会被调度并一直运行Yield()函数检查是否有可调度进程并让步。所以新建的线程加入到就绪队列就可以通过相应的调度算法被调度运行。

## 参考与致谢
- [GeekOS课程设计-project1](https://blog.csdn.net/qq_35008279/article/details/78984561)