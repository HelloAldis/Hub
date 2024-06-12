---
title: MFC中CString类与其他类型的转换
publishDate:  2009-09-24 18:41:00
image: ~/assets/images/aldis/2009/6.png
category: 编程思想
tags:
  - MFC
  - CString
  - VC++
---

MFC数据类型转换标准库std的string 和MFC类库CString之间的转换

```cpp
1 string to CString   

   CString.format("%s",string.c_str());

2 CString to string

string str(CString.GetBuffer(str.GetLength()));

3 string to char *

char *p=string.c_str();

4 char * to string

string str(char*);

5 CString to char *

strcpy(char,CString,sizeof(char));

6 char * to CString

CString.format("%s",char*);

CString的format方法是非常好用的。string的c_str()也是非常常用的，但要注意和char *转换时，要把char定义成为const char*，这样是最安全的。

vc中常用的几个数据转换方法-int char* float与CString 之间的转换

1、int <->CString

1) int ->CString

int n = 1;

CString str;

str.Format("%d",n);

2) CString->int

CString str = "1";

int n = atoi(str.GetBuffer(0));

2. char* 与CString

1)char*->CString

char sz[128];

CString str;

str.Format("%s",sz);

2) CString -> char*

CString str;

int nLength = str.GetLength();

char* sz = new char[nLength];

sz = str.GetBuffer(0);

有人说这里有错误！会造成内存泄露；

char* sz = new char[nLength];

sz = str.GetBuffer(0);

应改为：

char* sz = str.GetBuffer(0);

3. float<->CString

1）float->CString

float f = 0.0;

CString str;

str.Format("%f",f);

2) CString->float

CString str = "0.0";

float f = atof(str.GetBuffer(0));

```
