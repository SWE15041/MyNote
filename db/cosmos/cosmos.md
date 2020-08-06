```
$resourceGroupName = "myResourceGroup"
$locations = @("China North 2", "China East 2")
$accountName = "mycosmosaccount"
$apiKind = "Sql"
$consistencyLevel = "BoundedStaleness"
$maxStalenessInterval = 300
$maxStalenessPrefix = 100000

New-AzCosmosDBAccount `
    -ResourceGroupName $resourceGroupName `
    -Location $locations `
    -Name $accountName `
    -ApiKind $apiKind `
    -EnableAutomaticFailover:$true `
    -DefaultConsistencyLevel $consistencyLevel `
    -MaxStalenessIntervalInSeconds $maxStalenessInterval `
    -MaxStalenessPrefix $maxStalenessPrefix
```



```
Account name: localhost:<port>
Account key: C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==
// 8081
```



https://docs.azure.cn/zh-cn/cosmos-db/powerbi-visualize



https://powerbi.microsoft.com/zh-cn/desktop/



https://docs.microsoft.com/zh-cn/learn/modules/choose-api-for-cosmos-db/



[https://docs.microsoft.com/zh-cn/learn/modules/create-cosmos-db-for-scale/?WT.mc_id=azureportalcard_Service_Azure%20Cosmos%20DB_-inproduct-azureportal](https://docs.microsoft.com/zh-cn/learn/modules/create-cosmos-db-for-scale/?WT.mc_id=azureportalcard_Service_Azure Cosmos DB_-inproduct-azureportal)



cosmos可视化管理工具：power bi desktop

登录：主机地址/key

使用教程：https://docs.microsoft.com/zh-cn/azure/cosmos-db/powerbi-visualize





