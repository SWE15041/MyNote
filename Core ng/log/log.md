[toc]

步骤：

1、加载属性文件"sys.properties"

```java
load(new SystemMoudle("sys.properties"))
```



> sys.properties
>
> ```properties
> // value ：[console || port:host]
> sys.log.appender=console
> ```

1.1 解析 sys.properties

- 在项目启动的时候，会加载日志的配置
  - sys.log.appender=console：表示在控制台打印日志
  - sys.log.appender=port:host :表示将日志信息**转发**给指定的“日志服务器（kafka）”

1.2 日志转发流程

- 加载日志配置信息：LogConfig 
  - 定义将日志信息发送给 kafka ：appender = new KafkaAppender(kafkaURI)
  - 定义 定时任务 采集”机器性能“ 
  - 将日志信息追加器加载到项目上下文：context.logManager.appender = appender;
  - 

- 加载上下文时：LogManager
  - start
  - end

- ActionLogContext   ActionLog



Demo

[toc]



```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36

http://www.slf4j.org/codes.html
```



demo

```
core.framework.internal.web.HTTPHandler#handle
```

```
00:00.000009000 c.f.i.log.ActionLog - === http transaction begin ===
00:00.000009600 c.f.i.log.ActionLog - id=7E471C5C760D3484ACB2
00:00.000016000 c.f.i.log.ActionLog - date=2022-01-11T03:09:08.086475538Z
00:00.000016300 c.f.i.log.ActionLog - thread=XNIO-1 task-5
00:00.000018900 c.f.i.web.HTTPHandler - httpDelay=67901
00:00.000036701 c.f.i.w.request.RequestParser - [request] method=GET, requestURL=https://api-doc-service/bo/service-endpoint?service=
00:00.000038001 c.f.i.w.request.RequestParser - [request:header] accept=application/json
00:00.000038401 c.f.i.w.request.RequestParser - [request:header] accept-encoding=gzip
00:00.000038601 c.f.i.w.request.RequestParser - [request:header] user-agent=APIClient
00:00.000038801 c.f.i.w.request.RequestParser - [request:header] client=api-doc-job-service
00:00.000039101 c.f.i.w.request.RequestParser - [request:header] timeout=20000000000
00:00.000039301 c.f.i.w.request.RequestParser - [request:header] ref-id=7E471C5C60FF6B52381B
00:00.000039501 c.f.i.w.request.RequestParser - [request:header] correlation-id=7E471C5C60FF6B52381B
00:00.000039601 c.f.i.w.request.RequestParser - [request:header] Host=api-doc-service
00:00.000044701 c.f.i.w.request.RequestParser - [request] remoteAddress=10.2.1.211, clientIP=10.2.1.211
00:00.000051901 c.f.i.w.request.RequestParser - [request:query] service=
00:00.000057501 c.f.i.log.ActionLog - maxProcessTime=20000000000
00:00.000062901 c.f.i.log.ActionLog - [context] path_pattern=/bo/service-endpoint
00:00.000063601 c.f.i.log.ActionLog - action=api:get:/bo/service-endpoint
00:00.000064201 c.f.i.log.ActionLog - [context] controller=app.apidoc.web.BOServiceEndpointWebServiceImpl.search
00:00.000070401 c.f.i.w.controller.InvocationImpl - execute controller, controller=app.apidoc.web.BOServiceEndpointWebServiceImpl.search
00:00.002915258 WARN c.f.i.db.MySQLQueryInterceptor - [SLOW_SQL] no index used, sql=SELECT id, service, endpoint, service_type, created_time, updated_time FROM service_endpoints
00:00.003023560 c.f.i.db.DatabaseImpl - select, sql=SELECT id, service, endpoint, service_type, created_time, updated_time FROM service_endpoints, params=[], returnedRows=0, elapsed=2935458
00:00.003052161 c.f.i.w.response.ResponseHandler - [response] statusCode=200
00:00.003055361 c.f.i.w.response.ResponseHandler - [response:header] Content-Type=application/json
00:00.003068561 c.f.i.w.response.BeanBody - [response] body={"service_endpoints":[]}
00:00.003115562 c.f.i.w.response.ResponseHandler - [response] bodyLength=24
00:00.003123462 c.f.i.log.ActionLog - elapsed=3123162
00:00.003123962 c.f.i.log.ActionLog - === http transaction end ===
```





统计信息

![image-20220112101923778](/Users/yannilan/Library/Application Support/typora-user-images/image-20220112101923778.png)