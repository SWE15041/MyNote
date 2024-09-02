[toc]

**Singlestore DB**





https://www.cdata.com/drivers/singlestore/

https://db-engines.com/en/system/SingleStore



社区

https://www.g2.com/products/singlestore/reviews#survey-response-8351360

https://www.gartner.com/reviews/market/cloud-database-management-systems/vendor/singlestore/product/singlestoredb/reviews?marketSeoName=cloud-database-management-systems&vendorSeoName=singlestore&productSeoName=singlestoredb



通用存储

https://www.singlestore.com/blog/memsql-singlestore-then-there-was-one/

https://www.singlestore.com/blog/memsql-singlestore-memsql-7-1-episode-2/

https://www.singlestore.com/blog/singlestore-universal-storage-episode-3-revenge-of-the-upsert/

https://www.singlestore.com/blog/singlestore-universal-storage-episode-4/



文档引用

https://db-engines.com/en/system/SingleStore

https://techcrunch.com/2022/10/04/singlestore-raises-30m-more-to-brings-its-database-tech-to-new-customers/

https://www.infoworld.com/article/3712502/new-ai-features-for-developers-in-singlestoredb.html

https://www.mg21.com/singlestore.html

https://www.g2.com/products/singlestore/reviews#survey-response-8351360

https://xie.infoq.cn/article/40b2d3a2502380a920b755e0c

https://developer.baidu.com/article/detail.html?id=3248620

https://www.modb.pro/db/589502

https://juejin.cn/post/7126948786294751246







**singlestroreDB**



评估方向：

1. 社区活跃度
2. 适用场景
3. 水平分片的原理
4. 分布式事务的原理 
5. 费用
6. 迁移成本
7. 副本集的使用
8. 是否开源
9. 数据库引擎
10. 数据库架构
11. 对SQL语法的支持程度，是否兼容MYSQL，用户上手的容易程度
12. 优势
13. 劣势
14. 与传统的数据库MYSQL对比 或者 与支持水平分表的中间价对比 它的优势是什么
15. 如何支持高可用、高性能、
16. 可维护性
17. 内存型数据库
18. 二级索引
19. 



**简介**



“ SingleStore（前身 MemSQL）是一个为数据密集型应用设计的云原生数据库。它是一个分布式的关系型 SQL 数据库管理系统（RDBMS），具有 ANSI SQL 支持，它以数据摄入、交易处理和查询处理的速度而闻名。SingleStore 主要存储关系型数据，但也可以存储 JSON 数据、图形数据和时间序列数据。它支持混合工作负载，也就是我们常说的 HTAP ，以及更传统的 OLTP 和 OLAP 用例。对于查询，它将结构化查询语言（SQL）编译成机器代码。SingleStore 数据库引擎可以在各种 Linux 环境中运行，包括企业内部安装（on-premises）、公共和私有云供应商、通过 Kubernetes 运营商在容器中运行，或者使用 SingleStore 自有的托管云服务。





主打实时分布式数据库？有什么特点吗？



该系统消除性能瓶颈和数据移动，以支持要求苛刻的工作负载







社区活跃度低还是高！？使用者多还是少？



无共享架构？





优势

支持混合工作负载HTAP，不需要源源不断的通过OLTP ETL OLAP，不需要数据迁移，不需要同时维护两套数据，减少系统的存储开销



计算和存储分离？







缺点





适用场景





计费方式

工作区和存储分开计费，工作区按秒计费，存储按每月使用的存储量计费，备份和时间点恢复按标准存储率收费



SingleStore 数据库引擎可以在各种[Linux](https://en.m.wikipedia.org/wiki/Linux)环境中运行，包括[本地](https://en.m.wikipedia.org/wiki/On-premises_software)安装、[公共](https://en.m.wikipedia.org/wiki/Public_cloud)和[私有云](https://en.m.wikipedia.org/wiki/Private_cloud)提供商、通过[Kubernetes](https://en.m.wikipedia.org/wiki/Kubernetes)操作员在容器中运行，或作为云中的托管服务（称为 SingleStore 托管服务）运行。



SingleStore 不是严格意义上的“内存型数据库”，而是一种内存存储与磁盘存储相结合的混合型数据库系统。它将数据首先加载到内存中进行处理和计算，然后根据需要将部分数据持久化到磁盘上。这种架构设计使得 SingleStore 具有高性能和低延迟的特点，能够快速处理大规模数据和高并发请求。因此，尽管内存起着重要作用，但 SingleStore 并不是完全依赖于内存的数据库系统。





"无共享架构"意味着系统中的资源（如内存、存储、计算等）不被多个任务或请求共享。相反，每个任务或请求都会被分配独立的资源来执行，这样可以避免资源争用和性能瓶颈。在数据库领域，无共享架构通常指的是每个数据库连接或查询都会被分配独立的资源，而不会与其他连接或查询共享资源。这种架构设计有助于提高系统的稳定性、可伸缩性和性能。SingleStore 采用了无共享架构，每个连接或查询都会获得独立的资源来执行，从而实现了高性能和高并发的数据处理能力。



SingleStore 有两个版本：一个是免费的社区版（Community Edition），另一个是商业版（Enterprise Edition）。



1. **社区版（Community Edition）：** 社区版是免费的，可供个人和小型团队使用。它提供了核心的功能，如分布式存储、SQL 查询、实时分析等，但在一些高级功能和性能方面可能有限制。



2. **企业版（Enterprise Edition）：** 企业版是付费的，提供了更多的高级功能和支持服务，如自动故障恢复、高可用性、安全功能、优化工具等。企业版还提供了更灵活的部署选项和技术支持，适合于大型企业和对性能和可靠性有较高要求的项目。



SingleStore 的收费模式通常基于订阅许可证，根据用户的需求和部署规模收取费用。收费通常与节点数量、数据存储量、订阅级别和支持服务有关。具体的收费详情可以通过与 SingleStore 公司联系或查阅其官方网站获得。



至于开源性质，SingleStore 的社区版是部分开源的，它基于 Apache 2.0 开源许可证发布，但企业版的部分功能是专有的，不属于开源范畴。



Comparing SingleStore vs. MySQL in 2024

https://data-sleek.com/blog/comparing-singlestore-vs-mysql-in-2024/



存储方式：磁盘上列存储，内存中行存储（SPARSE压缩）

https://zhuanlan.zhihu.com/p/536315172

主要为了 OLAP 设计



对用户来讲，choosing rowstore 还是 columnstore 可能是个 hard choice，因为这需要让用户自己去判断涉及这张表的 workload 是更偏向于 TP 还是 AP，如果很均衡那就无了。为了解决这个问题，S2DB 提出 Unified table storage，将原本的 columnstore 进行优化来支持 AP 和 TP。



S2DB的定位是一个分布式可扩展的HTAP系统，他的初衷是希望可以用一套系统来同时解决OLTP的高并发事务负载和OLAP的大数据量实时分析负载。



用一套系统来同时解决OLTP的高并发事务负载和OLAP的大数据量实时分析负载。



计费方式

azure for mysql :https://azure.microsoft.com/en-us/pricing/details/mysql/flexible-server/

Singlestore: https://www.singlestore.com/cloud-pricing/







**稿一**



简介

SingleStore 提供完全托管、分布式、高度可扩展的 SQL 数据库，前身是MemSQL，是一个为数据密集型应用设计的云原生数据库。借助 SingleStore 托管服务，客户不再需要担心管理基础设施、配置集群、处理升级或故障排除。 它可以部署在任何领先的云环境中，包括 AWS、Azure 和 GCP，或部署在多个云中，或者直接部署在具有专用产品的客户数据中心中。

S2DB的定位是一个分布式可扩展的HTAP系统，他的初衷是希望可以用一套系统来同时解决OLTP的高并发事务负载和OLAP的大数据量实时分析负载。



特点

1. 计算和存储分离：提供无限存储空间，并允许用户轻松扩展计算资源以满足任何工作负载的需求，同时完全独立地管理存储需求。
2. 通用存储（列存储）： 通用存储可让您以较低的总拥有成本 (TCO) 支持大规模在线事务处理 (OLTP) 和混合事务和分析处理 (HTAP) 。通用存储是[列存储](https://docs.singlestore.com/cloud/create-a-database/columnstore/)的持续演进，支持传统上使用[行存储](https://docs.singlestore.com/cloud/create-a-database/rowstore/)的事务工作负载。

- (1)降低总拥有成本 (TCO)，因为对于涉及更新插入或需要唯一键强制执行的典型操作，数据不需要全部装入 RAM。这样就不需要具有非常大 RAM 的服务器，从而降低了成本，因为这可能很昂贵。
- （2）降低复杂性，因为现在您不必在行存储上执行某些操作，然后将数据移动到列存储，从而提供以前不可能实现的速度和性能。
- (3)与 upsert、唯一键强制、快速查找和其他 OLTP 样式操作结合使用时，大型表的分析性能得到改善 。这是因为分析查询可以在单个核心上每秒处理列存储表上的数亿行，而行存储上每个核心的峰值性能约为每秒 2000 万行。

1. 数据迁移
2. 数据分片，基于哈希的分片，每个分布式表只有一个分片键，分片键可以包含任意数量的列，
3. 存储：
   - 内存行存储、高度压缩的列存储和参考表。
   - 对于执行许多点查找和小插入、更新和删除操作的应用程序，行存储的性能远优于列存储。使用内存数据的定期快照和预写日志为 Rowstore 实现持久性，它们都存储在文件系统上以使其永久存在。





1. SQL兼容
2. 存储

- SingleStore Helios提供内存中的基于行的存储和磁盘上的基于列的存储。
  - 内存行存储：
    - 最适合混合事务和分析工作负载
    - 提供低延迟和高并发的单行读写以及复杂的分析 SQL 查询
    - 恢复时间更长（因为需要将整个表加载到内存中）
    - 最适合混合事务和分析工作负载
  - 磁盘上的列存储：
    - 最适合分析工作负载
    - 允许表大于工作区中可用 RAM 的大小
    - 使用压缩（降低磁盘使用率并加速复制）
    - 



社区活跃度一般，

1. 在官方论坛和社区分享和交流应验的用户较少， https://www.singlestore.com/forum/latest & https://www.singlestore.com/events/
2. 在GitHub活跃度低，在GitHub上的项目数量、星标数、提交频率等数量较少https://github.com/singlestore-labs
3. 在线资源和文档少，不能够帮助用户更好地理解和使用数据库



费用：

1. 免费版本功能有限、资源有限
2. 

适用场景

- [实时分析](https://www.singlestore.com/solutions/operational-analytics/)：支持美国十大银行中的五家，对流式数据进行快速响应，并在 10-20 毫秒内提供即时查询响应。
- [风险管理](https://www.singlestore.com/solutions/risk-management/)：借助 SingleStore，任何规模的金融服务机构都可以以其经济高效、简化的数据架构为其内部和面向客户的应用程序提供实时决策，速度提高 10 倍，成本降低 1/3。
- [物联网](https://www.singlestore.com/solutions/internet-of-things/)：支持大规模解决方案，如 120 万个智能电表或每天数百万个实时数据分析查询
- 实时[监控和检测](https://www.singlestore.com/solutions/monitoring-and-anomaly-detection/)：帮助公司识别和修复漏洞，并大幅提高 50 倍的性能，将扫描时间从几小时缩短至几分钟，提高 60 倍，将查询性能提高 20 倍，并将成本降低 1/3。
- [美国一级银行](https://www.singlestore.com/blog/case-study-fraud-detection-on-the-swipe/)：50 毫秒内即可对信用卡交易进行实时欺诈分析 
- [Uber](https://www.singlestore.com/blog/case-study-scalable-sql-database-uber/)：通过大规模并发实时分析来管理全天候运营 
- 人脸识别
- 机器学习和人工智能



优点

1. **兼容MySQL: 因此使用 MySQL 驱动程序的应用程序可以透明地连接和使用SingleStore 。**
2. SingleStore还与流处理框架Apache Spark很好地集成，以提供创建和管理实时数据管道的简单方法。
3. 支持HTAP混合事务分析处理，因为大多数企业进行数字资产的盘活、报表分析、数据挖掘等，需要维护两套数据系统OLTP&OLAP，以及OLTP数据向OLAP数据进行源源不断的ETL过程，整合OLTP&OLAP，成倍的减少系统存储的开销，避免了ELT过程对系统性能的影响。
4. 架构：**简单而简化的架构，**[具有一个统一的数据库，用于处理运营和分析工作负载](https://www.singlestore.com/resources/whitepaper-simplifying-data-architectures-with-a-unified-database/)
5. 高性能：每秒处理超过一万亿行的速度，以一次性语义并行提取流数据，以便直接、立即处理或从 Kafka、Spark、S3 等来源和 Parquet、JSON 和 CSV 等数据格式提取原始数据和事件
6. 高并发
7. 快速分析
8. 部署管理的灵活性：可在云端、Kubernetes 或本地使用。DevOps 可在多云上快速部署和扩展。开放平台可与 Kafka、Spark、HDFS、Kubernetes 一起运行。
9. 可扩展性：横向扩展架构可利用商用硬件有效、快速地响应不断增长的工作负载，无需附加组件或专业的调优专业知识。
10. 可维护性：在标准硬件上快速部署集成的软件环境，大大降低复杂性和可管理性。
11. 实时分析：第一个具有真正线性无共享可扩展性的数据库，可实现基本上无限的扩展，这已通过三个领先的行业基准测试证明：TPC-C、TPC-H 和 TPC-DS。
12. 高可用性：故障转移



缺点



1. 云版本成本高，差不多同计算和存储配置的情况下，azure for singlestore的收费比azure db for mysql高2～5倍， 如下：
2. 社区不活跃不高，

- SingleStore是一个相对新的数据库系统，其社区正在逐渐成长
- 在官方论坛和社区分享和交流应验的用户较少， https://www.singlestore.com/forum/latest & https://www.singlestore.com/events/
- 在GitHub活跃度低，在GitHub上的项目数量、星标数、提交频率等数量较少https://github.com/singlestore-labs
- 在线资源和文档少，不能够帮助用户更好地理解和使用数据库， 学习成本高

1. SingleStore在内存优化、分布式架构、HTAP支持以及实时性方面的特点使得它更适合于处理数据分析任务，特别是需要快速、高效地处理大规模数据并获得实时反馈的场景。



总结



我们的访问者经常将 SingleStore 与[ClickHouse](https://db-engines.com/en/system/ClickHouse%3BSingleStore)、[MySQL](https://db-engines.com/en/system/MySQL%3BSingleStore)和[Redis](https://db-engines.com/en/system/Redis%3BSingleStore)进行比较。