[toc]

# 概要

what is appium ?

Appium 支持多种平台以及各种测试方式（native，hybrid，web，真机，模拟器，等等...）

Appium本质是一个Http服务器，是由Node.js编写。

使用WebDriver Protocol. 



Appium client (JAVA)

API: https://javadoc.io/static/io.appium/java-client/7.4.1/io/appium/java_client/AppiumDriver.html

Source: https://github.com/appium/java-client/releases/tag/v7.4.1

[ https://github.com/appium/java-client](https://github.com/appium/java-client)



Appium  API 

http://appium.io/docs/en/about-appium/api/



# 一、导入依赖

```xml
<dependency>
  <groupId>io.appium</groupId>
  <artifactId>java-client</artifactId>
  <version>${version.you.require}</version>
  <scope>test</scope>
</dependency>
```

# 二、

App 的安装、卸载

```
*.ipa -> real device
*.app -> simulator
*.apk -> real device && simulator
```



点击弹出框的"allow"

```

```



<img src="/Users/Yanni/Library/Application Support/typora-user-images/image-20210325142959758.png" alt="image-20210325142959758" style="zoom:50%;" />



# appium desktop

> debug

1. Start server
2. Start session
3. 

# Question

1. Could not connect to server; are you sure it's running?

   - click "Start server" on "appium desktop"

2. Interactions are not available for this element

   TapSend KeysClear

