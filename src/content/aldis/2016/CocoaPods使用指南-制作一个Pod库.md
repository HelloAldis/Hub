---
title: CocoaPods使用指南-制作一个Pod库
publishDate:  2016-04-03 18:10:00
image: ~/assets/images/aldis/2016/pod-struct.png
category: 编程思想
tags:
  - CocoaPods
  - Objective-C
---

上一篇文章主要讲解的CocoaPods基础知识，这篇文章可以说是CocoaPods的进阶使用，包含如何掌握制作一个Pod库的细节。了解了如何制作自己的CocoaPods可以帮助我们更好的分享公共模块

<!-- toc -->

# 制作Pod库
制作Pod库有两种方法

* 制作Pod库可以使用命令`pod lib create`来提高效率。

## 使用`pod lib create`
运行命令
```ruby
pod lib create MyLib
```
注意
* 可以使用参数`--template-url=URL`来指定其它的模版，默认使用模版https://github.com/CocoaPods/pod-template.git
* 如果报错如如下

<!-- more -->

```bash
/System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:126:in `require': cannot load such file -- colored2 (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:126:in `require'
	from /Users/dwzhan/Documents/ios/Test/Base/Test/setup/TemplateConfigurator.rb:2:in `<top (required)>'
	from ./configure:5:in `require_relative'
	from ./configure:5:in `block in <main>'
	from ./configure:4:in `each'
	from ./configure:4:in `<main>'
```
是缺乏ruby库，可以运行如下命令来安装`colored2`
```ruby
sudo gem install colored2
sudo gem update --system
```

按照提示的步骤，逐步的选择合适选项可以完成一个基本的Pod原型
1. What language do you want to use?? [ Swift / ObjC ]
> 选择库的语言是 Swift 或者 ObjC，
2. Would you like to include a demo application with your library? [ Yes / No ]
> 是否需要一个Demo工程
3. Which testing frameworks will you use? [ Specta / Kiwi / None ]
> 是否需要一个测试框架None的话会使用自带的XCTest
4. Would you like to do view based testing? [ Yes / No ]
> 是否需要基于View的单元测试
5. What is your class prefix?
> 项目里类的前缀

生成的目录结构类似：
```bash
MyLib
├── .travis.yml
├── _Pods.xcproject
├── Example
│   ├── MyLib
│   ├── MyLib.xcodeproj
│   ├── MyLib.xcworkspace
│   ├── Podfile
│   ├── Podfile.lock
│   ├── Pods
│   └── Tests
├── LICENSE
├── MyLib.podspec
├── Pod
│   ├── Assets
│   └── Classes
│     └── RemoveMe.[swift/m]
└── README.md
```
* `.travis.yml` 持续集成`travis-ci`的配置文件
* `_Pods.xcproject` 为了支持`Carthage`的Pod工程链接
* `LICENSE` 默认是MIT，可以自行修改
* `MyLib.podspec` Pod库的podspec文件
* `README.md` 默认的README文件，可以自行修改
* `Pod` 这个文件夹里放Pod库的类
* `Example` 这个文件夹里放Demo和测试需要的的Bundle

CocoaPods会自动打开工程，如图

![](~/assets/images/aldis/2016/pod-struct.png)

1. Pod库的metadata，你可以直接在这里编辑README和Podspec
2. 例子工程如果你的项目有的话
3. 单元测试代码
4. Pod库真实代码存放的地方
5. 依赖的其它库

### 开发Pod库


### Debug Pod库
使用命令`pod lib lint`和`pod spec lint`可以检查项目是否有问题。