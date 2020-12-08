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