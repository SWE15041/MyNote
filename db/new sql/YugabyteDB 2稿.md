**YugabyteDB 2稿**



**简介**

YugabyteDB 是一款高性能分布式 SQL 数据库，用于支持全球互联网规模的应用程序。YugabyteDB 结合了高性能文档存储、每个分片分布式共识复制和多分片 ACID 事务，可处理横向扩展 RDBMS 和互联网规模 OLTP 工作负载，具有低查询延迟、极强的故障恢复能力和全球数据分布。作为云原生数据库，它可以部署在公有云和私有云以及 Kubernetes 环境中。

YugabyteDB 非常适合快速增长的云原生应用程序，这些应用程序需要可靠地提供业务关键数据，具有零数据丢失、高可用性和低延迟。



**社区活跃度**



有丰富的官方教程和社区文档，每周五都有官方技术讲座分享，学习资料比较丰富 （官方学习指南：https://university.yugabyte.com/?_gl=1*td25h5*_gcl_au*MjE0NTQ4NjUzNS4xNzE4NDM2NjM2）

兼容PostgreSQL的SQL语法，用户上手快

yugabytedb每年发布4个左右的版本，说明官方开发团队非常活跃,致力于不断完善产品。版本发行和使用周期有限制，自发行日期开始LTS版本系列提供2.5年的support，STS版本系列支持1.5年的support。

版本发行：https://docs.yugabyte.com/preview/releases/ybdb-releases/

产品比较： https://www.yugabyte.com/compare-products/?_gl=1*k86p21*_gcl_au*MjE0NTQ4NjUzNS4xNzE4NDM2NjM2



**开源**

从[v1.3](https://www.yugabyte.com/blog/announcing-yugabyte-db-v1-3-with-enterprise-features-as-open-source/)开始，YugabyteDB 100% 开源。它根据 Apache 2.0 获得许可，源代码可在[GitHub](https://github.com/yugabyte/yugabyte-db)上获取。



**成本**

CPU

1. 按使用付费方式：0.25$/vCPU/hour，最少2个vCPU, 那么每月8个vcpu需要1488$=31*24*0.25*8;
2. 订阅方式：
3. 

存储

磁盘：50GB/per month/vCPU，传输速率0.1$/per month/ per GB; 那么393GB，需要花费

备份：100GB/per month/vCPU 



**SQL兼容**

\- 支持SQL join语法

\- SQL外键

\- 兼容Postgre SQL



**适用场景：**

YugabyteDB 非常适合快速增长的云原生应用程序，这些应用程序需要可靠地提供业务关键数据，并且具有零数据丢失、高可用性和低延迟。常见用例包括：	

- 分布式在线事务处理 (OLTP) 应用程序需要多区域可扩展性，同时又不影响强一致性和低延迟。例如，用户身份、零售产品目录、金融数据服务。
- 混合事务/分析处理 (HTAP)，也称为 Translytical，需要对事务数据进行实时分析的应用程序。例如，用户个性化、欺诈检测、机器学习。
- 流式应用程序需要高效地提取、分析和存储不断增长的数据。例如，物联网传感器分析、时间序列指标、实时监控。







**架构**



逻辑上，Yugabyte 采用两层架构：查询层和存储层。在部署结构中，这两层都位于 TServer 进程中。其中 TServer 负责存储 tablet，每个 tablet 对应一个 Raft Group，分布在三个的节点上，以此保证高可用性。TMaster 负责元数据管理，除了 tablet 的位置信息，还包括表结构等信息。TMaster 本身也依靠 Raft 实现高可用。



**存储**



存储上，分为两种，一种是基于 RocksDB 的本地存储，一种是基于 Tablet 的分布式存储。



基于 RocksDB 的本地存储

每个 TServer 节点上的本地存储称为 DocDB。Yugabyte 也用 RocksDB 来做本地存储。这一层需要将关系型 tuple 以及文档编码为 key-value 保存到 RocksDB 中，其中有不少是为了兼容 Cassandra 设计的。





基于 Tablet 的分布式存储

每张表被分成很多个 tablet，tablet 是数据分布的最小单元，通过在节点间搬运 tablet 以及 tablet 的分裂与合并，就可以实现几乎无上限的扩展，每个 tablet 有多个副本，形成一个 Raft Group，通过 Raft 协议保证数据的高可用和持久性，Group Leader 负责处理所有的写入负载，其他 Follower 作为备份。Master 节点会负责协调 tablet 的搬运、分裂等操作，保证集群的负载均衡。这些操作是直接基于 Raft Group 实现的。



**分片**

YugabyteDB 将表数据拆分成称为“tablet”的较小块，以便数据可以分部分存储在多台机器上。行到tablet的映射是确定性的，此过程称为分片。

YugabyteDB自动拆分表中的数据并将其分布在各个节点上。

YugabyteDB的分片策略：哈希和范围分片，可以只有哈希分片、也可以只有范围分片、也可以先按哈希再按范围分片。



自动分片 和 自动重新平衡





**事务**

https://www.yugabyte.com/blog/yes-we-can-distributed-acid-transactions-with-high-performance/



Yugabyte 的分布式事务采用了 MVCC 结合 2PC 实现。

Yugabyte 的事务状态信息保存在另一个 tablet 上，包括三种可能的状态：Pending、Committed 或 Aborted。事务从 Pending 状态开始，终结于 Committed 或 Aborted。

Yugabyte 文档中提到它除了 Snapshot , Serializable、Read committed 隔离级别，https://docs.yugabyte.com/preview/explore/transactions/isolation-levels/#serializable-isolation



https://docs.yugabyte.com/preview/architecture/transactions/

https://docs.yugabyte.com/preview/explore/transactions/distributed-transactions-ysql/

https://docs.yugabyte.com/preview/explore/fault-tolerance/transaction-availability/



YugabyteDB 使用混合逻辑时钟来生成单调递增的时间戳。

每个语句都将作为一个事务执行。

注意，DocDB 内部的所有更新操作都被视为事务，包括仅更新一行的操作，以及更新驻留在不同节点上的多行的操作。如果autocommit启用模式，则每个语句都将作为一个事务执行。



**混合逻辑时钟**[ ](https://docs.yugabyte.com/preview/architecture/transactions/transactions-overview/#hybrid-logical-clocks)构成了[YugabyteDB 中无锁多版本并发控制](https://docs.yugabyte.com/preview/architecture/transactions/transactions-overview/#multi-version-concurrency-control)的基础。





事务的生命周期

[**步骤 1. 选择一个事务管理器**](https://www.yugabyte.com/blog/yes-we-can-distributed-acid-transactions-with-high-performance/#step-1-pick-a-transaction-manager)



YugabyteDB 有一个内置的事务管理器来管理事务的生命周期。事务管理器在集群中的每个节点上运行（作为[tablet 服务器进程](https://docs.yugabyte.com/latest/architecture/concepts/universe/#yb-tserver)的一部分），并随着节点的添加而自动扩展。









性能优势

 DocDB 的架构 - **Packed rows in DocDB**

- ​		对于包含 100 万行数据的表，使用packed rows进行顺序扫描的速度提高了 2 倍。
- ​		使用packed rows，批量提取 100 万行数据的速度提高了 2 倍。











优势

**与**Amazon Aurora、Google Cloud Spanner、CockroachDB、TiDB等分布式SQL比较**，YugabyteDB的优势：**

- ​		
- ​		低延迟读取和高吞吐量写入。
- ​		使用 Kubernetes 原生数据库进行云中立部署。
- ​		甚至企业功能也是 100% Apache 2.0 开源。



与PostgreSQL、MySQL、Oracle、Amazon Aurora等关系型数据库比较，**YugabyteDB的优势：**

- ​		跨多个节点和/或地理区域线性扩展写入吞吐量。
- ​		自动故障转移和本机修复。
- ​		甚至企业功能也是 100% Apache 2.0 开源。



与Vitess、Citus等传统的**NewSQL比较，YugabyteDB的优势：**

- ​		跨任意数量节点的分布式事务。
- ​		由于所有节点都是平等的，因此不存在单点故障。
- ​		甚至企业功能也是 100% Apache 2.0 开源。

**与**MongoDB、Amazon DynamoDB、FoundationDB、Azure Cosmos DB等事务型NOSQL比较，**YugabyteDB的优势**：

- ​		SQL 的灵活性，因为查询需求会随着业务变化而变化。
- ​		跨任意数量节点的分布式事务。
- ​		由于完全避免了读取时间仲裁，因此可实现低延迟、强一致性读取。
- ​		甚至企业功能也是 100% Apache 2.0 开源。
- 



**词汇解释**

**Tablet**：YugabyteDB 将表分成多个小块，称为“tablet”，用于数据分发。

**MVCC (Multiversion Concurrency Control)**: MVCC 是一种并发控制的方法,它允许数据库在读取数据时能够看到数据的多个版本。这样可以避免读取操作被写入操作阻塞,从而提高数据库的并发性和吞吐量。MVCC 通过给每个数据行添加版本信息,在读取时根据事务开始时间选择合适的数据版本来实现。

**2PC (Two-Phase Commit)**: 2PC 是一种分布式事务协议,用于确保在多个节点上的分布式事务要么全部成功提交,要么全部回滚。它分为两个阶段:第一阶段协调者询问所有参与者是否可以提交,第二阶段协调者根据参与者的反馈决定是提交还是回滚。这样可以保证分布式事务的原子性。