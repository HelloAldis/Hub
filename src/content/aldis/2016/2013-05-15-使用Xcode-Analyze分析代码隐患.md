---
title: 使用Xcode Analyze分析代码隐患
publishDate:  2013-05-15 14:05:54
category: iOS
tags:
  - Analyze
  - Xcode
  - 代码检查工具
---

# Xcode Analyze

静态代码检查是通过工具对代码或编译的产物进行一定的检查，从而发现一些简单明显的bug或不规范的地方。它可以帮助我们减少低级的代码错误。
大家使用比较多的静态代码检查工有Xcode自带的Analyze和OCLint。

这个工具类似Java的findbug功能， Analyze找出的问题基本上是必须解决的，它们是明显的Bug。

**保证0警告，0Analyze问题是一个合格程序员基本素养**

使用Analyze

{% asset_img analyze.png 使用Analyze %}

生成的结果

<!-- more -->

{% asset_img analyze-result.png 结果 %}

⚠️注意几点
* 建议鼠标反键选择View By File，这样可以按文件来分开问题方便追踪
* 黄色的代表警告，一般是要消除所有警告的，但如果一些警告是第三方的代码造成可以暂时忽略，和第三方沟通告知他们代码中问题，让第三方修改。
* 蓝色的代表Analyze发现的问题，一般是要消除所有问题的，但如果一些问题是第三方的代码造成可以暂时忽略，和第三方沟通告知他们代码中问题，让第三方修改。