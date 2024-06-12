---
title: Java单例模式
publishDate:  2009-09-12 16:29:00
image: ~/assets/images/aldis/2009/3.png
category: 编程思想
tags: 
  - 单例模式
  - Java

---

1. 构造方法私有。
2. 在类里面创建私有，静态（static），final的该对象的实例。
3. 创建公有，静态方法以获得实例。
4. 应用场合：避免频繁读取属性文件，构造一个单例模式进行一次读取

```java
class Single {
   
    private final static Single single = new Single();
   
    private void single(){}
   
    public static Single getInstance() {
        return single;
    }
}
```

