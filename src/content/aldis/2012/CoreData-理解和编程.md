---
title: CoreData 理解和编程
publishDate:  2012-08-30 23:15:15
image: ~/assets/images/aldis/2012/5.png
category: 编程思想
tags:
  - CoreData
  - iOS
---

CoreData是对sqlite数据库的一个封装.

sqlite数据库操作的基本流程是, 创建数据库, 再通过定义一些字段来定义表格结构, 可以利用sql语句向表格中插入记录, 删除记录, 修改记录, 表格之间也可以建立联系.
这个过程出现了, 表格的结构(schema), 所有表格的结构和相互联系构成整个数据库的模型, 数据库存放的方式(可以是文件或者在内存), 数据库操作, sql语句(主要是查询), 表格里面的记录

下面将上面说的文字, 跟CoreData的类作个对应:

* 表格结构    --> NSEntityDescription
* 数据库中所有表格和他们的联系 -->NSManagedObjectModel
* 数据库存放方式 --> NSPersistentStoreCoordinator
* 数据库操作 --> NSManagedObjectContext
* 查询语句 --> NSFetchRequest
* 表格的记录 --> NSManagedObject

可能上面的对应关系并非十分严格, 但确实可以帮助理解.

下面再看看CoreData的类
`NSEntityDescription`
`NSManagedObjectModel`

<!-- more -->

NSEntityDescription用来定义表格结构, 所以你就可以理解NSManagedObjectModel中的setEntities:(NSArray *)entities函数大概有什么用了 . 通常, 定义model, 是用文件CoreData.xcdatamodel, 可以图形化的操作. 这类似用nib来创建界面. 

建个工程, 使用coredata, 模拟器运行之后, 程序对应的document目录出现一个CoreData.sqlite. 可以利用sqlite3命令来查看里面的表格结构
用命令行sqlite3 CoreData.sqlite 进入
>.tables
ZEVENT        Z_METADATA    Z_PRIMARYKEY
可以看到有表格ZEVENT, 对应的CoreData.xcdatamodel文件有名字叫Event的Entity

>.schema ZEVENT
CREATE TABLE ZEVENT ( Z_PK INTEGER PRIMARY KEY, Z_ENT INTEGER, Z_OPT INTEGER, ZTIMESTAMP TIMESTAMP );
对应的Event中有属性timeStamp, 可以看到, 相应的ZEVENT表格中有字段TIMESTAMP

> select * from ZEVENT
1|1|1|306295807.974966
2|1|1|306295810.981875
3|1|1|306295811.982537
这表格有三个记录, 可以用来初始化三个NSManagedObject, 修改了NSManagedObject, save之后也修改了表格记录

你可以在CoreData.xcdatamodel添加新的entity, 之后用sqlit3命令来查看数据库的变化

NSPersistentStoreCoordinator
这个类的对象通常用NSManagedObjectModel的对象来初始化, 这个类抽象出不同的存放方式, 最经常用的是NSSQLiteStoreType. 

NSManagedObjectContext
这个类的对象又用NSPersistentStoreCoordinator的对象来初始化, 它里面有些方法来添加, 删除NSManagedObject

NSFetchRequest
通常用NSEntityDescription来构造查询, 也就指定查询那个表格, 另外可以指定排序.

在CoreData的设计中, 下一层有相应的属性指向上一层, 所以NSManagedObject有属性得到NSEntityDescription, NSEntityDescription有属性得到NSManagedObjectModel.

CoreData编程使用
1. 导入CoreData的framework
2. AppDelegate类的头文件中
```objc
#import <CoreData/CoreData.h>
 
@property (nonatomic, retain, readonly) NSManagedObjectModel *managedObjectModel;
@property (nonatomic, retain, readonly) NSManagedObjectContext *managedObjectContext;
@property (nonatomic, retain, readonly) NSPersistentStoreCoordinator *persistentStoreCoordinator;
@property (nonatomic, readonly) NSString *applicationDocumentsDirectory;
```

3. 在AppDelegate的实现文件中
```objc
@synthesize managedObjectModel;
@synthesize managedObjectContext;
@synthesize persistentStoreCoordinator;
@synthesize applicationDocumentsDirectory;

- (void)dealloc
{
    [_window release];
    [_tabBarController release];
    [managedObjectModel release];
    [managedObjectContext release];
    [persistentStoreCoordinator release];
    [applicationDocumentsDirectory release];
    [super dealloc];
}
- (NSManagedObjectContext *)managedObjectContext
{
    if (managedObjectContext != nil) {
        return managedObjectContext;
    }
    
    NSPersistentStoreCoordinator *coordinator = [self persistentStoreCoordinator];
    if (coordinator != nil) {
        managedObjectContext = [[NSManagedObjectContext alloc] init];
        [managedObjectContext setPersistentStoreCoordinator:coordinator];
    }
    
    return managedObjectContext;
}

- (NSManagedObjectModel *)managedObjectModel 
{
    if (managedObjectModel != nil) {
        return managedObjectModel;
    }
    
    //从本地所有xcdatamodel文件中获得这个CoreData的数据模板
    managedObjectModel = [[NSManagedObjectModel mergedModelFromBundles:nil] retain];
    
    return managedObjectModel;
}

- (NSPersistentStoreCoordinator *)persistentStoreCoordinator 
{
    if (persistentStoreCoordinator != nil) {
        return persistentStoreCoordinator;
    }
    
    NSURL *storeUrl = [NSURL fileURLWithPath:[[self applicationDocumentsDirectory] stringByAppendingPathComponent:@"TestDB.sqlite"]];//数据库名为TestDB.sqlite
    
    NSError *error;
    persistentStoreCoordinator = [[NSPersistentStoreCoordinator alloc] initWithManagedObjectModel:[self managedObjectModel]];
    
    
    if (![persistentStoreCoordinator addPersistentStoreWithType:NSSQLiteStoreType configuration:nil URL:storeUrl options:nil error:&error]) {
        NSAssert(0, @"persistentStoreCoordinator init failed!");
    }
    
    return persistentStoreCoordinator;
}

- (NSString *)applicationDocumentsDirectory
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *basePath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
    return basePath;
}
- (void)applicationWillTerminate:(UIApplication *)application
{
    /*
     Called when the application is about to terminate.
     Save data if appropriate.
     See also applicationDidEnterBackground:.
     */
    NSError *error;
    if (managedObjectContext != nil) {
        if ([managedObjectContext hasChanges] && ![managedObjectContext save:&error]) {
            NSAssert(0, @"save changes failed when terminage application!");
        }
    }
}
```

完成上述步骤之后，ViewController类里面就可以访问数据库了。
4. 建立数据库模型，如下选择新建文件->Core Data->Data Model

点击下一步输入上面确定的数据库名：TestDB
选中新产生的文件 TestDB.xcdatamodeld,右边的窗口将会变成编辑data model的，如下图点击Add Entity之后输入你要的表名。

完成之后它将出现在如下图（我这里表名是Event）。选中Event点击上图所示的Add Attribute就可以给表增加字段了。

当你把表和字段都建立好了之后。在new file，选择第2张图里面的NSManagedObject subclass。一路next下去。编译器将会自动给每张表生成对应的.h和 .m文件，这样数据模型就ok了。
5. 插入数据
```objc
    CLLocation *location = [locationManager location];
    
    if (!location) {
        return;
    }
    
    Event *event = (Event *)[NSEntityDescription insertNewObjectForEntityForName:@"Event" inManagedObjectContext:managedObjectContext];
    
    CLLocationCoordinate2D coordinate = [location coordinate];
    [event setLatitude:[NSNumber numberWithDouble:coordinate.latitude]];
    [event setLongitude:[NSNumber numberWithDouble:coordinate.longitude]];
    [event setCreationDate:[NSDate date]];
    
    NSError *error = nil;
    if (![managedObjectContext save:&error ]) {
        // handle error
    }
```

6. 查询数据：
```objc
    eventArray = [[NSMutableArray alloc] init];
    
    NSFetchRequest *request = [[NSFetchRequest alloc] init];
    NSEntityDescription *entity = [NSEntityDescription entityForName:@"Event" inManagedObjectContext:managedObjectContext];
    [request setEntity:entity];
    //查询结果排序
   NSSortDescriptor *sortDescriptor = [[NSSortDescriptor alloc] initWithKey:@"creationDate" ascending:NO];
    NSArray *sortDescriptors = [[NSArray alloc] initWithObjects:sortDescriptor, nil];
    
    [request setSortDescriptors:sortDescriptors];
    [sortDescriptors release];
    [sortDescriptor release];
    
    
    NSError *error = nil;
    //NSMutableArray是一个Event对象的数组，这是有上面那条蓝色语句决定的。
    NSMutableArray *mutableFetchResults = [[managedObjectContext executeFetchRequest:request error:&error] mutableCopy];
    
    if (mutableFetchResults == nil) {
        // Handle the error
    }
    
    [self setEventArray:mutableFetchResults];
    [mutableFetchResults release];
    [request release];
```

7. 删除数据
```objc
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    //删除在indexPath处的managed object
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        NSManagedObject *eventToDelete = [eventArray objectAtIndex:indexPath.row];
        [managedObjectContext deleteObject:eventToDelete];
    }
    
    //更新数组和table view
    [eventArray removeObjectAtIndex:indexPath.row];
    [tableView deleteRowsAtIndexPaths:[NSArray arrayWithObject:indexPath ] withRowAnimation:YES];
    
    //提交改动
    NSError *error = nil;
    if (![managedObjectContext save:&error]) {
        //handle error
    }
}
```

8. 忽略修改
```objc
[managedObjectContext reset];
```