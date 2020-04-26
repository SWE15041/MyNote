[toc]

# 一、概要

版本： 5.7.24

MySQL 是一种关联数据库管理系统；

- 查看mysql版本: `mysqladmin --version`

```
[lyn@lyn ~]$ mysqladmin --version
mysqladmin  Ver 8.42 Distrib 5.7.24, for macos10.14 on x86_64
```

## 数据库连接

- 终端登录到mysql客户端:`mysql -u root -p`
- 退出终端：`exit`
- 

# 二、用户管理

## 1. 常用

配置生效：`flush privileges`

操作指定数据库：`use databaseName`

查看数据库列表：`show databases`

查看当前数据库的所有表：`show tables`

查看表结构：`describe tableName`

查看表的字段属性：` show columns from tableName`

```mysql
mysql> use mybatis
Database changed
mysql> show columns from `user`;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| id     | int(11)     | NO   | PRI | NULL    |       |
| name   | varchar(20) | YES  |     | NULL    |       |
| pwd    | varchar(20) | YES  |     | NULL    |       |
| age    | int(3)      | YES  |     | NULL    |       |
| email  | varchar(40) | YES  |     | NULL    |       |
| enable | int(1)      | YES  |     | NULL    |       |
| type   | int(20)     | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
7 rows in set (0.00 sec)
```



查看表的详细索引信息：`show index from tableName`

查看数据库系统的性能和统计信息：`show table status [from dbName] [[like 'pattern']\G];`

```mysql
mysql> show table status from mybatis like 'user'\G;
*************************** 1. row ***************************
           Name: user
         Engine: InnoDB
        Version: 10
     Row_format: Dynamic
           Rows: 9
 Avg_row_length: 1820
    Data_length: 16384
Max_data_length: 0
   Index_length: 0
      Data_free: 0
 Auto_increment: NULL
    Create_time: 2020-04-02 14:08:36
    Update_time: NULL
     Check_time: NULL
      Collation: utf8_general_ci
       Checksum: NULL
 Create_options:
        Comment:
1 row in set (0.00 sec)
```



## 2. 新增用户

2.1 在mysql数据库的user表中新增(失败)

```mysql
INSERT INTO USER ( `Host`, `user`,authentication_string , Select_priv, Insert_priv, Update_priv )
VALUES
	( 'localhost', 'lanyn', PASSWORD ( '123456' ), 'Y', 'Y', 'Y' );
```



2.2 通过grant语句授权并创建用户：

```

```





# 三、MySQL数据库DDL

## 1.数据库管理语句

1. 创建数据库：

   - 数据库客户端内创建：`create database 数据库名`

     ```
      mysql> create database library;
      Query OK, 1 row affected (0.00 sec)
     ```

   - 非客户端创建：` mysqladmin -u 用户名 -p create 数据库名;`

   - ```
     
     ```
   > mysqladmin -u root -p create school;
   
     ```
     
     ```

   - 数据库存在则不创建，不存在则创建，并设置编码

     ```
     CREATE DATABASE IF NOT EXISTS RUNOOB DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
     ```

2. 删除数据库

    - drop： `drop database 数据库名`

      ```
      mysql> drop database library;
      Query OK, 0 rows affected (0.00 sec)
      ```

    - mysqladmin：`mysqladmin -u 用户名 -p drop 数据库名`

      ```
      > mysqladmin -u root -p drop library;
      ```

      

3. 选择数据库

    - 语法：`use 数据库名`
    
    ```
    mysql> use mysql;
Database changed
    ```
    
    

## 2.表管理语句

1. 建表语句

- 语法：`create table 表名 (字段名 字段类型 约束)`

- 例子：

  ``` mysql
  > create table if not exists student
   ( id bigint auto_increment,
     name varchar(20) , 
     age int(3) , 
     primary key (id)
  )engine=innodb default charset= utf8; 
  Query OK, 0 rows affected (0.01 sec)
  ```

  

2. 删表语句

- 语法：`drop table 表名`
- 例子：

```mysql
mysql> drop table student;                                                   
Query OK, 0 rows affected (0.00 sec)
```

​     

3. 修改表结构

```mysql 
# 新增字段
alter table 表名
add 字段 数据类型；

# 删除字段
alter table 表名
drop 字段名；

# 修改字段名和类型
alter table 表名
change 旧字段名 新字段名 数据类型；

# 只修改字段类型
alter table 表名
modify 字段 新数据类型


```





# 四、MySQL数据表DML语句

## 1. 查询语句 select

- 基本语法：

  ```mysql
  SELECT column_name,column_name...
  FROM 表名
  [WHERE Clause]
  [LIMIT N][ OFFSET M]
  
  #  limit 返回的记录数
  #  offset 数据偏移量
  ```

- union

  ```mysql
  #语法：
  select 列1，列2，列3...
  from 表1
  [where ...]
  union [all|distinct]
  select 列1，列2，列3...
  from 表2
  [where ...]
  
  #检索的列要一致；
  #自动去重；
  #结果包含null;
  #union all :返回所有的结果集，包含重复的数据
  ```

  

- 排序：asc|desc

- 分组：group by

- 

## 2. 新增语句 insert

- 插入单条数据：

  ```mysql
  INSERT INTO 表名 ( field1, field2,...fieldN )
              VALUES(value1, value2,...valueN );
  ```

- 例子

  ```mysql
  mysql> insert into student(id,name,age) values(1,'zhangsan',23);
  Query OK, 1 row affected (0.00 sec)
  ```

-  插入多条数据：

  ```mysql
  insert into 表名(字段1,字段2,字段3...)
  values 
  			(值1,值2,值3...),
        (值1,值2,值3...),
        (值1,值2,值3...)
        ....;
  ```

- 例子：

  ```mysql
  mysql>  insert into student(id,name,age)
      ->  values(2,'lisi',20),
      ->  (3,'wangwu',36),
      -> (4,'zhaoliu',12);
  Query OK, 3 rows affected (0.00 sec)
  Records: 3  Duplicates: 0  Warnings: 0
  ```

- 从select语句检索出来插入：

  

## 3. 修改语句 

 - update语法

   ```mysql
   update 表名 
   set 字段1=值1 [，字段2=值2...]
   [where ....]
   ```

- 

## 4. 删除语句 



- delete : 删表数据，可回滚

  ```mysql
  delete from 表名 [where ....]
  ```

- truncate：删表数据，不可回滚

- drop ：删表结构，不可回滚

执行速度：drop>truncate>delete




# 数据类型

https://www.runoob.com/mysql/mysql-data-types.html



# 关键字

1. binary：使用 BINARY 关键字来设定 WHERE 子句的字符串比较是区分大小写的。

   ```mysql
   mysql> select * from student;
   +----+----------+------+
   | id | name     | age  |
   +----+----------+------+
   |  1 | zhangsan |   23 |
   |  2 | lisi     |   20 |
   |  3 | wangwu   |   36 |
   |  4 | zhaoliu  |   12 |
   |  5 | Zhangsan |   12 |
   +----+----------+------+
   5 rows in set (0.00 sec)
   
   mysql> select * from student where  name='zhangsan';
   +----+----------+------+
   | id | name     | age  |
   +----+----------+------+
   |  1 | zhangsan |   23 |
   |  5 | Zhangsan |   12 |
   +----+----------+------+
   2 rows in set (0.00 sec)
   
   mysql> select * from student where binary  name='zhangsan';
   +----+----------+------+
   | id | name     | age  |
   +----+----------+------+
   |  1 | zhangsan |   23 |
   +----+----------+------+
   1 row in set (0.00 sec)
   
   ```

   

2. WITH ROLLUP
3. 





# 四、用户权限

1. 创建用户并分配权限

```mysql
> grant all on mybatis.*to lanyn@'localhost' identified by '123456';
> flush privileges;

mysql> grant all privileges on *.* to lanyn@'%' identified by '123456' with grant option;
```

