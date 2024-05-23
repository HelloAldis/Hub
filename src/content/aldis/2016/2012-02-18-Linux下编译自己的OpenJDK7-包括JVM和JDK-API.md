---
title: Linux下编译自己的OpenJDK7 包括JVM和JDK API
publishDate:  2012-02-18 22:38:23
category: Java
tags:
  - OpenJDK
---

1.首先去 这里 http://download.java.net/openjdk/jdk7/ 下载OpenJDK7的源码zip包  
  
1. 简要介绍下OpenJDK7中的目录  
  * hotspot: 放有OpenJDK Hotspot Virtual Machine 的源代码和make文件  
  * langtools: 放有OpenJDK 的javac 等工具的源代码和make文件  
  * cobra: 放有OpenJDK Cobra 的源代码和make文件  
  * jaxws: 放有OpenJDK JAXWS 的相关信息和make文件, 具体的源代码再编译时会下载  
  * jaxp: 放有OpenJDK JAXP 相关信息和make文件,具体的源代码再编译时会下载  
  * jdk: 放有OpenJDK runtime libraries 的源代码和make文件  
直接OpenJDK 目录下有整个OpenJDK 的make文件

1. 检查系统的工具版本，以下配置基于OpenJDK7  
  3.1 GNU make 3.81或更高版本  
  3.2 ANT 1.7.1或更高版本  
  3.3 Sun 的BootstrapJDK6 update14或更高版本（虽然有些奇怪，但是因为编译这些Java代码需要一个可用的JDK）  
  3.4 GNU gcc 4.3或更高版本  
  3.5 ZIP 2.2或更高版本  
  3.6 FreeType 2.3或更高版本 （下载地址http://download.savannah.gnu.org/releases/freetype/  ,下载后解压）  
  3.7 Advanced Linux Sound Architecture（ALSA） 0.9.1或更高版本(下载地址http://www.alsa-project.org/main/index.php/Download)

1. 如果怕麻烦可以使用相关命令来安装依赖包  
  * Fedora: yum-builddep java-1.6.0-openjdk  
  * Debian:  aptitude build-dep openjdk-6  
  * Ubuntu: sudo aptitude build-dep openjdk-6  
其它具体的可以参考OpenJDK中的README-builds.html

<!-- more -->

5. 环境工具设置好后了运行以下命令以设置或取消环境变量  
```bash
  export LANG=C  
  export ALT_BOOTDIR=/usr/java/jdk1.6.0_30/  
  export ALLOW_DOWNLOADS=true  
  export USE_PRECOMPILED_HEADER=true  
  export SKIP_DEBUG_BUILD=false  
  export SKIP_FASTDEBUG_BUILD=true  
  export DEBUG_NAME=debug  
  unset CLASSPATH  
  unset JAVA_HOME
```

6. 到OpenJDK目录下运行 `make sanity` 进行检测 如果输出如下证明OpenJDK 编译环境检测没有问题
```bash 
  PREVIOUS_RELEASE_IMAGE =   
  ALT_PREVIOUS_RELEASE_IMAGE =   
  Sanity check passed. 
```

如果是下面这样证明 环境依然有问题, 按照提示的WARNING 和 ERROR进行修改 直到检测通过
```bash 
ERROR: Your JAVA_HOME environment variable is set.  This will   
        most likely cause the build to fail.  Please unset it   
          and start your build again.   
Exiting because of the above error(s). 
make: *** [post-sanity] Error 1  
```

7. 检测通过了在OpenJDK目录下运行
```bash 
  make clean  
  make  
```

8. 注意事项  
  8.1 保持所有命令是在同一个用户下运行的而且这个用户么还有JAVA_HOME 等环境变量这样编译程序才能正确的找到环境变量和不会有权限冲突  
  8.2 OpenJDK 编译可能需要些时间,不要慌张  
  8.3 要有ALLOW_DOWNLOADS=true。否则编译jaxp的时候会出错，因为jaxp的源代码是临时下载的  
  8.3 OpenJDK 目录下的README-builds.html网页文档可以提供很多帮助.  
  
9. 编译完成
```bash 
  -- Build times ----------  
  Target debug_build  
  Start 2012-02-18 21:09:17  
  End   2012-02-18 21:54:06  
  00:01:04 corba  
  00:20:53 hotspot  
  00:03:57 jaxp  
  00:04:14 jaxws  
  00:14:15 jdk  
  00:00:26 langtools  
  00:44:49 TOTAL  
  在OpenJDK目录下有个build文件夹是编译的output文件夹  
  azrael@ubuntu:~/Tech/openjdk$ cd build/  
  azrael@ubuntu:~/Tech/openjdk/build$ ll  
  total 16  
  drwxr-xr-x  4 azrael azrael 4096 Feb 18 20:37 ./  
  drwxr-xr-x 12 azrael azrael 4096 Feb 18 20:35 ../  
  drwxr-xr-x 27 azrael azrael 4096 Feb 18 21:53 linux-i586/  
  drwxr-xr-x 26 azrael azrael 4096 Feb 18 21:08 linux-i586-debug/  
  azrael@ubuntu:~/Tech/openjdk/build/linux-i586/bin$ ./java -version  
  openjdk version "1.7.0-internal-debug"  
  OpenJDK Runtime Environment (build 1.7.0-internal-debug-azrael_2012_02_18_20_37-b00)  
  OpenJDK Server VM (build 21.0-b17-jvmg, mixed mode)  
```
  