---
title: Apache Commons 项目运用-hashCode篇
publishDate:  2012-03-27 00:28:37
image: ~/assets/images/aldis/2012/3.png
category: 编程思想
tags: 
  - Apache Commons
  - Java
---

## 对象的散列  
实现一个适当的 `equals` 方法后别忘了还要覆盖 `hashCode`。本节展示如何操作。  

## 构建 hashCode  
`hashCode` 方法也有一个契约，但是不像 `equals` 的契约那样正式。然而，重要的是要理解它。和 `equals` 一样，结果必须一致。对于对象 `foo` 和 `bar`，如果 `foo.equals(bar)` 返回 `true`，那么 `foo` 和 `bar` 的 `hashCode` 方法必须返回相同的值。如果 `foo` 和 `bar` 不相等，则不要求返回不同的散列码。但是，Javadocs 提到，如果这些对象有不同的结果，那么通常会运行得更好一些。  
还需注意，和之前一样，如果没有覆盖它，hashCode 会返回一个看似随机的整数。这是因为底层平台通常会将基对象的地址位置转换成一个整数；虽然如此，但文档中提到这并不是必需的，因此可以改变。无论如何，如果最终覆盖 equals 方法，那么也有必要覆盖 hashCode 方法。（记住，虽然 hashCode 方法看上去是开箱即用的，但是 Joshua Bloch 的 Effective Java 花了 6 页的篇幅讨论如何适当地实现 hashCode 方法）。  
Commons Lang 库提供一个 `HashCodeBuilder` 类，这个类与 EqualsBuilder 几乎是一样的。但是，它不是比较两个属性，而是附加一个属性，以生成遵从我刚才描述的契约的一个整数。  
在您的 `Account` 对象中，覆盖 `hashCode` 方法，如例 9 所示：  
  
例 9. 默认的 hashCode 方法  
```java                      
public int hashCode() {  
 return 0;  
} 
```
  
由于生成一个散列码时没有什么可以比较的，因此使用 `HashCodeBuilder` 只需一行代码。重要的是正确地初始化 `HashCodeBuilder`。构造函数带有两个 int，它使用这两个参数来创建一个散列码。这两个 int 必须是奇数。append 方法带有一个属性，因此，和之前一样，这些方法可以链接起来。最后可以通过调用 toHashCode 方法完成这个链。  
根据这些信息，您可以像例 10 中那样实现一个 hashCode 方法：  
  
<!-- more -->

例 10. 用 HashCodeBuilder 实现一个 hashCode 方法  
```java                
public int hashCode() {  
 return new HashCodeBuilder(11, 21）。append(this.id)  
  .append(this.firstName)  
   .append(this.lastName)  
    .append(this.emailAddress)  
     .append(this.creationDate)  
      .toHashCode();  
}
```
  
注意，我在构造函数中传入了一个 11 和一个 21。这些完全是为该对象随机选择的奇数。打开前面的 AccountTest（参见 例 2）。添加一个快速检查，以验证如下契约：对于这两个对象，如果 equals 返回 true，那么 hashCode 应该返回相同的数字。例 11 显示了修改后的测试：  
  
例 11. 验证 hashCode 关于两个相等对象的契约  
```java                        
import org.junit.Test;  
import org.junit.Assert;  
import com.acme.app.Account;  
  
import java.util.Date;  
  
public class AccountTest {  
 @Test  
 public void verifyAccountEquals(){  
  Date now = new Date();  
  Account acct1 = new Account(1, "Andrew", "Glover", "ajg@me.com", now);  
  Account acct2 = new Account(1, "Andrew", "Glover", "ajg@me.com", now);  
  
  Assert.assertTrue(acct1.equals(acct2));  
  Assert.assertEquals(acct1.hashCode(）， acct2.hashCode());  
 }  
}  
``` 

在例 11 中，我验证了两个相等的对象具有相同的散列码。接下来，在例 12 中，我还验证两个不同的 对象具有不同的散列码：  
  
例 12. 验证 hashCode 关于两个不同的对象的契约  
```java                      
@Test  
public void verifyAccountDifferentHashCodes(){  
 Date now = new Date();  
 Account acct1 = new Account(1, "John", "Smith", "john@smith.com", now);  
 Account acct2 = new Account(2, "Andrew", "Glover", "ajg@me.com", now);  
  
 Assert.assertFalse(acct1.equals(acct2));  
 Assert.assertTrue(acct1.hashCode() != acct2.hashCode());  
}  
```

如果您出于好奇想自己编写一个 `hashCode` 方法，应该怎么做呢？记住 `hashCode` 契约，您可以编写如例 13 所示的代码：  
  
例 13. 实现您自己的 `hashCode`   
```java                     
public int hashCode() {  
 int result;  
 result = (int) (id ^ (id >>> 32));  
 result = 31 * result + (firstName != null ? firstName.hashCode() : 0);  
 result = 31 * result + (lastName != null ? lastName.hashCode() : 0);  
 result = 31 * result + (emailAddress != null ? emailAddress.hashCode() : 0);  
 result = 31 * result + (creationDate != null ? creationDate.hashCode() : 0);  
 return result;  
}  
```

不用说，这段代码也可以作为有效的 `hashCode` 方法，这两个 `hashCode` 方法您更愿意维护哪一个？哪一个更易于理解？还要注意，例 13 中如何利用三元操作符语句来避免大量的条件逻辑。您可能会想，Commons Lang 的 `HashCodeBuilder` 也许可以做类似的事情 — 但更好的是 Commons Lang 的开发人员在维护和测试它。  
和 EqualsBuilder 一样，`HashCodeBuilder` 有另一个利用反射的 API。如果使用该 API，就不需要手动地用 append 方法添加基对象的每个属性，这样可以得到如例 14 所示的一个 `hashCode` 方法：  
  
例 14. 使用 `HashCodeBuilder` 的反射 API  
```java                     
public int hashCode() {  
 return HashCodeBuilder.reflectionHashCode(this);  
}  
```

和之前一样，由于这个方法在幕后应用 Java 反射，因此当进行安全性调整时，可能破坏该方法的功能，而且性能下降很多。