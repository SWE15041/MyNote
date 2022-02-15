[toc]

itms-services://?action=download-manifest&url=https://#host#/plist/QA/2.3.0/commit-e12d166aa-host-#host#

itms-services://?action=download-manifest&url=https://#host#/plist/QA/2.2.0/commit-27f00c7c6-host-#host#



http://192.168.11.14/packages/wonder_QA_2.3.0-efc641bac.ipa

http://192.168.11.14/packages/wonderQA_2.3.0-efc641bac.ipa



itms-services://?action=download-manifest&url=https://192.168.11.14/plist/QA/2.2.0/commit-27f00c7c6-host-192.168.11.14



# 【What】 什么是Appium??

http://appium.io/docs/cn/about-appium/intro/

- Appium 是一个开源工具，用于自动化 iOS 手机、 Android 手机和 Windows 桌面平台上的原生、移动 Web 和混合应用。

- 使用WebDriver 协议 (Selenium也是)
- 

**工作流程概要图**

![image-20220210152929037](/Users/yannilan/Library/Application Support/typora-user-images/image-20220210152929037.png)



**工作流程解释**

1. 自动化始终在一个会话的上下文中执行
2. 需要建立什么类型的会话在`Desired Capabilities` 的键值对中配置，如iOS、Android，见:http://appium.io/docs/cn/writing-running-appium/caps/index.html
3. 客户端用来发送指令，客户端可以是（Java、Ruby、Python、PHP、JavaScript 和 C#），客户端都是对 WebDriver 协议的扩展。
4. 服务器解释执行命令，并且响应结果。




# 【Why】Appium的有点

1. 开源
2. 支持与webDriver兼容的多种语言的客户端，有JAVA、Python、JS等
3. 支持多种测试框架
4. 



# 【how】安装、卸载Appium

- 方式一：npm安装

```sh
# 安装1
npm install -g appium

# 安装2
npm install -g appium@beta

# 校验安装
appium
appium-doctor

# 卸载
npm uninstall -g appium@beta

```

-  方式二：[Appium Desktop] https://github.com/appium/appium-desktop/releases
- 

# 【how】启动 Appium

```
# appium 默认启动端口4723
appium
# appium -p ${port} 指定端口启动
appium -p 4010

```



# 【demo】JS

## 基本操作

下载demo APK:

 https://github.com/appium/appium/raw/master/sample-code/apps/ApiDemos-debug.apk

初始化webdriverio作为appium client: 

```sh
npm init -y
npm install webdriverio
```

创建index.js，内容如下：

```js
const wdio = require("webdriverio");
const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "12",
    deviceName: "Pixel 5 API 31",
    app: "/Users/yannilan/workspace/Chancetop/test/ApiDemos-debug.apk",
    appPackage: "io.appium.android.apis",
    appActivity: ".view.TextFields",
    automationName: "UiAutomator2"
  }
};

async function main () {
  //  creating a session  
  const client = await wdio.remote(opts);

  //  launching our app
  const field = await client.$("android.widget.EditText");
  await field.setValue("Hello World!");
  const value = await field.getText();
  var assert = require('assert');
  assert.strictEqual(value,"Hello World!");
  
  
  await client.deleteSession();
}

main();
```

运行 index.js

```sh
node index.js
```

## 解释

```
platformName：要自动化的平台的名称
platformVersion：要自动化的平台版本
deviceName: 自动化设备的种类
app：您要自动化的应用程序的路径
automationName：您要使用的驱动程序的名称
```





# 【platform】

1. 日志、集成监控
2. 测试用例管理
3. 测试报告管理
4. 测试机型管理
5. 测试包管理
6. 回归测试自动化
7. 根据机型查看查看日志进度
8. 

# 【platform2】

1. appium
2. 



# 【prepare data】

目的：

1. 调API完成酒送达的流程
2. 调API完成酒未送达的流程
3. 将整个订单push到结束
4. 



# 【demo】JAVA-Android





# 【demo】JAVA-iOS

步骤：

1. 启动appium server
2. 连接到appium server 并创建会话
3. 卸载后再安装app
4. 开始根据test case操作app



重启appium server

```
step:

1 查看要启动的端口是否被占用：lsof -i tcp:${port}
	1.1 如果已经被监听，则获取端口对应的进程ID
  1.2关掉进程，停止appium server
2 启动appium server端口

example:

> lsof -i tcp:4010
COMMAND  PID     USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    6493 yannilan   23u  IPv4 0x375ef6a72ad12963      0t0  TCP *:samsung-unidex (LISTEN)
```





