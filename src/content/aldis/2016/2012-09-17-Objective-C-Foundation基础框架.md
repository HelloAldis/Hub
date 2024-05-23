---
title: Objective-C Foundation基础框架
publishDate:  2012-09-17 21:57:31
category: Objective-C
tags:
  - Foundation.framework
---

iOS Foundation基础框架就是以Foundation.h头文件的库
```objc
#import <Foundation/Foundation.h> 
```

Mac OS X和iOS都使用了Foundation基础框架。该框架中有很多日后开发常用的API，非常基础重要。以下就常用的类和结构做个介绍。

## NSObjct

NSObject类，是ObjC类族中的根类。NSObject有一些高级特性支持，在灵活和高效开发中十分常用。
perform方法和selector, selector是ObjC高级的语法特性，可看作C函数指针，或者Java反射API的Method类相关内容。看一下下面的代码，读者就应该能理解，首先我有个Book类：
```objc
#import <Foundation/Foundation.h>

@interface Book : NSObject {

}

-(void) printInformation;

@end
```

可以看到有个方法printInformation。一般调用该方法大致是这样：
```objc
Book *book=[[Book alloc] init]; 
[book printInformation];
```

如果使用selector和perform…方法可这样调用：
```objc
Book *book=[[Book alloc] init]; 
[book printInformation];

SEL method=@selector(printInformation); 
id object=book; 
[object performSelector:method];
```

<!-- more -->

这里，SEL是selector类型。方法可通过这种机制成为变量，传递到任意位置调用，可编写极为灵活和复用性高的代码。
这里调用的方法没有参数传递，是最简单的情况，下面演示一下带参数的，修改Book类的方法：
```objc
#import <Foundation/Foundation.h>

@interface Book : NSObject {

}

-(void) printInformation:(NSString *)bookName;

@end
```
带一个参数。那么上面的两种调用方法的代码将修改为：
```objc
Book *book=[[Book alloc] init]; 
[book printInformation:@"Objective-C Tutorial"];

SEL method=@selector(printInformation:); 
id object=book; 
[object performSelector:method withObject:@"Objective-C Tutorial"];
```

如果多个参数呢？比如：
```objc
-(void) printInformation:(NSString *)bookName bookPrice:(NSString *)price;
```

那么：
```objc
Book *book=[[Book alloc] init]; 
[book printInformation:@"Objective-C Tutorial" bookPrice:@"$17.00"];

SEL method=@selector(printInformation:bookPrice:); 
id object=book; 
[object performSelector:method withObject:@"Objective-C Tutorial" withObject:@"$17.00"];
```

再多的参数，直接这样调用就不行了。需要借助NSInvocation类。具体实现就不展开说了。

perform方法调用还有一个方便的机制，就是延时调用。可以看作一次性的timer。比如：
```objc
Book *book=[[Book alloc] init]; 
[book printInformation:@"Objective-C Tutorial"];

SEL method=@selector(printInformation:); 
id object=book; 
[object performSelector:method withObject:@"Objective-C Tutorial" afterDelay:10]; 
NSLog(@"view did load ok.");
```

可以看到多了个参数，afterDelay，参数值单位是秒。结果：
```objc
2011-05-19 15:27:56.930 iOSSimpleDemo[6793:207] Objective-C Tutorial 
2011-05-19 15:27:56.932 iOSSimpleDemo[6793:207] view did load ok. 
2011-05-19 15:28:06.931 iOSSimpleDemo[6793:207] Objective-C Tutorial
```

从日志可知，带afterDelay参数的方法调用，将延时10秒钟再执行。而主线程并不阻塞，而是继续打印了后面的“view did load ok.”日志。这里的实现原理是，
调用afterDelay参数的方法后，将该方法调用存入队列，主线程在10秒后，再从队列中取得它并调用。
判断对象是否相等, 这里涉及到两个方法:
* isEqual
* hash
前者，比如：
```objc
BOOL isEqual=[book isEqual:book]; 
NSLog(@"book is equals: %@",isEqual?@"yes":@"no");
```
和Java类似的，相等的对象，它们的hash值必须是相同的。这是因为，hash值将用于依赖hash值的集合元素定位，比如HashSet。hash值不同但相等的对象，
将导致在集合中，比如HashSet放入多个。另外，如果自行设置hash值（默认是内存值），不能使用可能变化的值，比如你有个类，User，该类有个属性，name，
如果这个name是可改的，就不要用该属性的hash值（字符串的hash值）作为User类的hash方法返回值。

获取类对象
有时候，想知道需要得到Class的类对象，可以调用class方法：
```objc
NSLog(@"Book class: %@",[book class]);
```
有时候，想要知道超类，可以比如[book superclass]。

管理引用计数

方法比较多：

– retain  required method 
– release  required method 
– autorelease  required method 
– retainCount  required method

这里不细说了，到内存管理部分会详细讲的。有关对象关系，行为等的测试
这些方法，在高级开发中常用。比如，判断一个类型是不是属于某个类型：
```objc
NSLog(@"book instance is kind of Class Book? %@", 
          [book isKindOfClass:[Book class]]?@"yes":@"no");
```

当然子类也是超类类型。比如：
```objc
NSLog(@"book instance is kind of Class Book? %@", 
          [book isKindOfClass:[NSObject class]]?@"yes":@"no");
```
以上两个语句都会返回yes。

如果要求严格判断一个实例是不是属于一个类的，可：
```objc
NSLog(@"book instance is kind of Class Book? %@", 
          [book isMemberOfClass:[NSObject class]]?@"yes":@"no");
```

这里会返回no，因为book是Book类的实例，而不是严格意义上的NSObject类的实例。另外，还有个高级的用法，就是判断实例是不是代理类。即：
```objc
- (BOOL)isProxy
```

这里先要说说Foundation kit提供的代理类用法，即NSProxy。先写个Book的代理类。头文件：
```objc
#import <Foundation/Foundation.h> 
#import "Book.h"

@interface BookProxy : NSProxy { 
    Book *book; 
}

-(id)init;

@property(nonatomic,retain) Book *book;

@end
```

实现：

```objc
#import "BookProxy.h"

@implementation BookProxy

@synthesize book;

-(id)init{ 
    return self; 
}

- (void)forwardInvocation:(NSInvocation *)anInvocation{ 
    [anInvocation setTarget:book]; 
    
    NSLog(@"call proxy instance …"); 
    [anInvocation invoke]; 
    NSLog(@"call proxy instance ok."); 
    
    return; 
}

- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector{ 
    return [book methodSignatureForSelector:aSelector]; 
}

@end
```

调用：
```objc
BookProxy *bookProxy=[[BookProxy alloc]init]; 
bookProxy.book=book;

book=(Book *)bookProxy; 
[book printInformation:@"Objective-C Tutorial"];

NSLog(@"Book class: %@",[book class]); 
NSLog(@"book instance is kind of Class Book? %@", 
      [book isKindOfClass:[NSObject class]]?@"yes":@"no");
```

这里要注意的是，NSProxy类没有init方法（是NSObject类才有），需要自己写一个。从BookProxy到Book要做一次强制转型。之后，使用上就是透明代理了。
isKindOfClass会返回yes。isMemberOfClass会返回no。但是，怎么区分是子类还是代理类呢？就用到这个了：

- (BOOL)isProxy

行为，英文是behavior，是动作嘛，一般指的就是方法。有时候，需要判断一个对象，是否能对一个selector做出回应。比如：
```objc
SEL method=@selector(printInformation:); 
id object=book; 
[object performSelector:method withObject:@"Objective-C Tutorial" afterDelay:10]; 
NSLog(@"view did load ok.");

NSLog(@"book has this selector: %@",[book respondsToSelector:method]?@"yes":@"no");
```

这里打印的是yes。

有的时候，想判断某个实例是否实现了某个协议，可以：
```objc
NSLog(@"book implement NSObject protocol: %@", 
         [book conformsToProtocol:@protocol(NSObject)]?@"yes":@"no");
```
还有一些方法，可以查看NSObject类reference学习。

## 常用的结构体

结构体是C提供的一种数据类型。在ObjC中也常使用。比如：

NSRange
NSPoint
NSSize
NSRect
以NSRange为例：
```objc
typedef struct _NSRange { 
    NSUInteger location; 
    NSUInteger length; 
} NSRange;
```
上面代码是从NSRange头文件中找到的。

可以用三种方式为结构体赋值。比如：
```objc
NSRange range; 
range.location=17; 
range.length=4;
```
还可以：
```objc
NSRange range={17,4};
```
或者：
```objc
NSRange range=NSMakeRange(17, 4);
```
第三种是比较常用的方式，因为是通过函数调用，可在各种情况下使用。使用结构体作为数据类型而不是ObjC对象，是从性能上的考虑。后者在动态分配内存上代价较大。

## NSString

NSString类似Java中的String类，提供了很多便利的对字符串操作的方法。字符串操作在开发中是十分常用的。

如何创建字符串

最普通的创建字符串的方式是：@"hello"
我测试了一下这个：
```objc
NSLog(@"print string hash, instance1: %i, instance2: %i", 
          [@"hello" hash],[@"hello" hash]);
```
日志显示：

print string hash, instance1: -1553534663, instance2: -1553534663

这说明什么呢？两次创建的对象，是内存中同一个实例。这和Java中的String实例化原理是相同的。即系统要保持一个字符串池。当声明的字符串在池中已存在了，
就只提供一个指向存在字符串的指针。这也是为什么字符串是不可修改对象的原因之一。

字符串还提供了stringWithFormat方法创建可插入参数的字符串：
```objc
NSString *content=[NSString stringWithFormat:@"用户姓名：%@",@"张三"];
```
这里使用的是类方法，而不是实例方法。可以将这个方法看作简单工厂模式。

字符串长度
```objc
unsigned int length=[content length];
```

字符串的相等
有的时候，需要判断两个NSString字符串是否相等。这里有两个概念：

对象不一样，但是他们的字符值是一样的
对象是同一个，即在内存中同一个区域
这个概念在各种面向对象语言中应该都有。我拿Java举例子，比如：

String s="hello";

这个语义上和：

NSString *s=@"hello";

是一样的。即查找字符串内存池，看是否有包含相同字符串的对象，如果有，就不重复创建，而是引用池中的字符串对象。因此，用上面语法，
用不同变量名创建多个相同字符串的变量，它们字符串值一样，而且，hash值也一样，即在内存中也是同一个对象。

但是Java如果：

String s=new String("hello");

就是强制创建新的对象，那么字符串值一样，但是内存上不是同一个对象，因为这样创建不使用字符串池。

问题来了，ObjC怎么写出这样的语句？我没有找到。应该是有的吧。

如果在ObjC中判断两个字符串是不是相同的对象，用==即可。如果是判断字符串值是否相等：
```objc
NSString *s=@"hello"; 
[s isEqualToString:@"hello"];
```
建议使用isEqualToString针对字符串值是否相等时使用，而不是==，因为不排除有情况是内存中不是相同对象，但字符串值是相同的情况。

字符串的排序

字符串排序，比如按照首字母排序，两个字符串，比较谁应该排在前面。这时要用到：
```objc
- (NSComparisonResult)compare:(NSString *)aString
```
比如：
```objc
NSString *s1=@"Apple"; 
NSString *s2=@"Google"; 
NSComparisonResult result=[s1 compare:s2];

switch (result) { 
    case NSOrderedSame: 
        NSLog(@"is same string"); 
        break; 
    case NSOrderedAscending: 
        NSLog(@"ascending"); 
        break; 
    case NSOrderedDescending: 
        NSLog(@"descending"); 
        break; 
    default: 
        break; 
}
```

结果是：

ascending

也就是说s1和s2之间的顺序是升序，即s1应该排在前面。

另外，可以使用这个方法：

- (NSComparisonResult)compare:(NSString *)aString options:(NSStringCompareOptions)mask

进行特殊的大小比较，mask确定特殊比较的类型：

大小写敏感
大小写不敏感
数字排序，这个要特别说一下，数字和文字有不同，比如1和9，1排在9前面，无论是字符还是数字都没问题。如果100和99，字符比较就会出现100在99之前的问题
 

是否包含子字符串

经常要用到这样的字符串功能，判断字符串：
- (BOOL)hasPrefix:(NSString *)aString，是否某个字符串开始的
- (BOOL)hasSuffix:(NSString *)aString，是否某个字符串结束的
- (NSRange)rangeOfString:(NSString *)aString，字符串中是否有子字符串，如果有返回NSRange结构体，包含起始位置和长度，
如没有，range.location==NSNotFound
NSMutableString

可变字符串。NSString是不可变的，类似Java的String；NSMutableString类似Java的StringBuffer。
具体方法使用，见Reference。

## 使用集合

### NSArray

NSArray是最常用的集合类型。它类似Java中的ArrayList，但是又有所区别，就是一旦创建就不能再改变。

NSArray有两个限制：

不能存储C语言的基本数据类型，比如int、float、enum、struct等
不能存储nil对象
比较常用的创建NSArray实例的方法是：

+ (id)arrayWithObjects:(id)firstObj, …

其他的看Reference吧。

获取NSArray的元素数：
```objc
- (NSUInteger)count
```
从指定的位置，比如第2个下标获取元素，要用到这个：
```objc
- (id)objectAtIndex:(NSUInteger)index
```
结合上面的count方法，可以对NSArray做循环迭代了。

### NSMutableArray

这个类，允许添加和删除元素。

添加：
```objc
- (void)addObject:(id)anObject
```
删除：
```objc
- (void)removeObject:(id)anObject
```
或者根据下标删除：
```objc
- (void)removeObjectAtIndex:(NSUInteger)index
```

### NSEnumerator

在Java中有迭代器Iterator，在ObjC中类似功能的类是NSEnumerator。比如：
```objc
NSArray *array=[NSArray arrayWithObjects:@"h1",@"h2",nil]; 
NSEnumerator *enumerator=[array objectEnumerator]; 
NSString *string; 
while (string=[enumerator nextObject]) { 
    NSLog(@"element: %@",string); 
}
```

快速枚举

很类似Java中的：

for (String s:array) { 
    
}

ObjC提供了这样的语法支持：
```objc
NSArray *array=[NSArray arrayWithObjects:@"h1",@"h2",nil];

for (NSString *string in array) { 
    NSLog(@"element: %@",string); 
}
```
 
### NSSet和NSMutableSet

类似Java中的HashSet。NSSet是不可变的，而NSMutableSet是可变的。使用和NSArray类似。
NSDictionary和NSMutableDictionary类似Java中的HashMap。

可通过：
```objc
- (id)initWithObjectsAndKeys:(id)firstObject , …
```
初始化带键值对的NSDictionary。比如：
```objc
NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys: 
    @"value1", @"key1", @"value2", @"key2", nil];
```
NSMutableDictionary增加了：
```objc
- (void)setObject:(id)anObject forKey:(id)aKey
```
可加入新的键值对。和删除键值对：
```objc
- (void)removeObjectForKey:(id)aKey
```

## 各种数值

上面提到了，C语言的基本数据类型是不能存储到集合里的。需要将这些数据类型封装到对象中才能放入。遗憾的是，ObjC不像Java或者.net，
提供了自动装箱和拆箱的功能，即编程语言支持自动将基本型包装成对象，或者相反的操作。ObjC提供了手动的方式。下面介绍一下。

### NSNumber

NSNumber提供了很多类似这样的类方法：
```objc
+ (NSNumber *)numberWithInt:(int)value
```
用来将数值型基本数据类型包装成ObjC对象。比如，把int型包装成ObjC的实例：
```objc
NSNumber *number=[NSNumber numberWithInt:24];
```
这个number已经是ObjC对象了，可以放置到集合中去了。

反过来：
```objc
int n=[number intValue];
```

### NSValue

NSNumber只能包装数值。NSValue可以包装任意类型数值，比如将结构体包装放入到集合中。

下面示例将NSRange结构体放入到NSArray中：
```objc
NSRange numberRange={10,29}; 
NSValue *value=[NSValue valueWithRange:numberRange]; 
NSArray *array=[NSArray arrayWithObjects:@"h1",value,nil];
```
这里使用的方法valueWithRange，是NSValue为常用结构体提供的便利方法。如果是自己定义的结构体呢？

比如在头文件中定义了struct：
```objc
typedef struct{ 
    NSString *name; 
    int rank; 
}User;
```

在代码中创建集合，通过NSValue包装结构体存入集合，并且从集合中取出结构体：
```objc
User user={@"张三",2}; 
NSValue *userValue=[NSValue valueWithBytes:&user objCType:@encode(User)]; 
NSArray *myArray=[NSArray arrayWithObjects:@"h1",userValue,nil];

userValue=[myArray objectAtIndex:1]; 
[userValue getValue:&user]; 
NSLog(@"用户姓名： %@",user.name);
```
 

### NSNull

nil有特殊含义，因此不能在集合中保存。那么，如果需要存入空的内容，怎么办呢？

见下面代码：
```objc
NSRange numberRange={10,29}; 
NSValue *value=[NSValue valueWithRange:numberRange]; 
NSArray *array=[NSArray arrayWithObjects:[NSNull null],value,nil];
```
那么，检查是否为null，可以直接用：
```objc
if ([array objectAtIndex:0]==[NSNull null]) { 
    NSLog(@"element is null."); 
}
```

### NSDate

在Java里有java.util.Date类，在ObjC中对应的是NSDate。写个最简单的示例：
```objc
NSDate *date=[NSDate date]; 
NSLog(@"time: %@",date);
```
将打印出：

time: 2011-05-26 11:44:37 +0800

date方法将返回表示当前时间的NSDate对象。

下面的方法：
```objc
- (id)initWithTimeIntervalSinceNow:(NSTimeInterval)seconds
```
可返回当前时间间隔秒数的日期对象。

下面的方法：
```objc
+ (id)dateWithTimeInterval:(NSTimeInterval)seconds sinceDate:(NSDate *)date
```
返回和指定日期对象间隔时间的日期对象。

下面方法：
```objc
- (BOOL)isEqualToDate:(NSDate *)anotherDate
```
判断日期是否相等。

下面方法：
```objc
- (NSDate *)earlierDate:(NSDate *)anotherDate
```
返回更早的日期对象。
```objc
- (NSComparisonResult)compare:(NSDate *)anotherDate
```
比较日期大小。类似NSString的compare方法。
```objc
- (NSTimeInterval)timeIntervalSinceDate:(NSDate *)anotherDate
```
返回日期之间间隔的秒数。

### NSData

在C语言中，经常将数据缓冲区作为参数传递给函数。这时需要将缓冲区的指针传递给函数。如果是动态分配的缓冲区，那么还要考虑何时释放内存。

在ObjC中，可以使用NSData简化缓冲区的使用方式。比如：
```objc
char *s="hello everyone"; 
NSData *data=[NSData dataWithBytes:s length:strlen(s)+1]; 
NSLog(@"data: %s",[data bytes]);
```
这里char *s不是动态分配内存的，这里只是演示一下，通过NSData的类方法，可以将s的字节数组复制到NSData中。NSData是ObjC的类实例，有内存管理机制，
这里按照ObjC内存管理原则应该是已经autorelease了的。
