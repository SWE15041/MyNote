# 

[toc]

# SinglestoreDB（淘汰）

## 简介

SingleStore 提供完全托管、分布式、高度可扩展的 SQL 数据库，前身是MemSQL，是一个为数据密集型应用设计的云原生数据库。借助 SingleStore 托管服务，客户不再需要担心管理基础设施、配置集群、处理升级或故障排除。 它可以部署在任何领先的云环境中，包括 AWS、Azure 和 GCP，或部署在多个云中，或者直接部署在具有专用产品的客户数据中心中。

S2DB的定位是一个分布式可扩展的HTAP系统，他的初衷是希望可以用一套系统来同时解决OLTP的高并发事务负载和OLAP的大数据量实时分析负载。

SingleStore 不是严格意义上的“内存型数据库”，而是一种内存存储与磁盘存储相结合的混合型数据库系统。它将数据首先加载到内存中进行处理和计算，然后根据需要将部分数据持久化到磁盘上。这种架构设计使得 SingleStore 具有高性能和低延迟的特点，能够快速处理大规模数据和高并发请求。因此，尽管内存起着重要作用，但 SingleStore 并不是完全依赖于内存的数据库系统。

## 特点

1. 计算和存储分离架构：提供无限存储空间，并允许用户轻松扩展计算资源以满足任何工作负载的需求，同时完全独立地管理存储需求。
2. 无共享架构：意味着系统中的资源（如内存、存储、计算等）不被多个任务或请求共享。相反，每个任务或请求都会被分配独立的资源来执行，这样可以避免资源争用和性能瓶颈。在数据库领域，无共享架构通常指的是每个数据库连接或查询都会被分配独立的资源，而不会与其他连接或查询共享资源。这种架构设计有助于提高系统的稳定性、可伸缩性和性能。SingleStore 采用了无共享架构，每个连接或查询都会获得独立的资源来执行，从而实现了高性能和高并发的数据处理能力。
3. 存储：内存中的基于行的存储和磁盘上的基于列的存储。
4. 通用存储（列存储）： 通用存储可让您以较低的总拥有成本 (TCO) 支持大规模在线事务处理 (OLTP) 和混合事务和分析处理 (HTAP) 。通用存储是[列存储](https://docs.singlestore.com/cloud/create-a-database/columnstore/)的持续演进，支持传统上使用[行存储](https://docs.singlestore.com/cloud/create-a-database/rowstore/)的事务工作负载。

- （1）降低总拥有成本 (TCO)，因为对于涉及更新插入或需要唯一键强制执行的典型操作，数据不需要全部装入 RAM。这样就不需要具有非常大 RAM 的服务器，从而降低了成本，因为这可能很昂贵。
- （2）降低复杂性，因为现在您不必在行存储上执行某些操作，然后将数据移动到列存储，从而提供以前不可能实现的速度和性能。
- （3）与 upsert、唯一键强制、快速查找和其他 OLTP 样式操作结合使用时，大型表的分析性能得到改善 。这是因为分析查询可以在单个核心上每秒处理列存储表上的数亿行，而行存储上每个核心的峰值性能约为每秒 2000 万行。

1. 自动化ETL：支持HTAP混合事务分析处理，因为大多数企业进行数字资产的盘活、报表分析、数据挖掘等，需要维护两套数据系统OLTP&OLAP，以及OLTP数据向OLAP数据进行源源不断的ETL过程，整合OLTP&OLAP，成倍的减少系统存储的开销，避免了ELT过程对系统性能的影响。
2. 数据分片：基于哈希的分片，每个分布式表只有一个分片键，分片键可以包含任意数量的列
3. 兼容MySQL: 因此使用 MySQL 驱动程序的应用程序可以透明地连接和使用SingleStore 。
4. 计费方式：工作区和存储分开计费，工作区按秒计费，存储按每月使用的存储量计费，备份和时间点恢复按标准存储率收费，SingleStore 的收费模式通常基于订阅许可证，根据用户的需求和部署规模收取费用。收费通常与节点数量、数据存储量、订阅级别和支持服务有关。
5. 开源性质：SingleStore 的社区版是部分开源的，它基于 Apache 2.0 开源许可证发布，但企业版的部分功能是专有的，不属于开源范畴。

## 优点

1. 低延迟、高性能：每秒处理超过一万亿行的速度，以一次性语义并行提取流数据，以便直接、立即处理或从 Kafka、Spark、S3 等来源和 Parquet、JSON 和 CSV 等数据格式提取原始数据和事件
2. 可扩展性：横向扩展架构可利用商用硬件有效、快速地响应不断增长的工作负载，无需附加组件或专业的调优专业知识。
3. 可维护性：部署管理灵活，可在云端、Kubernetes 或本地使用。DevOps 可在多云上快速部署和扩展。开放平台可与 Kafka、Spark、HDFS、Kubernetes 一起运行。在标准硬件上快速部署集成的软件环境，大大降低复杂性和可管理性。
4. 实时分析：第一个具有真正线性无共享可扩展性的数据库，可实现基本上无限的扩展，这已通过三个领先的行业基准测试证明：TPC-C、TPC-H 和 TPC-DS。
5. 高可用性：故障转移

## 淘汰理由

1. 成本高，差不多同cpu&内存配置的情况下， singlestore on azure的收费比azure db for mysql高2～5倍， 如下：

|                   | Azure DB for MYSQL                                           | SingleStore Helios (Azure)                                   |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 计算              | ☑️Pay as you go: $499.320/month Standard_D8ds_v4 (8 vCores, 32 GiB memory, 12800 max iops) Cost/month: $499.32 day: $508.90 = 31*24*0.684 hours $499.32 = 730*0.684 | 根据计算和存储使用情况进行动态计费，仅按实际使用量付费 S-0, 4VCPU, 32 GB, 24hours/day, 31days/month Cost/month: $1,190.40 = 24*31*1.6S-1, 8VCPU, 64 GB, 24hours/day, 31days/month Cost/month: $2,380.80 = 24*31*3.2 |
| 存储              | 393 GiB * 0.115=$45.2 ($0.115/1GB/month)                     | 393 GB*0.023= $9.04 ($0.023/1GB/month)                       |
| 备份              | 方式1：本地冗余备份存储LRS: 购买存储容量多少备份容量就是多少，超出按$0.095/GB/Month 收费 方式2: 区域冗余备份存储ZRS: 购买存储容量多少备份容量就是多少，超出按$0.095/GB/Month 收费 ☑️方式3: 地理冗余备份存储GRS: 购买存储容量多少备份容量就是多少，超出按$2*0.095/GB/Month 收费 备份保留期：默认7天，可选1～35天 | Cost/month: 存储容量*区域单价 如tier1, 393 GB*0.023= $9.04 ($0.023/1GB/month) |
| 副本              | 只读副本？？？                                               |                                                              |
| IOPS              | ☑️方式1 ：预配置IOPS, Additional IOPS：$0.05/IOPS/month  方式2: auto scale IOPS: 按工作负载消耗的费用收费LRS：$0.20 per million IOPSZRS：$0.25 per million IOPS |                                                              |
| High availability | 2*收费项目累加                                               |                                                              |
| 计费规则          | https://azure.microsoft.com/en-us/pricing/calculator/?service=mysql  [https://azure.microsoft.com/en-us/pricing/details/mysql/flexible-server/](https://azure.microsoft.com/en-us/pricing/calculator/?service=mysql) |                                                              |

1. 社区不活跃不高

- SingleStore是一个相对新的数据库系统，其社区正在逐渐成长
- 在官方论坛和社区分享和交流应验的用户较少， https://www.singlestore.com/forum/latest  & https://www.singlestore.com/events/ 
- 在GitHub活跃度低，在GitHub上的项目数量、星标数、提交频率等数量较少https://github.com/singlestore-labs 
- 在线资源和文档少，不能够帮助用户更好地理解和使用数据库， 学习成本高

1. SingleStore在内存优化、分布式架构、HTAP支持以及实时性方面的特点使得它更适合于处理数据分析任务，特别是需要快速、高效地处理大规模数据并获得实时反馈的场景。



# **CouchbaseDB（淘汰）**

## 简介

CouchBase是一款开源的、分布式的、面向文档的NoSQL数据库，主要用于分布式缓存和数据存储领域。能够通过manage cache提供快速的亚毫米级别的k-v存储操作，并且提供快速的查询和其功能强大的能够指定SQL-like查询的查询引擎。Couchbase是MemBase与couchDb这两个NoSQL数据库的合并的产物，是一个分布式的面向文档的NoSQL数据库管理系统，即拥有CouchDB的简单和可靠以及Memcached的高性能。Couchbase还提供了一些和其他一些领先的NoSQL数据库相似的功能或者增强功能．

## 特点

1. 开源性质：开源，开发者可以自由访问和修改源代码,并根据自己的需求进行二次开发和部署。
2. 以 vBucket 的概念实现更理想化的自动分片以及动态扩容；
3. 完全托管的数据库即服务可消除您的数据库管理工作并降低成本
4. 高性能：Couchbase使用内存编码和数据压缩技术，提供快速的读写操作和低延迟的数据访问。
5. 可扩展性：Couchbase支持水平扩展，可以通过添加更多的节点来增加数据库的容量和吞吐量。
6. 弹性和高可用性：Couchbase具有自动分片和复制功能，确保数据的高可用性和容错能力。
7. 灵活的数据模型：Couchbase支持文档模型和键值模型，适用于多种应用场景。
8. 多种查询方式：Couchbase提供灵活的N1QL查询语言和全文搜索功能，方便用户进行复杂的数据查询和分析。
9. Couchbase的数据模型非常灵活，支持多种数据类型，包括[JSON](https://cloud.tencent.com/developer/techpedia/1569)文档、二进制数据和关系型数据。

## 淘汰理由

1. 分布式的NoSQL数据库
2. 逐渐倾向于闭源，社区版本（免费，但不提供官方维护升级）和商业版本之间差距比较大。
3. 学习成本高：Couchbase相对于传统的关系型数据库来说，有一定的学习曲线，需要花费一些时间来理解和掌握。
4. 适用场景：Couchbase适用于实时数据存储、处理和分析，常用于移动应用、IoT、游戏开发和企业级应用等领域。它适合大数据、实时分析、移动应用、物联网等高并发、低延迟的应用场景。
5. 缺乏成熟的生态系统：相比于一些老牌数据库，Couchbase生态系统的成熟度相对较低，可能缺乏一些周边工具和解决方案。
6. 有限的集成和工具支持：相比于一些主流数据库，Couchbase的集成和工具支持相对有限，可能需要用户自己开发一些定制化工具或进行二次开发。
7. 相对较小的社区支持：虽然Couchbase有一定的社区支持，但相对于其他主流数据库（如MySQL和MongoDB）来说，社区规模相对较小。



# YugabyteDB（分布式newsql+mvcc结合2pc事务+OLTP）

## **简介**

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

**SQL兼容**

- 支持SQL join语法
- SQL外键
- 兼容Postgre SQL

**适用场景：**

YugabyteDB 非常适合快速增长的云原生应用程序，这些应用程序需要可靠地提供业务关键数据，并且具有零数据丢失、高可用性和低延迟。常见用例包括：

- 分布式在线事务处理 (OLTP) 应用程序需要多区域可扩展性，同时又不影响强一致性和低延迟。例如，用户身份、零售产品目录、金融数据服务。
- 混合事务/分析处理 (HTAP)，也称为 Translytical，需要对事务数据进行实时分析的应用程序。例如，用户个性化、欺诈检测、机器学习。
- 流式应用程序需要高效地提取、分析和存储不断增长的数据。例如，物联网传感器分析、时间序列指标、实时监控。

## **架构**

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

支持自动分片 和 自动重新平衡。

**事务**

Yugabyte 的分布式事务采用了 MVCC 结合 2PC 实现。

Yugabyte 的事务状态信息保存在另一个 tablet 上，包括三种可能的状态：Pending、Committed 或 Aborted。事务从 Pending 状态开始，终结于 Committed 或 Aborted。

Yugabyte 文档中提到它除了 Snapshot , Serializable、Read committed 隔离级别，https://docs.yugabyte.com/preview/explore/transactions/isolation-levels/#serializable-isolation 



**优势**

**与**Amazon Aurora、Google Cloud Spanner、CockroachDB、TiDB等分布式SQL比较**，YugabyteDB的优势：**

- 
- 低延迟读取和高吞吐量写入。
- 使用 Kubernetes 原生数据库进行云中立部署。
- 甚至企业功能也是 100% Apache 2.0 开源。



与PostgreSQL、MySQL、Oracle、Amazon Aurora等关系型数据库比较，**YugabyteDB的优势：**

- 跨多个节点和/或地理区域线性扩展写入吞吐量。
- 自动故障转移和本机修复。
- 甚至企业功能也是 100% Apache 2.0 开源。



与Vitess、Citus等传统的**NewSQL比较，YugabyteDB的优势：**

- 跨任意数量节点的分布式事务。
- 由于所有节点都是平等的，因此不存在单点故障。
- 甚至企业功能也是 100% Apache 2.0 开源。

**与**MongoDB、Amazon DynamoDB、FoundationDB、Azure Cosmos DB等事务型NOSQL比较，**YugabyteDB的优势**：

- SQL 的灵活性，因为查询需求会随着业务变化而变化。
- 跨任意数量节点的分布式事务。
- 由于完全避免了读取时间仲裁，因此可实现低延迟、强一致性读取。
- 甚至企业功能也是 100% Apache 2.0 开源。



**词汇解释**

**Tablet**：YugabyteDB 将表分成多个小块，称为“tablet”，用于数据分发。

**MVCC (Multiversion Concurrency Control)**: MVCC 是一种并发控制的方法,它允许数据库在读取数据时能够看到数据的多个版本。这样可以避免读取操作被写入操作阻塞,从而提高数据库的并发性和吞吐量。MVCC 通过给每个数据行添加版本信息,在读取时根据事务开始时间选择合适的数据版本来实现。

**2PC (Two-Phase Commit)**: 2PC 是一种分布式事务协议,用于确保在多个节点上的分布式事务要么全部成功提交,要么全部回滚。它分为两个阶段:第一阶段协调者询问所有参与者是否可以提交,第二阶段协调者根据参与者的反馈决定是提交还是回滚。这样可以保证分布式事务的原子性。



# YugabyteDB VS CouchbaseDB VS SingleStoreDB 

## 价格比较

| **Resources**                                                | **Azure DB for MYSQL**                                       | **YugabyteDB定价标准**                                       | **SinglestoreDB standard for azure**                         | **示列配置**                                                 | **YugabyteDB收费示例**                                       | **Azure db for mysql 收费示例**                              | **SInglestoreDB 收费示例**                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 计算                                                         | Pay as you go:by hour: 0.0855$/vcpu/hourby day: 2.05193548387$/vcpu/dayby month (selected): 7.801875$/vcpu/month | Pay-as-you-go (PAYG): 0.25$/vCPU/hour，minimum 2 vCPUs。     | S-0 4vcpu 32 GB $1.80/hour S-1 8vcpu 64 GB $3.60/hour        | 8vcpu                                                        | 1440$/m = 30d*24h*0.25$*8vcpu;                               | 配置：Standard_D8ds_v4 (8 vCores, 32 GiB memory, 12800 max iops)价格：By hour: 499.32$/m=730h*8vcpu*0.0855$/vcpu/hour By day: 508$/m= 31d*24h*8vcpu*0.0855$/vcpu/hour By month: 499.32$/m=8vcpu x 62.412$/vcpu/month | 配置：S-0 4vcpu 32 GB $1.80/hour cost/month: $1,339.2 = 24*31*1.8 配置：S-1 8vcpu 64 GB $3.60/hour cost/month: $2,678.4 = 24*31*3.6 |
| Reserved instances1 year reserved (~40% savings)3 year reserved (~60% savings) | Subscription: ${{number}}vcpu/year，年起订阅                 | Subscription： 联系客服定制                                  | 8vcpu                                                        | 1466$/m = 2200$*8vcpu/12month; PS：21年9月之前的定价是2200$/vcpu/year，之后未知。 21年的收费: https://www.yugabyte.com/yugabyte-cloud-standard-price-list-20210908 |                                                              |                                                              |                                                              |
| 存储                                                         | 0.115$/GB                                                    | free：50G/vcpu；超额：0.1$/GB/month                          | 【selected】TIER 1: 0.023$/month TIER 2: 0.025$/month TIER 3: 0.025$/month TIER 4: 0.040$/month | 400GB                                                        | 0$ PS: 8个vcpu将分配400GB的免费磁盘容量，当磁盘使用量400GB时，每月需要花费0$. | 46$/month = 400GB * 0.115$/GB                                | 配置： TIER 1: 0.023$/month cost/month= 9.2$ = 400GB* 0.023$/month |
| 备份                                                         | Backup Storage disk size= Storage disk size 时， 免费 超额：LRS（Locally redundant storage） 0.095$/GB/MonthGRS( geo-redundant storage): 2*0.095$/GB/Month | free：100G/vcpu；超额：0.025$/GB/month                       |                                                              | 400GB                                                        | 0$ PS: 8个vcpu将分配400GB的免费磁盘容量，当磁盘使用量400GB时，每月需要花费0$. | $0 PS: backup storage disk size 400GB = storage disk size 400GB |                                                              |
| 副本                                                         |                                                              |                                                              |                                                              |                                                              |                                                              |                                                              |                                                              |
| IOPS                                                         | 两种订阅方式： 方式1【selectd】 Pre-provisioned IOPS: ((Pre-provisioned IOPS - free IOPS) + HA IOPS) * 0.05$/IOPS ，free IOPS = storage disk size *3 IOPS/GB + 300IOPS/server， IOPS 会随着预置存储的大小而扩展, 3 IOPS/GB, max storage disk size = 16 TB, 每个server赠送300 IOPS， 方式2 Autoscale IOPS ： 按使用量计费， LRS = 0.20$/per million IOPS , ZRS = 0.25$/per million IOPS | aws集群：超出3000 IOPS后，按照0.0066$/IOPS收费               |                                                              | 4000IOPS                                                     | aws：6.6$ = (4000-3000)IOPS * 0.0066$/IOPS gcp: 0$ azure: 0$ | Pre-provisioned IOPS 配置: storage=400GB时 cost: 565.00$/monthly = (12800 - 400*3-300)Additional IOPS *0.05$/IOPS 配置：假设additional IOPS =4000 时，cost 200$/monthly = 4000 additional IOPS * 0.05$/IOPS |                                                              |
| High availability                                            | compute + storage                                            |                                                              |                                                              | enable                                                       | 1 server                                                     | $545.32 = 8vcpu*62.412$/vcpu+400GB x 0.115$/GB               |                                                              |
| 带宽                                                         |                                                              |                                                              |                                                              |                                                              |                                                              | $0                                                           |                                                              |
| 数据传输                                                     |                                                              |                                                              |                                                              |                                                              |                                                              |                                                              |                                                              |
| 数据传输（同区域）                                           |                                                              | free: 1000GB/vcpu; 超额：0.01$/GB                            |                                                              |                                                              |                                                              |                                                              |                                                              |
| 数据传输（跨区域APAC）                                       |                                                              | free: 10GB/vcpu; 超额：0.08$/GB                              |                                                              |                                                              |                                                              |                                                              |                                                              |
| 数据传输（跨区域，非APAC)                                    |                                                              | free: 10GB/vcpu; 超额：0.02$/GB                              |                                                              |                                                              |                                                              |                                                              |                                                              |
| 数据传输（网络，数据传输到其他平台或者云端                   |                                                              | free: 10GB/vcpu; 超额：0.1$/GB                               |                                                              |                                                              |                                                              |                                                              |                                                              |
| 计费规则                                                     | https://azure.microsoft.com/en-us/pricing/calculator/?service=mysql  [https://azure.microsoft.com/en-us/pricing/details/mysql/flexible-server/](https://azure.microsoft.com/en-us/pricing/calculator/?service=mysql) [https://azure.microsoft.com/en-us/pricing/details/bandwidth/#pricing](https://azure.microsoft.com/en-us/pricing/calculator/?service=mysql) | https://www.yugabyte.com/yugabytedb-managed-standard-price-list [https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-admin/cloud-billing-profile/](https://www.yugabyte.com/yugabytedb-managed-standard-price-list) [https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-admin/cloud-billing-costs/](https://www.yugabyte.com/yugabytedb-managed-standard-price-list) | https://www.singlestore.com/cloud-pricing/  [https://docs.singlestore.com/cloud/user-and-workspace-administration/billing-and-usage/flexible-usage-model/](https://www.singlestore.com/cloud-pricing/) |                                                              |                                                              |                                                              |                                                              |
| 总价格                                                       |                                                              |                                                              |                                                              | 集群：3个节点                                                | 配置: 3node（1node: 单区域+8vcpu +32GB memory+ 400GB free disk size + 800DB free backup disk size） cost/month: 4320$=3node*8vcpu*0.25$/vcpu*30d*24h | 配置： primary server 配置： Standard_D8ds_v4 (8 vCores, 32 GiB memory, 12800 max iops) 400GB storage + 4000 additional IOPS + 1个server启用高可用  replica 配置： 2个副本 Standard_D8ds_v4 (8 vCores, 32 GiB memory, 12800 max iops) 400GB storage + 4000 additional IOPS  primary cost : 8*62.412+400 x 0.115 + 4000 x 0.05 + (8*62.412+400 x 0.115) = $ 1,290.592 replica cost: 2*(8*62.412+400 x 0.115 + 4000 x 0.05) = $1,490.592 total cost = 1,490.592+1,290.592 = 2,781.184 $/monthlycost monthly : $2,781.184 (1个副本时: $2,035.888) | 配置：3node( node: S-1 8vcpu 64 GB $3.60/hour, storage 400GB TIER 1: 0.023$/month ) cost/month:  $8,062.8 = 3*(24*31*3.6 +  400* 0.023) 【1 node: 2,687.6$/month】 |

## 基本属性比较

| NewSQL                          | YugabyteDB                                                   | Couchbase                                                    | SingleStore                                                  |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Website                         | http://www.yugabyte.com                                      | https://www.couchbase.com/                                   | https://www.singlestore.com/                                 |
| Technical documentation         | Yugabyte 官方文档 ：https://docs.yugabyte.com/  GitHub ：https://github.com/yugabyte/yugabyte-db | https://docs.couchbase.com/home/index.html                   | https://docs.singlestore.com/                                |
| DBaaS offerings                 | YugabyteDB Managed                                           | null                                                         | https://www.singlestore.com/product-overview/                |
| Secondary indexes               | yes                                                          | yes                                                          | yes                                                          |
| Data scheme                     | depending on used data model                                 | schema-free                                                  | yes                                                          |
| SQL                             | yes, PostgreSQL compatible                                   | SQL++, extends ANSI SQL to JSON for operational, transactional, and analytic use cases | yes，but no triggers and foreign keys                        |
| APIs and other access methods   | JDBC YCQL, an SQL-based flexible-schema API with its roots in Cassandra Query Language YSQL - a fully relational SQL API that is wire compatible with the SQL language in PostgreSQL | CLI Client HTTP REST Kafka Connector Native language bindings for CRUD, Query, Search and Analytics APIs Spark Connector Spring Data | Cluster Management API info HTTP API JDBC MongoDB API ODBC   |
| Supported programming languages | C C# C++ Go Java JavaScript (Node.js) PHP Python Ruby Rust Scala | .Net C Go Java JavaScript info Kotlin PHP Python Ruby Scala  | Bash C C# Java JavaScript (Node.js) Python                   |
| Partitioning                    | Hash and Range Sharding, row-level geo-partitioning          | Automatic Sharding                                           | Sharding：hash partitioning                                  |
| Replication                     | 基于Raft分布式共识协议，最少3个副本持续可用                  | Multi-source replication info Source-replica replication     | Source-replica replication：stores two copies of each physical data partition on two separate nodes |
| Transactions                    | 具有可序列化和快照隔离的分布式 ACID。受到 Google Spanner 架构的启发。 YugabyteDB 完全支持基于分布式事务管理器的分布式事务，该管理器管理跨多个分片的事务。 三种隔离级别的多行事务：可序列化、快照（也称为可重复读）和读提交隔离。 | ACID                                                         | ACID                                                         |
| Data Consistency                | 写入的强一致性&读取的可调一致性 根据CAP定理，YugabyteDB是一个一致性和分区容忍（CP）数据库，同时实现了非常高的可用性。 全球数据分布，通过多区域、多云部署，让一致的数据更贴近用户。由 CDC 驱动的异步复制提供支持的可选两区域多主和主从配置。 自动分片和自动重新平衡可确保所有节点的负载均匀，即使对于非常大的集群也是如此。 | Eventual Consistency Immediate Consistency                   | Immediate Consistency                                        |
| High Availability               | 依靠 Raft 实现高可用， 数据库面临的常见问题是备份失败和意外停机。 YugabyteDB 持续可用，这可以通过跨节点的分布式备份和偶尔的数据同步活动来实现。维护操作也可以在不停机的情况下进行，这也是一个显着的特点。多区域部署和复制也确保了可用性。 YugabyteDB的高可用性是通过分布式架构、数据复制、共识算法、自动重新平衡和故障检测机制的组合来实现的，确保数据库在故障域故障时保持可用、一致和弹性。 |                                                              | SingleStore 默认情况下是高可用的。它通过将数据冗余存储在一组节点（称为可用性组）中来确保高可用性。SingleStore 支持两个可用性组。每个可用性组都包含系统中每个分区的副本 - 一些作为主分区，一些作为副本。因此，SingleStore 在系统中拥有您的数据的两个副本，以保护数据免受单节点故障的影响。 doc: https://docs.singlestore.com/cloud/getting-started-with-singlestore-helios/about-singlestore-helios/high-availability/ |
| High Reliability                | 在基础设施故障期间以及执行软件升级和分布式备份等维护任务时实现持续可用性 |                                                              |                                                              |
| High Scalability                | 支持垂直扩展&水平扩展 垂直扩展：通过增加 CPU、内存、存储等来增强现有节点的功能。 水平拓展：向集群添加更多相同类型的节点。 总结：由于 YugabyteDB 是分布式的，因此扩展在操作上非常简单，并且不会造成任何服务中断。水平可扩展。 YugabyteDB 在生产环境中经过验证，可以扩展到超过 3000K TPS、超过 100 TB 的数据和数千个并发连接，使您能够在零影响的情况下进行横向扩展和横向扩展。 |                                                              |                                                              |
| flexibility                     | 可以自由地在虚拟机、容器或裸机上的公共云、私有云和混合云环境中进行部署。 |                                                              |                                                              |
| maintainability                 | 您可能需要将数据库基础设施迁移到新硬件，或者您可能希望在另一个区域或公共云中添加同步或异步副本。对于 YugabyteDB，这些操作是基本的一键式基于意图的操作，由系统完全在线无缝处理。 YugabyteDB 的核心数据结构及其基于共识的复制模型使数据层变得非常敏捷和可重构，类似于容器和虚拟机对应用程序或无状态层的处理。 |                                                              |                                                              |
| cost                            | Pay-as-you-go (PAYG): USD 0.25/vCPU/hour, minimum 2 vCPUs. Usage is metered in billing increments of a minute, and the Customer pays at the end of the month for actual usage.Subscription: Customer commits to a certain number of vCPUs minimum term of one year.https://www.yugabyte.com/yugabytedb-managed-standard-price-list/ |                                                              |                                                              |
| community                       |                                                              |                                                              |                                                              |
| open source                     | Starting with v1.3, YugabyteDB is 100% open source. It is licensed under Apache 2.0 and the source is available on GitHub. repo: https://github.com/yugabyte/yugabyte-db | Open Source , Business Source License (BSL 1.1); Commercial licenses also available | commercial, free developer edition available                 |
| 处理数据的方式                  | 支持OLTP、HTAP，不支持OLAP                                   |                                                              | OLTP&OLAP                                                    |
| 与传统的SQL数据库有什么区别     |                                                              |                                                              |                                                              |
| 数据迁移                        | 迁移服务：YugabyteDB Voyager。使用 YugabyteDB Voyager 管理端到端数据库迁移，包括集群准备、模式迁移和数据迁移。可安全地将数据从 PostgreSQL、MySQL 和 Oracle 数据库迁移到 YugabyteDB Managed、YugabyteDB Anywhere 和核心开源数据库 YugabyteDB。 迁移类型：离线迁移- 使您的应用程序离线以执行迁移。实时迁移 - 在应用程序运行时迁移数据（当前仅限 Oracle 和 PostgreSQL）。具有后退功能的实时迁移 - 转至源副本数据库进行实时迁移（当前仅限 Oracle 和 PostgreSQL）。具有回退功能的实时迁移 - 回退到源数据库进行实时迁移（当前仅限 Oracle）。doc： https://docs.yugabyte.com/preview/yugabyte-voyager/  https://docs.yugabyte.com/preview/yugabyte-voyager/overview/  https://docs.yugabyte.com/preview/integrations/ |                                                              |                                                              |
| 分片类型                        | 自动分片，分片策略 ：范围或散列                              |                                                              |                                                              |
| 架构                            | 一个表被分割成一个或多个碎片，一个碎片在YugabyteDB中被称为一个tablet。 |                                                              | 分布式云原生架构                                             |
| 数据库模型                      | RDBMS（同时支持Document store&Wide-column store）            | Document store( 还支持其他的数据库模型) Key-value store info Spatial DBMS info Search engine Time Series DBMS Vector DBMS | Relational DBMS（还支持其他的数据库模型） Document store Spatial DBMS Time Series DBMS Vector DBMS |
| 部署                            | 混合云和多云：在公共云、私有云和混合云环境中、虚拟机、容器或裸机上部署 YugabyteD |                                                              |                                                              |
| 优势                            | PostgreSQL 兼容：使用 PostgreSQL 兼容的 RDBMS 立即提高工作效率。 YugabyteDB重用了PostgreSQL的查询层并支持所有高级功能，例如触发器、存储过程、用户定义函数、表达式索引等 水平可扩展：在零影响的情况下横向扩展和收缩。经过生产验证，可扩展至超过 300K TPS、超过 100TB 的数据和数千个并发连接 抵御故障：在基础设施故障期间以及执行软件升级和分布式备份等维护任务时实现持续可用性 地理分布式：使用复制和数据地理分区功能来实现应用程序所需的延迟、弹性和合规性 混合云和多云：在公共云、私有云和混合云环境中、虚拟机、容器或裸机上部署 YugabyteDB |                                                              |                                                              |
| 适用场景                        |                                                              |                                                              | SingleStore的分析能力、分布式查询处理、流数据摄取、流数据摄取的功能，适用于数据仓库。 对于实时分析应用程序，SingleStore 是首选。 |