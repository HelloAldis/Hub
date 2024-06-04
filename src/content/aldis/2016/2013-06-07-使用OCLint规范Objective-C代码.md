---
title: 使用OCLint规范Objective-C代码
publishDate:  2013-06-07 14:32:20
category: iOS
tags:
  - OCLint
  - Xcode
  - 代码检查工具
---

# OCLint

静态代码检查是通过工具对代码或编译的产物进行一定的检查，从而发现一些简单明显的bug或不规范的地方。它可以帮助我们减少低级的代码错误。上一篇我们讲了Analyze，这一篇我们讲OCLint。

OCLint类似我们在做Java开发的java hint，和前段开始的ESLint，jshint，这些静态代码检查工具。使用起来效果还不错可以规范整个团队的代码，提高开发质量。

**保证每次提交的代码可以lint通过是一个合格程序员基本素养**

## 安装OCLint
1. 按照Home brew。控制台运行`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. Home brew安装OCLint
```bash
brew tap oclint/formulae
brew install oclint
```
3. 如果通过Home brew安装不成功可以直接下载darwin https://github.com/oclint/oclint/releases
然后为`.bashrc`或`.bash_profile`添加下面
```bash
OCLINT_HOME=/path/to/oclint
export PATH=$OCLINT_HOME/bin:$PATH
```

<!-- more -->

## 为项目田间OCLint的配置文件.oclint
项目根目录创建一个.oclint，这里提供了一个通用模版
```yaml
# 禁用哪些规则
disable-rules:
  - UnusedMethodParameter
  - UselessParentheses
  - UnnecessaryDefaultStatement

# 检查标准配置
rule-configurations:
  - key: LONG_LINE
    value: 120
  - key: LONG_VARIABLE_NAME
    value: 30
  - key: MINIMUM_CASES_IN_SWITCH
    value: 1

# 报表的类型
report-type: html
# 报表文件
output: oclint.html

# 设置P1，P2，P3 问题最大个数
max-priority-1: 0
max-priority-2: 10
max-priority-3: 20
```
如果对于某些项目来说又些不合适的，开发人员可以配置自己项目的.oclint文件。

## 为项目创建一个lint Shell脚本
项目根目录创建一个lint.sh，这里提供了一个通用模版。开发者需要更具自己项目修改下面2点
* xcodebuild编译语句，指定自己的project, scheme等
* oclint-json-compilation-database 命令里指定自己项目的排除文件

```bash
# 删除已经存在了的静态代码检查文件
rm compile_commands.json
rm xcodebuild.log
rm oclint.html

# 编译项目，将日志写入xcodebuild.log
xcodebuild -workspace MobilexApart.xcworkspace -configuration "Release" -scheme "Cross" -sdk iphoneos BUILD_DIR="./build" clean build | tee xcodebuild.log

# 将xcodebuild日志转换为oclint文件列表
oclint-xcodebuild

# 扫描oclint文件列表生成报表，-e 可以指定排除那些文件例如第三方文件
oclint-json-compilation-database -v -e AFNetworking -e ISRDataHelper.m -e ShareSDK -e IflyMSC -e SSZipArchive -e iFlyLivenessDetectionLib -e Library/Developer/Xcode -e FMDB -e IATConfig

# 删除不必要的中间文件
rm compile_commands.json
rm xcodebuild.log

#打开报表
open ./oclint.html
```
生成的报表类似：
![](~/assets/images/aldis/2016/2013-06-07/oclint-result.png)

## 更多关于OCLint的知识了参考
* [OCLint官网](http://docs.oclint.org/en/stable/index.html)