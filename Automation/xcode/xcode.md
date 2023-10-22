[toc]

Xcode 13.4.1 

# 存储路径



SDK

```
xcrun --sdk iphoneos --show-sdk-path

/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS15.5.sdk
```

 runtime

```
xcrun simctl runtime info path 

/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Library/Developer/CoreSimulator/Profiles/Runtimes/iOS.simruntime

```



# RunTime

Runtime 安装位置

```
xcrun simctl runtime info path iOS

/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Library/Developer/CoreSimulator/Profiles/Runtimes/iOS.simruntime
```



list runtime

```
xcrun simctl list runtimes

== Runtimes ==
iOS 15.5 (15.5 - 19F70) - com.apple.CoreSimulator.SimRuntime.iOS-15-5
tvOS 15.4 (15.4 - 19L439) - com.apple.CoreSimulator.SimRuntime.tvOS-15-4
watchOS 8.5 (8.5 - 19T241) - com.apple.CoreSimulator.SimRuntime.watchOS-8-5
```



下载地址：

- 方案1:找到`~/Library/Caches/com.apple.dt.Xcode` ，查看包内容，获取下载链接

```
https://devimages-cdn.apple.com/downloads/xcode/simulators/$(DOWNLOADABLE_IDENTIFIER)-$(DOWNLOADABLE_VERSION).dmg

$(DOWNLOADABLE_IDENTIFIER):
$(DOWNLOADABLE_VERSION):

https://devimages-cdn.apple.com/downloads/xcode/simulators/com.apple.pkg.iPhoneSimulatorSDK15_0-15.0.1.1633542405.dmg
```

- 方案2: 监控系统的控制台获取console

```
1. 打开控制台console， 点击开始流传输，
2. 打开Xcode，点击下载，
3. 到控制台搜索：DVTDownloadable
```

