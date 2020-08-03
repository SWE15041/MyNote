1、调用接口：`/uploads/v1/{username}`，这几个返回参数的值应该是多少（complete，error，progress），表示这个接口upload成功？

地址：https://docs.mapbox.com/api/maps/#create-an-upload

2、调用接口：`/uploads/v1/{username}/{upload_id}`获取上报结果，连接超时

3、数据不能实时生效

第一步：调用上报接口新增或者更新数据后，检索上报状态显示结果（complete=true,progress=1,error=null）,

第二步：调用查询接口(`tilequery`)判断 点是否在多边形内，

问题：点在多边形内，但是结果不能立即生效。要隔一段时间后调用接口才生效，要怎么去判断上报的数据以及被`mapbox`成功处理呢？

```
{
    "id":"ckcub17650xj522pbvwm9sep0",
    "name":"fzs-jaydai.783f5ca6a5d546ddbcc4aa3bf3415946-AS",
    "complete":false,
    "error":null,
    "created":"2020-07-20T09:26:27.263Z",
    "modified":"2020-07-20T09:26:27.263Z",
    "tileset":"jaydai.783f5ca6a5d546ddbcc4aa3bf3415946",
    "owner":"jaydai",
    "progress":0
}
```



2、

