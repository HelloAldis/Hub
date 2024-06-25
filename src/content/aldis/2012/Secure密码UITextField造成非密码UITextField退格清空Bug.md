---
title: iOS 6 Secure密码UITextField造成非密码UITextField退格清空Bug
publishDate: 2012-10-16 01:19:54
image: ~/assets/images/aldis/2012/23.png
category: 编程思想
tags:
  - UITextField
  - Bug
---

今天客户报了一个应用在iOS6上的bug，比如有一个secureTextEntry为Yes的UITextField和  
一个普通的UITextField，重现步骤：

1. 点击普通的UITextField输入类容，
2. 点击密码UITextField输入内容，
3. 点击普通的UITextField重新获得焦点，
4. 接着点击键盘上的退格键，  
   结果：这时会发现普通的UITextField被清空了。

经过研究查找发现这个bug只在iOS6上有之前的没有，比较诡异。  
然后拿iOS6的ipad做了实验，发现settings里的iCloud里的apple ID和密码输入同样有这个 bug，个人觉得这应该是iOS6的一个系统小bug，也许和iOS6secureTextEntry为Yes的UITextField的这个新特性有关：  
如果点击一个没有获得焦点有内容的secureTextEntry为Yes的UITextField，然后点击键盘上的退格键，这样会清空这个UITextField。

这个新特性本来是为了提高用户体验，但却造成了一个fix起来比较纠结的bug。 为了修复此问题，只能去除UITextField的secureTextEntry为Yes属性，但UITextField又要有掩码的效果，所以只能写一个UITextField子类，添加一个realValue属性来记录真实的值，重写setText/text方法来实现替换，但是密码字段的掩码效果是有几秒延时的（输入的类容大概一两秒后变成圆点）需要自己实现，所以修复起来比较纠结。

目前还没有找到简单好的方法来fix这个问题，希望能看到好的解决方法或者我思路错了这其实不是一个bug。记录一下，有待研究。
