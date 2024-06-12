---
title: Oracle 学习小结
publishDate:  2012-01-31 23:17:40
category: 编程思想
image: ~/assets/images/aldis/2012/22.png
tags: 
  - 数据库
  - Oracle
---

```sql
一.Oracle数据库中常用的数据类型   
varchar2(长度)可变长字符串   
char(长度) 定长   
number()表示整数或者浮点数number(8) number(8,2)   
clog 字符的大对象   
blog 二进制的大对象   
  
二.数据库查询   
1）SELECT语句   
从表中提取查询数据.语法为SELECT [DISTINCT] {column1,column2,…} FROM tablename WHERE {conditions} GROUP BY {conditions} ORDER BY {expressions} [ASC/DESC];   
说明：SELECT子句用于指定检索数据库的中哪些列，FROM子句用于指定从哪一个表或视图中检索数据。   
2）WHERE子句。   
WHERE子句用来选择符合条件的的记录.   
like '...' 通配查询 _,%   
between ... and ... ,表示结果在这之间，between and是一个闭区间。   
!=，<>，^=，这三个都可以表示不等于。   
in (va1,val2,...) 判断结果是否在这个集合中存在 。   
like '...' 字符串通配查询，'%'表示0或多个字符，'_'表示一个字符。   
... and ... 表示只有两个条件同时满足   
... or ... 表示条件只要满足其中之一就可以   
all ... 是要求都满足条件。   
not .....，则是可以与以上的条件产生反效果。   
... is null 使用来判断值是不是空。   
1) ORDER BY子句   
ORDER BY 子句使得SQL在显示查询结果时将各返回行按顺序排列，返回行的排列顺序由ORDER BY 子句指定的表达式的值确定。   
ASC（默认，升序） DESC（降序）   
order by 目标列名（别名） 排序顺序（不写排序顺序，会默认为升序排序）   
例：select first_name from s_emp order by first_name;   
select first_name from s_emp order by first_name desc;   
  
三.SQL常用的命令分类及例子   
数据定义语言：create（创建）、alter（更改）和drop（删除）命令。   
数据操纵语言：insert（插入）、select（选择）、delete（删除）和update（更新）命令。   
事务控制语言：commit（提交）、savepoint（保存点）和rollback（回滚）命令。   
数据控制语言：grant（授予）和revoke（回收）。   
1.数据定义语言举例：   
SQL> create table myTab(no number(4),name varchar2(20));创建一个名为myTab的表，包含两列no和name；   
SQL> alter table myTab modify (name varchar2(25));修改myTab中的name列，使此列能容纳25个字符；   
SQL> alter table myTab add (tel_no varchar2(20));给表myTab增加一列tel_no；   
SQL> alter table myTab drop column tel_no;删除表myTab的tel_no列;   
SQL> drop table myTab;删除表myTab；   
SQL> truncate table myTab;删除表myTab中的所有行（截断表）,注意:不可以回滚。   

<!-- more -->

2.数据操纵语言举例：   
SQL> insert into myTab values(‘001’,’John’);   
向表myTab中插入一行数据；   
SQL> select distinct salary “薪水” from s_emp where salary>1500 order by sal desc;   
选择表中salary大于1500的数据，以别名“薪水”显示并按照salary的降序进行排列输出；   
SQL> create table empa as select empno,ename,job,sal from emp;   
从emp表中选择“empno,ename,job,sal”四列的数据建立新表empa;   
SQL> create table empa as select * from emp where 1=2;   
使用一个假条件根据现有表emp创建一个只包含结构的空表empa；   
SQL> delete from empa where sal<1500;   
删除表empa中sal小于1500的行；   
SQL> update empa set sal=1500 where sal<1500;更新，将表empa中sal小于1500的行的sal值全部改为1500。   
  
3.事务控制语言举例：   
SQL> commit;用于提交并结束事务处理；   
SQL> savepoint mark1;保存点类似于标记，用来标记事务中可以应用回滚的点；   
SQL> rollback to savepoint mark1;回滚到保存点mark1。   
  
四.Oracle数据库函数   
注意:dual表(虚表)是专门用于函数测试和运算的.   
1.字符函数   
   字符是大小写敏感的   
   转小写 lower(字段名)   
   转大写 upper(字段名)   
   首字母大写 initcap(字段名)   
   字符串拼接 concat(字段1, 字段2)   
   截取子串 substr(字段名, 起始位置，取字符个数)   
例: select first_name,substr(first_name,2,2) sub from s_emp;（从名字的第二个字符开始取两个字符）   
select first_name,substr(first_name,-2,2) sub from s_emp;（从名字的倒数第二个字符开始取两个字符）   
2.数值函数   
   四舍五入函数 round(数据,保留到小数点后几位)   
   1表示保留到小数点后一位，-1表示保留到小数点前一位。   
   例：select round(15.36,1) from dual;   
   截取数值函数 trunc(数据，保留到小数点后几位)   
   例：select trunc(123.456,1) from dual;   
截取到小数点后一位,注意:与round函数不同,不会四舍五入。   
3.日期函数   
   缺省日期格式，日-月-年 dd-mon-rr   
   修改当前会话的日期格式，会按照指定的格式输出日期   
   alter session set nls_date_format='yyyy mm dd hh24:mi:ss';   
   返回当前日期 sysdate   
   例：select sysdate from dual;   
4.不同数据类型间转换函数   
   将日期转成字符 tochar(date,'日期格式')   
   日期格式要用有效格式，格式大小写敏感 'yyyy mm dd hh24:mi:ss'(标准日期格式),'year'(年的全拼),'month'(月的全拼)，'day'(星期的全拼)，'ddspth' (日期的全拼)   
   例：select to_char(sysdate,'yyyy mm dd hh24:mi:ss')from dual;   
select to_char(sysdate,'year month day ddspth')from dual;   
   将字符串转成日期 to_date('...','日期格式')   
   例：select to_char(to_date('2006 11 03','yyyy mm dd'),'dd-month-yy') from dual；   
  
五.表连接（关联查询）   
等值连接   
select table1.column1，table2.column2   
from table1 t1，table2 t2   
where t1.column3=t2.column4;   
表连接时，当表与表之间有同名字段时，可以加上表名或表的别名，加以区分，使用时要用表名.字段名或表别名.字段名（列名）。当表的字段名是唯一时，可以不用加上表名或表的别名。   
注意：当为表起了别名，就不能再使用表名.字段名了。   
例如：select e.first_name ||’ ’|| e.last_name name,   
d.name dept_name   
from s_emp e, s_dept d   
where e.dept_id=d.id;   
  
非等值连接   
select [表别名1.字段名1]，[表别名2.字段名2],...   
from 表1 表别名1 ，表2 表别名2   
where 表别名1.字段名3 ..... 表别名2.字段名4   
....可以使比较运算符，也可以使其他的除了'='的运算符   
例：select first_name, salary   
from s_emp   
where salary between 1000 and 2000;   
  
自连接   
把一个表的两个字段关系转换成两个表字段之间的关系.   
select [表别名1.字段名1]，[表别名2.字段名2],...   
from 表1 表别名1 ，表1 表别名2   
where 表别名1.字段名3=表别名2.字段名4;   
例：select a.first_name ename,b.first_name cname   
from s_emp a,s_emp b   
where a.manager_id=b.id;   
  
外连接   
使用一张表中的所有记录去和另一张表中的记录按条件匹配(空值也会匹配)这个表中的所有记录都会显示。   
//想在哪边模拟记录就在哪边加上(+)   
1. LEFT OUTER JOIN：左外连接   
SELECT e.last_name, e.dept_id, d.name   
FROM s_emp e   
LEFT OUTER JOIN s_dept d   
ON (e.dept_id = d.id);   
等价于   
SELECT e.last_name, e.dept_id, d.name   
FROM s_emp e, s_dept d   
WHERE e.dept_id=d.id(+);   
结果为：所有员工及对应部门的记录，包括没有对应部门编号dept_id的员工记录。   
2. RIGHT OUTER JOIN：右外连接   
SELECT e.last_name, d.name   
FROM s_emp e   
RIGHT OUTER JOIN s_dept d   
ON (e.dept_id = d.id);   
等价于   
SELECT e.last_name,d.name   
FROM s_emp e, s_dept d   
WHERE e.dept_id(+)=d.id;   
结果为：所有员工及对应部门的记录，包括没有任何员工的部门记录。   
3. FULL OUTER JOIN：全外关联   
SELECT e.dept_id,d.id   
FROM s_emp e   
FULL OUTER JOIN s_dept d   
ON (e.dept_id = d.id);   
  
结果为：所有员工及对应部门的记录，包括没有对应部门编号department_id的员工记录和没有任何员工的部门记录。   
六.组函数   
group by把 select 的结果集分成几个小组，这个group by 子句可以跟在 select 语句后或是 having前面。group by子句也会触发排序操作，会按分组字段排序。   
select [组函数或分组的字段名]... from 表名 group by [字段名1],[字段名2],.....；   
例：select avg(salary) from s_emp group by dept_id;   
注意：组函数会忽略空值，但是count(*)除外，他会把空记录也记录在内。avg和sum这两个函数的参数只能是number型的。   
以下所提到的函数可以使用任意类型做参数。   
max(..),min(..)求最大值和最小值，   
count(*)统计表中记录数。   
例：select max(b.name),avg(a.salary), max(c.name)   
from s_emp a,s_dept b,s_region c   
where a.dept_id=b.id   
and b.region_id=c.id   
group by b.id;   
注意：只要写了group by子句，select后就只能用group by之后的字段或者是组函数。having子句可以过滤组函数结果或是分组的信息，并且写在group by子句后。   
  
七.子查询   
可以嵌在sql语句中的select语句。   
在select语句中嵌套子查询时，会先执行子查询。一般的会将子查询放在运算符的右边。   
注意：在使用子查询时，要注意这个运算符是单行的（也就是只能是单值），还是多行运算符（范围，多值）。配合使用子查询返回的结果必须符合运算符的用法。   
例:   
select first_name||' '||last_name name   
from s_emp   
where title in (select title from s_emp   
where dept_id=42);   
查询和42部门员工职位相同的所有员工的姓名   
  
八.约束   
针对表中的字段进行定义的。   
primary key（主键约束 PK）保证实体的完整性，保证记录的唯一   
主键约束，唯一且非空，并且每一个表中只能有一个主键，有两个字段联合作为主键时，将两个字段放在一起唯一标识记录，叫做联合主键。   
主键约束的定义：   
第一种定义形式：   
create table test(c number primary key );        列级约束   
第二种定义形式：   
create table test(c number , primary key(c) ) ;        表级约束   
create table test(c1 number constraints   pk_c1 primary key );   此约束有名字: pk_c1   
create table   test(c number , c2 number , primary key (c ,c1) ) ; 用表级约束可以实现联合主键   
  
foreign key（外键约束 FK）保证引用的完整性，外键约束，外键的取值是受另外一张表中的主键或唯一键的约束，不能够取其他值，只能够引用主键或唯一键的值，被引用的表，叫做 parent table（父表），引用方的表叫做child table（子表），要想创建子表，就要先创建父表，记录的插入也是如此，先父表后子表，删除记录，要先删除子表记录，后删除父表记录，要修改记录，如果要修改父表的记录要保证没有被子表引用。要删表时，要先删子表，后删除父表。(可以通过使用cascade constraints 选项来删除父表)   
carete   table     parent(c1 number primary key );   
create   table    child (c number primary key ,   c2 number references parent(c1));   
或表级约束定义:   
create   table child( c number primary key , c2 number , foreign key(c2) references parent(c1));   
非空约束（not null）这是一个列级约束,在建表时,在数据类型的后面加上 not null ，也就是在插入时不允许插入空值。   
例：create table student(id number primary key,name varchar2(32) not null,address varchar2(32));   
unique 唯一约束   
唯一约束，允许为空，要求插入的记录中的值是唯一的。   
例：create table student(id number，name varchar2(32),address varchar2(32),primary key (id),unique (address));   
check约束   
检查约束，可以按照指定条件，检查记录的插入。check中不能使用伪列，不能使用函数，不能引用其他字段。   
例：create table sal (a1 number , check(a1>1000));   
  
九.数据字典   
数据字典是由系统维护的，包含数据库的信息   
数据字典示图   
user_XXXXX 用户示图   
all_XXXXX 所有示图   
dba_XXXXX 数据库中所有示图   
v$_XXXXX   动态性能示图   
  
dict或 dictionary 表示数据字典的数据字典。   
user_constraints 用户的表中约束的表   
其中有constraints_name字段存放的是约束名，constraint_type字段存放的是约束的类型,r_constraints_name字段表示外键引用自何处.   
user_cons_column表，是用户的列级约束表,column_name字段存放的是约束字段的名字,position字段存放的是约束在联合键中的位置.   
  
十.事务transaction   
原子操作，也就是不可分割的操作，必须一起成功一起失败。   
事务的结束动作就是commit，DDL,DCL语句执行会自动提交commit。   
sqlplus正常退出是会做提交动作的commit;，当系统异常推出是，会执行回滚操作rollback;。   
一个没有结束的事务，叫做活动的事务 (active transaction),活动的事务中修改的数据，只有本会话才能看见。   
  
十一.Oracle中的伪列   
伪列就像Oracle中的一个表列，但实际上它并未存储在表中。伪列可以从表中查询，但是不能插入、更新或删除它们的值。常用的伪列：rowid和rownum。   
rowid：数据库中的每一行都有一个行地址，rowid伪列返回该行地址。可以使用rowid值来定位表中的一行。通常情况下，rowid值可以唯一地标识数据库中的一行。   
rowid伪列有以下重要用途：   
1）能以最快的方式访问表中的一行；   
2）能显示表的行是如何存储的。   
3）可以作为表中行的唯一标识。   
如：SQL> select rowid,ename from emp;   
rownum：对于一个查询返回的每一行，rownum伪列返回一个数值代表的次序。   
rownum伪列特点：   
1） 有个特点要么等于1 要么小于某个值， 不能直接等于某个值, 不能大于某个值。   
2）常用于分页显示。   
返回的第一行的rownum值为1，第二行的rownum值为2，依此类推。通过使用rownum伪列，用户可以限制查询返回的行数。   
如：SQL>select * from emp where rownum<11; 从emp表中提取10条记录。   
  
十二.序列(sequence)   
create sequence 序列名;   
(不带参数时默认为从1 开始每次递增 1，oracle中为了提高产生序列的效率一般一次性产生20个序列放入当前会话的序列池中备用以加快效率)   
  
sequence 的参数：   
increment by n   起始值   
start with n     递增量   
maxvalue n       最大值   
minvalue n       最小值   
cycle|no cycle     循环   
cache n          缓存(第一次取时会一次取多少个id存起来)   
  
查看sequence 示图：   
desc    user_sequences ;   
select   sequence_name , cache_size , last_number from user_sequences   where   sequence_name like 's_';   
select 序列名.currval from   dual    查看当前的序列数   
select 序列名.nextval from   dual    查看下一个序列数，它会自动给当前的序列加１   
删除序列sequence   
drop sequence 序列名;   
  
十三. 视图(View)   
视图就相当于一条select 语句,定义了一个视图就是定义了一个sql语句, 视图不占空间,使用视图不会提高性能，但是能简化sql语句   
创建视图：   
creating views视图名;   
如：   
create or replace views test as select * from test1 where c1=1;   
create or replace:如果view存在就覆盖，不存在才创建。   
force|no force:基表存在时使用，不存在时则创建该表。   
注意:向视图中插入数据时，会直接插进基表中，查看视图中的数据时，相当于就是执行创建时的select语句。   
删除视图:   
drop views视图名;   
试图的约束:   
with read only视图只读约束   
with check option 不允许插入与where条件不符的记录，类似于check约束的功能.   
create view test_cc   
as select * from test   
where c1>10   
with check option;   
  
十四.索引（index）   
建立索引的目的就是为了加快查询速度,建立索引后会使DML操作效率慢，但是对用户查询会提高效率。删除一个表时，相对应的索引也会删除。另外,索引是会进行排序。   
创建一个索引：   
create index 索引名 on 表名 (字段名);   
create index test_index on test(c1);   
删除索引:   
drop index test_index;   
注意：创建索引就是为了减少物理读，索引会减少扫描的时间。在经常要用到where的子句的字段，应该使用索引，另外还要看所查询的数据与全部数据的百分比，表越大，查询的记录越少，索引的效率就越高.  
```