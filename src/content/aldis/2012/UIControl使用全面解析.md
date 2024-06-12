---
title: UIControl使用全面解析
publishDate:  2012-11-06 23:54:20
image: ~/assets/images/aldis/2012/30.png
category: 编程思想
tags:
  - UIControl
  - Objective-C
---

前面写UILable使用全面解析、UIButton使用全面解析、 UITextField使用全面解析 它们有共同父类UIControl，对UIControl的理解
有助全面理解iOS中的控件。
UIKit提供了一组控件：UISwitch开关、UIButton按钮、UISegmentedControl分段控件、UISlider滑块、UITextField文本字段控件、UIPageControl分页控件。
控件是对UIView派生类的实用增强及补充，并可以直接附着于导航栏、表格单元，甚至更大的对象。
这些控件的基类均是UIControl，而UIControl派生自UIView类，所以每个控件都有很多视图的特性，包括附着于其他视图的能力。所有控件都拥有一套共同的属性和方法。
所以学习控件，我们先学习UIControl。
 
属性
 
enabled
控件默认是启用的。要禁用控件，可以将enabled属性设置为NO，这将导致控件忽略任何触摸事件。被禁用后，控件还可以用不同的方式显示自己，比如变成灰色不可用。虽然是由控件的子类完成的，这个属性却存在于UIControl中。
 
selected
当用户选中控件时，UIControl类会将其selected属性设置为YES。子类有时使用这个属性来让控件选择自身，或者来表现不同的行为方式。
 
contentVerticalAlignment
控件如何在垂直方向上布置自身的内容。默认是将内容顶端对其，对于文本字段，可能会改成UIControlContentVerticalAlignmentCenter。对于这个字段，可以使用下列诸值：
 
1.UIControlContentVerticalAlignmentCenter  
2.UIControlContentVerticalAlignmentTop  
3.UIControlContentVerticalAlignmentBottom  
4.UIControlContentVerticalAlignmentFill
 
contentHorizontalAlignment
水平方向
 
1.UIControlContentHorizontalAlignmentCenter  
2.UIControlContentHorizontalAlignmentTop  
3.UIControlContentHorizontalAlignmentBottom  
4.UIControlContentHorizontalAlignmentFill  

<!-- more -->
 
事件通知
UIControl类提供了一个标准机制，来进行事件登记和接收。这令你可以指定你的控件在发生特定事件时，通知代理类的一个方法。如果要注册一个事件，可以使用addTarget方法：
```objc
[ myControl addTarget: myDelegate   action:@selector(myActionmethod:)  forControlEvents:UIControlEventValueChanged ];
```
事件可以用逻辑OR合并在一起，因此可以再一次单独的addTarget调用中指定多个事件。下列事件为基类UIControl所支持，除非另有说明，也适用于所有控件。
 
UIControlEventTouchDown
单点触摸按下事件：用户点触屏幕，或者又有新手指落下的时候。
 
UIControlEventTouchDownRepeat
多点触摸按下事件，点触计数大于1：用户按下第二、三、或第四根手指的时候。
 
UIControlEventTouchDragInside
当一次触摸在控件窗口内拖动时。
 
UIControlEventTouchDragOutside
当一次触摸在控件窗口之外拖动时。
 
UIControlEventTouchDragEnter
当一次触摸从控件窗口之外拖动到内部时。
 
UIControlEventTouchDragExit
当一次触摸从控件窗口内部拖动到外部时。
 
UIControlEventTouchUpInside
所有在控件之内触摸抬起事件。
 
UIControlEventTouchUpOutside
所有在控件之外触摸抬起事件(点触必须开始与控件内部才会发送通知)。
 
UIControlEventTouchCancel
所有触摸取消事件，即一次触摸因为放上了太多手指而被取消，或者被上锁或者电话呼叫打断。
 
UIControlEventTouchChanged
当控件的值发生改变时，发送通知。用于滑块、分段控件、以及其他取值的控件。你可以配置滑块控件何时发送通知，在滑块被放下时发送，或者在被拖动时发送。
 
UIControlEventEditingDidBegin
当文本控件中开始编辑时发送通知。
 
UIControlEventEditingChanged
当文本控件中的文本被改变时发送通知。
 
UIControlEventEditingDidEnd
当文本控件中编辑结束时发送通知。
 
UIControlEventEditingDidOnExit
当文本控件内通过按下回车键（或等价行为）结束编辑时，发送通知。
 
UIControlEventAlltouchEvents
通知所有触摸事件。
 
UIControlEventAllEditingEvents
通知所有关于文本编辑的事件。
 
UIControlEventAllEvents
通知所有事件。
 
除了默认事件以外，自定义控件类还可以用0x0F000000到0x0FFFFFFF之间的值，来定义他们自己的时间。
要删除一个或多个事件的相应动作，可以使用UIControl类的removeTarget方法。使用nil值就可以将给定事件目标的所有动作删除：
 
```objc
[ myControl removeTarget:myDelegate   action:nil  forControlEvents:UIControlEventAllEvents];  
```

要取得关于一个控件所有指定动作的列表，可以使用allTargets方法。这个方法返回一个NSSet，其中包含事件的完整列表：
```objc
NSSet* myActions = [myConreol allTargets ];  
```

另外，你还可以用actionsForTarget方法，来获取针对某一特定事件目标的全部动作列表：
```objc
NSArray* myActions = [ myControl actionForTarget:UIControlEventValueChanged ];  
 
如果设计了一个自定义控件类，可以使用sendActionsForControlEvent方法，为基本的UIControl事件或自己的自定义事件发送通知。例如，如果你的控件值正在发生变化，就可以发送相应通知，通过控件的代码可以指定时间目标，这个通知将被传播到这些指定的目标。例：
```objc
[ self sendActionsForControlEvents:UIControlEventValueChanged ]; 
```

当委托类得到事件通知时，他将收到一个指向事件发送者的指针。下面的例子用于处理分段控件的事件，你的动作方法（action method）应遵循类似的处理方式：
```objc
-(void) myAction:(id)sender{  
       UISegmentedControl* control = (UISegmentedControl*)sender;  
       if(control == myControl1){  
        /*查询控件得值*/  
      /*响应myControl1的动作*/  
       }  
}
```
