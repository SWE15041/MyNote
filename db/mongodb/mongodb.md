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

#### 文档（document）

- 创建文档时，如果数据库和集合不存在的时候，MongoDB会自动创建数据库和集合

![image-20200427204519933](https://cdn.jsdelivr.net/gh/SWE15041/MyImg/img/20200427204534.png)

- 文档结构：字段(名：值)对

  - 字段名：字符串类型
  - 值：bson支持的数据类型

- 文档分类：

  - 基本文档结构
  - 查询过滤器文档结构
  - 更新文档结构
  - 索引文档结构

  ```
  // 基本文档结构
  {
     field1: value1,
     field2: value2,
     field3: value3,
     ...
     fieldN: valueN
  }
  
  // 嵌入式文档结构
   
  
  // 查询过滤器文档结构
  {
    <field1>: <value1>,
    <field2>: { <operator>: <value> },
    ...
  }
  
  // 更新文档结构
  {
    <operator1>: { <field1>: <value1>, ... },
    <operator2>: { <field2>: <value2>, ... },
    ...
  }
  
  // 索引文档结构
  { <field1>: <type1>, <field2>: <type2>, ...  }
  ```

- 特殊字段："_id"
  - 字段名："_id"，
  - 特点：主键，唯一；唯一索引；
  - 字段值：除数组以外的任意bson数据类型
- 文档限制
  - 最大容量：16MB （超过16MB可以选用：GridFS ）
  - 字段排序："_id"始终为第一个字段
  - 

## 1.4 命令

#### 查看Mongo 版本

```
db.version()
```

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
    - false => （默认值）新集合名称如果存在，则重命名失败

- 例子

  ```
  //noncol -> product，如果重命名的名称已存在,则重命名失败
  > db.noncol.renameCollection('product')
  
  // 如果重命名的名称已存在,则删除旧，再重命名
  > db.createCollection('noncol') 
  > db.createCollection('cutomers')
  > db.noncol.renameCollection('cutomers' ,true)
  ```
```
  
  

### 2.2.4 删除集合

- 语法：`db.collection.drop()`

- 例子

```
  > db.createCollection('noncol') 
  > db.noncol.drop()

  ```
  
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
  - multi ：默认值：false,
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

> remove

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
  - justOne：
    - false：**（默认值）** 删除满足条件的 **全部** 
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

> 

### 2.3.5 查询 

- 语法：

  - db.collection.find()
  - db.collection.find(query, projection)
  - db.collection.findOne(query, projection)
  - db.collection.findAndModify(document)
  - db.collection.findOneAndDelete(filter, options)
  - db.collection.findOneAndUpdate(filter, update, options)
  - db.collection.findOneAndReplace(filter, replacement, options)

- 参数解析

  - query：查询条件，
    - projection : 用于指定返回字段
      - `field : 1 || true`  => 定义返回字段
      - `field : 0 || false` => 定义剔除字段
    - 注：
      - 返回字段不能同时设置 包含字段和 剔除字段，但是`_id`字段例外
      - **默认返回字段包含：`_id`**，可以使用`{_id:0}`剔除该字段
  
-  db.collection.find()

  ```
  // 测试数据
  db.inventory.insertMany( [
     { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
     { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
     { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
     { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
     { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
  ]);
  ```

  

  ```
  //正确
  > db.inventory.find( {}, { _id: 0, item: 1, status: 1 } );
  > db.inventory.find( { }, { item: 1, status: 1 } );
  > db.inventory.find( {}, { _id: 0, item: 0, status: 0 } );
  > db.inventory.find( { }, { item: 0, status: 0 } );
  ```

  ```
   //错误:除_id字段外，同时定义了 剔除和返回字段
  > db.inventory.find( {}, { _id: 0, item: 0, status: 1 } );
  > db.inventory.find( { }, { item: 1, status: 1 } );
  ```
  
  ```
  // 查询结果集-操作函数
  // 排序：（1 -> 升序） （-1 -> 降序）
  db.bios.find().sort( { name: 1 } )
  
  db.bios.find().limit( 2 )
  
  db.bios.find().skip(9 )
  
  // collation : 允许用户为字符串比较指定特定于语言的规则
  db.bios.find( { "name.last": "hopper" } ).collation( { locale: "en_US", strength: 1 } )
  
  // 结果一样，先执行limit再执行sort
  db.bios.find().sort( { name: 1 } ).limit( 5 )
  db.bios.find().limit( 5 ).sort( { name: 1 } )
  
  ```
  
  

- db.collection.findAndModify(document)  

  - 作用： 默认查询得到的结果集不做修改，修改的部分更新到数据库
  - 语法

  ```
  db.collection.findAndModify({
      query: <document>,
      sort: <document>,
      remove: <boolean>,
      update: <document or aggregation pipeline>, // Changed in MongoDB 4.2
      new: <boolean>,
      fields: <document>,
      upsert: <boolean>,
      bypassDocumentValidation: <boolean>,
      writeConcern: <document>,
      collation: <document>,
      arrayFilters: [ <filterdocument1>, ... ]
  });
  ```

  ```
  解析
  - query : 查询条件
  - sort ：排序，如果使用了这个字段，且查询的结果为空，则返回{}，如果没有使用这个字段，且查询的结果为空，则返回null;
  - remove : 对查询的结果文档进行删除，（remove和update互斥，必须一个选项存在）
  - update : 对查询的结果进行修改，并更新到数据库
  - new : （只对update时有效）
  	- true : 返回的结果集为修改后的文档，而不是查询到的文档
  	- false : 默认值，默认不修改查询时返回的结果集；
  - fields ： 定义要返回的字段集
  - upsert ：与update配合使用； 如果查询不到，则把query新增到数据库
  - bypassDocumentValidation ： ？
  - writeConcern ：？
  - collation ： 指定字符串比较规则
  	（https://docs.mongodb.com/manual/reference/collation/#collation-document-fields）
  - arrayFilters：作用于update，用于确定需要更新的数组字段 （应用不熟悉） ？
  
  ```

  

- db.collection.findOne(query, projection) 

- db.collection.findOneAndDelete(filter, options) 

- 

### 2.3.5 查询（数组）

- https://docs.mongodb.com/manual/tutorial/query-arrays/
- 分类
  - 匹配数组
  - 匹配数组中的元素

- 测试数据

  ```
  db.inventory.insertMany([
     { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
     { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
     { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
     { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
     { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
  ]);
  ```

- 匹配数组

  - 例子

  ```
  // 按顺序匹配包含"red"和"blank"的数组
  > db.inventory.find( { tags: ["red", "blank"] } )
  
  // 不按顺序匹配包含"red"和"blank"的数组：$all
  > db.inventory.find( { tags: { $all: ["red", "blank"] } } )
  
  ```

- 匹配数组中的元素

  - 语法

    ```
    { <array field>: { <operator1>: <value1>, ... } }
    ```

  - 例子

  ```
  // 至少有一个元素满足条件即匹配
  > db.inventory.find( { dim_cm: { $gt: 25 } } )
  // 数组中的元素满足条件1，另一个元素满足条件2，或一个元素同时满足条件1和条件2
  > db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } )
  // 数组中的一个元素同时满足所有条件:$elemMatch
  > db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )
  
  // 指定索引位置查询
  > db.inventory.find( { "dim_cm.1": { $gt: 25 } } )
  
  // 查询指定长度的数组：$size
  > db.inventory.find( { "tags": { $size: 3 } } )
  ```



  ## 2.4  index

- 语法：

- 例子



# 操作符

## 查询操作符 

#### https://docs.mongodb.com/manual/reference/operator/query/#query-selectors

### 比较操作符

>- $eq
>- $gt
>- $gte
>- $lt
>- $lte
>- $ne
>- $in    ：匹配数组中指定的任何值
>- $nin  ：不匹配数组中的任何值

- 语法：{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
- 例子

```
//普通用法
> db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
//正则匹配
> db.inventory.find( { tags: { $in: [ /^be/, /^st/ ] } } )
```



### 逻辑操作符

> - $and
> - $or
> - $not
> - $nor

- 语法：{ $nor: [ { <expression1> }, { <expression2> }, ...  { <expressionN> } ] }

- 例子

  ```
  // 返回price != 99 && sale != true
  > db.inventory.find( { $nor: [ { price: 1.99 }, { sale: true } ]  } )
  // $and运算式可以省略
  > db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
  > db.inventory.find( { price: { $ne: 1.99, $exists: true } } )
  ```

  

### 元素操作符

>- $exists ：判断字段是否存在
>- $type：判断字段的数据类型

- 语法：

  - { field: { $exists: <boolean> } }

  - -----------------------------------------------

  - { field: { $type: <BSON type> } }  

  - { field: { $type: [ <BSON type1> , <BSON type2>, ... ] } }

- 官网：https://docs.mongodb.com/manual/reference/operator/query/type/#op._S_type

- 例子

  ```
  > db.records.find( { a: { $exists: true } } )
  > db.records.find( { b: { $exists: false } } )
  
  > db.addressBook.find( { "zipCode" : { $type : 2 } } );
  > db.addressBook.find( { "zipCode" : { $type : 'string' } } );
  > db.addressBook.find( { "zipCode" : { $type : 'double' } } );
  > db.grades.find( { "classAverage" : { $type : [ "string" , "double" ] } } );
  
  ```

  

### Evaluation

> - $regex 
> - $expr 
> - 。。。。

- $regex :

  - { <field>: /pattern/<options> }
  - { <field>: { $regex: /pattern/, $options: '<options>' } }
  - { <field>: { $regex: 'pattern', $options: '<options>' } }
  - { <field>: { $regex: /pattern/<options> } }

- 例子

  ```
  > { name: { $in: [ /^acme/i, /^ack/ ] } }
  ```

- $expr 

  - { $expr: { <expression> } }

  - 可以使用管道

  - 例子

    ```
    // spent > budget
    > db.monthlyBudget.find( { $expr: { $gt: [ "$spent" , "$budget" ] } } )
    ```

    ```
    > db.monthlyBudget.insertMary([
    { "_id" : 1, "category" : "food", "budget": 400, "spent": 450 },
    { "_id" : 2, "category" : "drinks", "budget": 100, "spent": 150 },
    { "_id" : 3, "category" : "clothes", "budget": 100, "spent": 50 },
    { "_id" : 4, "category" : "misc", "budget": 500, "spent": 300 },
    { "_id" : 5, "category" : "travel", "budget": 200, "spent": 650 }
    ])
    ```

    

### 数组操作符

### projection操作符

> - $
> - $elemMatch
> - $slice

- **$** ：返回数组中匹配到的第一个元素，（对已经查询到的结果，再处理）

- 例子

  ```
  > db.students.insert([
  { "_id" : 1, "semester" : 1, "grades" : [ 70, 87, 90 ] },
  { "_id" : 2, "semester" : 1, "grades" : [ 90, 88, 92 ] },
  { "_id" : 3, "semester" : 1, "grades" : [ 85, 100, 90 ] },
  { "_id" : 4, "semester" : 2, "grades" : [ 79, 85, 80 ] },
  { "_id" : 5, "semester" : 2, "grades" : [ 88, 88, 92 ] },
  { "_id" : 6, "semester" : 2, "grades" : [ 95, 90, 96 ] }
  ])
  > db.students.find( { semester: 1, grades: { $gte: 85 } },{ "grades.$": 1 } )
  > db.students.find( { semester: 1, grades: { $gte: 85 } } )                  
  ```

- **$elemMatch** ：数组中至少有一个元素同时满足查询所指定的**所有的条件**，

  - 返回匹配到的第一个字段，如果没有满足条件，则该部分的字段不返回

- https://docs.mongodb.com/manual/reference/operator/projection/elemMatch/#proj._S_elemMatch
  
- **$slice** ：限制数据返回的项数

  - db.collection.find( { field: value }, { array: {$slice: count } } );
  - db.collection.find( { field: value }, { array: {$slice: [skip,limit]} } );
    - count ：值可正、可负
    - skip : 偏移量，从0开始
    - limit : 需要返回的数量

  ```
  // 前5行
  > db.posts.find( {}, { comments: { $slice: 5 } } )
  // 后5行
  > db.posts.find( {}, { comments: { $slice: -5 } } )
  > db.posts.find( {}, { comments: { $slice: [ 20, 10 ] } } )
  // 从倒数第20项开始的10条记录
  ```
> db.posts.find( {}, { comments: { $slice: [ -20, 10 ] } } )
  
  ```
  
  ```

- $meta : 

  - 作用：排序（sort）

  - 语法：

    ```
    db.collection.find(
       <query>,
       { score: { $meta: "textScore" } }
    )
    ```

  - 例子：

    ```
    // score 不是文档里面的字段，但是返回的结果集中包含该字段
    db.bios.find(
       { },
       {
         _id: 0,
    		 name : 1 ,
    		 score : {$meta : 'textScore'}
       }
    )
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





# 问题

## 1 minkey maxkey没看懂