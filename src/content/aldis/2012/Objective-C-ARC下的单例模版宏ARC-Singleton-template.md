---
title: Objective-C ARC下的单例模版宏ARC Singleton template
publishDate: 2012-12-07 02:19:50
image: ~/assets/images/aldis/2012/12.png
category: 编程思想
tags:
  - 单例模式
  - Objective-C
---

之前写过一篇关于非ARC的单例模版宏的文章

但现在ARC的使用越来越广泛，原来的模版宏可能已经不是很适应，那介绍一下ARC版的模版宏的写法和用法

写法
ARCSingletonTemplate.h

```objc
#define SYNTHESIZE_SINGLETON_FOR_HEADER(className) \
\
+ (className *)shared##className;

#define SYNTHESIZE_SINGLETON_FOR_CLASS(className) \
\
+ (className *)shared##className { \
    static className *shared##className = nil; \
    static dispatch_once_t onceToken; \
    dispatch_once(&onceToken, ^{ \
        shared##className = [[self alloc] init]; \
    }); \
    return shared##className; \
}
```

基本是使用了 GCD中的dispatch_once接收一个在应用生命周期只会被调用一次的代码块，而且它还是线程安全的

<!-- more -->

用法
AppPreference.h

```objc
#import <Foundation/Foundation.h>
#import "ARCSingletonTemplate.h"
@interface AppPreference :NSObject
//使用宏模版生成单例所需要的code
SYNTHESIZE_SINGLETON_FOR_HEADER(AppPreference)
@end

AppPreference.m
#import "AppPreference.h"
@implementation AppPreference
//使用宏模版生成单例所需要的code
SYNTHESIZE_SINGLETON_FOR_CLASS(AppPreference)
//例子
- (void)sample{
   AppPreference* appPreference = [AppPreferencesharedAppPreference];
}
@end
```

使用 shareClassName 就可以获取实例。
