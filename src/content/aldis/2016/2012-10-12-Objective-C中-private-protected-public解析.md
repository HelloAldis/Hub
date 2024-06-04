---
title: Objective-C中@private @protected @public解析
publishDate:  2012-10-12 01:55:14
category: Objective-C
tags:
  - private
  - protected
  - public
---

Objective-C中，类的实例化变量的范围有@private、@protected、@public。他们代表的意思和C++中相同，只是前面添加了一个@符号。下面介绍一下他们代表的范围：

|指令|意思|
|---|----|
|@private|作用范围只能在自身类|
|@protected|作用范围在自身类和继承自己的子类，什么都不写，默认是此属性|
|@public|作用范围最大，在任何地方|

下面是官方的图：
![](~/assets/images/aldis/2016/2012-10-12/scope.png)

具体的可以参考：[http://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocDefiningClasses.html#//apple_ref/doc/uid/TP30001163-CH12-SW1](http://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocDefiningClasses.html#//apple_ref/doc/uid/TP30001163-CH12-SW1)

<!-- more -->

下面是一个例子，来说明他们之间的关系：

实现一个Boss类：
```objc
#import <Foundation/Foundation.h>   @interface Boss : NSObject 
{ 
@private 
    int age; 
@protected 
    NSString *job; 
} 
@end
```

实现一个Worker类继承Boss类：
```objc
#import <Foundation/Foundation.h> 
#import "Boss.h" 
@interface Worker : Boss 
{ 
    NSString *name; 
@private 
    NSString *evaluation; 
@protected 
    float wage; 
@public 
    NSString *boss; 
} 
- promoteTo:newPosition; 
@end
```

在Worker的.m文件中添加：
```objc
#import "Worker.h"   
@implementation Worker 
- promoteTo:newPosition 
{ 
    id old = job; 
    job = newPosition; 
    return old; 
} 
-(NSString *)description 
{ 
    return [NSString stringWithFormat:@"Worker name:%@,evaluation:%@,job:%@,wage:%f,boss:%@",name,evaluation,job,wage,boss]; 
} 
@end
```

如果我们在Worker中调用Boss中的私有变量age，会报错：
![](~/assets/images/aldis/2016/2012-10-12/err1.png)

但是调用job是没有问题的。
下面在其他类中调用Worker类：
```objc
Worker *ceo = [[Worker alloc] init]; 
ceo->boss = @"XX"; 
[ceo promoteTo:@"YY"]; 
NSLog(@">>>=%@",[ceo description]);
```

运行结果：
![](~/assets/images/aldis/2016/2012-10-12/result1.png)

但是调用protected的属性会报错：
![](~/assets/images/aldis/2016/2012-10-12/err2.png)

所以当一些比较重要的属性，不能随便更改的时候，要用private，这样避免其他继承类修改此属性。