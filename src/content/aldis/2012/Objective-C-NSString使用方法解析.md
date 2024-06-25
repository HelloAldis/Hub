---
title: Objective-C NSString使用方法解析
publishDate: 2012-08-26 22:26:04
image: ~/assets/images/aldis/2012/19.png
category: 编程思想
tags:
  - NSString
  - Objective-C
---

```objc
  //创建字符串对象数组
  NSArray *array = [str componentsSeparatedByString:@"@"];//就是以@为标示 输出看看啦

  int count=[array count];
  int i;
  for(i=0;i<count;i=i+4) {
  printf("%i:  %s\n",i,[[array objectAtIndex:i] UTF8String]);
  }

  // 2 可变的字符串类
  NSMutableString *song=[[NSMutableString alloc] init];
  [song appendString:@"Deaf Leppard"];
  printf("%s\n",[song UTF8String]);

  NSRange range=[song rangeOfString:@"Deaf"];//获取字符串"Deaf"字串的范围
  [song replaceCharactersInRange:range withString:@"Def"];//替换
  printf("%s\n",[song UTF8String]);

  [song insertString:@"Animal by " atIndex:0];
  printf("%s\n",[song UTF8String]);

  [song release];

  //字典加数组操作
  NSArray *keys=[@"one two three" componentsSeparatedByString:@""];
  NSArray *value=[@"two bravo a" componentsSeparatedByString:@""];
  NSDictionary *dic=[[NSDictionary alloc] initWithObjects:value forKeys:keys];
  printf("%s\n",[[dic description] UTF8String]);

  //1、创建常量字符串。
  NSString *astring = @"This is a String!";

  //2、创建空字符串，给予赋值。
  NSString *astring = [[NSString alloc] init];
  astring = @"This is a String!";
  [astring release];
  NSLog(@"astring:%@",astring);

  //3、在以上方法中，提升速度:initWithString方法
  NSString *astring = [[NSString alloc] initWithString:@"This is a String!"];
  NSLog(@"astring:%@",astring);
  [astring release];


  //4、用标准c创建字符串:initWithCString方法
  char *Cstring = "This is a String!";
  NSString *astring = [[NSString alloc] initWithCString:Cstring];
  NSLog(@"astring:%@",astring);
  [astring release];

  //5、创建格式化字符串:占位符（由一个%加一个字符组成）
  int i = 1;
  int j = 2;
  NSString *astring = [[NSString alloc] initWithString:[NSString stringWithFormat:@"%d.This is %i string!",i,j]];
  NSLog(@"astring:%@",astring);
  [astring release];


  //6、创建临时字符串
  NSString *astring;
  astring = [NSString stringWithCString:"This is a temporary string"];
  NSLog(@"astring:%@",astring);

  NSString *path = @"astring.text";
  NSString *astring = [[NSString alloc] initWithContentsOfFile:path];
  NSLog(@"astring:%@",astring);
  [astring release];

  NSString *astring = [[NSString alloc] initWithString:@"This is a String!"];
  NSLog(@"astring:%@",astring);
  NSString *path = @"astring.text";
  [astring writeToFile: path atomically: YES];
  [astring release];


  //用C比较:strcmp函数
  char string1[] = "string!";
  char string2[] = "string!";
  if(strcmp(string1, string2) = = 0)
  {
      NSLog(@"1");
  }

  //isEqualToString方法
  NSString *astring01 = @"This is a String!";
  NSString *astring02 = @"This is a String!";
  BOOL result = [astring01 isEqualToString:astring02];
  NSLog(@"result:%d",result);

  //compare方法(comparer返回的三种值)
  //NSOrderedSame判断两者内容是否相同
  NSString *astring01 = @"This is a String!";
  NSString *astring02 = @"This is a String!";
  BOOL result = [astring01 compare:astring02] = = NSOrderedSame;
  NSLog(@"result:%d",result);

  //NSOrderedAscending判断两对象值的大小(按字母顺序进行比较，astring02大于astring01为真)
  NSString *astring01 = @"This is a String!";
  NSString *astring02 = @"this is a String!";
  BOOL result = [astring01 compare:astring02] = = NSOrderedAscending;
  NSLog(@"result:%d",result);

  //NSOrderedDescending判断两对象值的大小(按字母顺序进行比较，astring02小于astring01为真)
  NSString *astring01 = @"this is a String!";
  NSString *astring02 = @"This is a String!";
  BOOL result = [astring01 compare:astring02] = = NSOrderedDescending;
  NSLog(@"result:%d",result);

  //不考虑大小写比较字符串1
  NSString *astring01 = @"this is a String!";
  NSString *astring02 = @"This is a String!";
  BOOL result = [astring01 caseInsensitiveCompare:astring02] = = NSOrderedSame;
  NSLog(@"result:%d",result);
  //NSOrderedDescending判断两对象值的大小(按字母顺序进行比较，astring02小于astring01为真)


  //不考虑大小写比较字符串2
  NSString *astring01 = @"this is a String!";
  NSString *astring02 = @"This is a String!";
  BOOL result = [astring01 compare:astring02 options:NSCaseInsensitiveSearch | NSNumericSearch] = = NSOrderedSame;
  NSLog(@"result:%d",result);
  //NSCaseInsensitiveSearch:不区分大小写比较 NSLiteralSearch:进行完全比较，区分大小写 NSNumericSearch:比较字符串的字符个数，而不是字符值。

  NSString *string1 = @"A String";
  NSString *string2 = @"String";
  NSLog(@"string1:%@",[string1 uppercaseString]);//大写
  NSLog(@"string2:%@",[string2 lowercaseString]);//小写
  NSLog(@"string2:%@",[string2 capitalizedString]);//首字母大小

  NSString *string1 = @"This is a string";
  NSString *string2 = @"string";
  NSRange range = [string1 rangeOfString:string2];
  int location = range.location;
  int leight = range.length;
  NSString *astring = [[NSString alloc] initWithString:[NSString stringWithFormat:@"Location:%i,Leight:%i",location,leight]];
  NSLog(@"astring:%@",astring);
  [astring release];

  //-substringToIndex: 从字符串的开头一直截取到指定的位置，但不包括该位置的字符
  NSString *string1 = @"This is a string";
  NSString *string2 = [string1 substringToIndex:3];
  NSLog(@"string2:%@",string2);

  //-substringFromIndex: 以指定位置开始（包括指定位置的字符），并包括之后的全部字符
  NSString *string1 = @"This is a string";
  NSString *string2 = [string1 substringFromIndex:3];
  NSLog(@"string2:%@",string2);

  //-substringWithRange: //按照所给出的位置，长度，任意地从字符串中截取子串
  NSString *string1 = @"This is a string";
  NSString *string2 = [string1 substringWithRange:NSMakeRange(0, 4)];
  NSLog(@"string2:%@",string2);

  //扩展路径
  NSString *Path = @"~/NSData.txt";
  NSString *absolutePath = [Path stringByExpandingTildeInPath];
  NSLog(@"absolutePath:%@",absolutePath);
  NSLog(@"Path:%@",[absolutePath stringByAbbreviatingWithTildeInPath]);

  //文件扩展名
  NSString *Path = @"~/NSData.txt";
  NSLog(@"Extension:%@",[Path pathExtension]);

  //stringWithCapacity:
  NSMutableString *String;
  String = [NSMutableString stringWithCapacity:40];

  //appendString: and appendFormat:

  NSMutableString *String1 = [[NSMutableString alloc] initWithString:@"This is a NSMutableString"];
  //[String1 appendString:@", I will be adding some character"];
  [String1 appendFormat:[NSString stringWithFormat:@", I will be adding some character"]];
  NSLog(@"String1:%@",String1);
  */

  //-insertString: atIndex:
  NSMutableString *String1 = [[NSMutableString alloc] initWithString:@"This is a NSMutableString"];
  [String1 insertString:@"Hi! " atIndex:0];
  NSLog(@"String1:%@",String1);

  //-setString:
  NSMutableString *String1 = [[NSMutableString alloc] initWithString:@"This is a NSMutableString"];
  [String1 setString:@"Hello Word!"];
  NSLog(@"String1:%@",String1);

  //-setString:
  NSMutableString *String1 = [[NSMutableString alloc] initWithString:@"This is a NSMutableString"];
  [String1 replaceCharactersInRange:NSMakeRange(0, 4) withString:@"That"];
  NSLog(@"String1:%@",String1);

  //01：检查字符串是否以另一个字符串开头- (BOOL) hasPrefix: (NSString *) aString;
  NSString *String1 = @"NSStringInformation.txt";
  [String1 hasPrefix:@"NSString"] = = 1 ?  NSLog(@"YES") : NSLog(@"NO");
  [String1 hasSuffix:@".txt"] = = 1 ?  NSLog(@"YES") : NSLog(@"NO");

  //02：查找字符串某处是否包含其它字符串 - (NSRange) rangeOfString: (NSString *) aString，这一点前面在串中搜索子串用到过;
  NSArray *array = [[NSArray alloc] initWithObjects:
  @"One",@"Two",@"Three",@"Four",nil];

  self.dataArray = array;
  [array release];

  //- (unsigned) Count;数组所包含对象个数；
  NSLog(@"self.dataArray cound:%d",[self.dataArray count]);

  //- (id) objectAtIndex: (unsigned int) index;获取指定索引处的对象;
  NSLog(@"self.dataArray cound 2:%@",[self.dataArray objectAtIndex:2]);

  //arrayWithArray:
  NSArray *array1 = [[NSArray alloc] init];
  NSMutableArray *MutableArray = [[NSMutableArray alloc] init];
  NSArray *array = [NSArray arrayWithObjects:@"a",@"b",@"c",nil];
  NSLog(@"array:%@",array);
  MutableArray = [NSMutableArray arrayWithArray:array];
  NSLog(@"MutableArray:%@",MutableArray);

  array1 = [NSArray arrayWithArray:array];
  NSLog(@"array1:%@",array1);

  //Copy
  //id obj;
  NSMutableArray *newArray = [[NSMutableArray alloc] init];
  NSArray *oldArray = [NSArray arrayWithObjects:@"a",@"b",@"c",@"d",@"e",@"f",@"g",@"h",nil];

  NSLog(@"oldArray:%@",oldArray);
  for(int i = 0; i < [oldArray count]; i++)
  {
      obj = [[oldArray objectAtIndex:i] copy];
      [newArray addObject: obj];
  }
  //
  NSLog(@"newArray:%@", newArray);
  [newArray release];

  //快速枚举

  //NSMutableArray *newArray = [[NSMutableArray alloc] init];
  NSArray *oldArray = [NSArray arrayWithObjects:
                        @"a",@"b",@"c",@"d",@"e",@"f",@"g",@"h",nil];
  NSLog(@"oldArray:%@",oldArray);

  for(id obj in oldArray)
  {
      [newArray addObject: obj];
  }
  //
  NSLog(@"newArray:%@", newArray);
  [newArray release];

  //Deep copy

  NSMutableArray *newArray = [[NSMutableArray alloc] init];
  NSArray *oldArray = [NSArray arrayWithObjects:
                        @"a",@"b",@"c",@"d",@"e",@"f",@"g",@"h",nil];
  NSLog(@"oldArray:%@",oldArray);
  newArray = (NSMutableArray*)CFPropertyListCreateDeepCopy(kCFAllocatorDefault, (CFPropertyListRef)oldArray, kCFPropertyListMutableContainers);
  NSLog(@"newArray:%@", newArray);
  [newArray release];


  //Copy and sort

  NSMutableArray *newArray = [[NSMutableArray alloc] init];
  NSArray *oldArray = [NSArray arrayWithObjects:
                        @"b",@"a",@"e",@"d",@"c",@"f",@"h",@"g",nil];
  NSLog(@"oldArray:%@",oldArray);
  NSEnumerator *enumerator;
  enumerator = [oldArray objectEnumerator];
  id obj;
  while(obj = [enumerator nextObject])
  {
      [newArray addObject: obj];
  }
  [newArray sortUsingSelector:@selector(compare:)];
  NSLog(@"newArray:%@", newArray);
  [newArray release];

  //从字符串分割到数组－ componentsSeparatedByString:
  NSString *string = [[NSString alloc] initWithString:@"One,Two,Three,Four"];
  NSLog(@"string:%@",string);
  NSArray *array = [string componentsSeparatedByString:@","];
  NSLog(@"array:%@",array);
  [string release];

  //从数组合并元素到字符串- componentsJoinedByString:
  NSArray *array = [[NSArray alloc] initWithObjects:@"One",@"Two",@"Three",@"Four",nil];
  NSString *string = [array componentsJoinedByString:@","];
  NSLog(@"string:%@",string);

  NSArray *array;
  array = [NSMutableArray arrayWithCapacity:20];

  //- (void) addObject: (id) anObject;
  NSMutableArray *array = [NSMutableArray arrayWithObjects:
  @"One",@"Two",@"Three",nil];
  [array addObject:@"Four"];
  NSLog(@"array:%@",array);

  //-(void) removeObjectAtIndex: (unsigned) index;
  NSMutableArray *array = [NSMutableArray arrayWithObjects:
  @"One",@"Two",@"Three",nil];
  [array removeObjectAtIndex:1];
  NSLog(@"array:%@",array);

  //- (NSEnumerator *)objectEnumerator;从前向后
  NSMutableArray *array = [NSMutableArray arrayWithObjects:
  @"One",@"Two",@"Three",nil];
  NSEnumerator *enumerator;
  enumerator = [array objectEnumerator];

  id thingie;
  while (thingie = [enumerator nextObject]) {
      NSLog(@"thingie:%@",thingie);
  }

  //- (NSEnumerator *)reverseObjectEnumerator;从后向前
  NSMutableArray *array = [NSMutableArray arrayWithObjects:
  @"One",@"Two",@"Three",nil];
  NSEnumerator *enumerator;
  enumerator = [array reverseObjectEnumerator];

  id object;
  while (object = [enumerator nextObject]) {
      NSLog(@"object:%@",object);
  }

  //快速枚举
  NSMutableArray *array = [NSMutableArray arrayWithObjects:
  @"One",@"Two",@"Three",nil];
  for(NSString *string in array)
  {
      NSLog(@"string:%@",string);
  }

  //- (id) initWithObjectsAndKeys;
  NSDictionary *dictionary = [[NSDictionary alloc] initWithObjectsAndKeys:@"One",@"1",@"Two",@"2",@"Three",@"3",nil];
  NSString *string = [dictionary objectForKey:@"One"];
  NSLog(@"string:%@",string);
  NSLog(@"dictionary:%@",dictionary);
  [dictionary release];

  //创建
  NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];

  //添加字典
  [dictionary setObject:@"One" forKey:@"1"];
  [dictionary setObject:@"Two" forKey:@"2"];
  [dictionary setObject:@"Three" forKey:@"3"];
  [dictionary setObject:@"Four" forKey:@"4"];
  NSLog(@"dictionary:%@",dictionary);

  //删除指定的字典
  [dictionary removeObjectForKey:@"3"];
  NSLog(@"dictionary:%@",dictionary);

  //将NSRect放入NSArray中
  NSMutableArray *array = [[NSMutableArray alloc] init];
  NSValue *value;
  CGRect rect = CGRectMake(0, 0, 320, 480);
  value = [NSValue valueWithBytes:&rect objCType:@encode(CGRect)];
  [array addObject:value];
  NSLog(@"array:%@",array);

  //从Array中提取
  value = [array objectAtIndex:0];
  [value getValue:&rect];
  NSLog(@"value:%@",value);

  NSFileManager *fileManager = [NSFileManager defaultManager];
  NSString *home;
  home = @"../Users/";

  NSDirectoryEnumerator *direnum;
  direnum = [fileManager enumeratorAtPath: home];

  NSMutableArray *files = [[NSMutableArray alloc] init];

  //枚举
  NSString *filename;
  while (filename = [direnum nextObject]) {
      if([[filename pathExtension] hasSuffix:@"jpg"]){
          [files addObject:filename];
      }
  }

  //快速枚举
  //for(NSString *filename in direnum)
  //{
  //    if([[filename pathExtension] isEqualToString:@"jpg"]){
  //        [files addObject:filename];
  //    }
  //}
  NSLog(@"files:%@",files);

  //枚举
  NSEnumerator *filenum;
  filenum = [files objectEnumerator];
  while (filename = [filenum nextObject]) {
      NSLog(@"filename:%@",filename);
  }

  //快速枚举
  //for(id object in files)
  //{
  //    NSLog(@"object:%@",object);
  //}
```
