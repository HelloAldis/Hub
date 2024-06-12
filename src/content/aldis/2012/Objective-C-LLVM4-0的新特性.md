---
title: Objective-C LLVM4.0的新特性
publishDate:  2012-10-19 20:13:15
image: ~/assets/images/aldis/2012/17.png
category: 编程思想
tags:
  - Objective-C
---

在最新的 Xcode 4.4 中，增加了许多新特性。其中包括更方便的代码输入，这得益于 LLVM 编译器 4.0 的更新。这一更新可大大提高写代码的效率。

## 所有的 NSNumber 表达

从 Xcode 4.4 起，所有的 [NSNumber numberWithInt: 10] 之类的表达现在都可以写作 @10，如：
```objc
// 单个字符
NSNumber *theLetterZ = @'Z';   // 相当于 [NSNumber numberWithChar:'Z']

// 整形
NSNumber *fortyTwo = @42;      // 相当于 [NSNumber numberWithInt:42]
NSNumber *ftUnsigned = @42U;   // 相当于 [NSNumber numberWithUnsignedInt:42U]
NSNumber *ftLong = @42L;       // 相当于 [NSNumber numberWithLong:42L]
NSNumber *ftLongLong = @42LL;  // 相当于 [NSNumber numberWithLongLong:42LL]

// 浮点
NSNumber *piFloat = @3.141592F;// 相当于 [NSNumber numberWithFloat:3.141592F]
NSNumber *piDouble = @3.141592;// 相当于 [NSNumber numberWithDouble:3.141592]

// 是 / 否
NSNumber *yesNumber = @YES;    // 相当于 [NSNumber numberWithBool:YES]
NSNumber *noNumber = @NO;      // 相当于 [NSNumber numberWithBool:NO]
```

<!-- more -->

## 新的 NSArray, NSDictionary 输入方法
以前想要创建一个新的 NSDictionary, 你必须不厌其烦地输入：
```objc
NSDictionary *options = [NSDictionary dictionaryWithObjectsAndKeys:
                         [NSNumber numberWithBool:YES], @"backup",
                         [NSNumber numberWithInt:7],    @"daysToKeepBackup",
                         @"foo",                        @"flags", nil];
```
现在只用输入：
```objc
NSDictionary *options = @{
    @"backup": @YES,
    @"daysToKeepBackup": @7,
    @"flags": @"foo"
};
```

就可以达到同样的效果。

NSArray 的输入方法也变得更简单：之前的
```objc
NSArray *items = [NSArray arrayWithObjects:@"item1",
                  [NSNumber numberWithBool:YES],
                  [NSNumber numberWithInt:12], nil];
```
现在只用输入：
```objc
NSArray *items = @[ @"item1", @YES, @12 ];
```

## 嵌套表达式 (Boxed Expressions)
最新版本的 Objective-C 还提供了一种新的书写方式:
`@( expression )`
BOOL 和 int 的结果有时候需要被计算才能得到。这时候你便可以将表达式放入一对括号中。比如：
```objc
NSNumber *total = @(0.2f - 1.9f); //[NSNumber numberWithFloat:0.2f - 1.9f]
NSNumber *piOT = @(M_PI / 2);     //[NSNumber numberWithDouble:(M_PI / 2)]
```

## 创建新 property 不用再合成

升级到 Xcode 4.4 后，在头文件中创建的 @property 均无需再进行 @synthesize。Xcode 将自动合成。
```objc
@synthesize object = _object;
```