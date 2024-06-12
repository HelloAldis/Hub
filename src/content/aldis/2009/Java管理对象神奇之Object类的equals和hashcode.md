---
title: Java管理对象神奇之Object类的equals和hashcode
publishDate:  2009-10-05 12:03:00
image: ~/assets/images/aldis/2009/4.png
category: 编程思想
tags:
  - equals
  - hashCode
  - Java
---

Java具有强大的对象的管理器
关于所有类的超类 Object类具有toString，equals，hashcode等重要的原始方法
对于自己定义的类 重写toString是一个很好的编程习惯，让别人调用你的的toString函数时不会出项不可估计的错误

关于equals方法重写与hashcode方法重写有讲究的：
equals方法必须具有的性质：
1. 自反性
2. 对称性
3. 传递性
4. 一致性，对象没有被修改的请况下多次调用的结果一样
5. 对非null引用a，对null进行检查一定返回 false

写的步骤是

```java
class MyObject{  
    public boolean equals(Object o){  
        if(this == o){  
            return true;  
        }else if(o == null){  
            return false;  
        }else if (!(o instanceof MyObject)){  
            return false;  
        }  
          
        //对对象属性进行进行逐个判断  
        return true;  
    }  
}  
```

<!-- more -->

equals与hashcode方法的关系

```java
a.equals(b) == true          --=--->  必须有  a.hashCode() = b.hashcode  
a.hashCode() == b.hashCode() ------>  对equals方法无要求  
a.equals(b) == false         ------>  对 hashcode方法无要求  
a.hashCode() == b.hashCode() ------>  必须 a.equals(b) == false  
```

一个hashcode的实例

```java
public int hashCode() {  
    return 7*a.hashCode() + 13*b.hashCode();  
}  
```