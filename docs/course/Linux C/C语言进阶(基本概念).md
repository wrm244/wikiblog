---
id: C语言进阶基本概念
slug: /C语言进阶基本概念
title: 基本概念
author: RiverMountain  
date: 2023/06/19
tags: [C,Linux]
keywords: [C,Linux]
description: C语言基本概念部分细节拾遗(嵌入式C语言)
last_update:
  date: 2023/06/19
---

# 再次了解C
## c的历史
- 1960 原型A语言->ALGOL语言
- 1963 CPL语言
- 1967 BCPL
- 1970 B语言
- 1973 C语言

## C语言特点
1. 基础性语言
2. 语法简洁 紧凑 方便 灵活(得益于指针)
3. 运算符 数据结构丰富
4. 结构化 模块化编程
5. 移植性好 执行效率高
6. **允许直接对硬件操作**

## 学习建议
1. 概念的正确性
2. 动手能力
3. 主动阅读优秀的程序段
4. 大量练习,编程是技术不是理论

## 学习思路
1. 基本概念
2. 数据类型 运算符 表达式
3. 输入输出
4. 流程控制
5. 数组
6. 指针
7. 函数
8. 构造类型
9. 动态内存管理
10. 常用库函数 
11. 调试工具和调试技巧

## 环境搭建与"Hello world"
## 环境
- 当前测试环境是安装了基于`Redhat`的`Rocky`发行版，搭建在``ESXI 6.4``虚拟机上
```bash
[root@node1 ~]# gcc --version
gcc (GCC) 11.3.1 20221121 (Red Hat 11.3.1-4)
Copyright © 2021 Free Software Foundation, Inc.
本程序是自由软件；请参看源代码的版权声明。本软件没有任何担保；
包括没有适销性和某一专用目的下的适用性担保。
# uname -a
Linux node1 5.14.0-284.11.1.el9_2.x86_64 #1 SMP PREEMPT_DYNAMIC Tue May 9 17:09:15 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux
```

### "Hello world"
```c
#inlcude <stdio.h>
#include <stdlib.h>

int main(void){
    printf("hello world\n");
    exit(0);
}
```

gcc 编译c的源文件过程:

``` bash
gcc -v
线程模型：posix
Supported LTO compression algorithms: zlib zstd
gcc 版本 11.3.1 20221121 (Red Hat 11.3.1-4) (GCC)
```

**C源文件->预处理->编译->汇编->链接->可执行文件**

完整过程
- 预处理
``` bash
gcc -E hello.c > hello.i
```
- 编译
``` bash
gcc -S hello.i 
```
- 汇编
``` bash
gcc -c hello.s 
```
- 链接->可执行文件
```c
gcc hello.o -o hello
```

或者
``` bash
gcc hello.c -o hello
```

又或者
``` bash
make hello
```

执行
``` bash
./hello

hello world
```

# 基本概念

## 怎么写代码
### 头文件的重要性
在c中，如果没有出现函数原型，就默认函数的返回值是int(老版本GCC)
```c
#include <stdio.h>

int main()
{
    int *num = malloc(sizeof(int));
    *num = 100;
    printf("%d\n",*num);
    return 0;
}
```

``` bash
hello.c: 在函数‘main’中:
hello.c:5:23: 警告：隐式声明函数‘malloc’ [-Wimplicit-function-declaration]
    5 |     int *num = (int *)malloc(sizeof(int));
          |                       ^```~~
          hello.c:5:23: 警告：隐式声明与内建函数‘malloc’不兼容
```
- 正确写法
```c
#include <stdio.h>
#include <stdlib.h>
int main()
{
    int *num = (int *)malloc(sizeof(int));
    return 0;
}
```

## 数据类型 运算符 表达式
- 基本类型
  - 数值类型
    - short
    - int
    - long
    - float
    - double
  - 字符类型
- 构造类型
  - 数组
  - 结构体 struct
  - 共用体 union
  - 枚举类型 enum
- 指针类型
- 空类型 void

``` bash
254 -> unsigned int -> 32bit
(254)10 = (1111 1110)2 = (376)8 = (FE)16

254
B11111110(c不认识这个表示)
0376
0xFE
```


#### 类型转换
隐式转化：

```c
int i;
float f;
double d;
char ch;
//混合运算往精度高的类型靠
ch + i -> i
f - d -> d

(ch + i) - (float - double) -> double
```

#### bool类型

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h> //标准bool类型头文件
int main() {
  bool a = false;
  printf("a = %d\n", a);
  exit(0);
}
```

#### 浮点型的失真问题

```c
int func(float f) {
  if (f < 0) {
    return -1;
  } else if (fabs(f-0) <= 1e-6) 
  { //极限方法 double fabs (double x) 返回浮点数 x 的绝对值
    return 0;
  } else {
  return 1;
  }
}
```

####  char 类型

**在iso c中 `char`有无符号是未定义行为**

#### 关于0的不同解释

```c
0(整形) '0'(字符常量) "0"(字符串常量) '\0'(字符常量)
```

#### 类型匹配问题
数据类型要和后续代码中所使用的输入输出要相匹配(小心自相矛盾)

:::tip
比如说对于定义了无符号整型，由于某些原因要赋值给整型，有可能会溢出int的范围
:::

```c
#include <stdlib.h>
#include <stdio.h>

int main() {
  unsigned int a;
  a = 1 << 31;
  printf("%d", a);
}

```

正确

```c
#include <stdlib.h>
#include <stdio.h>

int main() {
  unsigned int a;
  a = 1 << 31;
  printf("%ud", a);
}

```

## 常量与变量
### 常量
- 整形常量(int)： 1 890
- 实型常量(float)： 1.2 3.14
- 字符常量(char)： `` '\t' '\n' '\0' '\015'(8进制) '\x7f' '\018'(错误的表示！！三个数是8进制标识不出现8)``
- 字符串常量(构造类型来构造)： ``"" "a" "abXYZ" "abc\n\021\010"(a b c \n \021 \0 1 8)``
- 标识常量:  ``#define``，在预处理阶段，不检查语法，只是简单的替换。

![](assets/C语言进阶(基本概念)/image-20230619232422.png)

##### 宏``#define``的用法
###### 直接替换宏体直接内容
> 这个部分在预处理的过程中不检测语法

```c
#include <stdlib.h>
#include <stdio.h>

#define PI 3.1415926 //预处理解决掉了
#define ADD 2+3
// 正确写法
//#define ADD (2+3)
int main() {
	int a,b,c;
	a * PI; //在预处理会被直接替换为宏体内容
	b + PI;
	c / PI;
  printf("%f\n", PI);
  printf("%d\n", ADD * ADD);
}
:! gcc -E `PWD`/main.c
```

预编译结果：

```c
# 3 "main.c" 2
# 8 "main.c"
int main() {
 int a,b,c;
 a * 3.1415926;
 b + 3.1415926;
 c / 3.1415926;
  printf("%f\n", 3.1415926);
  printf("%d\n", 2+3 * 2+3); //完整替换这里会出现优先级问题
  exit(0);
}
```

:::tip 
建议在宏体内容括上括号
:::

###### 直接替换宏体函数
```c
#include <stdlib.h>
#include <stdio.h>

#define MAX(a,b) ((a) > (b) ? (a) : (b))

int main() {
  int a = 3, b = 5;
  printf("%d\n",MAX(a, b));
}
/**
# 6 "main.c"
int main() {
  int a = 3, b = 5;
  printf("%d\n",(a > b ? a : b));

}
*/
```

如果把宏体加上括号就会出现以下情况：

```bash
[root@node1 ~]# cat main.c 
#include <stdlib.h>
#include <stdio.h>

#define MAX(a,b) ((a) > (b) ? (a) : (b))

int main() {
  int a = 3, b = 5;
  printf("%d\n",MAX(a++, b++));
  printf("%d\t %d\n",a,b);
}
[root@node1 ~]# ./main 
6
4        7 #这里原本是5会自增两次
#预编译结果
# 6 "main.c"
int main() {
  int a = 3, b = 5;
  printf("%d\n",((a++) > (b++) ? (a++) : (b++))); #一目了然确定了问题所在
  printf("%d\t %d\n",a,b);
}
```

:::tip
在标准C对于以上无解，但我们可以用以下不是标准C方法技巧解决
:::

```c
#include <stdlib.h>
#include <stdio.h>

#define MAX(a,b) \
({int A=a,B=b; ((A) > (B) ? (A) : (B));})
//#define MAX(a,b) \
//({typeof(a) A=a,B=b; ((A) > (B) ? (A) : (B));}) typeof(a)获取a的类型来定义
//必须加括号
int main() {
  int a = 3, b = 5;
  printf("%d\n",MAX(a++, b++));
  printf("%d\n",MAX(a++, b++));
}
#预编译结果
# 6 "main.c"
int main() {
  int a = 3, b = 5;
  printf("%d\n",({int A=a++,B=b++; ((A) > (B) ? (A) : (B));}));
  printf("%d\n",({int A=a++,B=b++; ((A) > (B) ? (A) : (B));}));
}
```

:::danger
在程序的预处理阶段，占编译时间，不占运行时间(没有函数调用的消耗)，但不检查语法(比较危险)
:::

### 变量
``[存储类型] 数据类型 标识符 = 值``
> TYPE  NAME  = VALUE

- 标识符：由字母、数字、下划线组成且不能以数字开头的一个标识序列。如下文法：
```c
letter -> a|b|...z|A|B|...|Z|_
digit -> 0|1|...|9
identifier -> letter(letter|digit)*
标识符： [_a-zA-Z][_a-zA-Z0-9]*
```
- 存储类型:
	- ``auto``：(默认) 自动分配空间(没有指定存储类型时，缺省为auto，自动分配与回收)，分配在栈空间上。**得出的数值随机**
	- ``register`` ：(建议型)寄存器类型 ``建议编译器分配在寄存器上``  只能定义局部变量，不能定义全局变量，大小有限制，只能定义32位大小的数据类型，比如``double``就不可以。因为寄存器没有地址，所以一个register类型的变量无法打印出地址查看或使用。
	- ``inline``：从C++引入
	- ``static``：(静态型) 一定自动初始化为0值或空值并且static变量的值有继承性。另外常用来修饰一个变量或者函数(防止当前函数对外扩展)
	- ``extern``： (说明型) 意味着不能改变被说明的量的值或类型，可以用来扩展外部变量的作用域（不能写extern int a=1;来给外部整形变量a幅初值1编译会报错的）
- 数据类型 = 基本数据类型 + 构造类型
- 值：注意匹配数据类型即可

:::tip
这里寄存器指的是x86/AMD的寄存器，把微机和单片机以及其他架构的处理器搞混了，学了微机原理你就知道了，PC机的CPU的寄存器是靠寄存器的名字寻址的，不是靠地址寻址的，所以PC机的寄存器是没有地址的。
:::

#### 变量的生命周期与作用范围
##### static 与 auto
```c
#include <stdlib.h>
#include <stdio.h>

void func() {
  static int x = 1;
  x++;
  printf("%p->%d\n", &x ,x);
}

int main() {
  func();
  func();
  func();
}
```
以上代码结果：
```bash
[root@node1 ~]# ./main
0x404024->2
0x404024->3
0x404024->4

#不使用static存储类型结果：
[root@node1 ~]# ./main
0x7ffffa47fc4c->2
0x7ffffa47fc4c->2
0x7ffffa47fc4c->2
```
##### 全局变量与局部变量
> 全局变量的概念是从变量定义开始到代码结束 
> 局变量的概念是从变量定义开始到代码块结束（语句体）

:::tip
作用范围永远是内部屏蔽外部的
:::
```c
#include <stdio.h>
#include <stdlib.h>

int i=0;

void fun (void){
        for(i= 0;i<5;i++)
                printf("%c",'*');
        printf("\n");
        printf("[%s]%d\n", __FUNCTION__, i);
}
int main(){
        for( i= 0;i<5;i++)
                fun();
        exit(0);
}
//运行结果：
cc     fun.c   -o fun
*****
[fun]5
```

##### 补充project工程实现
> 多个c文件

:::tip
使用 ``vim * -p`` 打开文件夹下所有文件，使用gt命令切换文件编辑。
:::
```c

#include <stdio.h>
#include <stdlib.h>

#include "proj.h"
int i=10;
int main(){
        printf("[%s]:i = %d\n",__FUNCTION__,i);
        fun();
        exit(0);
}
```

```c
//proj.c
#include <stdio.h>
#include <stdlib.h>
#include "proj.h"
int i =100;
void fun(void){
        printf("[%s]:i = %d\n",__FUNCTION__,i);
        exit(0);
}
```

```h
#ifndef PROJ_H__
#define PROJ_H__
void fun(void);
#endif
```
结果会冲突：
```bash
[root@node1 minproject]# gcc main.c proj.c
/usr/bin/ld: /tmp/cc2v50cH.o:(.data+0x0): multiple definition of `i'; /tmp/cc63AEzU.o:(.data+0x0): first defined here
collect2: 错误：ld 返回 1
```

加了static后编译成功：

```bash
[root@node1 minproject]# gcc main.c proj.c
[root@node1 minproject]# ls
a.out  main.c  proj.c  proj.h
[root@node1 minproject]# ./a.out 
[main]:i = 10
[fun]:i = 100
```

:::tip
以上例子说明常用来修饰一个变量或者函数(防止当前函数对外扩展)
:::

同理在函数前面添加static：
```c
static void fun(void){
        printf("[%s]:i = %d\n",__FUNCTION__,i);
        exit(0);
}
```
结果如下：
```bash
[root@node1 minproject]# gcc main.c proj.c
proj.c:5:1: 错误：对‘fun’的静态声明出现在非静态声明之后 #这里是语法错误
    5 | static void fun(void){
      | ^~~~~~
In file included from proj.c:3:
proj.h:3:6: 附注：previous declaration of ‘fun’ with type ‘void(void)’
    3 | void fun(void);
      |      ^~~
[root@node1 minproject]# vim proj.h
[root@node1 minproject]# gcc main.c proj.c
In file included from main.c:4:
proj.h:3:13: 警告：‘fun’使用过但从未定义
    3 | static void fun(void);#这里是运行错误
      |             ^~~
/usr/bin/ld: /tmp/ccVlu3p6.o: in function `main':
main.c:(.text+0x21): undefined reference to `fun'
collect2: 错误：ld 返回 1
```
:::tip
以上例子也说明了``static``常用来修饰一个变量或者函数(防止当前函数对外扩展)，如何解决static隐藏函数？可以使用非静态函数call_fun来间接调用静态函数（就像面向对象的思路，c也可以间接完成面向对象的设计）。
:::

##### extern的用法
```c
#ifndef EXTERN_H__
#define EXTERN_H__
void func();

#endif
```

```c
#include "extern.h"

extern int i; // 不定义 而是引用了其他地方的i ，也可以不用声明数据类型，编译器会帮你补充
int func() {
  printf("[%s]%d\n", __FUNCTION__, i);
}
```

```c
#include "stdlib.h"
#include "stdio.h"
#include "extern.h"

int i = 10;

int main() {
  printf("[%s]%d\n", __FUNCTION__, i);
}
```

![](assets/C语言进阶(基本概念)/image-20230620021340.png)


## 运算符与表达式
### 运算符
![](assets/C语言进阶(基本概念)/image-20230620080521.png)

#### 逻辑运算符的短路性
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  int a = 1, b = 2, c = 3, d = 4;
  int m = 1, n = 1;
  //逻辑与和或的短路性
  (m = a > b) && (n = c > d);
  //与运算如果左边的表达式为假没必要运算右边的表达式
  //或运算如果左边的表达式为真没必要运算右边的表达式
  printf("m = %d\n n = %d\n", m, n); // m : 0 n : 1
}
```

#### 等号(赋值)扩展运算的顺序
![](assets/C语言进阶(基本概念)/image-20230620081812.png)
> 从右往左计算数值

#### 求字节数sizeof

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  printf("%lu, %lu, %lu, %lu, %lu, %lu, %lu\n",
         sizeof(int),sizeof(short), sizeof(long),
         sizeof(double), sizeof(float), sizeof(char), sizeof(void*));
}

4, 2, 8, 8, 4, 1, 8

```

#### 位运算

- | 按位或
- & 按位与
- ^ 按位异或
- ~ 按位取反

> 应用

- 将操作数中的第n位置1 其他位不变 ``num = num | 1 << n;``
- 将操作数中的第n位置0 其他位不变 ``num = num & ~(1<<n);``
- 测试第n位: if(num & (1<<n))


## I/O操作
- 标准IO
- 文件IO
### 格式化输入输出
#### printf()
```bash
int printf(const char *format, ...);

format: "%[修饰符] 格式字符"
printf(format,输出表项);
```

```bash
RETURN VALUE
    Upon  successful  return,  these  functions  return  the number of characters printed (excluding the null byte used to end output to strings). 
    The functions snprintf() and vsnprintf() do not write more  than  size  byte(including  the  terminating  null byte ('\0')).  If the output was truncated due to this limit, then the return value is the number of characters (exclud‐ing  the  terminating  null  byte) which would have been written to the final string if enough space had been available.  Thus, a return value of  size  or more means that the output was truncated.  (See also below under NOTES.)
	If an output error is encountered, a negative value is returned.
	
	成功返回后，这些函数将返回打印的字符数（不包括用于结束字符串输出的空字节）。
    函数 snprintf()和 vsnprintf()写入的字节不会超过大小字节（包括终止空字节 （'0'））。 如果输出由于此限制而被截断，则返回值是字符数（不包括终止空字节），如果有足够的可用空间，该字符数将写入最终字符串。 因此，大小或更大的返回值意味着输出被截断。 （另请参阅下面的注释。
	如果遇到输出错误，则返回负值。
```


![](assets/C语言进阶(基本概念)/image-20230620091650.png)
##### 格式化输出注意事项
:::tip
如果没有数字没有类型定义的话。在数字后面添加单位L，表示把数字识别成long类型
尤其是在单独数字运算的时候。
:::

```bash
[root@node1 ~]# make main
cc     main.c   -o main
main.c: 在函数‘main’中:
main.c:3:25: 警告：integer overflow in expression of type ‘int’ results in ‘784224832’ [-Woverflow]
    3 | #define TIME (6670*60*24*3659)
      |                         ^
main.c:5:30: 附注：in expansion of macro ‘TIME’
    5 |         printf("times=%ld\n",TIME);
      |                              ^~~~
```

:::tip
如果是单纯是字符串的话，会扫描字符是否有``%``，如果没有就直接输出。

如果输出表项参数没有对应的话，不会报严重的错误。如果没有，对应会查找压栈的二进制数来格式输出。
:::

##### 刷新缓冲区(``\n``)

```c
int main() {
  printf("[%s:%d] before while().", __FUNCTION__, __LINE__);
  while(1);
  printf("[%s:%d] after while().", __FUNCTION__, __LINE__);
}
//运行结果是没有输出的，全缓冲设备下
```

:::danger
如果没有换行输出``\n``，会在以下情况输出缓冲区：1、缓冲区满 2、程序运行结束(会刷新缓存) 
:::

正确写法
```c
#include <stdlib.h>
#include <stdio.h>

int main() {
  printf("[%s:%d] before while().]\n", __FUNCTION__, __LINE__);
  // 或者
  //printf("[%s:%d] before while().", __FUNCTION__, __LINE__);
  //fflush(stdout); 
  while(1);
  printf("[%s:%d] after while().", __FUNCTION__, __LINE__);
}

```

#### scanf()

```bash
int scanf(const char *format, ...);

format: "%[修饰符] 格式字符"
printf(format,&输出表项);

其中输入格式要匹配，这是重点

```

```c
int main() {
  int i;
  scanf("%d", &i); //不能输入\n
  printf("%d\n", i);
}
```

:::danger
scanf 在使用 `%s` 的时候要特别小心，他会识别到间隔符就结束输入。如果出现越界的情况，输出结果是正常的，但是内存上已经出现了错误。
:::

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  char S[3]; //只能接受到3个字符
  //数组不用输入地址符，本身数字标识就是地址。
  scanf("%s", S); // 如果输入 abcdef
  printf("%s", S); // 可能会出现段错误
}

```
##### 输入在循环中的使用

:::danger
 scanf 在循环中使用的时候要特别小心，如果scanf 不匹配你的输入的话，会跳过输入，一直循环其他语句如果不加判断的话会死循环
:::

> 为什么会出现以上警告？因为scanf有缓存区，当输入非法字符（要求的类型与输入的类型不符合），scanf会直接跳过，该输入及不会被接受也不会被清除，被存放在scanf的缓存区，当下次调用scanf函数时，会直接从缓存区读取非法字符，造成死循环。

以下是用判断控制scanf()的返回正确性：

> scanf 的返回值说明

```bash
RETURN VALUE
    成功后，这些函数返回成功匹配和分配的输入项数;在早期编译器匹配失败的情况下，这可能少于规定，甚至为零。
    The  value  EOF  is returned if the end of input is reached before either thefirst successful conversion or a matching failure occurs.  EOF  is  also  re-turned  if  a  read  error  occurs, in which case the error indicator for the stream (see ferror(3)) is set, and errno is set to indicate the error.
```


```c
int main() {
  int ret = 0;
  int d = 0;
  
  while(1) {
    ret = scanf("%d, d);
    if (ret == -1) {
      perror("Error");
      break;
    }
    printf("&d\n", d);
  }
  exit(0);
}
```

 ##### 处理换行
> 在输入格式定义为%c时候，根据%c，scanf会读取每一个字符，包括空白。而其他格式字符，会跳过空白字符。``\n`` 会正常当做输入进行处理，但这换行没意义的情况占绝大多数，所以我们需要对他进行处理。

- 使用scanf修饰符中的抑制符：``*``

```c
int main() {
  int i = 0;
  char c = 0;
  
  scanf("%d", &i);
  scanf("%*c%c", &c);//抑制符吃掉一个换行符
  // 或者
  //getchar(); //吃掉换行
  //scanf("%c", &c);
  printf("i = %d, c = %c", i, c);
}
```

### 字符输入输出

#### getchar
```bash
int getchar(void);
RETURN VALUE
    fgetc(), getc(), and getchar() return the character read as an unsigned  char cast to an int or EOF(-1) on end of file or error.
```
#### putchar

```bash
int putchar(int c);
RETURN VALUE
    fputc(),  putc(),  and  putchar() return the character written as an unsigned char cast to an int or EOF on error.
    可以理解返回值为字符的ASCII码
```

### 字符串输入输出
#### gets() 

:::danger
No check for buffer overrun is performed , gets 函数是危险的（但是还是可以正常输出），但是！如果你字符越界到栈保护元素，会直接报错；建议使用fget()函数或者getline()。
:::

```bash
char *gets(char *s);
	gets() reads a line from stdin into the buffer pointed to by s until either aterminating newline or EOF, which it replaces with a null  byte  ('\0').   No check for buffer overrun is performed (see BUGS below).
```

#### puts()

```bash
int puts(const char *s);
	puts() writes the string s and a trailing newline to stdout.
```

# 流程控制

> 由于流程再熟悉不过了，所以就不用参考了，但是如何以有限状态机(switch-case语句来体现)来思考程序则极为重要。

注意事项：
- switch的case 参数只能常量或常量表达式，记得判断后需要break。
- if-goto:(慎用，但不是不能用)：
> 无条件跳转会破坏结构化编程，不能跨函数跳转（不能恢复现场），C++抛出异常用类似的goto。
```c
loop:
	sum += i;
	i++;
	if(i <= 100)
		goto loop;
	printf("\n");
```
- 死循环的写法：
	- while(1)
	- for(;;;);
	- ctrl+c杀死死循环


## 遇到流程出错

> 如果在条件与判断语句遇到出错的情况下，可以使用 ``_exit(0)`` 来停止程序不刷新缓冲区等，也可以使用信号量``sig``让操作系统来判断与debug。

# 数组
> 构造类型之一连续存放
## 一维数组
> 在内存顺序存放

``[存储类型] 数据类型 标识符[下标]``

### 初始化
- ``auto`` 会自动开辟空间，但不赋值
- ``static`` 会被初始化为**全零**

```c
static int a[10];
```

- {} ，可以部分初始化，其他元素为零

```c
int a[3] = {1, 2, 3};
```

### 数组定义原理

#### 数组名

数组名是一个**常量**，主要存放地址：

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  int arr[3] = {1, 2, 3};
  printf("%ld\n", sizeof(arr));
  // 下面这句是错的
  arr = {4, 5, 6}; //因为无法给常量赋值
  for (int i = 0;i < sizeof(arr)/sizeof(int);i++) {
    printf("%d", *(arr+i));
  }
}

```
#### 数组在计算机的表达

数组在计算机的表达是：``a[i] = *(a+i)`` 这个表达式在C语言在看来，不管你``i``等于多少，他都是合法的，所以就有数组越界问题存在，不能靠编译器检测出来。

#### 数组越界

:::danger
c对数组不进行越界检查，需要格外小心
:::

### 一维数组练习
1. 斐波那契数列：
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  int fib[10] = {1, 1};

  for (int i = 2;i < sizeof(fib)/sizeof(fib[0]);i++) {
    fib[i] = fib[i-1]+ fib[i-2]; //动态规划
  }
  for (int i = 0;i < 10;i++) {
    printf("%d ", fib[i]);
  }
  //逆序存放：
  i = 0;
  j = sizeof(fib)/sizeof(fib[0])-1;
  while(i < j){
	tmp = fib[i];
	fib[i] = fib[j];
	fib[j] = temp; 
  }
  for (int i = 0;i < 10;i++) {
    printf("%d ", fib[i]);
  }
}
```

2. 冒泡排序：
> 每一趟排序会选择出最大的数，逐步减小排序数列大小
> 哈哈哈哈，这个代码已经写了5年了，还是会忘记。

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  int arr[8] = {2, 3, 5, 4, 6, 7, 1, 9};
  for (int i = 0;i < sizeof(arr)/sizeof(arr[0]);i++) {
    for (int j = 0;j < sizeof(arr)/sizeof(arr[0])-1-i;j++) {
    //这里的sizeof(arr)/sizeof(arr[0])-1-i ，减去i表示当前已经筛选出最大的值
      if(arr[j] > arr[j+1]) {
        int tmp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = tmp;
      }
    }
  }
  for (int i = 0;i < sizeof(arr)/sizeof(int);i++) {
    printf("%d ", arr[i]);
  }
}

```

3. 选择排序：
> 先选取基准值，与之后的数值比较，把最小的与在原先基准值的位置交换

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  int arr[8] = {3, 2, 5, 4, 9, 7, 1, 6};
  for (int i = 0;i < sizeof(arr)/sizeof(int);i++) {
    int m = i;
    for (int j = i+1;j < sizeof(arr)/sizeof(int);j++) {
      if(arr[j] < arr[m]) {
        m = j;
      }
      if (m != i) {
      int tmp = arr[i];
      arr[i] = arr[m];
      arr[m] = tmp;
    }   
 }
  for (int i = 0; i < sizeof(arr) / sizeof(int); i++) {
    printf("%d ", arr[i]);
  }
  exit(0);
}

```

3. 进制转换
```c
static void base_convert(void){
	int num,base;
	int n[128];
	do{
		n[i] = num%base;
		num = num/base;
		i++;
	}while(num ! = 0);
	for(i -- ; i>=0;i--){ //从后往前输出
		if(n[i]>=10)
			printf("%c ",n[i]-10+'a');
		else printf("%d",n[i]);
	}
}
```

3. 删除法求质数
```c
static void primer(void){
	char primer[1001] = {0};
	for(i=2;i<1001;i++){
		if(primer[i]==0){
		for(j = i*2;j<1001;j+=i){ //j跳过i的倍数
			primer[j] = -1;
		}
	}
	}
}
```

## 二维数组
``[存储类型] 数据类型 标识符[行下标][列下标]``
> 在内存中二维数组是以行为顺序从上往下排列

```c
int main() {
  int a[M][N] = {1, 2, 3, 4, 5};
  int b[][N] = {1, 2, 3, 4, 5}; //行可以缺省，会自动计算行数
  int c[M][] = {1, 2, 3, 4, 5}; //这个会发生歧义错误
  for (int i = 0;i < M;i++) {
    for (int j = 0;j < N;j++) {
      printf("%d ", *(a+i+j*));
    }
  }
}
```
### 二维数组练习

1. 行列互换
```c
int a[M][N],b[N][M];
for(int i=0;i<M;i++){
	for(int j= 0 ;j<N;j++){
		b[j][i] = a[i][j];
	}
}
```

2. 求最大值
```c
int a[M][N] = {43,23,6,32,14,78};
int i,j;
int max = a[0][0],row = 0;colum=0;
for(i=0;i<M;i++){
	for(j=0;j<n;j++){
		if(max<a[i][j]){
			max =a[i][j];
			row =i;
			colum=j;
		}
	}
	
}
```

3. 求各行各列的和(可以多出一行一列和存在这里)
```c
int a[5][4] = {{1,2,3},{4,5,6},{7,8,9},{10,11,12}} 
for(i=0;i<4;i++){
	for(j=0;j<5;j++){
		a[4][3] + =a[i][j];
		a[4][j] + = a[i][j];
		a[i][3] + = a[i][j];
	}
}
```

4. 矩阵乘积
```c
static void mul(void){
	int a[M][N]={1,2,3,4,5,6};
	int a[N][K]={1,0,0,1,1,0};
	int c[M][K];
	for(i=0;i<M;i++){
		for(j=0;j<K;j++){
			for(k=0;k<N;k++){
				c[i][j] += a[i][k]*b[k][j];
			}
	}
}
}
```


#### 深入理解二维数组
> 多个一维数组连续组成的

```
熟悉行指针和列指针
```


## 字符数组
### 定义以及初始化
``[存储类型] char 标识符[下标]``

- 单个字符初始化``{'a','b','c'}``
- 用字符串常量初始化``"abc"``  

:::tip
注意字符串初始化的时候，尾部部分会自动初始化为'\0'
:::

### 输入输出字符数组
#### gets()&puts()
```c
char str[N]；
gets(str);
puts(str);
```
#### 格式化输入输出

:::danger
scanf 的%s格式标记无法获取带有分隔符的字符串(`\t`, `\n`, ` `)
:::
### string函数
> ``#include <string.h>``

- strlen & sizeof
> 计算字符串长度
> size_t strlen(const char *s);The  strlen()  function  calculates the length of the string pointed to by s,excluding the terminating null byte (``'\0'``).
> sizeof 的方法是包含字符串所有元素，而strlen在``\0``之后不判断自动忽略

- strcpy & strncpy
> 拷贝字符串
> char *strcpy(char *dest, const char *src);
> char *strncpy(char *dest, const char *src, size_t n);
```c
strcpy(str,"abcde"); //把abcd给str，str要记得不越界
strncpy(str,"abcdefg",size_t-1)//把abcd复制size_t给str
```

- strcat & strncat
>连接字符串
> char *strcat(char *dest, const char *src);
> char *strncat(char *dest, const char *src, size_t n);
> The  strcat() function appends the src string to the dest string, overwriting the terminating null byte (``\0``) at the end of dest, and then adds  a  termi‐nating null byte.  The strings may not overlap, and the dest string must have enough space for the result
```c
strcat(str," ")
strcat(str,"world!")
```

- strcmp & strncmp
>int strcmp(const char *s1, const char *s2);
>int strncmp(const char *s1, const char *s2, size_t n);
>The  strcmp() function compares the two strings s1 and s2.  The locale is not taken into account (for a locale-aware comparison, see strcoll(3)).  The comparison is done using unsigned characters.
```c
char str[32]="hello";
char str1[32]="world";
strcmp(str,str1); //返回ascii的差值，相等输出为0
strncmp(str,str1,5);//比较前5个字符
```

> 单词统计

```c
#include <stdio.h>
#include <stdlib.h> //exit(0);
#include <string.h> 
#define STRSIZE 1024

int main() {
  char str[STRSIZE] = {};
  fgets(str, STRSIZE, stdin);
  int count= 0, flag = 0; //flag初始值已经决定第一个单词已经解决

  for (int i = 0;str[i] != '\0';i++){
    if (str[i] == ' ') {
      flag = 0;
    } else if(flag == 0) {
      count++;
      flag = 1;
    }
  }
  printf("%d\n", count);
}

```

## 多维数组
> 搞定二位按照思路扩展即可
