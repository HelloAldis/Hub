---
title: Apache Commons 项目运用-Comparable篇
publishDate: 2012-03-30 20:46:58
image: ~/assets/images/aldis/2012/1.png
category: 编程思想
tags:
  - Java
  - Apache Commons
---

相对的 Comparable  
另一个有趣的方法也有一个相当正式的契约，那就是 Comparable 接口的 compareTo 方法。如果要控制特定的对象如何排序，那么这个接口非常重要。在本节中，您将学习如何利用 Commons Lang 的 CompareToBuilder。  
排序输出  
在过去的 Java 编程中您可能已经注意到，对于对象如何按一定的顺序排序有默认的机制，例如 Collections 类的 sort 方法。  
例如，例 15 中的 Collection 未经排序，如果不对它做任何事情，那么这个顺序将一直维持下去：

例 15. 一个 String 列表

```java
ArrayList<String> list = new ArrayList<String>();
list.add("Megan");
list.add("Zeek");
list.add("Andy");
list.add("Michelle");
```

然而，如果像例 16 中那样将 list 传递给 Collections 的 sort 方法，那么将应用默认的排序，在这里是按字母顺序。例 16 将例 15 中的名称列表按字母顺序排序，并打印出排序后的结果：

例 16. 对 String 列表排序

```java
Collections.sort(list);

for(String value : list){
 System.out.println("sorted is " + value);
}
```

例 17 显示输出：

例 17. 排序后的 String 列表

```java
sorted is Andy
sorted is Megan
sorted is Michelle
sorted is Zeek
```

<!-- more -->

当然，这样之所以行得通，是因为 Java String 类实现了 Comparable 接口，因此有 compareTo 方法的一个实现，该方法允许按字母顺序排序。实际上，Java 语言中几乎所有的核心类都实现这个接口。  
如果您想允许按不同的方式对一个 Account 集合进行排序 — 例如按 id 或 last name，应该怎么做呢？  
当然，首先必须实现 Comparable 接口，然后实现 compareTo 方法。这个方法实际上只能用于自然排序 — 根据对象的属性对对象排序。因此，compareTo 非常类似于 equals 方法，只是通过它可以将一个集合的 Account 按它们的属性排序，排序的顺序与使用 compareTo 方法处理属性的顺序相同。  
如果阅读用于实现该方法的文档，您将发现，它非常类似于 equals；也就是说，要正确地实现它比较棘手。（Effective Java 花了 4 页的篇幅讨论这个专题）。到现在，您很可能已经想出这样的模式：利用 Commons Lang。  
回页首  
构建 compareTo  
Commons Lang 提供一个 CompareToBuilder 类，它的功能与 EqualsBuilder 几乎一样。它包括一个可链接的 append 方法，最终可以通过 toComparison 方法返回一个 int。  
因此，首先必须修改 Account 类，以实现 Comparable 接口，如例 18 所示：

例 18. 实现 Comparable 接口

```java
public class Account implements Comparable {}
```

接下来，必须实现 compareTo 方法，如例 19 所示：

例 19. compareTo 的默认实现

```java
public int compareTo(Object obj) {
 return 0;
}
```

实现这个方法需要分两步。首先，必须将传入的参数的类型转换为需要的类型（在这里是 Account）。然后，利用 CompareToBuilder 比较对象的属性。Commons Lang 文档表明，应该像 equals 方法中那样比较相同的属性；因此，Account 对象的 compareTo 方法看上去应该如例 20 所示：

例 20. 使用 CompareToBuilder

```java
public int compareTo(Object obj) {
 Account account = (Account) obj;
 return new CompareToBuilder(）。append(this.id, account.id)
  .append(this.firstName, account.firstName)
   .append(this.lastName, account.lastName)
    .append(this.emailAddress, account.emailAddress)
     .append(this.creationDate, account.creationDate)
      .toComparison();
}
```

别忘了，如果您真的想减少自己编写的代码，那么可以总是利用反射风格的 CompareToBuilder API，如例 21 所示：

例 21. 使用 CompareToBuilder 的反射 API

```java
public int compareTo(Object obj) {
 return CompareToBuilder.reflectionCompare(this, obj);
}
```

现在，如果需要依赖用于一个 Account 集合的自然排序，那么可以利用 Collections.sort，如例 22 所示：

例 22. 为一个可比较的 Account 的列表排序

```java
Date now = new Date();
ArrayList<Account> list = new ArrayList<Account>();
list.add(new Account(41, "Amy", "Glover", "ajg@me.com", now));
list.add(new Account(10, "Andrew", "Glover", "ajg@me.com", now));
list.add(new Account(1, "Andrew", "Blover", "ajg@me.com", new Date()));
list.add(new Account(2, "Andrew", "Smith", "b@bb.com", now));
list.add(new Account(0, "Andrew", "Glover", "z@zell.com", new Date()));

Collections.sort(list);

for(Account acct : list){
 System.out.println(acct);
}
```

这段代码先后根据 id、first name 和 last name 等属性以自然顺序输出对象。因此，排序后的顺序如例 23 所示：

例 23. 排序后的 Account 列表

```java
new Account(0, "Andrew", "Glover", "z@zell.com", new Date())
new Account(1, "Andrew", "Blover", "ajg@me.com", new Date())
new Account(2, "Andrew", "Smith", "b@bb.com", now)
new Account(10, "Andrew", "Glover", "ajg@me.com", now)
new Account(41, "Amy", "Glover", "ajg@me.com", now)
```

这种输出的作用则是另一回事。在下一节中，您将看到 Commons Lang 如何帮助您构建可读性更强的结果。
