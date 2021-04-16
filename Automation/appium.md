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





1. 【UAT环境】上周周一、周二，配合recipe重新配置uat测试数据的 +  uat重新测试1.35.0版本，花费两天时间。

2. 【QA环境】测试项目中调用公司mobile api没有版本概念，调用已经被标识为“弃用”的API，导致测试失败，排查问题困难。（测试项目遗留问题，待改进）

3. 【QA环境】测试项目在测试期间，truck session被offline、off duty，导致餐馆不可用，需要重新测试。（受”am2.0“时开时关影响）

4. 【QA环境】对于测试失败的case，人工介入重新测试，需要时刻关注truck session状态、inventory库存，还有需要去cs后台手动cancel订单，很麻烦。（具体看以下excel）

5. 【QA环境】测试期间，发现在前端代码设置的testId被删掉，就需要重新埋点、打包app代码（*.apk,  *.app），非常花时间。（改进方法，每天下班做QA回归）

6. 【QA环境】网络连接超时导致case需要重新测试，有时候UI加载不出来，需要重新测试。

   








- 测试数据清理自动化，每次测试完成之后，需要进行订单cancel、truck session设置为off duty
- 将appcenter上的测试进度发送到slack上，用来实时提醒测试人员进行下一步测试。
- 了解测试项目和appcenter 的交互过程。
- 了解allure报告在线访问功能的实现。
- 修改在appcenter进行测试时，生成测试报告的流程，将以email形式整合报告的流程改成 支持在线预览报告的方式。
- 排查为什么appcenter会漏掉部分case的测试？



- 重构打包服务器。（打包，测试、回归测试，测试报告在线访问，历史报告在线访问）

- 实操Appium实现测试。

- 测试数据准备项目，引入其他组的项目依赖来调用API 。

  

