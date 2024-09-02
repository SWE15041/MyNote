**YugabyteDB 1稿**



分片

YugabyteDB 将表数据拆分成称为“tablet”的较小块，以便数据可以分部分存储在多台机器上。行到tablet的映射是确定性的，此过程称为分片。





自动拆分表中的数据并将其分布在各个节点上。

通过不同的策略实现，每种策略都有自己的权衡。YugabyteDB 的分片架构受到[Google Spanner](https://research.google.com/archive/spanner-osdi2012.pdf)的启发。

分片策略：哈希和范围分片，可以只有哈希分区、也可以只有范围分区、也可以先按哈希再按范围分区。



tablet：YugabyteDB 将表分成多个小块，称为“tablet”，用于数据分发。

每张表被分成很多个 tablet，tablet 是数据分布的最小单元，通过在节点间搬运 tablet 以及 tablet 的分裂与合并，就可以实现几乎无上限的扩展，

**tablet splitting**

- ​		[预先分割平板电脑](https://docs.yugabyte.com/preview/architecture/docdb-sharding/tablet-splitting/#presplitting-tablets)：在 DocDB 中创建的所有表都可以在创建时分割成所需数量的平板电脑。
- ​		[手动平板分割](https://docs.yugabyte.com/preview/architecture/docdb-sharding/tablet-splitting/#manual-tablet-splitting)：您可以在运行时手动分割正在运行的集群中的平板。
- ​		[自动平板分割](https://docs.yugabyte.com/preview/architecture/docdb-sharding/tablet-splitting/#automatic-tablet-splitting)：正在运行的集群中的平板会根据数据库的某些策略自动分割。







架构architecture 

https://docs.yugabyte.com/preview/architecture/

查询层

- YSQL （PostgresQL）
- YCQL（ Cassandra）
- other

存储层

- 自动分片
- 负载均衡
- 分布式事务
- 基于RAFT的数据一致性



逻辑上，Yugabyte 采用两层架构：查询层和存储层。在部署结构中，这两层都位于 TServer 进程中。其中 TServer 负责存储 tablet，每个 tablet 对应一个 Raft Group，分布在三个的节点上，以此保证高可用性。TMaster 负责元数据管理，除了 tablet 的位置信息，还包括表结构等信息。Master 本身也依靠 Raft 实现高可用。









存储引擎：

DocDB 是一种基于日志结构合并树 (LSM) 的存储引擎



https://docs.yugabyte.com/preview/architecture/docdb/#storage-engine

[DocDB 是 YugabyteDB 的底层文档存储引擎，它建立在高度定制和优化的RocksDB](http://rocksdb.org/)版本之上，RocksDB 是一个基于[日志结构合并树 (LSM)](https://docs.yugabyte.com/preview/architecture/docdb/lsm-sst)的键值存储。在原始 RocksDB 的基础上进行了多项增强和定制，使 DocDB 具有高性能和可扩展性。DocDB 本质上管理多个 RocksDB 实例，每个 tablet 创建一个。



DocDB 是一种基于日志结构合并树 (LSM) 的存储引擎。此设计针对高写入吞吐量和高效的存储利用率进行了优化。数据存储在多个 SST（排序字符串表）中，以将键值数据存储在磁盘上。它旨在高效处理顺序和随机访问模式。DocDB 定期通过将多个 SST 文件合并和排序为一组较小的文件来压缩数据。此过程有助于保持一致的磁盘格式并从过时的数据中回收空间。



事务：

https://docs.yugabyte.com/preview/architecture/transactions/

**分布式事务：2PC & MVCC**

- ​		Primary provisional records：还未提交完成的数据，多了一个事务ID，也扮演锁的角色
- ​		Transaction metadata：事务状态所在的 tablet ID。因为事务状态表很特殊，不是按照 hash key 分片的，所以需要在这里记录一下它的位置。
- ​		Reverse Index：所有本事务中的 primary provisional records，便于恢复使用







**YugabyteDB2**



**参考文档：**

[**https://wanghenshui.github.io/2021/01/28/yogabyte-db.html**](https://wanghenshui.github.io/2021/01/28/yogabyte-db.html)

https://ericfu.me/yugabyte-db-introduction/

https://ericfu.me/timestamp-in-distributed-trans/



专业术语

 MVCC、2PC、一致性、隔离级别

1. **MVCC (Multiversion Concurrency Control)**: MVCC 是一种并发控制的方法,它允许数据库在读取数据时能够看到数据的多个版本。这样可以避免读取操作被写入操作阻塞,从而提高数据库的并发性和吞吐量。MVCC 通过给每个数据行添加版本信息,在读取时根据事务开始时间选择合适的数据版本来实现。
2. **2PC (Two-Phase Commit)**: 2PC 是一种分布式事务协议,用于确保在多个节点上的分布式事务要么全部成功提交,要么全部回滚。它分为两个阶段:第一阶段协调者询问所有参与者是否可以提交,第二阶段协调者根据参与者的反馈决定是提交还是回滚。这样可以保证分布式事务的原子性。







**简介**



开源云原生分布式 SQL 数据库



YugabyteDB 是一款高性能分布式 SQL 数据库，用于支持全球互联网规模的应用程序。YugabyteDB 结合了高性能文档存储、每个分片分布式共识复制和多分片 ACID 事务，可处理横向扩展 RDBMS 和互联网规模 OLTP 工作负载，具有低查询延迟、极强的故障恢复能力和全球数据分布。作为云原生数据库，它可以部署在公有云和私有云以及 Kubernetes 环境中。

YugabyteDB 非常适合快速增长的云原生应用程序，这些应用程序需要可靠地提供业务关键数据，具有零数据丢失、高可用性和低延迟。







**社区活跃度**

**有丰富的官方教程和社区文档，学习成本低 （官方学习指南：**[**https://university.yugabyte.com/?_gl=1\*td25h5\*_gcl_au\*MjE0NTQ4NjUzNS4xNzE4NDM2NjM2**](https://university.yugabyte.com/?_gl=1*td25h5*_gcl_au*MjE0NTQ4NjUzNS4xNzE4NDM2NjM2)**）**

**兼容**PostgreSQL的SQL语法，用户上手快

每周五都有官方技术讲座分享

yugabytedb每年发布4个左右的版本，说明官方开发团队非常活跃,致力于不断完善产品。版本发行和使用周期有限制，自发行日期开始LTS版本系列提供2.5年的support，STS版本系列支持1.5年的support。

版本发行：https://docs.yugabyte.com/preview/releases/ybdb-releases/

产品比较： https://www.yugabyte.com/compare-products/?_gl=1*k86p21*_gcl_au*MjE0NTQ4NjUzNS4xNzE4NDM2NjM2



**开源？**

从[v1.3](https://www.yugabyte.com/blog/announcing-yugabyte-db-v1-3-with-enterprise-features-as-open-source/)开始，YugabyteDB 100% 开源。它根据 Apache 2.0 获得许可，源代码可在[GitHub](https://github.com/yugabyte/yugabyte-db)上获取。



**成本**

[**https://www.yugabyte.com/compare-products/?_gl=1\*k86p21\*_gcl_au\*MjE0NTQ4NjUzNS4xNzE4NDM2NjM2**](https://www.yugabyte.com/compare-products/?_gl=1*k86p21*_gcl_au*MjE0NTQ4NjUzNS4xNzE4NDM2NjM2)





**SQL兼容**

- **支持SQL join语法**
- **SQL外键**
- **兼容Postgre SQL**



**核心技术**



- **水平分片**







**优势**

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



**适用场景：**

YugabyteDB 非常适合快速增长的云原生应用程序，这些应用程序需要可靠地提供业务关键数据，并且具有零数据丢失、高可用性和低延迟。常见用例包括：	

- ​		分布式在线事务处理 (OLTP) 应用程序需要多区域可扩展性，同时又不影响强一致性和低延迟。例如，用户身份、零售产品目录、金融数据服务。
- ​		混合事务/分析处理 (HTAP)，也称为 Translytical，需要对事务数据进行实时分析的应用程序。例如，用户个性化、欺诈检测、机器学习。
- ​		流式应用程序需要高效地提取、分析和存储不断增长的数据。例如，物联网传感器分析、时间序列指标、实时监控。







**数据迁移 MYSQL-> YB**



[**https://www.yugabyte.com/blog/migrate-web-application-mysql-yugabytedb-voyager/**](https://www.yugabyte.com/blog/migrate-web-application-mysql-yugabytedb-voyager/)

[**https://yugabyte.com/blog/migrating-mysql-to-yugabytedb-using-pgloader/**](https://yugabyte.com/blog/migrating-mysql-to-yugabytedb-using-pgloader/)



**计费方式：**

**CPU**

1. **按使用付费方式：0.25$/vCPU/hour，最少2个vCPU, 那么每月8个vcpu需要**[**1488$**](x-apple-data-detectors://embedded-result/2021)**=**31*24*0.25*8;
2. 订阅方式：
3. 

**存储**

**磁盘：50GB/per month/vCPU，传输速率0.1$/per month/ per GB; 那么393GB，需要花费**

**备份：100GB/per month/vCPU** 





architecture





YugabyteDB



分片

YugabyteDB 将表数据拆分成称为“tablet”的较小块，以便数据可以分部分存储在多台机器上。行到tablet的映射是确定性的，此过程称为分片。

自动分片 和 自动重新平衡







自动拆分表中的数据并将其分布在各个节点上。

通过不同的策略实现，每种策略都有自己的权衡。YugabyteDB 的分片架构受到Google Spanner的启发。

分片策略：哈希和范围分片，可以只有哈希分区、也可以只有范围分区、也可以先按哈希再按范围分区。



tablet：YugabyteDB 将表分成多个小块，称为“tablet”，用于数据分发。

每张表被分成很多个 tablet，tablet 是数据分布的最小单元，通过在节点间搬运 tablet 以及 tablet 的分裂与合并，就可以实现几乎无上限的扩展，

tablet splitting

\*  预先分割平板电脑：在 DocDB 中创建的所有表都可以在创建时分割成所需数量的平板电脑。

\*  手动平板分割：您可以在运行时手动分割正在运行的集群中的平板。

\*  自动平板分割：正在运行的集群中的平板会根据数据库的某些策略自动分割。







架构architecture 

https://docs.yugabyte.com/preview/architecture/

查询层

\- YSQL （PostgresQL）

\- YCQL（ Cassandra）

\- other

存储层

\- 自动分片

\- 负载均衡

\- 分布式事务

\- 基于RAFT的数据一致性



逻辑上，Yugabyte 采用两层架构：查询层和存储层。在部署结构中，这两层都位于 TServer 进程中。其中 TServer 负责存储 tablet，每个 tablet 对应一个 Raft Group，分布在三个的节点上，以此保证高可用性。TMaster 负责元数据管理，除了 tablet 的位置信息，还包括表结构等信息。TMaster 本身也依靠 Raft 实现高可用。









存储引擎：

DocDB 是一种基于日志结构合并树 (LSM) 的存储引擎



https://docs.yugabyte.com/preview/architecture/docdb/#storage-engine

DocDB 是 YugabyteDB 的底层文档存储引擎，它建立在高度定制和优化的RocksDB版本之上，RocksDB 是一个基于日志结构合并树 (LSM)的键值存储。在原始 RocksDB 的基础上进行了多项增强和定制，使 DocDB 具有高性能和可扩展性。DocDB 本质上管理多个 RocksDB 实例，每个 tablet 创建一个。



DocDB 是一种基于日志结构合并树 (LSM) 的存储引擎。此设计针对高写入吞吐量和高效的存储利用率进行了优化。数据存储在多个 SST（排序字符串表）中，以将键值数据存储在磁盘上。它旨在高效处理顺序和随机访问模式。DocDB 定期通过将多个 SST 文件合并和排序为一组较小的文件来压缩数据。此过程有助于保持一致的磁盘格式并从过时的数据中回收空间。



事务：

https://docs.yugabyte.com/preview/architecture/transactions/

分布式事务：2PC & MVCC

\*  Primary provisional records：还未提交完成的数据，多了一个事务ID，也扮演锁的角色

\*  Transaction metadata：事务状态所在的 tablet ID。因为事务状态表很特殊，不是按照 hash key 分片的，所以需要在这里记录一下它的位置。

\*  Reverse Index：所有本事务中的 primary provisional records，便于恢复使用

事务的状态信息保存在另一个 tablet 上，包括三种可能的状态：Pending、Committed 或 Aborted。事务从 Pending 状态开始，终结于 Committed 或 Aborted。



隔离级别：

另外，Yugabyte 文档中提到它除了 Snapshot Isolation 还支持 Serializable 隔离级别，但是似乎没有看到他是如何规避 Write Skew 问题的。

分布式事务中的时间戳：https://ericfu.me/timestamp-in-distributed-trans/





数据迁移

[YugabyteDB Voyager](https://docs.yugabyte.com/preview/yugabyte-voyager/)简化了端到端数据库迁移过程，包括集群设置、架构迁移和数据迁移。

它支持将数据从 PostgreSQL、MySQL 和 Oracle 数据库迁移到各种 YugabyteDB 产品，包括 Managed、Anywhere 和核心开源数据库。

除了[离线迁移](https://docs.yugabyte.com/preview/yugabyte-voyager/migrate/migrate-steps/)之外，YugabyteDB Voyager 的最新版本还引入了从 PostgreSQL 进行的[实时、无中断迁移](https://docs.yugabyte.com/preview/yugabyte-voyager/migrate/live-migrate/)，以及具有[前退](https://docs.yugabyte.com/preview/yugabyte-voyager/migrate/live-fall-forward/)和[后退](https://docs.yugabyte.com/preview/yugabyte-voyager/migrate/live-fall-back/)功能的新实时迁移工作流程。



使用 YugabyteDB Voyager 进行实时迁移

https://docs.yugabyte.com/preview/yugabyte-voyager/migrate/live-migrate/



Primary provisional records（主要临时事务）





按照[CAP 定理](https://en.wikipedia.org/wiki/CAP_theorem)，YugabyteDB 是一个 CP 数据库（一致性和分区容忍性），但实现了非常高的可用性。YugabyteDB 的架构设计类似于 Google Cloud Spanner，后者也是一个 CP 系统