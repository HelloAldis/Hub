---
title: 如何运用Xcode创建单元测试UnitTest
publishDate:  2013-04-25 23:09:16
category: iOS
tags:
  - UnitTest
  - Xcode
  - 单元测试
---

## UnitTest背景知识

单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java里单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。

<!-- more -->

## Xcode中的UnitTest

Xcode中集成了单元测试框架OCUnit，可以完成不同侧重点的测试。Xcode下的单元测试分为logic uint tests和application unit tests，两种类型的单元测试都需要对应一个自己的Target。

logic uint tests在编译阶段进行，并且只能在模拟器中进行，并且需要配置一个单独的schemes来运行。主要是针对数据层的各个模块进行测试，如果数据层的模块划分比较理想解耦相对彻底，则可以通过逻辑单元测试对各模块给出各种输入，然后对各数据模块的输出进行判断，来判断各数据模块是否正常。
application unit tests在程序运行阶段进行，可以在模拟器和真机上进行，可以在应用的schemes或者单独配置的schemes里面运行。主要是针对应用中的相对比较重要的类以及部分简单的界面操作进行测试，完成逻辑单元测试以外的检测。
xcode可以通过2种方式创建UnitTest，一种是创建工程时自带UnitTest，一种时在已有工程添加UnitTest。

## Xcode创建带UnitTest的工程（Xcode 4.6.2）

如果在新建工程的时候选中

![](~/assets/images/aldis/2016/2013-04-25/1.png)

并且新建的工程是一个应用，那么系统会默认生成application unit tests；新建其它类型的工程选中Include Unit Tests的话，系统默认生成logic uint tests。系统自动生成的测试单元时会自动生成对应的target，并且一个target只能对应一中类型的单元测试，但可以包含多个测试文件，针对工程中不同的类进行测试。

## Xcode向已有工程添加UnitTest（Xcode 4.6.2）

如果在新建工程的时候没有选择Include Unit Tests的话，则可以手动去添加单元测试。
下面首先介绍下向工程添加单元测试的target：
1、选则File->New->New Target,在左侧栏中选中iOS->other，右边选择Cocoa Touch Unit Tests Bundle，如图

![](~/assets/images/aldis/2016/2013-04-25/2.png)
![](~/assets/images/aldis/2016/2013-04-25/3.png)

Next后位target完成命名
![](~/assets/images/aldis/2016/2013-04-25/4.png)

这样就完成了向工程中添加单元测试用的target。效果如下
![](~/assets/images/aldis/2016/2013-04-25/5.png)

其实按如上步骤添加单元测试target的话，生成的就是一个logic uint tests。
一般情况下Xcode在你添加新的target的时候会自动的添加一个schemes，该schemes的命名与你添加的target一样。

![](~/assets/images/aldis/2016/2013-04-25/6.png)

如果你不想在新建target的时候新建scheme（因为application unit tests可以在真机和模拟器上运行，并且时在程序运行时进行测试，所以完全可以和应用本身的target共用一个scheme，这样进行应用单元测试的时候就不用切换scheme。）可以选择上图的Manage Schemes，去掉Autocreate schemes，如下图：

![](~/assets/images/aldis/2016/2013-04-25/7.png)

为了验证新的scheme已经加入了新建的target，对这个新添加的scheme进行编辑，你可以在选中左侧的Test后看到右边显示出新添加的LogicUnitTests Target，说明该scheme已经默认添加了新添加的Target。

![](~/assets/images/aldis/2016/2013-04-25/8.png)


新建完target后，可以将新建的target设置成logic unit tests或者application unit tests：
设置logic unit tests：就像之前所说，如果按上面的步骤添加一个单元测试用的target的话，就已经默认配置成了一个logic unit tests。
为了确认新建的logic uint tests配置正确，可以进行如下的验证：
1. 选择新建的scheme：LogicUnitTests和一个运行目标
![](~/assets/images/aldis/2016/2013-04-25/9.png)
![](~/assets/images/aldis/2016/2013-04-25/10.png)


1. 选择Product ->Test（或者Command+U）
2. Xcode会显示Build Successed 和Test failed，选择
View -> Navigators -> Issue（或者Command + 4）会有下图中的结果
![](~/assets/images/aldis/2016/2013-04-25/11.png)

选择View -> Navigators -> Show Log Navigator(Command + 7)
![](~/assets/images/aldis/2016/2013-04-25/12.png)

这样就说明添加的逻辑单元测试运行正确，因为没有添加测试语句，只有一个STFail，所以报错。将Logic UnitTest 设置application unit tests：
如果在新建工程的时候选择Include unit tests，则系统会默认生成一个测试target，并配置为application unit tests。
如果新建工程时没有选择包含单元测试，则在新建Logic UnitTest单元测试的Target之后，可以按如下步骤配置application unit tests：
1. 选择新建的Logic UnitTest单元测试target，并选择Build Setting栏和“All”
![](~/assets/images/aldis/2016/2013-04-25/13.png)

2. 在search bar里面输入Bundle Loader，将其值设置为$(BUILT_PRODUCTS_DIR)/<app_name>.app/<app_name>效果如下
![](~/assets/images/aldis/2016/2013-04-25/14.png)

3. 搜索Test Host，设置其值为$(BUNDLE_LOADER)效果如图
![](~/assets/images/aldis/2016/2013-04-25/15.png)

4. 使新建的单元测试target依赖与编译应用的target，效果如图
![](~/assets/images/aldis/2016/2013-04-25/16.png)

5. 果是在新建的时候系统默认新建了scheme，则可以通过新的scheme来进行application tests，如果没有默认新建scheme，则可以编辑用来编译工程的scheme，选择左侧的Test如图：
![](~/assets/images/aldis/2016/2013-04-25/17.png)

点击底部的“+”，将单元测试的target添加进来。如图
![](~/assets/images/aldis/2016/2013-04-25/18.png)

这样原来的logic unit tests就配置成application unit tests了。可以按运行logic unit tests的方法运行application unit tests，来验证是否配置正确。
![](~/assets/images/aldis/2016/2013-04-25/19.png)
![](~/assets/images/aldis/2016/2013-04-25/20.png)

选择Product ->Test（或者Command+U）
![](~/assets/images/aldis/2016/2013-04-25/21.png)

可以对比Logic UnitTest 运行完的report和 Application UnitTest运行的report有不一样的地方，就是上图方框这一栏 Application UnitTest
有 “Run test suit all tests” 这一栏。
环境配置好之后就可以写测试用例了，测试用例怎么写，我将在后续的文章中接着介绍。
