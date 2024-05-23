---
title: Ubuntu Linux JDK 安装
publishDate:  2012-02-05 20:35:17
category: Java 
tags: 
  - Ubuntu
  - JDK
---

1. 下载JDK bin 版本例如 jdk-6u30-linux-i586.bin，放到/usr/java下  
2. 增加执行权限  

```bash
$ chmod +x jdk-6u30-linux-i586.bin  
```

3. ./jdk-6u30-linux-i586.bin  

4. vi编辑环境变量  

```bash
$ vi /etc/profile  
```

文件最后增加  
JAVA_HOME=/usr/java/jdk1.6.0_30  
CLASSPATH=.:＄JAVA_HOME/lib/tools.jar  
PATH=＄JAVA_HOME/bin:＄PATH  
export JAVA_HOME CLASSPATH PATH  
退出保存 

5. 生效更改  

```bash
$ source /etc/profile 
```

6. 察看是否正确   
```bash
$ echo $JAVA_HOME $CLASSPATH $PATH   
$ javac -version  
```
