---
title: iOS 6 手持方向处理
publishDate:  2012-11-21 00:18:32
image: ~/assets/images/aldis/2012/7.png
category: 编程思想
tags:
  - Objective-C
  - 手持方向
---

从iOS 5的应用程序更新到iOS6很多特性没法正常工作。主要的问题是，有一些API在新的SDK中已被弃用。其中手持方向的判断就是很明显的一个

存在的问题

假如你应用程序只有一个屏要是横向，其它的屏都要是纵向。

iOS5的解决方案

在应用程序的Info.plist文件，Supported interface orientations应该只包含一个项目，Portrait 。

接下来，在需要的方向锁定为横向视图控制器类，你需要重写- (BOOL)shouldAutorotateToInterfaceOrientation: (UIInterfaceOrientation)interfaceOrientation方法，并返回YES或NO相对一个布尔值，检查对interfaceOrientation参数。

下面是函数看起来像什么。
```objc
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationLandscapeLeft ||
            interfaceOrientation == UIInterfaceOrientationLandscapeRight);
}
```

<!-- more -->

iOS6的解决方案

在iOS 6 -(BOOL)shouldAutorotateToInterfaceOrientation: (UIInterfaceOrientation)interfaceOrientation 方法已过时，似乎没有被调用了。代替它的一组方法;-(BOOL)shouldAutorotate 和-(NSUInteger)supportedInterfaceOrientations的。

在UIViewController，你要在横向的，你需要同时重写- （BOOL）shouldAutorotate- （NSUInteger）supportedInterfaceOrientations的：

// iOS6中过时, 为了兼容iOS5.
// ---
```objc
- (BOOL)shouldAutorotateToInterfaceOrientation:
        (UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationLandscapeLeft ||
            interfaceOrientation == UIInterfaceOrientationLandscapeRight);
}
```

// iOS6 support
// ---
```objc
- (BOOL)shouldAutorotate
{
    return NO;
}

- (NSUInteger)supportedInterfaceOrientations
{
    return UIInterfaceOrientationMaskLandscape;
}
// ---
```