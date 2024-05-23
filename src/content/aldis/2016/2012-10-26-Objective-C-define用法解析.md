---
title: 'Objective-C #define用法解析'
publishDate:  2012-10-26 01:10:37
category: Objective-C
tags:
  - 宏
---
在 C 语言中，预处理代码 (Preprocessor) 是非常强大的工具，能让你的代码变得更加易读和易改。利用预处理代码，你可以重新定义代码的一部分，使得你的代码更适合你的风格。预处理代码 (Preprocessor) 在代码编译之前被提前处理。预处理代码均由一个井号 (#) 打头。

## 关于 #define

`#define` 声明主要用于将常量（或字符串）赋予有意义的名字，比如当你在编写一个日历程序时，可以定义：
```objc
#define MONTHS_PER_YEAR 12
```
请注意格式。`#define` 命令之后为常量名，再之后为所赋的代替值，用空格隔开，结尾不需分号。

`#define 常量名 代替值`
通常情况下，习惯将预处理的常量名全大写，单词之间用下划线隔开（与正常变量区分）。这样做的原因是在编译器处理这段 #define 代码时，会自动寻找空格，空格之后的被认为是代替值。这也是为什么在每一行代码的末尾不用加分号的原因，因为如果加了分号，分号本身也会被认为是代替值的一部分。

一个被定义的常量名并不是一个变量；它的值一旦被定义，便不能再被改变。 #define 声明通常位于一个文件的顶部，紧接在 #import 文件导入定义之后。需要注意的是， `#define` 声明必须位于常量名使用之前（不像方法 (method) 可以放在文件中任意位置）。

使用 `#define` 的另一个例子是储存一些有意义的数值, 比如
```objc
#define PI 3.141592654
// 计算圆的面积使用 "PI * radius * radius" 即可，这比处处书写 3.141592654 要方便许多。（改起来也快很多）
```

<!-- more -->

## 更高级的用途

注意，预处理代码起的作用实际上相当于在编译之前，在整个代码中进行了一次“搜索、替换”功能。这意味着 #define 有许多更复杂、更高级的用途。
我们先从 2π 开始，将 TWO_PI 定义为 2π：
```objc
#define TWO_PI 2.0 * 3.141592645
```

由于我们之前曾定义过 π，我们同样可以在定义中使用定义后的常量名来指代：
```objc
#define TWO_PI 2.0 * PI
```

除了常量以外，你还可以利用预处理定义 Objective-C 代码中任意一段字符或字符串，例如：
```objc
#define AND &&
#define OR ||
#define EQUALS ==

if (y EQUALS 0 OR y EQUALS 1) // …
```

合理地利用 #define，可增强代码的可读性。对比下列两行代码：
```objc 
if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))

// 或

#define IS_LEAP_YEAR (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
if (IS_LEAP_YEAR) // 代码可读性更强。一个定义通常应在一行代码中完成。但如果你需要手动空行，那么在每行后输入一个后划线(\)即可将几行代码连接起来成为一行。例如：

#define IS_LEAP_YEAR(y) (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)

if ( IS_LEAP_YEAR(currentYear) ) 
```

## 宏

`#define` 声明中还可以使用参数，并且可使用多个参数；这一特性被称为“宏”：

如：
```objc
#define SQUARE(x) ( (x) * (x) )
```
此时, y = SQUARE(v + 1); 等价于 y = ( (v + 1) * (v + 1) );。

两个参数
例如，你可以定义：
```objc
#define CalcInterest(x,y) ( x * y )
```
代码中便可书写：
```objc
int earnings = CalcInterest(10,5));
```
多个参数
例如，在代码中，你需要频繁使用 [NSArray arrayWithObjects: object, ..., nil] 这一命令。利用#define，你可以简化代码：
```objc
#define Array(FIRST, ...) [NSArray arrayWithObjects: FIRST, ##__VA_ARGS__, nil]
```
其中 `##__VA_ARGS__` 用于表示省略号所代表的所有内容。
 

## \# 算符以及 \#\# 算符

\# 算符可产生一个 C-语言 格式的字符串。如：
```objc
#define string(x) #x //则 string(testing) == "testing"
```
`##` 算符用来连接两段字符串。假设你有一组变量，x1 到 x100。如果你想打印其中某一个变量的值。你可以这样定义：
```objc
#define printxvar(n) printf("%i\n", x ## n)
```

由此, printxvar(20); 在编译时将被识别为 `printf(“%i\n”, x20)`;。这样只需要输入 `printxvar(n)`;便可以打印出 xn 的值。
其实，##最常用的用途还是上面介绍的 `##__VA_ARGS__`，它可用来抓取省略号所代表的所有内容。