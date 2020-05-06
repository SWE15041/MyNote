[toc]

# 一、发布

# 二、订阅源码解读

## 订阅代码核心

```java
public class ProductModule extends Module {
    @Override
    protected void initialize() {
        kafka().subscribe("product-updated", ProductUpdatedMessage.class, bind(ProductUpdatedMessageHandler.class));
    }
}
```

## 大概流程：

- 加载kafka配置到应用上下文；
- 通过kafka配置类执行订阅操作；
- 订阅操作的内部实现，会去**实例化**一个 **消息监听器** ；
- 在项目启动的时候，消息监听器会被**初始化**
- 消息监听器初始化时，会初始化Kafka客户端的配置，会创建多个消息监听器线程去**轮询**获取消息
- 获取到消息后，会将消息反序列化，然后交给自定义的消息处理器进行业务处理；

## 1、配置

### 1.1 将kafka基本配置注入 到上下文当中

```java
   public KafkaConfig kafka(String name) {
        return context.config(KafkaConfig.class, name);
    }
```

### 1.2  订阅Kafka的topic

-  通过启用消息监听器，从而创建消息监听线程 ，再把轮询获取的Kafka消息转发给 **自定义处理器**处理；
- 在项目加载上下文的时候会去执行启用 **消息监听器**：见`App.start()`;

- 核心代码：`  listener().subscribe(topic, messageClass, handler, bulkHandler);`

```java
  private <T> void subscribe(String topic, Class<T> messageClass, MessageHandler<T> handler, BulkMessageHandler<T> bulkHandler) {
        if (handler == null && bulkHandler == null) throw new Error("handler must not be null");
        logger.info("subscribe, topic={}, messageClass={}, handlerClass={}, name={}", topic, messageClass.getTypeName(), handler != null ? handler.getClass().getCanonicalName() : bulkHandler.getClass().getCanonicalName(), name);
        new BeanClassValidator(messageClass, context.serviceRegistry.beanClassNameValidator).validate();
        listener().subscribe(topic, messageClass, handler, bulkHandler);
        handlerAdded = true;
    }
```

#### 1.2.1  解析 - listener()：实例化消息监听器

>  定义`MessageListener` 监听器

##### 消息监听器实例化

- 定义上下文启动时，需要执行的任务：listener::start
- 定义上下文关闭时，监听器需要做的事情；

```java
private MessageListener listener() {
        if (listener == null) {
            if (uri == null) throw new Error("kafka uri must be configured first, name=" + name);
            listener = new MessageListener(uri, name, context.logManager);
            context.startupHook.add(listener::start);
            context.shutdownHook.add(ShutdownHook.STAGE_0, timeout -> listener.shutdown());
            context.shutdownHook.add(ShutdownHook.STAGE_1, listener::awaitTermination);
            context.collector.metrics.add(listener.consumerMetrics);
        }
        return listener;
    }
```

> MessageListener的 start()方法

##### 消息监听器初始化

- 当项目启动，消息监听器调用执行初始化，会去创建 **消息监听线程**（线程数=机器cpu核数*4）

```java
 public void start() {
        this.threads = createListenerThreads(); // if it fails to create thread (such kafka host is invalid, failed to create consumer), this.threads will be null to skip shutdown/awaitTermination
        for (var thread : threads) {
            thread.start();
        }
        logger.info("kafka listener started, uri={}, topics={}, name={}, groupId={}", uri, topics, name, groupId);
    }
```

###### 创建消息监听线程 

- 初始化订阅kafka的客户端配置：consumer() 
- 创建完消息监听线程，再启用线程；会在线程中轮询获取Kafka消息数据

> ```java
> private MessageListenerThread[] createListenerThreads() {
>     var threads = new MessageListenerThread[poolSize];
>     var watch = new StopWatch();
>     for (int i = 0; i < poolSize; i++) {
>         watch.reset();
>         String name = listenerThreadName(this.name, i);
>         Consumer<byte[], byte[]> consumer = consumer();
>         consumer.subscribe(topics);
>         var thread = new MessageListenerThread(name, consumer, this);
>         threads[i] = thread;
>         logger.info("create kafka listener thread, topics={}, name={}, elapsed={}", topics, name, watch.elapsed());
>     }
>     return threads;
> }
> ```



> cunsumer()

```java
 Consumer<byte[], byte[]> consumer() {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, uri);   // immutable map requires value must not be null
        config.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        config.put(ConsumerConfig.CLIENT_ID_CONFIG, Network.LOCAL_HOST_NAME + "-" + CONSUMER_CLIENT_ID_SEQUENCE.getAndIncrement());      // will show in monitor metrics
        config.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, Boolean.FALSE);
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, ASCII.toLowerCase(OffsetResetStrategy.LATEST.name()));      // refer to org.apache.kafka.clients.consumer.ConsumerConfig, must be in("latest", "earliest", "none")
        config.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, (int) maxProcessTime.toMillis());
        config.put(ConsumerConfig.REQUEST_TIMEOUT_MS_CONFIG, (int) maxProcessTime.plusSeconds(5).toMillis());
        config.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, maxPollRecords);
        config.put(ConsumerConfig.FETCH_MAX_BYTES_CONFIG, maxPollBytes);
        config.put(ConsumerConfig.FETCH_MIN_BYTES_CONFIG, minPollBytes);
        config.put(ConsumerConfig.FETCH_MAX_WAIT_MS_CONFIG, (int) maxWaitTime.toMillis());
        var deserializer = new ByteArrayDeserializer();
        Consumer<byte[], byte[]> consumer = new KafkaConsumer<>(config, deserializer, deserializer);
        consumerMetrics.add(consumer.metrics());
        return consumer;
    }
```



#### 1.2.2  解析 - subscribe(....)：定义订阅的kafka信息

- 订阅的topic
- 存放消息的实体
- 消息处理器

注：`Map<String, MessageProcess<?>> processes` ：MessageListenerThread线程运行时需要用到

```java
  public <T> void subscribe(String topic, Class<T> messageClass, MessageHandler<T> handler, BulkMessageHandler<T> bulkHandler) {
        boolean added = topics.add(topic);
        if (!added) throw new Error("topic is already subscribed, topic=" + topic);
        processes.put(topic, new MessageProcess<>(handler, bulkHandler, messageClass));
    }

```



### 1.3 消息监听器线程:MessageListenerThread

- 轮询获取Kafka消息
- 将获取到的 **消息数据**，校验后 转发给相应的 **消息处理器**处理
- 消息处理器是自定义的，需要继承 `BulkMessageHandler` 或 `MessageHandler` 接口 

```java
 ConsumerRecords<byte[], byte[]> records = consumer.poll(Duration.ofSeconds(10));
 processRecords(records);
```

```java
 private void processRecords(ConsumerRecords<byte[], byte[]> kafkaRecords) {
        var watch = new StopWatch();
        int count = 0;
        int size = 0;
        try {
            Map<String, List<ConsumerRecord<byte[], byte[]>>> messages = new HashMap<>();     // record in one topic maintains order
            for (ConsumerRecord<byte[], byte[]> record : kafkaRecords) {
                messages.computeIfAbsent(record.topic(), key -> new ArrayList<>()).add(record);
                count++;
                size += record.value().length;
            }
            for (Map.Entry<String, List<ConsumerRecord<byte[], byte[]>>> entry : messages.entrySet()) {
                String topic = entry.getKey();
                List<ConsumerRecord<byte[], byte[]>> records = entry.getValue();
                MessageProcess<?> process = processes.get(topic);
                if (process.bulkHandler != null) {
                    handleBulk(topic, process, records, longProcessThreshold(batchLongProcessThresholdInNano, records.size(), count));
                } else {
                    handle(topic, process, records, longProcessThreshold(batchLongProcessThresholdInNano, 1, count));
                }
            }
        } finally {
            consumer.commitAsync();
            logger.info("process kafka records, count={}, size={}, elapsed={}", count, size, watch.elapsed());
        }
    }
```



## 2、项目启动执行流程

### 2.1 加载配置

### 2.2 App.start()

#### 2.2.1 执行Task任务

```java
 for (Task task : context.startupHook) {
                task.execute();
            }
```

