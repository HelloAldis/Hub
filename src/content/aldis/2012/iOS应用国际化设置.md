---
title: iOS应用国际化设置
publishDate: 2012-11-15 00:07:01
category: 编程思想
image: ~/assets/images/aldis/2012/2012-11-15/1.png
tags:
  - i18n
  - iOS
---

## 本地化应用程序中的字符串

1. 创建字符串文件
   在Supporting Files包下新建一个String File。步骤如下：

![](~/assets/images/aldis/2012/2012-11-15/1.png)

注意：将文件命名为Localizable.strings

1. 添加国际化文件。
   选中Localizable.strings文件，打开File Inspector,添加想要显示的语言的语种。如英语--en,简体中文--Chinese(zh-Hans),繁体中文-- Chinese(zh-Hans)等。

1. 编写国际化文件内容
   格式为"Key" = "Value";注意要带引号和结尾的分好。引号和分号均是英文拼写。
   如在英文包中可以这样写："hello" = "Hello Word!"; 在中文报中可以这样写："hello" = "偶其实还是很漂亮的！";
1. 使用国际化语言
   在需要使用的地方用 NSLocalizedString(@"Key",comment);即可。
   如下：
   self.label.text = NSLocalizedString(@"hello", @"can''t find resource file!");
   如果找不到对应的国际化语言文件，则显示默认的开发语言。一般都是英文的, 接下来运行既可以。

1. 如果想本地化storyboard的话步骤相同。只是多了一个某个语种的storyboard，重新做一下就行了。

<!-- more -->

## 本地化应用程序配置文件info.plist，例如应用的名称

创建应用程序的时候通常xcode会自动产生一个InfoPlist.strings文件，他可以用于本地化info.plist中的一些文字配置内容。例如可以本地化info.plist中写应用程序的名称。同样是添加语种文件，如简体中文和英文。方法同上。
展开InfoPlist.strings文件左侧的三角符号可以看到有两个文件分别是代表语种文件中文和英文的。在文件中写如下代码：
CFBundleDisplayName = "国际化语言"; //CFBundleDisplayName应用程序完整名
如果应用程序名过长，会自动截断，可以用简写名：CFBoundleName来设置。

在网上看到好多都人都写到还要更改配置xxxx-Info.plist文件，说需要添加一个属性：Application hasl localized display name 并将其设置为YES.但是我没对编辑info.plist文件，照样可以正常显示。也就是说不用添加该属性也是可以的。
结构如下图：
![](~/assets/images/aldis/2012/2012-11-15/2.png)
