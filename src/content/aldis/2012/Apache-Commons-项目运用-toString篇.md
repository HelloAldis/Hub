---
title: Apache Commons 项目运用-toString篇
publishDate:  2012-03-29 21:31:39
image: ~/assets/images/aldis/2012/4.png
category: 编程思想
tags: 
  - Apache Commons
  - Java
---

对象的字符串表示  
Object 的 toString 方法的默认实现返回对象的完全限定名称，后面跟上一个 @ 字符，然后是对象的散列码的值。您可能早就明白，这对于区分不同的对象帮助不大。Commons Lang 有一个方便的 ToStringBuilder 类，这个类可帮助构建可读性更强的 toString 结果。  
构建 toString  
您可能已经不止一次编写过 toString 方法 — 我就是这样。这些方法并不复杂，编写起来很难出错。但是，它们也可能令人讨厌。由于您的 Account 对象已经依赖于 Commons Lang 库，让我们看看 ToStringBuilder 的实际效果。  
ToStringBuilder 与我在前面谈到的其他 3 个类相似。您可以创建它的一个实例，附加一些属性，然后调用 toString。就是这样！  
覆盖 toString 方法，添加例 24 中的代码：  
  
例 24. 使用 ToStringBuilder   
```java                     
public String toString() {  
 return new ToStringBuilder(this）。append("id", this.id）。  
  .append("firstName", this.firstName)  
   .append("lastName", this.lastName)  
    .append("emailAddress", this.emailAddress)  
     .append("creationDate", this.creationDate)  
      .toString();  
}  
```

您可以总是利用反射，如例 25 所示：  

<!-- more -->

例 25. 使用 ToStringBuilder 的反射 API  
```java               
public String toString() {  
 return ToStringBuilder.reflectionToString(this);  
}  
```
无论您选择如何使用 ToStringBuilder，调用 toString 总会产生一个可读性更强的 String。例如，看看例 26 中的对象实例：  
  
例 26. 一个惟一的 Account 实例  
```java                      
new Account(10, "Andrew", "Glover", "ajg@me.com", now);  
```

如例 27 所示，输出的可读性很好：  
  
例 27. ToStringBuilder 的输出  
```java
com.acme.app.Account@47858e[  
   id=10,firstName=Andrew,lastName=Glover,emailAddress=ajg@me.com,  
   creationDate=Tue Nov 11 17:20:08 EST 2008]  
```

如果您不喜欢对象的这种 String 表示，Commons Lang 库还有一些 helper 类可帮助定制输出。例如，使用 ToStringBuilder 可以在日志文件中一致地显示对象实例。  