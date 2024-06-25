---
title: UITextField滑动防止被键盘挡住终极解决方案
publishDate: 2013-02-20 00:22:53
image: ~/assets/images/aldis/2013/2013-02-20/2.png
category: 编程思想
tags:
  - UITextField
  - Objective-C
---

问题：当屏幕下方有textfield时会被弹出的键盘挡住，用户体验不太好。

坚决方法：使用scroll view 当textfield成为first responder时 将textfield滑动到键盘上面

网上这方面的解决方法有很多，但是都不够完美，比如无法真确处理手持方向改变时keybord高度不一样的情况，无法兼容iPad下键盘和iPhone高度不一样，
动画不和谐，实现过于复杂等等问题。 现在我分享的一个简单易懂又比较完美的方法。
AutoScrollView类自动的实现了这一特性，要集成这个功能，只要在xib中将ScrolView的Customer class设置成AutoScrollView就可以了，非常简单容易。

![](~/assets/images/aldis/2013/2013-02-20/1.png)

下面是AutoScrollView源代码

```objc
//
//  AutoScrollView.h
//  AutoScrollView
//
//  Created by KindAzrael on 13-2-18.
//  Copyright (c) 2013年 KindAzrael. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AutoScrollView : UIScrollView

@property(assign, nonatomic) CGPoint previousOffset;

@end
```

<!-- more -->

```objc
//
//  AutoScrollView.m
//  AutoScrollView
//
//  Created by KindAzrael on 13-2-18.
//  Copyright (c) 2013年 KindAzrael. All rights reserved.
//

#import "AutoScrollView.h"

@interface AutoScrollView ()

// add the keybord notification
- (void)setup;

// remove the keybord notification
- (void)tearDown;


- (void)keyboardWillShow:(NSNotification *)notification;


- (void)keyboardWillHide:(NSNotification *)notification;

@end

@implementation AutoScrollView

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setup];
    }

    return self;
}

- (void)awakeFromNib {
    [self setup];
    self.contentSize = CGSizeMake(320, 700);
}

- (void)dealloc {
    [self tearDown];
}

// hide keybord when touch croll view
- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
    [super touchesBegan:touches withEvent:event];
    [self endEditing:YES];
}

- (void)setup {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillShow:) name:UIKeyboardWillShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillHide:) name:UIKeyboardWillHideNotification object:nil];
}

- (void)tearDown {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

// scroll contentOffset when keybord will show
- (void)keyboardWillShow:(NSNotification *)notification {
    self.previousOffset = self.contentOffset;
    NSDictionary *userInfo = [notification userInfo];

    // get keyboard rect in windwo coordinate
    CGRect keyboardRect = [[userInfo objectForKey:UIKeyboardFrameEndUserInfoKey] CGRectValue];

    // convert keyboard rect from window coordinate to scroll view coordinate
    keyboardRect = [self convertRect:keyboardRect fromView:nil];

    // get keybord anmation duration
    NSTimeInterval animationDuration = [[userInfo objectForKey:UIKeyboardAnimationDurationUserInfoKey] doubleValue];

    // get first responder textfield
    UIView *currentResponder = [self findFirstResponderBeneathView:self];
    if (currentResponder != nil) {
        // convert textfield left bottom point to scroll view coordinate
        CGPoint point = [currentResponder convertPoint:CGPointMake(0, currentResponder.frame.size.height) toView:self];

        // 计算textfield左下角和键盘上面20像素 之间是不是差值
        float scrollY = point.y - (keyboardRect.origin.y - 20);
        if (scrollY > 0) {
            [UIView animateWithDuration:animationDuration animations:^{
                //移动textfield到键盘上面20个像素
                self.contentOffset = CGPointMake(self.contentOffset.x, self.contentOffset.y + scrollY);
            }];
        }
    }
    self.scrollEnabled = NO;
}

// roll back content offset
-(void)keyboardWillHide:(NSNotification *)notification {
    NSDictionary *userInfo = [notification userInfo];
    NSTimeInterval animationDuration = [[userInfo objectForKey:UIKeyboardAnimationDurationUserInfoKey] doubleValue];
    [UIView animateWithDuration:animationDuration animations:^{
        self.contentOffset = self.previousOffset;
    }];
    self.scrollEnabled = YES;
}

- (UIView*)findFirstResponderBeneathView:(UIView*)view {
    // Search recursively for first responder
    for ( UIView *childView in view.subviews ) {
        if ( [childView respondsToSelector:@selector(isFirstResponder)] && [childView isFirstResponder] ) return childView;
        UIView *result = [self findFirstResponderBeneathView:childView];
        if ( result ) return result;
    }
    return nil;
}
@end
```

效果
![](~/assets/images/aldis/2013/2013-02-20/2.png)
