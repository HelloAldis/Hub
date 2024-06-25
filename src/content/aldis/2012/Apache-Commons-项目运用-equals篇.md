---
title: Apache Commons 项目运用-equals篇
publishDate: 2012-03-27 00:28:37
image: ~/assets/images/aldis/2012/2.png
category: 编程思想
tags:
  - Apache Commons
  - Java
---

Commons Lang 是 Apache Commons 的一个组件，后者是一个宏大的项目，其中的很多子项目涉及到 Java? 语言软件开发的不同的方面。Commons Lang 扩展了标准 java.lang API，增加了字符串操作方法、基本数值方法、对象反射、创建和串行化以及System 属性。它还包含一个可继承的 enum 类型、对多种嵌套的 Exception 类型的支持、对 java.util.Date 的增强以及用于构建方法的实用程序，例如 hashCode、toString 和 equals。我发现 Commons Lang 对应用程序的很多方面都很有帮助。通过使用 Commons Lang，您将编写更少的代码，从而可以更快地交付缺陷更少的、生产就绪的软件。本教程从基本概念上逐步指导您如何使用一些不同的 Commons Lang 类，并利用它们的代码，从而不必自己编写那么多的代码。

对象契约  
Commons Lang 库带有一套方便的类，它们统称为 builders。在本节中，您将学习如何使用其中一个类来构建 java.lang.Object equals 方法，以帮助减少编写的代码数量。

方法实现的挑战  
所有 Java 类都自动继承 java.lang.Object。您可能已经知道，Object 类有 3 个方法通常需要被覆盖：

- `equals`
- `hashCode`
- `toString`  
  equals 和 hashCode 方法的特殊之处在于，Java 平台的其他方面，例如集合甚至是持久性框架（包括 Hibernate），要依赖于这两个方法的正确实现。  
  如果您没有实现过 equals 和 hashCode，那么您可能会认为这很简单 — 但是您错了。Joshua Bloch 在 Effective Java 一书（参见 参考资料）以超过 10 页的篇幅论述了实现 equals 方法的特殊之处。如果最终实现 equals 方法，那么还需要实现 hashCode 方法（因为 equals 的契约表明，两个相等的对象必须有相同的散列码）。Bloch 又以 6 页的篇幅解释了 hashCode 方法。也就是说，至少有 16 页关于适当实现两个看上去很简单的方法的详细信息。  
  实现 equals 方法的挑战在于该方法必须遵从的契约。equals 必须：
- 具有反射性： 对于某个对象，foo（不为 null），foo.equals(foo) 必须返回 true。
- 具有对称性： 对于对象 foo 和 bar（不为 null），如果 foo.equals(bar) 返回 true，那么 bar.equals(foo) 也必须返回 true。
- 具有传递性： 对于对象 foo、bar 和 baz（不为 null），如果 foo.equals(bar) 为 true 且 bar.equals(baz) 为 true，那么 foo.equals(baz) 必须也返回 true。
- 具有一致性： 对于对象 foo 和 bar，如果 foo.equals(bar) 返回 true，那么无论 equals 方法被调用多少次，equals 方法总是应该返回 true（假设两个对象都没有实际的变化）。

<!-- more -->

能够适当地处理 null：  
foo.equals(null) 应该返回 false。  
读到这里或者研读过 Effective Java 之后，您将面临在 Account 对象上适当地实现 equals 方法的挑战。但是请记住前面我就生产率和积极性所说的话。  
假设您要为企业构建一个在线 Web 应用程序，这个应用程序越早投入使用，您的企业就能越早赚钱。在此情况下，您还会花几个小时（或者数天）来适当地实现和测试 对象上的 equals 契约吗？— 还是重用其他人的代码？

构建 equals  
当实现 equals 方法时，Commons Lang EqualsBuilder 比较有用。这个类很容易理解。实际上，您需要知道它的两个方法：append 和 isEquals。append 方法带有两个属性：一个是本身对象的属性，一个是相比较的对象的同一个属性。由于 append 方法返回 EqualsBuilder 的一个实例，因此可以将随后的调用链接起来，比较一个对象所有必需的属性。最后，可以通过调用 isEquals 方法完成这个链。  
例如，像例 1 中那样创建一个 Account 对象：

例 1. 一个简单的 Account 对象

```java
import org.apache.commons.lang.builder.CompareToBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import java.util.Date;

public class Account implements Comparable {
 private long id;
 private String firstName;
 private String lastName;
 private String emailAddress;
 private Date creationDate;

 public Account(long id, String firstName, String lastName,
   String emailAddress, Date creationDate) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.emailAddress = emailAddress;
  this.creationDate = creationDate;
 }


 public long getId() {
  return id;
 }


 public String getFirstName() {
  return firstName;
 }


 public String getLastName() {
  return lastName;
 }


 public String getEmailAddress() {
  return emailAddress;
 }


 public Date getCreationDate() {
  return creationDate;
 }
}
```

我们需要的 Account 对象很简单，而且是独立的。此时，您可以运行一个快速测试，如例 2 所示，看看是否可以信赖 equals 的默认实现：

例2. 测试 Account 对象的默认 equals 方法

```java
import org.junit.Test;
import org.junit.Assert;
import com.acme.app.Person;

import java.util.Date;

public class AccountTest {
 @Test
 public void verifyEquals(){
  Date now = new Date();
  Account acct1 = new Account(1, "Andrew", "Glover", "ajg@me.com", now);
  Account acct2 = new Account(1, "Andrew", "Glover", "ajg@me.com", now);


  Assert.assertTrue(acct1.equals(acct2));
 }
}
```

在例 2 中可以看到，我创建了两个相同的 Account 对象，每个对象有它自己的引用（因此 == 将返回 false）。当我想看看它们是否相等时，JUnit 友好地通知我返回的是 false。  
记住，Java 平台的许多方面都可以利用 equals 方法，包括 Java 语言的集合类。所以，有必要为这个方法实现一个有效的版本。因此，我将覆盖 equals 方法。  
记住，equals 契约不适用于 null 对象。而且，两种不同类型的对象（例如 Account 和 Person）不能相等。最后，在 Java 代码中，equals 方法显然有别于 == 操作符（还记得吗，如果两个对象有相同 的引用，后者将返回 true；因此，那两个对象必定相等）。两个对象可以相等（并且 equals 返回 true），但是不使用相同的引用。  
因此，可以像例 3 中这样编写 equals 方法的第一个方面：

例 3. equals 中的快速条件

```java
if (this == obj) {
 return true;
}
if (obj == null || this.getClass() != obj.getClass()) {
 return false;
}
```

在例 3 中，我创建了两个条件，在比较基对象和传入的 obj 参数各自的属性之前，应该验证这两个条件。  
接下来，由于 equals 方法带有 Object 类型的参数，所以可以将 obj 参数转换为 Account，如例 4 所示：

例 4. 转换 obj 参数

```java
Account account = (Account) obj;
```

假设 equals 逻辑到此为止，接下来可以利用 EqualsBuilder 对象。记住，这个对象被设计为使用 append 方法将基对象（this）的类似属性和传入 equals 方法的类型进行比较。由于这些方法可以链接起来，最终可以以 isEquals 方法完成这个链，该方法返回 true 或 false。因此，实际上只需编写一行代码，如例 5 所示：

例 5. 重用 EqualsBuilder

```java
return new EqualsBuilder(）。append(this.id, account.id)
  .append(this.firstName, account.firstName)
   .append(this.lastName, account.lastName)
    .append(this.emailAddress, account.emailAddress)
     .append(this.creationDate, account.creationDate)
      .isEquals();
```

合并之后，可以产生如例 6 所示的 equals 方法：

例 6. 完整的 equals

````java
public boolean equals(Object obj) {
 if (this == obj) {
  return true;
 }
 if (obj == null || this.getClass() != obj.getClass()) {
  return false;
 }

 Account account = (Account) obj;

 return new EqualsBuilder(）。append(this.id, account.id)
  .append(this.firstName, account.firstName)
   .append(this.lastName, account.lastName)
    .append(this.emailAddress, account.emailAddress)
     .append(this.creationDate, account.creationDate)
      .isEquals();
}
```java

现在，重新运行之前失败的测试（参见 例 2）。应该会成功。
您没有花任何时间来编写自己的 equals。如果您仍然想知道自己如何编写一个适当的 equals 方法，那么只需知道这涉及到很多的条件。例如，例 7 中是一个非 EqualsBuilder 实现的 equals 方法的一个小片段，它比较 creationDate 属性：

例 7. 您自己的 equals 方法的一个片段
```java
if (creationDate != null ? !creationDate.equals(
   person.creationDate) : person.creationDate != null){
 return false;
}
````

注意，在这种情况下，虽然可以使用一个三元操作符（ternary）使代码更精确，但是代码更加费解。关键是我本可以编写一系列的条件来比较每个对象的属性的不同方面，或者可以利用 EqualsBuilder（它也会做相同的事情）。您会选择哪种方法？  
还需注意，如果您真的想优化自己的 equals 方法，并编写尽可能少的代码（这也意味着维护更少的代码），那么可以利用反射的威力，编写例 8 中的代码：

例 8. 使用 EqualsBuilder 的反射 API

```java
public boolean equals(Object obj) {
 return EqualsBuilder.reflectionEquals(this, obj);
}
```

这对于减少代码是否有帮助？  
例 8 的确减少了代码。但是，EqualsBuilder 必须关闭基对象中的访问控制（以便比较 private 字段）。如果在配置 VM 时考虑了安全性，那么这可能失败。而且，例 8 中使用的反射会影响 equals 方法的运行时性能。但是，从好的方面考虑，如果使用反射 API，当增加新的属性时，就不需要更新 equals 方法（如果不使用反射，则需要更新）。  
通过 EqualsBuilder，可以利用重用的威力。它为您提供两种方法来实现 equals 方法。选择哪一种方法由具体情况决定。单行风格比较简单，但是您现在已经理解，这样做并非没有风险。
