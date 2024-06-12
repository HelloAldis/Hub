---
title: JDK 6 目录结构介绍以及JDK中的工具研究
publishDate:  2012-02-18 21:59:35
image: ~/assets/images/aldis/2012/10.png
category: 编程思想
tags:
  - JDK
  - Java
---

```java
要想深入了解Java必须对JDK的组成, 本文对JDK6里的目录做了基本的介绍,主要还是讲解
了下JDK里的各种可执行程序或工具的用途
Java(TM) 有两个平台 JRE 运行平台，包括Java虚拟机，运行类库，java应用程序装载器。
JRE不是开发环境，所以不包括编译器，调试器，有需要这些请安装JDK(TM)
    
//说明 ：环境为Windows XP SP3 下 的JDK为1.60版本 JAVA_HOME = C:\jdk1.6.0

//---------------------------开发文件和目录------------------------------------------------
               jdk1.6.0
     ___________|____________________
    |           |                    |
    bin         lib                  jre
    |           |          __________|_____________________
java.exe    tools.jar     |                                |        
javac.exe   dt.jar       bin                              lib                
javap.exe            _____|____ __________         ________|_______ ________ ________        
javah.exe           |          |          |       |        |       |        |        |
javadoc.exe     java.exe    client      server  rt.jar    ext  security  applet    fonts
                java.dll       |          |   charsets.jar |                  
                awt.dll     jvm.dll    jvm.dll        localedata.jar

c:\jdk1.6.0 -- JDK的根目录，包含一些软件版权，声明，和自述文件，
         同时包含归档了的Java平台源代码包src.zip         
c:\jdk1.6.0\bin -- JDK包含的一些开发工具执行文件
c:\jdk1.6.0\jre\bin\client 
        包含 Java HotSpotTM Client Virtual Machine 要用的 DLL 文件 
c:\jdk1.6.0\jre\bin\server 
        包含 Java HotSpotTM Server Virtual Machine 要用的 DLL 文件  
c:\jdk1.6.0\lib  -- Java开发工具要用的一些库文件，有包含了支持JDK工具的非核心类库tool.jar，
        dt.jar 归档的 BeanInfo 文件 
        用于告诉IDE这样显示java组件怎样让开发者在自己的应用程序中用户化它们
c:\jdk1.6.0\jre  -- JDK使用的Java运行环境（JRE）的根目录，这个运行环境实现了Java平台         
c:\jdk1.6.0\jre\bin -- Java平台所要用的工具和库的可执行文件
        这些可执行文件和 /jdk1.6.0/bin相同的。
         //Java 启动器工具充当了应用程序启动器(覆盖了1.1版本的JDK推出的旧版本JRE工具)
                        这个路径不需要设置 PATH 环境变量
c:\jdk1.6.0\jre\bin\client  -- 包含Java Hotspot(Java性能引擎) 客户虚拟机要用的DLL文件
c:\jdk1.6.0\jre\bin\server -- 包含Java Hotspot(Java性能引擎) 服务器虚拟机要用的DLL文件
c:\jdk1.6.0\jre\lib -- JRE要用的代码库，属性设置，资源文件。
        例如rt.jar Java 引导类库(java 核心APIRunTime类)
        charsets.jar 字符转换类库
c:\jdk1.6.0\jre\lib\ext -- 默认的Java平台扩展安装环境
        包含localedata.jar 是 ava.text 和 java.util包要用到的地区数据 
c:\jdk1.6.0\jre\lib\security -- 包含安全管理文件，有安全规则(java.policy) 
        和安全属性文件(java.security)
c:\jdk1.6.0\jre\lib\applet -- Java applets 要的Jar包，可以放到lib/applet/目录，
        这样可以节省 applet 类装载器从本地文件系统装载 大的applets 所需的applet类时间
         减少从网上下载具有相同的保护的时间。
c:\jdk1.6.0\jre\lib\fonts 包含平台所需的TrueType字体文件

//不知道大家的版本有没有这个目录
-db目录    纯Java开发的数据可 Derby，是一个开源的100%Java开发的关系数据库
                    db
            _________|__________
           |         |          |
          Demo    Frameworks   lib 
  -Dmeo 是Java Derby的例子程序
  -Frameworks 提供数据库运行时需要的用到的shell脚本，包括Windows下的bat和Unix下的Ksh
        包含 Java DB 的类库和 Sun Microsystems 的 Apache Derby 数据库技术的分发
        有关 Java DB 的信息，请参见 http://developers.sun.com/prodtech/javadb/。 
        有关 Derby 的文档，请参见：http://db.apache.org/derby/manuals/index.html 

//----------------------------附加的文件和目录--------------------------------------------
                        jdk1.6.0
                 ___________|__________ ___________
                |           |          |           |
              demo      include     src.zip     sample 
             ___|___ _________ __________
            |       |         |          |
          applets  jfc       jpda      plugin
       
c:\jdk1.6.0\src.zip -- 归档的Java源代码
c:\jdk1.6.0\demo -- Java编程的例子
c:\jdk1.6.0\demo\applets -- 网页Applets的例子
c:\jdk1.6.0\demo\jfc -- Java 2D(TM)和JFC(基础图形类集合)\Swing 功能的例子
c:\jdk1.6.0\demo\jpda -- 用Java平台Debugging的体系构架，包还有javadt 的 jdb 源代码,
        具体内容可看jpda目录下的doc\index.html
c:\jdk1.6.0\demo\jvmti -- java虚拟机tool interface (工具接口) 实例代码
c:\jdk1.6.0\demo\plugin -- java 插件产品案例
c:\jdk1.6.0\demo\nbproject -- JDK的 netbean工程示例
c:\jdk1.6.0\demo\management -- 一些这样查看死锁线程(FullThreadDump )，
        收集垃圾(VerboseGC)内存cpu使用状况了代码例子。详细可查看目录下的index.html
c:\jdk1.6.0\sample -- 某些 Java API 的编程样例（带源代码）。
//有兴趣的可看看上面这些代码，很有用
c:\jdk1.6.0\include -- C 语言头文件 支持 用Java本地接口和Java虚拟机接口 来本机代码编程 

//-----------------------------------基本工具--------------------------------------------
这些工具是JDK的基础，用这些工具来编写应用程序。
javac.exe -- Java语言编译器 
java.exe -- Java应用程序启动器，JDK 1.6版里同时用于开发和部署，
            旧的部署启动器，jre，不在提供
javadoc.exe -- Java API 文档生成器
apt.exe -- java 注释处理器
appletviewer.exe -- java applet 小程序查看器  
jar.exe -- java文件压缩打包工具
jdb.exe -- Java 调试器.
javah.exe -- C 头文件和stub生成器，用于写本地化方法，例如生产JNI样式的头文件
javap.exe -- class文件 反编译工具 
extcheck.exe -- 用于检测jar包中的问题  

//---------------------------------安全工具 -------------------------------------------

这些工具用于设置系统的安全规则和生产可以工作在远端的安全规则下的应用程序
keytool.exe -- 管理密钥库和证书.
jarsigner.exe -- 生产和校验JAR签名
policytool.exe -- 有用户界面的规则管理工具  
kinit.exe.exe -- 用于获得和缓存网络认证协议Kerberos 票证的授予票证
klist.exe.exe --  凭据高速缓存和密钥表中的 Kerberos 显示条目 
ktab.exe.exe-- 密钥和证书管理工具 

//--------------------------------Java国际化工具---------------------------------------

这些工具可以帮助你创建可本地化的应用程序
native2ascii -- 见文本转化为 Unicode Latin-1。//这个工具很有意思 ,大家可以看看这里
//http://java.sun.com/javase/6/docs/technotes/tools/windows/native2ascii.html  

//--------------------------------远程方法调用工具-------------------------------------

这些工具可以帮助创建可以和web和网络交互的应用程序
rmic.exe -- 生成远程对象的stubs and skeletons(存根和框架)
rmid.exe -- Java 远程方法调用(RMI:Remote Method Invocation) 活化系统守护进程
rmiregistry.exe -- Java 远程对象注册表
serialver.exe -- 返回类的 serialVersionUID.  

//------------------------------Java IDL and RMI-IIOP 工具-----------------------------

这些工具用于创建使用OMG-Standard IDL 和 CORBA/IIOP 的应用程序
tnameserv.exe -- Provides access to the naming service. 
idlj.exe -- 生产映射到OMG IDL接口可以使Java应用程序使用CORBA的.java文件
orbd.exe -- 为客户可以在CORBA环境下透明的定位和调用服务器的稳定的对象提供支持
servertool.exe -- 为应用程序提供易于使用的接口用于注册，注销，启动，关闭服务器

//-------------------------------Java 部署工具------------------------------------------
pack200.exe -- 使用java gzip压缩工具将JAR文件转换为压缩的pack200文件，
        生产打包文件是高度压缩的JAR包，可以直接部署，减少下载时间
unpack200.exe -- 解包pack200文件为JARs 

//-------------------------------Java 插件工具------------------------------------------
htmlconverter.exe -- Java Plug-in HTML转换器 htmlconverter -gui 可以启动图形界面

//-------------------------------Java web 启动工具--------------------------------------
javaws.exe -- Java web 启动命令行工具

//-----------------------Java 故障检修，程序概要分析，监视和管理工具--------------------
jvisualvm.exe -- 一个图形化的Java虚拟机，不说了 大家研究一下就发现太酷了
        // 啊这是想了解JVM的人的神器
        //http://java.sun.com/javase/6/docs/technotes/guides/visualvm/index.html
jconsole.exe -- java监视台和管理控制台，图形界面的功能太强大了，
        运行一下就知道 ，不想多说，看了就知道
 
//------------------------------Java web 服务工具----------------------------------
schemagen.exe  -- Java构架的XML Schema生成器
wsgen.exe  -- 生成 JAX-WS
wsimport.exe -- 生成 JAX-WS
xjc.exe -- 绑定编译器 

//------------------------------监视工具-------------------------------------------

监视Java虚拟机的性能，不支持Windows 98 和Windows ME 平台
jps.exe -- JVM Process Status 进程状态工具。列出目标系统的HotSpot JJVM
jstat.exe -- 按照命令行的具体要求记录和收集一个JVM的性能数据
jstatd.exe -- JVM jstat 的守护进程

//-----------------------------故障检测和修理工具-----------------------------------
jinfo.exe -- 配置或打印某个Java进程VM flag
jhat.exe -- 堆储存查看器
jmap.exe  -- Java内存图
jsadebugd.exe -- Java 的 Serviceability Agent Debug的守护进程
jstack.exe -- Java堆栈跟踪

//----------------------------Java脚本工具-----------------------------------------
jrunscript.exe -- 运行脚本

//工具都在JAVA_HOME\bin目录下，绝大部分工具都有-help命令行参数来提供帮助
```
