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
4. 手工分配chef



# 【demo】JAVA-Android

```java
public class LoginWithUser {
    private AndroidDriver<WebElement> driver;

    @Test
    public void login() throws Exception {
        // apk location
        String appLocation = "/Users/yannilan/workspace/Chancetop/Automation/app/wonder_QA_2.3.1-156f19c90.apk";

        // appium desired capabilities for android
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Pixel XL API 30");
        capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "11.0");
        capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, MobilePlatform.ANDROID);
        capabilities.setCapability(MobileCapabilityType.APP, new File(appLocation).getAbsolutePath());
        capabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2");

        // appium port
        String appiumPort = "4010";

        // appium build session
//        AndroidDriver<WebElement> driver = new AndroidDriver<>(new URL(String.format("http://127.0.0.1:%s/wd/hub", appiumPort)), capabilities);
        driver = new AndroidDriver<>(new URL(String.format("http://127.0.0.1:%s/wd/hub", appiumPort)), capabilities);

        // appium start automated test, example: login case
        String email = "yannilan@regression.com";
        String password = "pwd11111";
        loginWithEmail(email, password);
    }
    
}
```





# 【demo】JAVA-iOS

同 android



步骤：

1. 启动appium server
2. 连接到appium server ，创建并启动会话
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





# 【知识点】Selector Strategies

http://appium.io/docs/en/commands/element/find-elements/index.html#selector-strategies



# 【问题】difference Driver

What is the use or difference between AndroidDriver, iOSDriver, AppiumDriver and Remote WebDriver

https://discuss.appium.io/t/what-is-the-use-or-difference-between-androiddriver-iosdriver-appiumdriver-and-remote-webdriver/8750

```
从上往下（父节点 到 子节点） 继承关系：

WebDriver（根节点）

AppiumDriver（子节点）

iOSDriver		AndroidDriver 
```


文字解释：

```
RemoteWebDriver：这个驱动类直接来自上游的 Selenium 项目。这是一个非常通用的驱动程序，其中初始化驱动程序意味着向 Selenium 集线器发出网络请求以启动驱动程序会话。由于 Appium 在客户端-服务器模型上运行，因此 Appium 使用它来初始化驱动程序会话。但是，不建议直接使用 RemoteWebDriver，因为还有其他可用的驱动程序可以提供附加功能或便利功能。

AppiumDriver：此驱动程序类继承自 RemoteWebDriver 类，但它添加了在通过 Appium 服务器进行移动自动化测试的上下文中有用的附加功能。

AndroidDriver：此驱动程序类继承自 AppiumDriver，但它添加了其他功能，这些功能在通过 Appium 在 Android 设备上进行移动自动化测试的上下文中很有用。如果您想在 Android 设备或 Android 模拟器上开始测试，请仅使用此驱动程序类。

IOSDriver：此驱动程序类继承自 AppiumDriver，但它添加了其他功能，这些功能在通过 Appium 在 iOS 设备上进行移动自动化测试的上下文中很有用。如果您想在 iOS 设备或 iOS 模拟器上开始测试，请仅使用此驱动程序类。
```



【问题】session

一台服务器上可以执行多个会话，同一个设备上只能运行一个会话。（一台电脑上）