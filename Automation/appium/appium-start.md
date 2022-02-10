[toc]

itms-services://?action=download-manifest&url=https://#host#/plist/QA/2.3.0/commit-e12d166aa-host-#host#

itms-services://?action=download-manifest&url=https://#host#/plist/QA/2.2.0/commit-27f00c7c6-host-#host#



http://192.168.11.14/packages/wonder_QA_2.3.0-efc641bac.ipa

http://192.168.11.14/packages/wonderQA_2.3.0-efc641bac.ipa



itms-services://?action=download-manifest&url=https://192.168.11.14/plist/QA/2.2.0/commit-27f00c7c6-host-192.168.11.14



# 【What】 什么是Appium??

http://appium.io/docs/cn/about-appium/intro/

Appium 是一个开源工具，用于自动化 iOS 手机、 Android 手机和 Windows 桌面平台上的原生、移动 Web 和混合应用。

**工作流程概要图**

![image-20220210152929037](/Users/yannilan/Library/Application Support/typora-user-images/image-20220210152929037.png)



**工作流程解释**

1. 自动化始终在一个会话的上下文中执行

2. 需要建立什么类型的会话在`Desired Capabilities` 的键值对中配置，如iOS、Android，见:http://appium.io/docs/cn/writing-running-appium/caps/index.html

3. 客户端用来发送指令，客户端可以是（Java、Ruby、Python、PHP、JavaScript 和 C#），客户端都是对 WebDriver 协议的扩展。

4. 服务器解释执行命令，并且响应结果。

   

# 【how】安装、卸载Appium

```sh
# 安装1
npm install -g appium

# 安装2
npm install -g appium@beta

# 校验安装
appium

# 卸载
npm uninstall -g appium@beta

```





