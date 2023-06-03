---
id: Lex和yacc的使用
slug: /Lex和yacc的使用
title: Lex和yacc的使用
author: RiverMountain  
date: 2023/06/03
tags: [编译原理,lex]  
keywords: [编译原理,lex,yacc]
description: lex是词法分析程序的自动构造工具,yacc是语法分析语义计算程序的自动构造工具
last_update:
  date: 2023/06/03
---

## 任务描述

学习自动构造词法分析工具lex（Lexical Analyzer）和自动构造语法分析/语义计算工具yacc（Yet Another Compiler Compiler）的安装、配置及使用方法，加深对词法分析、语法分析及语义计算工作过程的理解。

## 相关知识

lex是词法分析程序的自动构造工具。lex的运行方式如图1.1所示，lex读入用户编写的一个lex描述文件，生成一个名为lex.yy.c的C源程序文件。其中lex.yy.c中包含一个核心函数yylex()，它是一个扫描子程序，主要任务是读入源程序的字符流，识别并返回下一个单词符号。

![](assets/1%20Lex和yacc的使用/image-20230603193939.png)


**任务**1-1：双链DNA分子中，G、C碱基对所占比例越高，其稳定性越强。编写一个lex描述文件，计算指定碱基序列里G、C碱基的比例。

```c
%{
#include <stdio.h>
int gc_count = 0; // 计数器，用于记录G和C碱基的数量
int total_count = 0; // 计数器，用于记录总碱基数量
%}

%%
[GCgc] { gc_count++; total_count++; } // 如果是G或C碱基，增加计数器
\n         { printf("%.3f\n", (double)gc_count / total_count );  }
.          { total_count++; }
%%
int yywrap() {
    return 1;
}
int main()
{
    yylex();
    return 0;
}
```

> 以上代码的意思是用于计算输入文本中G和C碱基的比例。`gc_count`变量用于记录G和C碱基的数量，`total_count`变量用于记录总碱基数量。当读取到G或C碱基时，`gc_count`和`total_count`都会增加1。当读取到换行符时，程序会输出当前的G和C碱基比例。当读取到其他字符时，`total_count`会增加1。最后，`main`函数调用`yylex`函数来执行词法分析。

```bash
lex ./exp1-1.l 
gcc lex.yy.c -o lex.yy -lfl
#执行结果
$./lex.yy 
AGCGTGCATGCA
0.583
```

**任务1-2**：编写一个lex描述文件，识别出指定文本串里的单词、数字和符号（空格不作处理）。

```c
%{
#include <stdio.h>
int yywrap(void);
int yywrap(void) { return 1; }
%}

%%

[ \t]   /* 空格不作处理 */
[\n]
[0-9]+  { printf("%s 数字\n", yytext); }
[a-zA-Z]+   { printf("%s 单词\n", yytext); }
.       { printf("%c 符号\n", yytext[0]); }

%%

int main(int argc, char **argv)
{
    yylex();
    return 0;
}
```


**任务1-3**：编写一个yacc描述文件，实现具有加法和乘法功能的计算器。

```c
%{
#include <stdio.h>
%}

%token NUMBER
%left '+' '-'
%left '*' '/'

%%

input: /* empty */
     | input line
     ;

line: '\n'
    | exp '\n' { printf("%d\n", $1); }
    ;

exp: NUMBER
   | exp '+' exp { $$ = $1 + $3; }
   | exp '-' exp { $$ = $1 - $3; }
   | exp '*' exp { $$ = $1 * $3; }
   | exp '/' exp { $$ = $1 / $3; }
   | '(' exp ')' { $$ = $2; }
   ;

%%

int main()
{
    yyparse();
    return 0;
}

int yyerror(char *s)
{
    printf("Error: %s\n", s);
    return 0;
}

int yylex()
{
    int c = getchar();
    if (c == EOF) {
        return 0;
    }
    if (isdigit(c)) {
        int value = c - '0';
        while (isdigit(c = getchar())) {
            value = value * 10 + c - '0';
        }
        ungetc(c, stdin);
        yylval = value;
        return NUMBER;
    }
    return c;
}
```

代码中的 `%{ ... %}` 部分是 C 代码的声明部分，`%token` 声明了一个终结符号 `NUMBER`，`%left` 声明了运算符的优先级。

`%%` 之间是语法规则的定义，其中 `input` 表示输入，`line` 表示一行输入，`exp` 表示表达式。语法规则中的 `$1`、`$2`、`$3` 等表示规则中的第 1、2、3 个子表达式的值。

`main()` 函数中调用了 `yyparse()` 函数，它会读取输入并解析语法规则，最终输出计算结果。`yyerror()` 函数用于处理语法错误，`yylex()` 函数用于词法分析，将输入的字符流转换为词法单元。