---
title: Objective-C KVO编程改善现有iOS代码设计
publishDate:  2012-09-09 22:42:24
category: Objective-C
tags:
  - KVO
---

KVC很多人都知道，那么什么是KVO呢？Key Value Observing，直译为：基于键值的观察者。
KVO的优点
当有属性改变，KVO会提供自动的消息通知。这样的架构有很多好处。首先，开发人员不需要自己去实现这样的方案：每次属性改变了就发送消息通知。
这 是KVO机制提供的最大的优点。因为这个方案已经被明确定义，获得框架级支持，可以方便地采用。开发人员不需要添加任何代码，不需要设计自己的观察者模 型，直接可以在工程里使用。其次，KVO的架构非常的强大，可以很容易的支持多个观察者观察同一个属性，以及相关的值。

主要用于有关视图界面交互编程中，比如，实体（或者叫名词、或者叫域模型），在应用中表示名词的部分，类似Java中的Java Bean。再具体点儿，在下文的示例中。
图书（Book类），就是个实体。它的属性有书名（name）和价格（price）。那么，在界面开发中，可能有多个视图和这个实体有关联。
如果等实体（Book）的价格（price）发生了变化，这些关联的界面都要被修改。

比较好的做法是使用观察者模式，各个界面都注册观察者，观察图书的价格变化，当变化后改动自己的视图。

ObjC中提供了这个模式的解决方案，就是KVO。以下用简单示例说明KVO的实现方式。

Book类，头文件：
```objc
#import <Foundation/Foundation.h>

@interface Book : NSObject { 
    NSString *name; 
    float price; 
}

@end
```

Book类的实现文件，没做任何事情，不贴了。
现在，假设我有个视图，MyView，我这里为了不带入实际视图类的复杂性，只是模拟一个。用普通类。头文件：
```objc
#import <Cocoa/Cocoa.h>

@class Book;

@interface MyView : NSObject { 
    Book *book; 
}

- (id) init:(Book *)theBook;

@end
```

<!-- more -->

实现文件：
```objc
#import "MyView.h"

@implementation MyView

- (id) init:(Book *)theBook { 
    if(self=[super init]){ 
        book=theBook; 
        [book addObserver:self forKeyPath:@"price" options:NSKeyValueObservingOptionOld|NSKeyValueObservingOptionNew context:nil]; 
    } 
    return self; 
}

- (void) dealloc{ 
    [book removeObserver:self forKeyPath:@"price"]; 
    [super dealloc]; 
}

- (void)observeValueForKeyPath:(NSString *)keyPath 
                      ofObject:(id)object 
                        change:(NSDictionary *)change 
                       context:(void *)context{ 
    if([keyPath isEqual:@"price"]){ 
        NSLog(@">>>>>>>price is changed"); 
        NSLog(@"old price is %@",[change objectForKey:@"old"]); 
        NSLog(@"new price is %@",[change objectForKey:@"new"]);
    } 
}

@end
```

这里的init方法中，可以看到向book实例增加了观察者，是针对价格price属性的。这里用的：

options:NSKeyValueObservingOptionOld|NSKeyValueObservingOptionNew

可以让通知携带旧的price值和新的price值。后面会看到。observeValueForKeyPath方法，就是当price属性发生变化后，调用的方法。

main方法中调用的代码：
```objc
Book *book4=[[Book alloc] init]; 
NSArray *bookProperties=[NSArray arrayWithObjects:@"name",@"price",nil]; 
NSDictionary *bookPropertiesDictionary=[book4 dictionaryWithValuesForKeys:bookProperties]; 
NSLog(@"book values: %@",bookPropertiesDictionary);

[[[MyView alloc] init:book4] autorelease];

NSDictionary *newBookPropertiesDictionary=[NSDictionary dictionaryWithObjectsAndKeys:@"《Objective C入门》",@"name", 
                                           @"20.5",@"price",nil]; 
[book4 setValuesForKeysWithDictionary:newBookPropertiesDictionary]; 
NSLog(@"book with new values: %@",[book4 dictionaryWithValuesForKeys:bookProperties]);
```

在这里引发了price属性变化，触发了MyView的处理。

另外，要注意，在Book实例释放前，要删除观察者，否则会报错，这里是在MyView里面实现的：
```objc
- (void) dealloc{ 
    [book removeObserver:self forKeyPath:@"price"]; 
    [super dealloc]; 
}
```

这里假定MyView实例的生命周期小于等于Book实例。实际使用可能要根据情况在合适的地方addObserver和removeObserver。

                