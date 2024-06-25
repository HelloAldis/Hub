---
title: 用Eclipse 统计代码行数小技巧
publishDate: 2013-01-04 00:11:34
image: ~/assets/images/aldis/2013/2013-01-04/1.png
category: 编程思想
tags:
  - Eclipse
---

今天公司SQA问我目前项目代码行数有多少，我当时就是想，以前好像写过类似的统计工具但是一时又找不到

公司网络又不能下载，所以想想eclipse是不是又类似功能，找了下没有，但突然一想有一个转弯方法：统计工程里面的\n个数

1. 按 CTRL＋H 打开查找对话框 选择file search

按下图方式输入
![](~/assets/images/aldis/2013/2013-01-04/1.png)

注意:

- 输入查找\n, 勾选正则式选项
- 输入文件匹配， \*.java是所有java文件
- 勾选 Enclosing projects 代表当前项目

点击Search 就可以看到匹配的个数也就是行数

<!-- more -->

![](~/assets/images/aldis/2013/2013-01-04/2.png)
最后可以通过修改\n为一些更有代表性的正则式，比如 ;\n来统计一些更精确更有特色的code行数。
