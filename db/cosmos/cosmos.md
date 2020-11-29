[toc]

```
Account name: localhost:<port>
Account key: C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==
// 8081
```



# 拓展知识点

## 端到端

```
定义：端到端是网络连接，属于传输层。端到端是由无数的点到点实现和组成的。
    端到端建立连接会经过复杂的物理线路，将源和目的之间建立连接，称为逻辑链路；

端到端数据库管理
	
```

## SAAS

- Software-as-a-Service，软件即服务 ，软件应用模式。
- 
- 

## PAAS

- Platform-as-a-Service，平台即服务，把服务器平台作为一种服务提供的商业模式。
- 

## LAAS

- Infrastructure as a Service，基础设施即服务

- 

# cosmos可视化管理工具：

1、power bi desktop

## 1 安装Power BI

登录：主机地址/key

地址：

https://powerbi.microsoft.com/zh-cn/desktop/

https://docs.azure.cn/zh-cn/cosmos-db/powerbi-visualize

使用教程：https://docs.microsoft.com/zh-cn/azure/cosmos-db/powerbi-visualize

## 2  Azure Storage Explorer (choose)

https://docs.microsoft.com/en-us/azure/cosmos-db/storage-explorer

https://azure.microsoft.com/zh-cn/features/storage-explorer/

## 3  安装power shell 7 

3.1 安装power shell 7 

https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7

3.2  安装 powerShellGet (win10以上已经内置了)

https://docs.microsoft.com/en-us/powershell/scripting/gallery/installing-psget?view=powershell-7

3.3  安装azure power shell

https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-4.4.0#code-try-0	

![image-20200807142239913](cosmos.assets/image-20200807142239913.png)

3.4  安装Azure Cosmos DB ODBC驱动

https://docs.microsoft.com/en-us/azure/cosmos-db/odbc-driver

## 4 连接配置

- endpointUri: URI
- 秘钥：主密钥 or 辅助密钥  
- 连接字符串: 主要连接字符串 or 次要连接字符串

![image-20201119092925855](cosmos.assets/image-20201119092925855.png)

# cosmos开发文档

地址：

https://docs.microsoft.com/zh-cn/learn/modules/choose-api-for-cosmos-db/

[https://docs.microsoft.com/zh-cn/learn/modules/create-cosmos-db-for-scale/?WT.mc_id=azureportalcard_Service_Azure%20Cosmos%20DB_-inproduct-azureportal](https://docs.microsoft.com/zh-cn/learn/modules/create-cosmos-db-for-scale/?WT.mc_id=azureportalcard_Service_Azure Cosmos DB_-inproduct-azureportal)



构建cosmos应用的Java项目

步骤

1、创建maven项目

2、导入依赖

```
    <dependencies>
        <dependency>
            <groupId>com.azure</groupId>
            <artifactId>azure-cosmos</artifactId>
            <version>4.0.1-beta.1</version>
        </dependency>
        <dependency>
            <groupId>com.github.javafaker</groupId>
            <artifactId>javafaker</artifactId>
            <version>1.0.2</version>
        </dependency>
    </dependencies>
```

3、创建数据库、容器、索引策略

```java
package org.example;

import com.azure.cosmos.ConnectionPolicy;
import com.azure.cosmos.ConsistencyLevel;
import com.azure.cosmos.CosmosAsyncClient;
import com.azure.cosmos.CosmosAsyncContainer;
import com.azure.cosmos.CosmosAsyncDatabase;
import com.azure.cosmos.CosmosClientBuilder;
import com.azure.cosmos.models.CosmosContainerProperties;
import com.azure.cosmos.models.IncludedPath;
import com.azure.cosmos.models.IndexingMode;
import com.azure.cosmos.models.IndexingPolicy;
import com.google.common.collect.Lists;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * 使用 Java 创建新的 Java 应用、数据库和容器
 */
public class App {
    private static String endpointUri = "YOUR_URI";
    private static String primaryKey = "YOUR_KEY";
    private static String writeLocation = "YOUR_LOCATION";

    private static CosmosAsyncDatabase targetDatabase;
    private static CosmosAsyncContainer customContainer;
    private static AtomicBoolean resourcesCreated = new AtomicBoolean(false);

    public static void main(String[] args) {
        // 1. 添加以下代码行以创建 CosmosAsyncClient 实例：
        ConnectionPolicy defaultPolicy = ConnectionPolicy.getDefaultPolicy();
        defaultPolicy.setPreferredLocations(Lists.newArrayList(writeLocation));

        CosmosAsyncClient client = new CosmosClientBuilder()
            .setEndpoint(endpointUri)
            .setKey(primaryKey)
            .setConnectionPolicy(defaultPolicy)
            .setConsistencyLevel(ConsistencyLevel.EVENTUAL)
            .buildAsyncClient();

        // 2.此代码将检查 Azure Cosmos DB 帐户中是否已存在数据库，如果不存在，它将创建一个数据库。
        client.createDatabaseIfNotExists("Products").flatMap(databaseResponse -> {
            targetDatabase = databaseResponse.getDatabase();
            // 2.1 创建索引策略
            IndexingPolicy indexingPolicy = new IndexingPolicy();
            indexingPolicy.setIndexingMode(IndexingMode.CONSISTENT);
            indexingPolicy.setAutomatic(true);
            List<IncludedPath> includedPaths = new ArrayList<>();
            IncludedPath includedPath = new IncludedPath();
            includedPath.setPath("/*");
            includedPaths.add(includedPath);
            indexingPolicy.setIncludedPaths(includedPaths);
            // 2.2 创建容器
            CosmosContainerProperties containerProperties =
                new CosmosContainerProperties("Clothing", "/productId");
            containerProperties.setIndexingPolicy(indexingPolicy);
            return targetDatabase.createContainerIfNotExists(containerProperties, 10000);
        }).flatMap(containerResponse -> {
            customContainer = containerResponse.getContainer();

            return Mono.empty();
        }).subscribe(voidItem -> {
        }, err -> {
        }, () -> {
            resourcesCreated.set(true);
        });

        while (!resourcesCreated.get()) ;

        System.out.println(String.format("Database Id:\t%s", targetDatabase.getId()));
        System.out.println(String.format("Container Id:\t%s", customContainer.getId()));

        client.close();
    }
}
```



# cosmos核心概念

1、请求单位：

参考：https://docs.microsoft.com/zh-cn/learn/modules/create-cosmos-db-for-scale/3-what-is-a-request-unit

概念：

```
预配吞吐量: 数据库预配吞吐量 、容器预配吞吐量
请求单位：一个请求单位 (1 RU) 等于使用文档 ID 在 1-KB 文档上执行一个 GET 请求所产生的大致成本。


```

2、分区概念

3、cosmos账户结构

- 数据库：数据库包含容器。（）
- 容器： 容器是预配的吞吐量和存储的缩放单元。（相当于mongodb的collection）
- 项：（相当于mongodb的document）

一个 Cosmos DB 帐户包含零个或零个以上的数据库，一个数据库 (DB) 包含零个或零个以上的容器，一个容器包含零个或零个以上的项。



# 分区和分区键

作用：唯一索引（项的逻辑分区分区键+项ID）

## 相关文档：

https://www.c-sharpcorner.com/article/partitioning-in-cosmos-db/

https://docs.microsoft.com/en-us/azure/cosmos-db/partitioning-overview

https://github.com/Azure/azure-cosmosdb-js-server/edit/master/samples/stored-procedures/bulkDelete.js



## 逻辑分区：

- 对单个容器进行逻辑分区，(不同的容器间，允许分区的键值一样？)
- 只允许对单个逻辑分区的项执行事务。（存储过程、触发器）

```
逻辑分区由分区键相同的项组成；
新增项到容器时可自动创建逻辑分区；
逻辑分区的数量没有限制，每个逻辑分区最多可容纳20GB数据；

```

## 物理分区

```
通过跨物理分区分布数据和吞吐量来扩展容器。
容器中物理分区的数量取决于以下配置：
预配置的吞吐量数量（每个单独的物理分区可以提供每秒高达10,000个请求单位的吞吐量）。
总数据存储（每个单独的物理分区最多可以存储50GB数据）。
容器中的物理分区总数没有限制。
预配置的吞吐量在容器的物理分区之间平均分配。
逻辑分区键可以共同使用被平均分配后的物理分区的预配置的吞吐量。

当一个物理分区进行拆分时，会把原来的逻辑分区映射到新的物理分区。
容器预配的吞吐量将被平均分配到每个物理分区。如果分区键设计不合理，将导致大量的请求被定向到某个逻辑分区内，从而形成“热分区”，会导致请求频率限制和高消费。
```

- 容器的物理分区跟以下的配置有关：
  - 预配吞吐量. (每个单独的物理分区 每秒最多可以处理10000个RU.)
  - 数据总存储量. (每个单独的物理分区最大可以存放50G的数据)

## 逻辑分区和物理分区的关系

```
一个或多个逻辑分区被映射到单个物理分区
```

## 副本集

- 每个物理分区都有一组副本（至少4个）
- 物理分区：1个leader 、2个follower、 1个forwarder
- 

## 分区键

- 组成：分区键路径 和分区键值
- 分区键路径：由 "/"+项的属性组成
- 分区键值：可以是字符串 或者 数值类型

```
分区键路径
分区键值

特点：
选择分区键后，将无法就地更改它。
如果需要更改分区键，则应使用所需的新分区键将数据移动到新容器中。
所有基于JavaScript的存储过程和触发器的作用域仅限于单个逻辑分区。

举例
项：{"id":"1", "name":"a"}
分区键路径：/name
分区键值：a

如何选用分区键：
分区键值不可变
高基数（使用该键值的项多）
跨所有逻辑分区平均分配请求单位（RU）消耗和数据。？？

什么时候选用项ID作为分区键：
项ID具有业务含义,且需要经常被应用到的时候，像员工表的员工Id


```

# 相关概念

- 来源：https://azure.microsoft.com/zh-cn/support/legal/sla/cosmos-db/v1_3/?cdn=disable

```
SLA: 全面的服务水平协议
“容器” 指数据项容器，以及事务和查询的规模单位。
“消耗的 RU 数”是指在指定的一秒内 Azure Cosmos DB 容器处理的所有请求 所消耗的请求单位的总数。
“请求单位 (RU)”是 Azure Cosmos DB 吞吐量的度量。



```

高可用性、高吞吐量、低延迟以及可调的一致性。



# NoSQL 数据库与关系数据库之间的差别

## 高吞吐量

分布式数据 可以提供更可伸缩的解决方案。

## 分层数据







# 优势

## 速度

服务级别的速度和吞吐量；

快速的全局访问

即使弹性：弹性地缩放存储和吞吐量



## 简化应用开发



## 高可用性、安全性、 一致性

- **一致性**：
  - 通过自动数据复制轻松地将数据分布到任何 Azure 区域。 使用强一致性时，多区域写入或 RPO 0 无需停机。

- **安全性**：
  -  基于角色的访问控制，供精细的控制 ，确保数据安全；
  - 自行管理的密钥？？？
- **高可用性**：
  - 提供了全面的 [SLA](https://azure.microsoft.com/support/legal/sla/cosmos-db) 套件？？？



# Cosmos DB 资源模型

一个数据库账户 可以管理多个数据库；

一个数据库就可以创建多个容器；



## 数据库

- 数据库是一组cosmos容器的管理单元
- 增删改查数据库的方式：SQL API 等
-  

## 容器

-  容器是 **预配的吞吐量** 和 **存储** 的缩放单元。
- 容器可以提供几乎无限的预配吞吐量 (RU/s) 和存储。
- 容器的层次结构：存储过程、合并过程、函数、触发器、项
- 根据选用的cosmos API类型，容器可以是集合、表、图、等（同理，项可以是行、文档、节点等）

- 创建容器时，配置吞吐量：
  - **专用预配吞吐量模式**（可弹性缩放）：创建容器的时候预配。
  - **共享预配吞吐量模式**（可以弹性缩放）：共享数据库的的吞吐量。（"共享吞吐量" 容器不包含已配置的专用预配吞吐量的容器）

- 注：（只有在创建数据库和容器时，才能配置共享吞吐量和专用吞吐量。 若要在创建容器后从专用吞吐量模式切换为共享吞吐量模式（或反之），必须创建一个新容器，并将数据迁移到该容器。 可以使用 Azure Cosmos DB 更改源功能迁移数据。）

- 容器的属性

  - 系统属性：

    ```
    _rid: 容器的唯一标识符	
    _etag:用于乐观并发控制的实体标记	
    _ts:容器上次更新的时间戳	
    _self: 容器的可寻址 URI	
    ```

  - 用户可配置属性：

    ```
    id: 用户定义的容器唯一名称	
    indexingPolicy: 提供更改索引路径、索引类型和索引模型的功能	
    TimeToLive: 提供在设置的时间段后从容器自动删除项的功能 有关详细信息，请参阅生存时间。	
    changeFeedPolicy: 用于读取对容器中的项所做的更改。 有关详细信息，请参阅更改源。	
    uniqueKeyPolicy: 用于确保逻辑分区中一个或多个值的唯一性。 有关详细信息，请参阅唯一键约束。	
    
    ```

    

## 项

-  项的属性：

  - 系统自动生成：

  ```
  _rid: 项的唯一标识符	
  _etag: 用于乐观并发控制的实体标记	
  _ts: 项上次更新的时间戳	
  _self: 项的可寻址 URI	
  ```

  - 可以有系统自动生成 或 用户自定义（ID的值）

  ```
  id: 逻辑分区中用户定义的唯一名称。	
  （id 属性的唯一性仅在每个逻辑分区中强制实施。 多个文档可以具有相同的id属性，但具有不同的分区键值。）
  ```

  - 用户自定义属性：

  ```
  任意用户定义的属性	
  ```

  

