---
title: Objective-C Log中预定义宏使用
publishDate: 2012-12-26 00:28:37
image: ~/assets/images/aldis/2012/18.png
category: 编程思想
tags:
  - 宏
  - Log
  - Objective-C
---

使用NSLog记录日志是很方便的操作，但是有时候也希望能够像C/C++编程一样使用一些预定义的宏，比如获取当前文件名、行号等，在XCode中其实也有这样的功能。
XCode的c预处理器提供了一些标准宏，另外Objective-C语言还提供了隐含的\_cmd参数，可以用来获取当前方法的selector，以及将selector与class转换为字符串的函数。
可以在NSLog中使用这些宏及函数来增强日志功能，能够在c/c++/Objective-C中使用的预处理宏有：

| 宏                  | 格式 | 描述                                          |
| ------------------- | ---- | --------------------------------------------- |
| **func**            | %s   | 当前函数名                                    |
| **LINE**            | %d   | 当前行号                                      |
| **FILE**            | %s   | 当前文件名，包含完整的路径信息                |
| **PRETTY_FUNCTION** | %s   | 与**func**类似，但是函数名中包含了c++类型信息 |

能够在Objective-C中使用的表达式/函数有：

| 函数                                                         | 格式 | 描述                         |
| ------------------------------------------------------------ | ---- | ---------------------------- |
| NSStringFromSelector(\_cmd)                                  | %@   | 返回当前selector名           |
| NSStringFromClass([self class])                              | %@   | 返回当前对象的类名           |
| [[NSString stringWithUTF8String:__FILE__] lastPathComponent] | %@   | 返回当前文件名，不含路径信息 |
| [NSThread callStackSymbols]                                  | %@   | 返回当前调用栈信息           |

注意：Log尽量不要让最终用户可以看到，防止敏感信息泄露。
