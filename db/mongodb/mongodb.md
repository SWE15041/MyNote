[toc]

# 一、概要

## 1、定义

> MongoDB是非关系型数据库管理系统。
>
> MongoDB是文档型数据库 。
>
> MongoDB存放的数据模型是面向文档的：BSON的文档结构 
>
> 默认端口：27017

## 2、优点

>
>
>

## 3、核心概念

> - 数据库：存放集合
> - 集合：存放文档，类似于数组
> - 文档：文档数据库中的最小单位；

- 创建文档时，如果数据库和集合不存在的时候，MongoDB会自动创建数据库和集合



## 4、命令

#### 管理命令

>- show	databases
>- use [db_name]
>- db
>- show collections

#### 增删改查命令

> - db.[collection].insert([document])
> - db.[collection].find()
> - 

- 如果插入文档时，如果没有指定_id ，MongoDB会自动生成一个ObJectId；