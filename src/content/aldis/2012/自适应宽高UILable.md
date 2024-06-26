---
title: 自适应宽高UILable
publishDate: 2012-10-10 01:34:28
image: ~/assets/images/aldis/2012/36.png
category: 编程思想
tags:
  - UILable
  - Objective-C
---

有时一个UILable的text内容是变化的，而且差异有很大，  
需求上要求UILabel的大小高宽能够自适应text的内容。代码例子：

```objc
myLable=[[UILabel alloc] initWithFrame:CGRectMake(0, 23, 175, 33)];
[myLable setFont:[UIFont fontWithName:@"Helvetica" size:10.0]];
[myLable setNumberOfLines:0];
[myLable setBackgroundColor:[UIColor clearColor]];
[myAdView addSubview:myLable];

UIFont *font = [UIFont fontWithName:@"Helvetica" size:10.0];
CGSize size = [text sizeWithFont:font constrainedToSize:CGSizeMake(175.0f, 2000.0f)
                    lineBreakMode:UILineBreakModeWordWrap];
CGRect rect=myLable.frame;
rect.size=size;
[myLable setFrame:rect];
[myLable setText:text];
```

核心的是

```
CGSize size = [text sizeWithFont:font constrainedToSize:CGSizeMake(175.0f, 2000.0f) lineBreakMode:UILineBreakModeWordWrap];
```

来预算text显示时宽高。  
其中font是显示的字体，constrainedToSize是最大可接受的字符串宽高(例子中是宽175，高2000)  
lineBreakMode换行类型(UILineBreakModeWordWrap指的单词边界换行)

<!-- more -->

关于这个官方文档说明

sizeWithFont:constrainedToSize:lineBreakMode:
Returns the size of the string if it were rendered with the specified constraints.

- (CGSize)sizeWithFont:(UIFont \*)font constrainedToSize:(CGSize)size lineBreakMode:(UILineBreakMode)lineBreakMode
  Parameters
  font
  The font to use for computing the string size.

size
The maximum acceptable size for the string. This value is used to calculate where line breaks and wrapping would occur.

lineBreakMode
The line break options for computing the size of the string. For a list of possible values, see NSLineBreakMode.

Return Value
The width and height of the resulting string’s bounding box. These values may be rounded up to the nearest whole number.

Discussion
You can use this method to obtain the layout metrics you need to draw a string in your user interface. This method does not actually draw the string or alter the receiver’s text in any way.

This method computes the metrics needed to draw the specified string. This method lays out the receiver’s text and attempts to make it fit the specified size using the specified font and line break options. During layout, the method may break the text onto multiple lines to make it fit better. If the receiver’s text does not completely fit in the specified size, it lays out as much of the text as possible and truncates it (for layout purposes only) according to the specified line break mode. It then returns the size of the resulting truncated string. If the height specified in the size parameter is less than a single line of text, this method may return a height value that is bigger than the one specified.

Availability
Available in iOS 2.0 and later.
Declared In
UIStringDrawing.h
