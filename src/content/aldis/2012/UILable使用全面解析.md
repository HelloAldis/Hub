---
title: UILable使用全面解析
publishDate: 2012-11-06 00:35:17
image: ~/assets/images/aldis/2012/32.png
category: 编程思想
tags:
  - UILabel
  - Objective-C
---

```objc
  //创建uilabel
  UILabel *label = [[UILabel alloc]initWithFrame:CGRectMake(20, 40, 280, 80)];

  //设置背景色
  label.backgroundColor = [UIColor grayColor];

  //设置tag
  label.tag = 91;

  //设置内容
  label.text = @"Hello World";

  //设置内容字体和字体大小
  label.font = [UIFont fontWithName:@"Arial" size:30];

  //文本自适应大小 只会变小 当numberOfLines为1时才有效
  label.adjustsFontSizeToFitWidth = YES;

  //文本自适应缩小的最小字体大小 默认为 0.0 上面要YES
  label.minimumFontSize = 12;

  //文本颜色
  label.textColor = [UIColor blueColor];

  //文本最多行数，为0时没有最大行数限制
  label.numberOfLines = 2;

  //文本高亮
  label.highlighted = YES;

  //文本是否可变
  label.enabled = YES;

  //设置label的背景色透明
  label.backgroundColor = [UIColor clearColor];

  //文本阴影颜色
  label.shadowColor = [UIColor grayColor];

  //阴影偏向 第一个横向 >0 向右 < 0向左 第二个纵向  >0 向下 < 0向上
  label.shadowOffset = CGSizeMake(1.0, 1.0);

  //是否与用户交互
  label.userInteractionEnabled = YES;

  //文本超出label边界文本的截取方式
  label.lineBreakMode = UILineBreakModeTailTruncation;

  /*
    typedef enum {

        UILineBreakModeWordWrap = 0,    以空格为边界，保留整个单词  默认方式
        UILineBreakModeCharacterWrap,   保留整个字符
        UILineBreakModeClip,            到边界为止
        UILineBreakModeHeadTruncation,  省略开始，以....代替
        UILineBreakModeTailTruncation,  省略结尾，以....代替
        UILineBreakModeMiddleTruncation,省略中间，以....代替

    } UILineBreakMode;
    */

  //baselineAdjustment这个值控制文本的基线位置，只有label.adjustsFontSizeToFitWidth = YES;时有效 自适应大小要有效 label.numberOfLines为1
  label.baselineAdjustment = UIBaselineAdjustmentNone;

  /*
    typedef enum {

        UIBaselineAdjustmentAlignBaselines = 0, 默认设置文本最上端与label中线对齐
        UIBaselineAdjustmentAlignCenters,  文本中线与label中线对齐
        UIBaselineAdjustmentNone,          文本最低端label中线对齐

    } UIBaselineAdjustment;
    */

  //设置文本对齐方式 中间对齐
  label.textAlignment = UITextAlignmentCenter;

  /*
  typedef enum {

        UITextAlignmentLeft = 0, 左对齐  默认方式
        UITextAlignmentCenter,   中间对其
        UITextAlignmentRight,    右对齐

    } UITextAlignment;
    */


  //把label加到当前窗口上
  [self.window addSubview:label];

  //释放掉label
  [label release];

  UILabel自适应高度和自动换行

  //初始化label
  UILabel *label1 = [[UILabel alloc] initWithFrame:CGRectMake(0,0,0,0)];

  //设置自动行数与字符换行
  [label setNumberOfLines:0];
  label.lineBreakMode = UILineBreakModeWordWrap;

  // 测试字串
  NSString *s = @"这是一个测试！！！adsfsaf这是一个测试忘这是一个测试我阿阿这是一个测试阿这是一个测试阿啊00000000阿这是一个测试顿。。。这是一个测试";
  UIFont *font = [UIFont fontWithName:@"Arial" size:12];

  //设置一个行高上限
  CGSize size = CGSizeMake(320,2000);

  //计算实际frame大小，并将label的frame变成实际大小
  CGSize labelsize = [s sizeWithFont:font constrainedToSize:size lineBreakMode:UILineBreakModeWordWrap];
  label1.frame = CGRectMake(0, 0, labelsize.width, labelsize.height);
```
