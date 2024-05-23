---
title: Java String 内存机制与常量池
publishDate:  2009-10-03 15:46:00
category: Java
tags: 
  - String
---

```java
  String s1 = "JavaString";  
  String s2 = "JavaString";  
```

上述的代码创建String 实例步骤

1. 查看常量池中是否存在内容为 “JavaString” 的相同字符串对象
2. 若没有，就在常量池中创建一个包含该内容的字符串对象，并让引用变量指向该对象
3. 若已经存在，则让字符串引用直接指向常量池中对象

这时可以用 == 来判断 字符串是否相同

```java
  String s1 = "JavaString";  
  String s3 = new String("JavaString");  
```

若是这种方式创建String实例 步骤为

1. 首先在堆中（不是常量池）创建一个指定的对象，并将字符串引用指向该对象
2. 去字符串常量池中查看，是否包含此内容的对象
3. 若有，则将new出来的字符对象与字符串常量池中的对象联系起来
4. 若没有，则在字符串常量池中创建一个包含该内容的对象，并将堆栈中的对象与之联系起来

这时不能简单的用 == 来判断是否相同 要用equals方法
equals其实是调用intern(）方法 来比较
intern 方法可以返回该字符串在常量池中的对象的引用
所以如果系统要实现快速的字符串匹配 这写字符串又是经常不变的
可以用 `String  str = new("JavaString").intern()`;
来将常量池对象返回 提高比较效率