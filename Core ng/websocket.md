[toc]

注册监听器 

```java
ws().listen("/ws/web-server-notify-ui-diff-compare", WSWebClientUIDIffReportMessage.class, WSWebServerUIDiffReportMessage.class, bind(WSUIDiffReportListener.class));

```



客户端信息

```java
public class WSWebClientUIDIffReportMessage {
    @Property(name = "test_session_id")
    public String testSessionId;
}

```



服务端信息

```java
public class WSWebServerUIDiffReportMessage {
    @NotNull
    @NotBlank
    @Property(name = "test_session_id")
    public String testSessionId;

    @NotNull
    @Property(name = "status")
    public Status status;

    public enum Status {
        @Property(name = "PENDING")
        PENDING,
        @Property(name = "PROCESSING")
        PROCESSING,
        @Property(name = "COMPLETED")
        COMPLETED
    }
}
```



监听器

```java
public class WSUIDiffReportListener implements ChannelListener<WSWebClientUIDIffReportMessage, WSWebServerUIDiffReportMessage> {

    @Override
    public void onMessage(Channel<WSWebServerUIDiffReportMessage> channel, WSWebClientUIDIffReportMessage message) {
        ActionLogContext.put("test_session_id", message.testSessionId);
        ActionLogContext.put("status", "onMessage");
        channel.context().put("test_session_id", message.testSessionId);
        channel.join(WSUIDiffReportListenerHelper.getUiDiffCompareRoom(message.testSessionId));
    }

    @Override
    public void onConnect(Request request, Channel<WSWebServerUIDiffReportMessage> channel) {
        ActionLogContext.put("status", "onConnect");
    }

    @Override
    public void onClose(Channel<WSWebServerUIDiffReportMessage> channel, int code, String reason) {

    }
}

```



在Kafka中使用：发送信息  ( keyword:WebSocketContext)

```java
public class BulkCreateUIDiffReportMessageHandler implements MessageHandler<BulkCreateUIDiffReportMessage> {
    @Inject
    UIDiffReportService uiDiffReportService;
    @Inject
    WebSocketContext webSocketContext;

    @Override
    public void handle(@Nullable String key, BulkCreateUIDiffReportMessage value) throws Exception {
        String testSessionId = value.testSessionId;
        ActionLogContext.put("test_session_id", testSessionId);
        sendProcessingMessage(testSessionId);
        uiDiffReportService.generate(testSessionId);
        sendCompletedMessage(testSessionId);
    }

    private void sendProcessingMessage(String testSessionId) {
        WSWebServerUIDiffReportMessage message = new WSWebServerUIDiffReportMessage();
        message.testSessionId = testSessionId;
        message.status = PROCESSING;
        var channels = webSocketContext.room(WSUIDiffReportListenerHelper.getUiDiffCompareRoom(testSessionId));
        channels.forEach(channel -> channel.send(message));
    }

    private void sendCompletedMessage(String testSessionId) {
        WSWebServerUIDiffReportMessage message = new WSWebServerUIDiffReportMessage();
        message.testSessionId = testSessionId;
        message.status = COMPLETED;
        var channels = webSocketContext.room(WSUIDiffReportListenerHelper.getUiDiffCompareRoom(testSessionId));
        channels.forEach(channel -> channel.send(message));
    }
}

```

