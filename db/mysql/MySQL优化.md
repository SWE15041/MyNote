[toc]

# 五、索引

定义：

注：

		-  索引由存储引擎实现，不是服务层
		-  不同的存储引擎支持的索引类型不同
		-  同一索引在不同的存储引擎中的底层实现可能不同

​			

5.1 索引类型

- B-Tree索引

  >作用
  >
  >- 全值匹配
  >- 最左前缀匹配（index=(a,b,c)列时，只使用a列）
  >- 列前缀匹配(index=(a,b,c)时，查a中以J开头的值)
  >- 范围值匹配
  >- 精确匹配+范围匹配
  >- 只访问索引的查询（只访问索引，不访问数据行）
  >
  >

- 哈希索引

  >支持的引擎：
  >
  >- Memory引擎
  >- InnoDB中的“自适应哈希索引”
  >
  >计算：
  >
  >- 对于每一行数据，对所有索引列计算一个哈希值
  >- 哈希值=hash(索引列1值+索引列2值+...+当前行索引列N值)
  >
  >作用：
  >
  >
  >
  >优点：
  >
  >缺点：
  >
  >- 哈希索引=（哈希值，行指针），不存放字段值
  >- 不能进行排序
  >- 不支持部分索引列匹配查找
  >- 只支持等值查询
  >- 当哈希冲突多时，维护代价高
  >
  >

- 
