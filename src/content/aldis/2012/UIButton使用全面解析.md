---
title: UIButton使用全面解析
publishDate: 2012-11-05 00:18:25
image: ~/assets/images/aldis/2012/2012-11-05/1.png
category: 编程思想
tags:
  - UIButton
  - Objective-C
---

## 创建

两种方法：

1. 常规的 initWithFrame

```objc
UIButton *btn1 = [[UIButton alloc]initWithFrame:CGRectMake(10, 10, 80, 44)];
```

对代码创建View（UIControl继承自UIView，所以也是view）不甚了解的请参看：《有关View的几个基础知识点》

2. UIButton 的一个类方法（也可以说是静态方法）buttonWithType

```objc
UIButton *btn2 = [UIButton buttonWithType:UIButtonTypeRoundedRect];
```

风格有如下

```objc
typedef enum {
    UIButtonTypeCustom = 0,           // 自定义，无风格
    UIButtonTypeRoundedRect,        // 白色圆角矩形，类似偏好设置表格单元或者地址簿卡片
    UIButtonTypeDetailDisclosure,//蓝色的披露按钮，可放在任何文字旁
    UIButtonTypeInfoLight,//微件(widget)使用的小圆圈信息按钮，可以放在任何文字旁
    UIButtonTypeInfoDark,//白色背景下使用的深色圆圈信息按钮
    UIButtonTypeContactAdd,//蓝色加号(+)按钮，可以放在任何文字旁
} UIButtonType;
```

<!-- more -->

## 设置属性

1.Frame属性
第2种方法创建按钮后你可以给按钮的frame属性赋值，用一个CGRect结构设置他的位置和大小

```objc
CGRect btn2Frame = CGRectMake(10.0, 10.0, 60.0, 44.0);
    btn2.frame =btn2Frame;
```

2. 属性
   对于任何特定状态下的按钮，都可以设定该按钮该状态下的按钮标题。用setTitle 方法 设置即可：

```objc
[btn1 setTitle:@"BTN1" forState:UIControlStateNormal];
```

你也可以为按钮的某一状态设置为图。用 setImage 即可：

```objc
[btn2 setImage:[UIImage imageNamed:@"pic"] forState:UIControlStateNormal];
```

此外，你还可以为每种按钮状态设置标题的颜色和阴影，以及按钮的背景。方法 setTitleColor 和 setTitleShadowColor 都需要一个UIColor对象做参数：

![](~/assets/images/aldis/2012/2012-11-05/1.png)

```objc
[btn1 setTitleColor:[UIColor redColor] forState:UIControlStateNormal];                        //设置标题颜色
[btn1 setTitleShadowColor:[UIColor grayColor] forState:UIControlStateNormal ];        //阴影
[btn1 setBackgroundImage:[UIImage imageNamed:@"PIC"] forState:UIControlStateHighlighted];      //背景图像
```

上面几个方法都提到 共同的参数 forState . 这个参数决定了标题、图像或其他属性将在何种状态下显现。你可以编程令按钮在那个状态变化

```objc
enum {
    UIControlStateNormal       = 0,  //常态
    UIControlStateHighlighted  = 1 << 0,                        //  高亮
    UIControlStateDisabled     = 1 << 1,  //禁用
    UIControlStateSelected     = 1 << 2,                         // 选中
    UIControlStateApplication  = 0x00FF0000,              // 当应用程序标志使用时
    UIControlStateReserved     = 0xFF000000              // 为内部框架预留的
};
typedef NSUInteger UIControlState;
```

你只要掌握前四种状态就好了。
当按钮高亮或者禁用，UIButton 类可以调整自己的外观，下面几个属性可以让你按照需要对按钮的外观进行微调：
adjustsImageWhenHighlighted
默认情况下，在按钮被禁用时，图像会被画的颜色深一些。要禁用此功能，请将这个属性设置为NO：

btn1.adjustsImageWhenHighlighted = NO;  
adjustsImageWhenDisabled
默认情况下，按钮在被禁用时，图像会被画的颜色淡一些。要禁用此功能，请将这个属性设置为NO：

btn1.adjustsImageWhenDisabled = NO;  
showsTouchWhenHighlighted
这个
属性设置为YES，可令按钮在按下时发光。这可以用于信息按钮或者有些重要的按钮：

btn1.showsTouchWhenHighlighted = YES;

## 显示控件

显示控件一如继往的简单：

```objc
[self.view addSubview:btn1];
[self.view addSubview:btn2];
```

## 重写绘制行为

你可以通过子类化按钮来定制属于你自己的按钮类。在子类化的时候你可以重载下面这些方法，这些方法返回CGRect结构，指明了按钮每一组成部分的边界。
注意：不要直接调用这些方法， 这些方法是你写给系统调用的。

backgroundRectForBounds //指定背景边界

contentRectForBounds // 指定内容边界

titleRectForContentRect // 指定文字标题边界

imageRectForContentRect //指定按钮图像边界

例：

```objc
- (CGRect)imageRectForContentRect:(CGRect)bounds{
     return CGRectMake(0.0, 0.0, 44, 44);
 }
```

## 添加动作

按钮是用来干嘛的？用来激发某个动作或事件的。那我们我们要为他添加一个动作，与 UIControl 里讲的一样：

```objc
[btn1 addTarget:self action:@selector(btnPressed:) forControlEvents:UIControlEventTouchUpInside];

-(void)btnPressed:(id)sender{

UIButton* btn = (UIButton*)sender;
//开始写你自己的动作
}
```
