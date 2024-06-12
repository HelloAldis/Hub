---
title: UIImageView模糊边缘被切割问题
publishDate:  2012-11-23 00:06:20
image: ~/assets/images/aldis/2012/31.png
category: 编程思想
tags:
  - UIImageView
  - Objective-C
---
今天发现一个奇怪的问题，有一个8x8像素的黑色圆点图片。如果把UIImageView 的frame的x，y设置成一个*.5时，类似下面
```objc
UIImageView *imageView = [UIImageView initWithImage:@"dot.png"];
imageView.frame = CGRectMake(100.5, 100.5, imageView.frame.size.width, imageView.frame.size.height);
[self.view addSubview:imageView];
```
这样圆点图会被加到view上，运行看结果，会发现圆点图会很模糊甚至边缘有被切割的现象。

如果是下面这样就没有上面说的问题
```objc
UIImageView *imageView = [UIImageView initWithImage:@"dot.png"];
imageView.frame = CGRectMake(100, 100, imageView.frame.size.width, imageView.frame.size.height);
[self.view addSubview:imageView];
```
这个问题很诡异不知道问什么会这样，上面是在iPad2上试验结果，没在iPad3上试过，有ipad3的可以尝试一下，这个问题是不是和屏有关。