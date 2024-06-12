---
title: UIAlertView点击灰色部分dismiss
publishDate:  2013-04-23 22:59:25
image: ~/assets/images/aldis/2013/3.png
category: 编程思想
tags:
  - UIAlertView
  - Objective-C
---

模态弹出来的窗口，需要点击窗口以外的区域，也就是模态区域让这个窗口消失。一般这种场景会出现在iPad里，当你modalPresentationStyle为UIModalPresentationFormSheet时，会有这种需求。UIAlertView可以实现:

```objc
- (IBAction)showAlert:(id)sender {  
  alert = [[UIAlertView alloc] initWithTitle:@"模态测试"  
                                     message:@"请点击四周的模态区域我就消失"  
                                    delegate:nil  
                           cancelButtonTitle:@"确定"  
                           otherButtonTitles:nil];  
  [alert show];  
  recognizerTap = [[UITapGestureRecognizer alloc] initWithTarget:self   
                                                 action:@selector(handleTapBehind:)];  
    
  [recognizerTap setNumberOfTapsRequired:1];  
  recognizerTap.cancelsTouchesInView = NO;   
  [alert.window addGestureRecognizer:recognizerTap];  
}  

- (void)handleTapBehind:(UITapGestureRecognizer *)sender{  
  if (sender.state == UIGestureRecognizerStateEnded) {  
    CGPoint location = [sender locationInView:nil];  
    if (![alert pointInside:[alert convertPoint:location fromView:alert.window] withEvent:nil]) {  
      [alert.window removeGestureRecognizer:sender];  
      [alert dismissWithClickedButtonIndex:0 animated:YES];  
    }  
  }  
}  
```

