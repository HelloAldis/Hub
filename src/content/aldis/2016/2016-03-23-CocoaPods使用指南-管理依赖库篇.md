---
title: CocoaPods使用指南-管理依赖库篇
publishDate:  2016-03-23 16:21:23
category: iOS
tags:
  - CocoaPods
  - Podfile
  - Pod
  - 依赖管理
---

iOS开发的今天，我们讲究代码的共享和开发效率，比如使用著名JSONKit，AFNetworking等等。手动的去管理这些第三方依赖显然是一件很笨且低效的事情，于是有了CocoaPods。
CocoaPods可以帮助大家分享自己写的库，开发者也可以通过CocoaPods方便的集成他人分享的库。
可以减少重复劳动，提高代码的重用性以及模块化的思想来提高整个项目的可维护性。

CocoaPods是最主流最常用的iOS开发库依赖管理工具，绝大部分第三方库都会提供CocoaPods方式安装。

这篇文章主要包含如何安装CocoaPods、使用CocoaPods、Podfile文件详解，主要是为了帮助新手了解如何使用CocoaPods来有效正确的管理依赖。

<!-- toc -->

<!-- more -->

# 安装CocoaPods

CocoaPods是由ruby编写的，MAC电脑默认安装了ruby和gem。

## 使用gem安装CocoaPods
```bash
sudo gem install cocoapods
```

## 更新CocoaPods
更新CocoaPods非常简单，相当于重新安装一遍
```bash
sudo gem install cocoapods
```

## 使用淘宝的gem源来安装CocoaPods
如果你安装CocoaPods过程非常缓慢可以尝试使用淘宝的gem源来安装

```bash
#去除默认gem源
gem sources --remove https://rubygems.org/
#添加淘宝gem源
gem sources -a http://ruby.taobao.org/
#查看源修改是否成功
gem sources -l
sudo gem install cocoapods
```

# 入门使用CocoaPods

在你的Xcode工程文件xcodeproj的同级目录下运行
```bash
pod init
```
CocoaPods会自动扫描工程创建一个`Podfile`文件

在对应的traget下添加
```ruby
target 'MyApp' do
  pod 'AFNetworking', '~> 3.0'
end
```
在`Podfile`的目录下，运行命令
```bash
pod install
```
这样就会生成一个xcode workspace，打开这个workspace会发现为我们项目添加了AFNetworking

## 在已经存在的workspace上使用CocoaPods
CocoaPods默认会自己创建一个workspace来管理项目工程和Pod依赖，如果想要在已经存在的workspace
基础上使用CocoaPods，可以`Podfile`文件里指定要集成的`.xcworkspace`。例如：

```ruby
workspace 'MyWorkspace'
```

## pod install vs pod update
很多用了CocoaPods一段时间的人都没搞明白`install`和`update`的使用场景。以为只有第一次使用时用`pod install`，之后都适用
`pod update` 其实并不是这样的

* pod install：用来安装新的依赖或者删除依赖。当你编辑好`Podfile`第一次运行`pod install`，这算一个典型的安装场景。当你后续开发
中又往`Podfile`文件里添加了新依赖，运行`pod install`会把新依赖加入进来。当你在`Podfile`文件里删除了依赖，运行`pod install`
会把依赖从workspace中去删除掉。
* pod update：只有当你需要更新依赖的版本时才运行`pod update`

## 更新依赖的版本
首先我们要知道怎样去检查项目中已经过期的的依赖版本，使用如下命令查看过期版本
```bash
pod outdated
```
然后使用如下命令升级某个依赖
```bash
pod update PODNAME
```

## Podfile.lock
CocoaPods会生成一个`Podfile.lock`文件用来锁定使用的依赖的版本，让整个团队使用同版本的依赖。
所以开发者不光要把`Podfile.lock`提交到代码仓库，也要提交`Podfile.lock`。


# Podfile配置详解

Podfile是用来描述工程需要引入哪些Pod库

## Pod
指定使用最新版本的Pod库
```ruby
pod 'SSZipArchive'
```

指定使用某个固定版本的Pod库
```ruby
pod 'Objection', '0.9'
```

还可以使用如下规则指定版本
* = 0.1 版本0.1
* \> 0.1 任意高于0.1的版本
* \>= 0.1 任意高于0.1的版本和版本0.1
* < 0.1 任意低于0.1的版本
* <= 0.1 任意低于0.1的版本和版本0.1
* ~> 0.1.2 等于 >=0.1.2 且 < 0.2
* ~> 0.1 等于 >=0.1 且 < 1.0

## Build configurations
默认情况下Pod库是安装到所有Build configurations，如果只需要的话可以只安装到指定Build configurations
```ruby
pod 'PonyDebugger', :configurations => ['Debug', 'Beta']
```

## Subspecs
当使用Pod库名安装时，默认是安装所有subspecs的，你也可以指定安装某个subspec
```ruby
pod 'QueryKit/Attribute'
```

## 使用本地Pod
如果你正在开发一个Pod，而在使用的Project去指定它
```ruby
pod 'AFNetworking', :path => '~/Documents/AFNetworking'
```

## 直接使用远端代码仓库的Pod
默认使用master分支
```ruby
pod 'AFNetworking', :git => 'https://github.com/gowalla/AFNetworking.git'
```

指定分支
```ruby
pod 'AFNetworking', :git => 'https://github.com/gowalla/AFNetworking.git', :branch => 'dev'
```

指定tag
```ruby
pod 'AFNetworking', :git => 'https://github.com/gowalla/AFNetworking.git', :tag => '0.7.0'
```

指定某个commit
```ruby
pod 'AFNetworking', :git => 'https://github.com/gowalla/AFNetworking.git', :commit => '082f8319af'
```

## 直接使用某个podspec
```ruby
pod 'JSONKit', :podspec => 'https://example.com/JSONKit.podspec'
```

## 为不同Xcode工程中的不同target指定不同的依赖
```ruby
target 'ShowsApp' do
  pod 'ShowsKit'

  # Has its own copy of ShowsKit + ShowTVAuth
  target 'ShowsTV' do
    pod 'ShowTVAuth'
  end

  # Has its own copy of Specta + Expecta
  # and has access to ShowsKit via the app
  # that the test target is bundled into

  target 'ShowsTests' do
    inherit! :search_paths
    pod 'Specta'
    pod 'Expecta'
  end
end
```
* target ShowsApp 引入了ShowsKit
* target ShowsTV 引入了ShowsKit和ShowTVAuth
* target ShowsTV 引入了ShowsKit和Specta，Expecta