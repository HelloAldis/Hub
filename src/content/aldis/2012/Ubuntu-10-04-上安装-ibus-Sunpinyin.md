---
title: Ubuntu 10.04 上安装 ibus Sunpinyin
publishDate: 2012-02-03 00:29:22
image: ~/assets/images/aldis/2012/26.png
category: 编程思想
tags:
  - Ubuntu
  - Linux
---

Sunpinyin 是Linux 上一款非常好用的中文拼音输入法。  
Ubuntu 10.04 上方便快速的安装Sunpinyin。  
添加ibus ppa当前的库中

```bash
$ sudo add-apt-repository ppa:ibus-dev/ibus-1.3-lucid
```

更新下库

```bash
$ sudo apt-get update
```

如果没有ibus 先安装，有就跳过

```bash
$ sudo apt-get install ibus
```

安装sunpinyin

```bash
$ sudo apt-get install ibus-sunpinyin
```

安装完后 打开ibus 设置 System(系统)－>Perference (首选项)－>ibus  
点击输入法下拉选择汉语中的Sunpinyin 点击添加，通过向上排序将Sunpinyin设置为默认输入法， OK。  
Ctrl+space切换下输入法体验下Sunpinyin吧。
