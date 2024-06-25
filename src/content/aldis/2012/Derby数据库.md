---
title: Derby数据库
publishDate: 2012-02-19 23:19:01
image: ~/assets/images/aldis/2012/6.png
category: 编程思想
tags:
  - 数据库
  - Derby
  - Java
---

Derby数据库是一个纯用Java实现的内存数据库，属于Apache的一个开源项目。  
由于是用Java实现的，所以可以在任何平台上运行；另外一个特点是体积小，免安装，  
只需要几个小jar包就可以运行了。Derby是一个非常轻量级的关系数据库引擎，却有着  
包括崩溃恢复、事务回滚和提交、行/表级锁、视图、主键/外键约束、触发器、子查询表达式等特性。

1. 设置环境变量 `DERBY_INSTALL=%JAVA_HOME%\db //set DERBY_INSTALL=%JAVA_HOME%\db`
2. 将%DERBY_INSTALL%\lib\目录下的Jar包添加到CLASSPATH
3. 在命令行运行 `java org.apache.derby.tools.sysinfo`，如果输出系统信息则设置成功
4. ij是Derby自带的一个功能强大的数据库管理工具，可以进行很多数据库操作  
   在命令行运行  
   `java org.apache.derby.tools.ij`  
   就可以启动输入命令来管理了  
   创建和连接数据可是  
   conect `'jdbc:derby:<数据库路径>[;create=true/false]'; `
   eg: `connect 'jdbc:derby:D:/myDB;create=true';//创建一个D:\myDB的数据库`  
   运行SQL脚本  
   `run '<脚本路径>' `
   `disconnect; 断开连接`  
   `Exit; 推出ij`
5. Derby数据编程

```java
  //加载JDBC驱动
  Class.forname(org.apache.derby.jdbc.EmbeddedDriver);
  //连接数据库
  Connnection con = DriverManager.getConnection("jdbc:derby:D:\myDB;create=true");
  //关闭连接
  DriverManager.getConnection("jdbc:derby:D:\myDB;shutdown=true");
  //其他的使用和普通数据库一样
```

6.网络模式下的Derby数据库  
 命令行： `java org.apache.derby.drda.NetworkServerControl start [-h<host>[-p<port>]]`  
 网络模式启动 在本地的loclhost:9999接受连接  
 eg: `java org.apache.derby.drda.NetworkServerControl start -h localhost -p 9999`  
 `connect 'jdbc:derby://localhost:9999//D:/myDB'`;
