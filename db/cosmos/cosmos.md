[toc]

```
Account name: localhost:<port>
Account key: C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==
// 8081
```



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



# 分区

作用：唯一索引（项的逻辑分区分区键+项ID）

## 相关文档：

https://www.c-sharpcorner.com/article/partitioning-in-cosmos-db/

https://docs.microsoft.com/en-us/azure/cosmos-db/partitioning-overview

https://github.com/Azure/azure-cosmosdb-js-server/edit/master/samples/stored-procedures/bulkDelete.js



## 逻辑分区：

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

```



## 逻辑分区和物理分区的关系

```
一个或多个逻辑分区被映射到单个物理分区
```



## 分区键

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

