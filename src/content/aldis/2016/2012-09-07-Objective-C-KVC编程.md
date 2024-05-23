---
title: Objective-C KVC编程
publishDate:  2012-09-07 23:44:52
category: Objective-C
tags:
  - KVC
---

KVC概述

KVC是KeyValue Coding的简称，它是一种可以直接通过字符串的名字(key)来访问类属性的机制。而不是通过调用Setter、Getter方法访问。
当使用KVO、Core Data、CocoaBindings、AppleScript(Mac支持)时，KVC是关键技术。
使用KVC、KVO的优势

通过规定了一组通用的Cocoa命名法则、调用规则等，实现了如下功能： 

1. 使用一对高度规范化的访问方法，获取以及设置任何对象的任何属性的值。
2. 通过继承一个特定的方法，并且指定希望监视的对象及希望监视的属性名称，就能在该对象的指定属性的值发生改变时，得到一个“通知”
（尽管这不是一个真正意 义上的通知），并且得到相关属性的值的变化（原先的值和改变后的新值）。
3. 通过一个简单的函数调用，使一个视图对象的一个指定属性随时随地都和一个控制器对象或模型对象的一个指定属性保持同步。
Book类的代码，头文件：

```objc
#import <Foundation/Foundation.h>

@interface Book : NSObject { 
    NSString *name;
}

@end
```

实现文件：
```objc
#import "Book.h"

@implementation Book

@end
```

这个Book类太简单了，只有一个实例变量name。而且，按照以前掌握的技术，没有办法给这个变量赋值了。

下面KVC登场，在main方法中给Book实例的name属性赋值并获取该属性的值：

<!-- more -->

```objc
int main (int argc, const char * argv[]) { 
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    Book *book=[[Book alloc] init]; 
    [book setValue:@"《Objective C入门》" forKey:@"name"]; 
    NSString *name=[book valueForKey:@"name"]; 
    NSLog(@"book name: %@",name); 
    
    [pool drain]; 
    return 0; 
}
```

这里会发现ObjC的KVC很类似Java中通过反射得到类实例变量的方式。比如valueForKey方法先尝试在Book实例上找getName方法，如果找到就调用。
如果没有找到，则查找实例是否有name变量或者_name变量。如果还没找到，会抛出类似下面的异常：

Terminating app due to uncaught exception ‘NSUnknownKeyException’, reason: ‘[<Book 0x10010c730> setValue:forUndefinedKey:]: 
this class is not key value coding-compliant for the key name1.’

下面把代码做一点修改，首先创建了个新类Author，图书的作者，头文件：
```objc
#import <Cocoa/Cocoa.h>

@interface Author : NSObject { 
    NSString *name; 
}

@end
```
也有个name属性，表示作者的姓名。实现文件什么也没写：
```objc
#import "Author.h"

@implementation Author

@end
```

然后，将author属性添加到Book类中，即每个Book实例都有一个author属性。头文件：
```objc
#import <Foundation/Foundation.h>

@class Author;

@interface Book : NSObject { 
    NSString *name; 
    Author *author; 
}

@end
```

实现文件还是什么都没有：
```objc
#import "Book.h"

@implementation Book

@end
```

在main方法中，通过kvc方式获取book的author的name属性：
```objc
int main (int argc, const char * argv[]) { 
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    Book *book=[[[Book alloc] init] autorelease]; 
    [book setValue:@"《Objective C入门》" forKey:@"name"]; 
    NSString *name=[book valueForKey:@"name"]; 
    NSLog(@"book name: %@",name); 
    
    Author *author=[[[Author alloc] init] autorelease]; 
    [author setValue:@"Marshal Wu" forKey:@"name"]; 
    [book setValue:author forKey:@"author"]; 
    NSString *authorName=[book valueForKeyPath:@"author.name"]; 
    NSLog(@"author name: %@",authorName); 
    
    [pool drain]; 
    return 0; 
}
```

可以看到，写法很类似JSP的EL表达式：
```java
${book.author.name}
```

在ObjC的世界里叫Path，路径。当然，你也可以：
```objc
[book setValue:@"zhangsan" forKeyPath:@"author.name"];
```
通过路径设置属性。

KVC还有一个很重要的特点，自动装箱拆箱功能。这在ObjC中是仅有的，其他情况下均需要使用比如NSNumber来手动拆装箱的。

比如Book类头文件做了下面的增加：
```objc
#import <Foundation/Foundation.h>

@class Author;

@interface Book : NSObject { 
    NSString *name; 
    Author *author; 
    float price; 
}

@end
```

实现文件还是没有动，不提了。main方法增加了对price赋值和获取值的调用，使用KVC方式：
```objc
int main (int argc, const char * argv[]) { 
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    Book *book=[[[Book alloc] init] autorelease]; 
    [book setValue:@"《Objective C入门》" forKey:@"name"]; 
    NSString *name=[book valueForKey:@"name"]; 
    NSLog(@"book name: %@",name); 
    
    Author *author=[[[Author alloc] init] autorelease]; 
    [author setValue:@"Marshal Wu" forKey:@"name"]; 
    [book setValue:author forKey:@"author"]; 
    NSString *authorName=[book valueForKeyPath:@"author.name"]; 
    NSLog(@"author name: %@",authorName); 
    
    [book setValue:@"zhangsan" forKeyPath:@"author.name"]; 
    
    [book setValue:@"10.4" forKey:@"price"]; 
    NSLog(@"book price is %@",[book valueForKey:@"price"]); 
    
    
    [pool drain]; 
    return 0; 
}
```

可以看到给price输入的是NSString类型，但是没有问题，因为KVC方式会根据字符串自动转型为适当的数值。再看打印price属性，%@是打印对象，
而price属性是float基本型，这里KVC肯定做了自动装箱的处理，将基本型转为NSNumber对象。

KVC还具备对集合的操作能力。比如，图书可以有相关图书，这是个1对多的关系。可以用集合来表示，这里用NSArray表示，在Book类的头文件中改动：
```objc
#import <Foundation/Foundation.h>

@class Author;

@interface Book : NSObject { 
    NSString *name; 
    Author *author; 
    float price; 
    NSArray *relativeBooks; 
}

@end
```

如果想得到相关图书的价格NSArray，可以使用KVC方式，见main方法：
```objc
int main (int argc, const char * argv[]) { 
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    Book *book=[[[Book alloc] init] autorelease]; 
    [book setValue:@"《Objective C入门》" forKey:@"name"]; 
    NSString *name=[book valueForKey:@"name"]; 
    NSLog(@"book name: %@",name); 
    
    Author *author=[[[Author alloc] init] autorelease]; 
    [author setValue:@"Marshal Wu" forKey:@"name"]; 
    [book setValue:author forKey:@"author"]; 
    NSString *authorName=[book valueForKeyPath:@"author.name"]; 
    NSLog(@"author name: %@",authorName); 
    
    [book setValue:@"zhangsan" forKeyPath:@"author.name"]; 
    
    [book setValue:@"10.4" forKey:@"price"]; 
    NSLog(@"book price is %@",[book valueForKey:@"price"]); 
    
   Book *book1=[[[Book alloc] init] autorelease]; 
    [book1 setValue:@"5.0" forKey:@"price"]; 
    
    Book *book2=[[[Book alloc] init] autorelease]; 
    [book2 setValue:@"4.0" forKey:@"price"]; 
    
    NSArray *books=[NSArray arrayWithObjects:book1,book2,nil]; 
    [book setValue:books forKey:@"relativeBooks"]; 
    NSLog(@"relative books price: %@",[book valueForKeyPath:@"relativeBooks.price"]); 
    
    [pool drain]; 
    return 0; 
}
```

增加的代码见黑体斜体部分。日志将打印出相关图书的价格列表：
```objc
2011-05-26 19:27:57.456 ReleaseMemoDemo[10042:a0f] book name: 《Objective C入门》 
2011-05-26 19:27:57.461 ReleaseMemoDemo[10042:a0f] author name: Marshal Wu 
2011-05-26 19:27:57.462 ReleaseMemoDemo[10042:a0f] book price is 10.4 
2011-05-26 19:27:57.463 ReleaseMemoDemo[10042:a0f] relative books price: ( 
    5, 
    4 
)
```

KVC还能对集合做运算，比如想得到相关图书的个数、相关图书的价格总和、相关图书的平均价格、价格的最大值和价格的最小值，见下面的代码：
```objc
NSArray *books=[NSArray arrayWithObjects:book1,book2,nil]; 
[book setValue:books forKey:@"relativeBooks"]; 
NSLog(@"relative books price: %@",[book valueForKeyPath:@"relativeBooks.price"]); 
NSLog(@"relative books count: %@",[book valueForKeyPath:@"relativeBooks.@count"]); 
NSLog(@"relative books price sum: %@",[book valueForKeyPath:@"relativeBooks.@sum.price"]); 
NSLog(@"relative books price avg: %@",[book valueForKeyPath:@"relativeBooks.@avg.price"]); 
NSLog(@"relative books price avg: %@",[book valueForKeyPath:@"relativeBooks.@max.price"]); 
NSLog(@"relative books price avg: %@",[book valueForKeyPath:@relativeBooks.@min.price]);
```

相关日志：
```objc
2011-05-26 19:45:27.786 ReleaseMemoDemo[10289:a0f] relative books price: ( 
    5, 
    4 
) 
2011-05-26 19:45:27.787 ReleaseMemoDemo[10289:a0f] relative books count: 2 
2011-05-26 19:45:27.788 ReleaseMemoDemo[10289:a0f] relative books price sum: 9 
2011-05-26 19:45:27.788 ReleaseMemoDemo[10289:a0f] relative books price avg: 4.5 
2011-05-26 19:45:27.789 ReleaseMemoDemo[10289:a0f] relative books price avg: 5 
2011-05-26 19:45:27.789 ReleaseMemoDemo[10289:a0f] relative books price avg: 4
```
 
另外，如果想获得没有重复的价格集合，可以这样：
```objc
Book *book1=[[[Book alloc] init] autorelease]; 
[book1 setValue:@"5.0" forKey:@"price"];

Book *book2=[[[Book alloc] init] autorelease]; 
[book2 setValue:@"4.0" forKey:@"price"];

Book *book3=[[[Book alloc] init] autorelease]; 
[book3 setValue:@"4.0" forKey:@"price"];

NSArray *books=[NSArray arrayWithObjects:book1,book2,book3,nil]; 
[book setValue:books forKey:@"relativeBooks"];

NSLog(@"relative books price: %@",[book valueForKeyPath:@"relativeBooks.price"]); 
NSLog(@"relative books distinct price: %@",[book valueForKeyPath:@"relativeBooks.@distinctUnionOfObjects.price"]);

NSLog(@"relative books count: %@",[book valueForKeyPath:@"relativeBooks.@count"]); 
NSLog(@"relative books price sum: %@",[book valueForKeyPath:@"relativeBooks.@sum.price"]); 
NSLog(@"relative books price avg: %@",[book valueForKeyPath:@"relativeBooks.@avg.price"]); 
NSLog(@"relative books price avg: %@",[book valueForKeyPath:@"relativeBooks.@max.price"]); 
NSLog(@"relative books price avg: %@",[book valueForKeyPath:@relativeBooks.@min.price]);
```
 

这里增加了book3实例，它的价格和book2相同。在使用@distinctUnionOfObjects后，发现效果是消除重复的价格：
```objc
011-05-26 19:55:41.123 ReleaseMemoDemo[10378:a0f] book price is 10.4 
2011-05-26 19:55:41.124 ReleaseMemoDemo[10378:a0f] relative books price: ( 
    5, 
    4, 
    4 
) 
2011-05-26 19:55:41.124 ReleaseMemoDemo[10378:a0f] relative books distinct price: ( 
    4, 
    5 
)
```
 
KVC还可以在一个语句中为实例的多个属性赋值：
```objc
Book *book4=[[Book alloc] init]; 
NSArray *bookProperties=[NSArray arrayWithObjects:@"name",@"price",nil]; 
NSDictionary *bookPropertiesDictionary=[book4 dictionaryWithValuesForKeys:bookProperties]; 
NSLog(@"book values: %@",bookPropertiesDictionary);

NSDictionary *newBookPropertiesDictionary=[NSDictionary dictionaryWithObjectsAndKeys:@"《Objective C入门》",@"name", 
                                           @"20.5",@"price",nil]; 
[book4 setValuesForKeysWithDictionary:newBookPropertiesDictionary]; 
NSLog(@"book with new values: %@",[book4 dictionaryWithValuesForKeys:bookProperties]);
```

值的正确性核查
KVC提供属性值确认的API，它可以用来检查set的值是否正确、为不正确的值做一个替换值或者拒绝设置新值并返回错误原因。

实现核查方法

为如下格式：validate<Key>:error:

如：
```objc
-(BOOL)validateName:(id *)ioValue error:(NSError **)outError
{
    // The name must not be nil, and must be at least two characters long.
    if ((*ioValue == nil) || ([(NSString *)*ioValue length] < 2]) {
        if (outError != NULL) {
            NSString *errorString = NSLocalizedStringFromTable(
                    @"A Person's name must be at least two characters long", @"Person",
                    @"validation: too short name error");
            NSDictionary *userInfoDict =
                [NSDictionary dictionaryWithObject:errorString
                                            forKey:NSLocalizedDescriptionKey];
            *outError = [[[NSError alloc] initWithDomain:PERSON_ERROR_DOMAIN
                                                    code:PERSON_INVALID_NAME_CODE
                                                userInfo:userInfoDict] autorelease];
        }
        return NO;
    }
    return YES;
}
```
调用核查方法： 

validateValue:forKey:error:，默认实现会搜索 validate<Key>:error:格式的核查方法，找到则调用，未找到默认返回YES。
注意其中的内存管理问题。另外，还有两个比较高级的内容：
nil和覆盖setNilValueForKey方法
覆盖valueForUndefinedKey方法
可自行看reference了解。
