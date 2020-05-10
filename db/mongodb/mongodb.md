[toc]

# 地址

https://www.processon.com/view/584e086be4b0d594ec874170#map

# 1 概要

## 1.1 定义

> MongoDB是非关系型数据库管理系统。
>
> MongoDB是文档型数据库 。
>
> MongoDB存放的数据模型是面向文档的：BSON的文档结构 
>
> 默认端口：27017

## 1.2 优点

>
>
>

## 1.3 核心概念

> - 数据库：存放集合
> - 集合：存放文档，类似于数组
> - 文档：文档数据库中的最小单位；

- 创建文档时，如果数据库和集合不存在的时候，MongoDB会自动创建数据库和集合

![image-20200427204519933](https://cdn.jsdelivr.net/gh/SWE15041/MyImg/img/20200427204534.png)

## 1.4 命令

#### 连接命令

- 语法：

  ```
  mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
  ```

- 例子

  ```
  > mongodb://admin:123456@localhost/test
  > mongodb://localhost/test
  > mongodb://localhost:27017/test
  > mongodb://localhost,localhost:27018,localhost:27019
  ```



#### 管理命令

>- show	databases
>- use [db_name]
>- db
>- show collections
>- db.isMaster()

- 创建数据库

  ```
  use db_name
  ```

  如果数据库不存在则创建，存在则切换到指定数据库

- 查看当前所在数据库

  >db

- 其他



#### 增删改查命令

> - db.[collection].insert([document])
> - db.[collection].find()
> - 

- 如果插入文档时，如果没有指定_id ，MongoDB会自动生成一个ObJectId；





# 2 基本操作

## 2.1 database

- 保留数据库
  - admin
  - local
  - config

### 2.1.1 use db_name

- 作用：
  - 创建数据库
  - 切换数据库

- 例子

  ```
  //切换
  > use admin
  switched to db admin
  // 创建并切换到mydb 
  > use mydb
  ```

### 2.1.2 show dbs

- 作用：查看所有的数据库

- 例子

  ```
  > show dbs
  admin             0.000GB
  config            0.000GB
  core_ng_practice  0.000GB
  local             0.001GB
  ```

### 2.1.3 db 

- 作用：查看当前use的数据库

- 例子

  ```
  > use mydb
  > db
  Result
  mydb
  
  > use local
  > db
  Result
  local
  ```

  

### 2.1.4 db.dropDatabase()

- 作用：删除当前use的数据库

- 注意：admin 、config 、local 不可删除

- 例子

  ```
  > use mydb
  > db.dropDatabase()
  > show dbs
  switched to db mydb
  admin             0.000GB
  config            0.000GB
  core_ng_practice  0.000GB
  local             0.001GB
  ```

  

## 2.2  collection

- 集合操作的前提
  - 切换到相应的数据库

### 2.2.1 创建集合

- 显示创建

  - 语法：`db.createCollection(name, options)`

  - 例子

    ```
    > db.createCollection('myclo')
    ```

    

- 隐式创建

  - 实现：`db.collection.insert(....)`

  - 例子

    ```
    > db.noncol.insert({'name':'lyn'})
    _id							name
    5eb509fc110f0000cc006342	lyn
    ```

    

### 2.2.2 查看集合

- 语法：`show collections`

- 例子

  ```
  > show collections
  myclo
  noncol
  ```

  

### 2.2.3 集合重命名

- 语法：` db.collection.renameCollection(target, dropTarget)`

  - target ：集合新名称
  - dropTarget ：可选，值 (true|false) 
    - true  => 新集合名称如果存在，先删除同名的集合，再创建
    - false => 新集合名称如果存在，则重命名失败

- 例子

  ```
  //noncol -> product
  > db.noncol.renameCollection('product')
  // 重命名的名称已存在
  > db.createCollection('noncol') 
  > db.createCollection('cutomers')
  > db.noncol.renameCollection('cutomers' ,true)
  ```

  

### 2.2.4 删除集合

- 语法：`db.collection.drop()`

- 例子

  ```
  > db.createCollection('noncol') 
  > db.noncol.drop()
  ```

  

## 2.3  document

### 2.3.1 插入

- 语法：

  - ` db.collection.insert(document, options)`
  - `db.collection.insertOne(document, options)`
  - `db.collection.insertMany(document, options)`
    - options：
    - 

- 例子

  ```
  
  > db.createCollection('cutomers')
  //  插入单个doc
  > db.cutomers.insertOne({'name':'zhangsan','age': 90})
  > db.cutomers.insert({'name':'lyn',age: 18})
  
  _id							name		age
  5eb511eb110f0000cc006346	zhangsan	90
  5eb511f4110f0000cc006347	lyn			18
  
  // 插入多个doc
  > db.cutomers.insert([
  	{'name':'lisi','age':100 },
      {'name':'yanni',age:22,'email':'123@qq.com'}])
  > db.cutomers.insertMany([
  	{'name':'lisi','age':100 },
  	{'name':'yanni',age:22,'email':'123@qq.com'}])
  	
  _id							name	age		email
  5eb512ed110f0000cc00634a	lisi	100	
  5eb512ed110f0000cc00634b	yanni	22		123@qq.com
  
  ```

  

### 2.3. 2 更新

- 语法：

  - `db.collection.update(query, update, options)`
  - `db.collection.updateOne(query, update, options)`
  - `db.collection.updateMany(query, update, options)`

  ```db
  db.collection.update(
     <query>,
     <update>,
     {
       upsert: <boolean>,
       multi: <boolean>,
       writeConcern: <document>,
       collation: <document>,
       arrayFilters: [ <filterdocument1>, ... ],
       hint:  <document|string>        // Available starting in MongoDB 4.2
     }
  )
  ```

  - query ：定义查询条件
  - update ：定义 对检索到的文档 需要做的修改
  - upsert ： 默认值false， 如果检索不到则创建，创建文档内容来源于update的定义
  - multi ：默认值false,
    - false   =>  (更新检索到的第一个文档)
    - true    =>  更新检索到的所有文档
  - collation
  - arrayFilters
  - hint

- 例子

  ```
  > db.cutomers.update({'name': 'lyn' }, {'name':'LYN'})
  > db.cutomers.update({'name': 'lyn', 'age' : '$gt 100 '}, {'name':'LYN','age': 101},{upsert:true})
  > db.cutomers.update({'name': 'lyn'}, {$set:{'name':'ZhangSan','age': 102}} , {multi : true})
  >
  ```

  

### 2.3.3 新增

- 语法：`db.cutomers.save(document, options)`

  ```
  db.collection.save(
     <document>,
     {
       writeConcern: <document>
     }
  )
  ```

- 作用：更新已存在的文档 或 新增文档

- 例子：

  ```
  > db.createCollection('cutomers')
  
  //指定_id,第一条新增，第二条更新
  > db.cutomers.save({'_id': 1 ,'name':'wangwu','age':11})
  > db.cutomers.save({'_id': 1 ,'name':'WangWu','age':11})
  
  //无指定_id,都是新增
  > db.cutomers.save({'name':'aha','age':11,'email':'1222@qq.com'})
  > db.cutomers.save({'name':'Aha','age':11,'email':'8888@qq.com'})
  ```

  

### 2.3.4 删除

- 语法：`db.collection.remove(query, options)`

  ```
  db.collection.remove(
     <query>,
     {
       justOne: <boolean>,
       writeConcern: <document>,
       collation: <document>
     }
  )
  ```

- 作用：移除集合中的文档

- 参数解析

  - query：查询条件
  - justOne：默认false，
    - false： 删除满足条件的 **全部**
    - true ：删除满足条件的**第一个**

- 例子

  ```
  // 删除单个
  > db.cutomers.remove({ 'age' : {$lt : 12 }} ,{justOne:true})
  > db.cutomers.remove({ 'name' : 'aha'} ,{justOne:true})
  > db.cutomers.remove({ 'name' : 'aha'} ,true)
  
  // 删除所有
  > db.cutomers.remove({})
  ```

  

### 2.3.5 查询 

- 语法：

  - db.cutomers.find()
  - db.cutomers.find(query, projection)
  - db.cutomers.findOne(query, projection)
  - db.cutomers.findAndModify(document)
  - db.cutomers.findOneAndDelete(filter, options)
  - db.cutomers.findOneAndUpdate(filter, update, options)
  - db.cutomers.findOneAndReplace(filter, replacement, options)

- 例子

  ```
  >  
  ```

  

## 2.4  index

- 语法：

- 例子

  ```
  >  
  ```

  

# $操作符

## $(projection)



## $elemMatch(projection)

## $meta

## $slice(projection)

- 语法：

  - `db.collection.find( { field: value }, { array: {$slice: count } } );`

    - count : 正数、负数值都可以

  - `db.collection.find( { field: value }, { array: {$slice:  [ skip , limit ] } } ); `

    

- 作用：控制返回项的数量

- 例子

  ```
  db.posts.find( {}, { comments: { $slice: 5 } } )
  db.posts.find( {}, { comments: { $slice: -5 } } )
  db.posts.find( {}, { comments: { $slice: [ 20, 10 ] } } )
  ```

  

# docker+mongodb

> docker exec -it --user root 9ece70e4547a /bin/bash

- 进入mongodb容器。

# monogodb副本

rs.initiate()：启动一个新的副本集。

rs.conf()：查看副本集的配置

```
mongod --port "PORT" --dbpath "YOUR_DB_DATA_PATH" --replSet "REPLICA_SET_INSTANCE_NAME"
```



# 应用（JAVA）





# 异常

1 更新时异常

```
> db.createCollection('cutomers')
> db.cutomers.update({'name': 'zhangsan'}, {'name':'LYN','age': 101} , {multi : true})
Invalid key 'name': update only works with $ operators
```

- 解决：multi=true时，进行多文档更新要用$set

```
db.cutomers.update({'name': 'lyn'}, {$set:{'name':'ZhangSan','age': 102}} , {multi : true})
```

