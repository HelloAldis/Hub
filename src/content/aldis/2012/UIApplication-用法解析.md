---
title: UIApplication 用法解析
publishDate: 2012-08-27 21:00:46
image: ~/assets/images/aldis/2012/28.png
category: 编程思想
tags:
  - UIApplication
  - Objective-C
---

UIApplication，代表的是整个应用做的事，因此每个程序只能有一个，系统使用的是单例模式，就是上面的[UIApplication sharedApplication]来得到一个实例。这个单例实  
例是在系统启动时由main函数里面的UIApplicationMain方法生成，就是每个程序里都有的AppDelegate，它实现了UIApplicationDelegate的Protocol，也就是AppDelegate的一  
个实例。每次通过[UIApplication sharedApplication]调用的就是它。  
UIApplication在程序里的角色：它保存一个UIWindow对象序列，用来快速恢复views  
UIApplication的核心作用是提供了iOS程序运行期间的控制和协作工作。  
每一个程序在运行期必须有且仅有一个UIApplication（或则其子类）的一个实例。回想一下我在前面的文章“main函数研究”的文章中提到的main函数的代码，可以看出，在  
程序开始运行的时候，UIApplicationMain函数是程序进入点，这个函数做了很多工作，其中一个重要的工作就是创建一个UIApplication的单例实例。在你的代码中你，你可以  
通过调用[UIApplication sharedApplication]来得到这个单例实例的指针。  
UIApplication的一个主要工作是处理用户事件，它会起一个队列，把所有用户事件都放入队列，逐个处理，在处理的时候，它会发送当前事件到一个合适的处理事件的目标控  
件。此外，UIApplication实例还维护一个在本应用中打开的window列表（UIWindow实例），这样它就可以接触应用中的任何一个UIView对象。UIApplication实例会被赋予一个  
代理对象，以处理应用程序的生命周期事件（比如程序启动和关闭）、系统事件（比如来电、记事项警告）等等。  
新建一个任意类型的iOS应用工程，加入我们在Class Prefix输入是TC，我们可以看到工程中生成一个类：  
TCAppDelegate :UIResponder <UIApplicationDelegate>  
这里这个类的基类是UIResponder，和4.2以前生成的工程是不同的，以前是继承自NSObject。不论如何，本类实现了一个名叫UIApplicationDelegate的接口，这个表明这个类  
就是这个工程中UIApplication实例的代理类。  
在main函数中，

```objc
@autoreleasepool {
       returnUIApplicationMain(argc, argv, nil,NSStringFromClass([TCAppDelegateclass]));
    }
```

<!-- more -->

这里传入了代理类到UIApplicationMain函数中，UIApplicationMain函数在生成唯一个UIApplication的时候就可以把代理类的实例指针告诉这个单例对象了。

```objc
- (void)applicationWillResignActive:(UIApplication *)application
// 说明：当应用程序将要入非活动状态执行，在此期间，应用程序不接收消息或事件，比如来电话了

- (void)applicationDidBecomeActive:(UIApplication *)application
// 说明：当应用程序入活动状态执行，这个刚好跟上面那个方法相反

- (void)applicationDidEnterBackground:(UIApplication *)application
// 说明：当程序被推送到后台的时候调用。所以要设置后台继续运行，则在这个函数里面设置即可

- (void)applicationWillEnterForeground:(UIApplication *)application
//说明：当程序从后台将要重新回到前台时候调用，这个刚好跟上面的那个方法相反。

- (void)applicationWillTerminate:(UIApplication *)application
// 说明：当程序将要退出是被调用，通常是用来保存数据和一些退出前的清理工作。这个需要要设置UIApplicationExitsOnSuspend的键值。

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application
// 说明：iPhone设备只有有限的内存，如果为应用程序分配了太多内存操作系统会终止应用程序的运行，在终止前会执行这个方法，通常可以在这里进行内存清理工作防止程序被终止

- (void)applicationSignificantTimeChange:(UIApplication*)application
// 说明：当系统时间发生改变时执行

- (void)applicationDidFinishLaunching:(UIApplication*)application
// 说明：当程序载入后执行

- (void)application:(UIApplication)application willChangeStatusBarFrame:(CGRect)newStatusBarFrame
// 说明：当StatusBar框将要变化时执行

- (void)application:(UIApplication*)application willChangeStatusBarOrientation:(UIInterfaceOrientation)newStatusBarOrientation
duration:(NSTimeInterval)duration
// 说明：当StatusBar框方向将要变化时执行

- (BOOL)application:(UIApplication*)application handleOpenURL:(NSURL*)url
// 说明：当通过url执行

- (void)application:(UIApplication*)application didChangeStatusBarOrientation:(UIInterfaceOrientation)oldStatusBarOrientation
// 说明：当StatusBar框方向变化完成后执行

- (void)application:(UIApplication*)application didChangeSetStatusBarFrame:(CGRect)oldStatusBarFrame
//说明：当StatusBar框变化完成后执行
```

iPhone中的应用程序很容易受到打扰，比如一个来电可能导致应用程序失去焦点，如果这个时候接听了电话，那么应用程序会转到后台运行。还有很多其它类似的事件会导致  
iPhone应用程序失去焦点，在应用程序失去焦点前会调用委托类的applicationWillResignActive()方法，而应用程序再次获取到焦点的时候会调用  
applicationDidBecomeActive()方法。比如在运行应用程序的时候锁屏会调用委托类的applicationWillResignActive()方法，而当屏幕被解锁的时候，又会调用  
applicationDidBecomeActive()方法。

另外一个非常重要的方法就是applicationDidReceiveMemoryWarning()，因为iPhone设备只有有限的内存，如果为应用程序分配了太多内存操作系统会终止应用程序的运行，但  
在终止之前操作系统会通过先调用委托类的applicationDidReceiveMemoryWarning()方法警告应用程序，在UIApplication接收到这个事件后它会传递给委托类的  
applicationDidReceiveMemoryWarning()方法，委托类在这个方法内可以进行释放内存的操作以防止操作系统强制终止应用程序的运行。  
下面是这个类的一些功能：  
UIApplication还可以远程提醒，就是push notification注册；  
可以连接到UIUndoManager；  
检查能否打开某个URL，并且打开URL；这个功能可以配合应用的自定义URL功能，来检测是否安装了某个应用。比如检测是否安装了淘宝的应用，可以用下面的代码：

```objc
NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"taobao://item.taobao.com/item.htm?id=12688928896"]];
// 判断当前系统是否有安装淘宝客户端
    if ([[UIApplication sharedApplication] canOpenURL:url]) {
        // 如果已经安装淘宝客户端，就使用客户端打开链接
        [[UIApplication sharedApplication] openURL:url];
    }
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"taobao://item.taobao.com/item.htm?id=12688928896"]];
    // 判断当前系统是否有安装淘宝客户端
    if ([[UIApplication sharedApplication] canOpenURL:url]) {
        // 如果已经安装淘宝客户端，就使用客户端打开链接
        [[UIApplication sharedApplication] openURL:url];
    }
```

1.设置icon上的数字图标

```objc
    //设置主界面icon上的数字图标，在2.0中引进， 缺省为0
    [UIApplication sharedApplication].applicationIconBadgeNumber = 4;
```

2.设置摇动手势的时候，是否支持redo,undo操作

```objc
    //摇动手势，是否支持redo undo操作。
   //3.0以后引进，缺省YES
    [UIApplication sharedApplication].applicationSupportsShakeToEdit =YES;
```

3.判断程序运行状态

```objc
    //判断程序运行状态，在2.0以后引入
    /*
     UIApplicationStateActive,
     UIApplicationStateInactive,
     UIApplicationStateBackground
     */
   if([UIApplication sharedApplication].applicationState == UIApplicationStateInactive){
        NSLog(@"程序在运行状态");
    }
```

4.阻止屏幕变暗进入休眠状态

```objc
    //阻止屏幕变暗，慎重使用,缺省为no 2.0
    [UIApplication sharedApplication].idleTimerDisabled = YES;
```

慎重使用本功能，因为非常耗电。  
5.显示联网状态

```objc
    //显示联网标记 2.0
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
```

6.在map上显示一个地址

```objc
   NSString* addressText =@"1 Infinite Loop, Cupertino, CA 95014";
   // URL encode the spaces
    addressText =  [addressTextstringByAddingPercentEscapesUsingEncoding:NSASCIIStringEncoding];
   NSString* urlText = [NSStringstringWithFormat:@"http://maps.google.com/maps?q=%@", addressText];
    [[UIApplication sharedApplication]openURL:[NSURLURLWithString:urlText]];
```

7.发送电子邮件

```objc
   NSString *recipients =@"mailto:first@example.com?cc=second@example.com,third@example.com&subject=Hello from California!";
   NSString *body =@"&body=It is raining in sunny California!";
    NSString *email = [NSStringstringWithFormat:@"%@%@", recipients, body];
    email = [emailstringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    [[UIApplication sharedApplication]openURL:[NSURLURLWithString:email]];
```

8.打电话到一个号码

```objc
    // Call Google 411
    [[UIApplication sharedApplication]openURL:[NSURLURLWithString:@"tel://8004664411"]];
```

9.发送短信

```objc
    // Text to Google SMS
    [[UIApplication sharedApplication]openURL:[NSURLURLWithString:@"sms://466453"]];
```

10.打开一个网址

```objc
   // Lanuch any iPhone developers fav site
    [[UIApplication sharedApplication]openURL:[NSURLURLWithString:@"http://itunesconnect.apple.com"]];
```
