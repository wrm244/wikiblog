---
id: geekos-project-0
slug: /geekos-project-0
title: geekos project 0
author: RiverMountain  
date: 2023/04/27
tags: [OS]  
keywords: [OS,geekos]
description: 熟悉GeekOS的项目编译、调试和运行环境，掌握GeekOS运行工作过程。
last_update:
  date: 2023/04/27
---  
## 项目设计要求

1. 搭建GeekOS的编译和调试平台，掌握GeekOS的内核进程工作原理。  
2. 熟悉键盘操作函数，编程实现一个内核进程。该进程的功能是：接收键盘输入的字符并显示到屏幕上，当输入ctrl+d时，结束进程的运行。

## 编写项目0的/src/geekos/main.c

```c title="### /src/geekos/main.c"
void project0(){
    Print("To Exit hit Ctrl + d.\n");
    Keycode keycode;
    while(1)
    {
        if(Read_Key(&keycode))
        {
            if(!((keycode & KEY_SPECIAL_FLAG) || (keycode & KEY_RELEASE_FLAG)))// 不是特殊键或者弹起
            {
                int asciiCode = keycode & 0xff;//d
                if((keycode & KEY_CTRL_FLAG)==KEY_CTRL_FLAG && asciiCode=='d')//ctrl+d
                {
                    Print("\n---------BYE!---------\n");
                    Exit(1);
                }else
                {
                    Print("%c",(asciiCode=='\r') ? '\n' : asciiCode);
                }
            }
        }
    }
}
```

## main.c 运行

```c title="main.c"
struct Kernel_Thread *thread;
thread = Start_Kernel_Thread(&project0,0,PRIORITY_NORMAL,false);

```
## 运行结果

![](assets/geekos%20project%200/image-20230427093854.png)

## 作业题
1. GeekOS系统内核是如何编译的？
> 答：需提前安装GNU gcc编译器，用来编译C语言程序代码，NASM汇编器用来编译汇编语言程序代码。编译GeekOS源代码通过build目录下的Makefile文件来编译，其中已经写好了编译规则，使用make命令编译。（make depend扫描目录，判断依赖关系）
2. GeekOS系统内核编译的结果是什么？
> 答：GeekOS内核编译后,在build目录下会生成一个软盘镜像文件fd.img。
3. 如何设置运行GeekOS系统的计算机环境？
> 答：安装Bochs PC模拟器，用来模拟运行GeekOS系统。
4. 如何运行GeekOS系统内核？
> 答：使用Bochs模拟器模拟来运行Geekos系统内核，需要编写配置文件.bochsrc配置相应信息后使用bochs命令启动Bochs模拟器运行GeekOS编译生成的镜像(fd.img)。
5. GeekOS系统是如何创建键盘管理进程？
> 答：Init_Keyboard()函数:初始化键盘输入,包括初始化键盘缓冲区队列,初始化键盘中断处理函数,最后开启键盘中断。
6. 简述计算机系统的启动流程。
> 答：
>1. 在Bochs开始运行系统后,首先会自动检测启动设备。
>2. 设备检测无异常往下执行，因为软盘首扇区最后一个字在编译时是写入55AA数据,而Bochs被配置为从软盘启动,这样Bochs得以成功地检测到GeekOS的启动软盘.之后Bochs就会像一台真正的计算机一样。
>3. 导入软盘的首扇区数据到从内存地址0x7c00开始的一块内存区,之后跳转到这个地址,开始执行这段首扇区内的程序代码.首扇区内的代码是由位于/src/geekos目录中的fd_boot.asm编译生成的引导程序.这段汇编程序完成搜索并装载软盘中的GeekOS内核二进制文件的功能
>4. 在装载完毕后,装载程序执行段间跳转,转入程序Setup(/src/geekos目录中的setup.asm编译生成)继续执行.Setup程序完成装载临时GDT,IDT描述符,打开A20地址线,初始化PIC中断控制器,最后由实模式跳入保护模式.完成了实模式向保护模式的转换之后,Setup跳转到内核ENTRY_POINT入口点.至此,GeekOS的引导过程结束,内核初始化过程开始。
>5. GeekOS的内核入口点ENTRY_POINT指向的是内核Main函数的函数入口,在编译时完成对ENTRY_POINT的初始化.Main函数在src/src/geekos/main.c中实现.Main函数通过调用内核各模块的初始化函数来完成系统内核的初始化。