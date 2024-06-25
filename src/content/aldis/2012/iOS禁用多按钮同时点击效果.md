---
title: iOS禁用多按钮同时点击效果
publishDate: 2012-10-08 23:19:26
category: 编程思想
image: ~/assets/images/aldis/2012/9.png
tags:
  - UIView
  - Objective-C
---

公司里的测试们总是喜欢在一些并不是关键点上纠结Bug，
最常见Screen里有多个可以点击的按钮或者视图，如果同时点击它们的话可能会出现各种错误异常之类的，
而测试特别津津乐道于此类问题，看到有的项目为了修复此类问题竟然使用一个BOOL来标记判断
然后维护起来极其恐怖，其实有非常简单的方法实现

```objc
[view setExclusiveTouch:YES];
```

官方文档解释
exclusiveTouch
A Boolean value that indicates whether the receiver handles touch events exclusively.

@property(nonatomic, getter=isExclusiveTouch) BOOL exclusiveTouch
Discussion
Setting this property to YES causes the receiver to block the delivery of
touch events to other views in the same window. The default value of this property is NO.

Availability
Available in iOS 2.0 and later.
See Also
@property multipleTouchEnabled
Declared In
UIView.h
