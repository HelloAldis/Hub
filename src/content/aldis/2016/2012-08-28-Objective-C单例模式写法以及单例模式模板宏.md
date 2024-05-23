---
title: Objective-C单例模式写法以及单例模式模板宏
publishDate:  2012-08-28 22:03:26
category: Objective-C
tags:
  - 单例模式
---

Objective-C Singleton 单例模式解析，单例模式就是只有一个实例，确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例，这个类称为单例类。  
objective c 单例模式，objective c 设计模式，objective c singleton 。  
  
单例指一个唯一的，由全局共享的对象，单例模式确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例，这个类称为单例类。  
  
官方建议  
   
由于自己设计单态模式存在一定风险，主要是考虑到可能在多线程情况下会出现的问题，因此苹果官方建议使用以下方式来实现单态模式：  
```objc
static MyGizmoClass *sharedGizmoManager = nil;  
+ (MyGizmoClass*)sharedManager  
{  
    @synchronized(self) {  
        if (sharedGizmoManager == nil) {  
            [[self alloc] init]; // assignment not done here  
        }  
    }  
    return sharedGizmoManager;  
}  
+ (id)allocWithZone:(NSZone *)zone  
{  
    @synchronized(self) {  
        if (sharedGizmoManager == nil) {  
            sharedGizmoManager = [super allocWithZone:zone];  
            return sharedGizmoManager;  // assignment and return on first allocation  
        }  
    }  
    return nil; //on subsequent allocation attempts return nil  
}  
- (id)copyWithZone:(NSZone *)zone  
{  
    return self;  
}  
- (id)retain  
{  
    return self;  
}  
- (unsigned)retainCount  
{  
    return UINT_MAX;  //denotes an object that cannot be released  
}  
- (void)release  
{  
    //do nothing  
}  
- (id)autorelease  
{  
    return self;  
}  
```

<!-- more -->

由于单例模式基本要符合上面的设计，当有很多类都要设计成单例模式时，可以定义  
一个单例模板的宏，以提高程序的重用和减少不必要错误。
```objc  
#define SYNTHESIZE_SINGLETON_FOR_CLASS(classname) \  
\  
static classname *shared##classname = nil; \  
\  
+ (classname *)shared##classname \  
{ \  
@synchronized(self) \  
{ \  
if (shared##classname == nil) \  
{ \  
shared##classname = [[self alloc] init]; \  
} \  
} \  
\  
return shared##classname; \  
} \  
\  
+ (id)allocWithZone:(NSZone *)zone \  
{ \  
@synchronized(self) \  
{ \  
if (shared##classname == nil) \  
{ \  
shared##classname = [super allocWithZone:zone]; \  
return shared##classname; \  
} \  
} \  
\  
returnnil; \  
} \  
\  
- (id)copyWithZone:(NSZone *)zone \  
{ \  
returnself; \  
} \  
\  
- (id)retain \  
{ \  
returnself; \  
} \  
\  
- (NSUInteger)retainCount \  
{ \  
return NSUIntegerMax; \  
} \  
\  
- (void)release \  
{ \  
} \  
\  
- (id)autorelease \  
{ \  
returnself; \  
}
```

用法：假设AppPreference类要实现单例
```objc
#import "AppPreference.h"
#import "SingletonTemplate.h"

@implementation AppPreference

//使用宏模版生成单例所需要的code
SYNTHESIZE_SINGLETON_FOR_CLASS(AppPreference)

//这是一个测试方法
+ (void)test {
    //使用单例
    AppPreference *appPreference = [AppPreference sharedAppPreference];
}

@end
```
