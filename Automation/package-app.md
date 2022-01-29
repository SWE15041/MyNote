[toc]

# Package flow

## checkout  代码

```
cd foodtruck-wonder-app
git reset --hard
git checkout master
git pull origin master
git checkout FETCH_HEAD
git rev-parse HEAD
git log --pretty=format:'%an' $commit -1
git log --pretty=format:'%s'  $commit -1 

```

- 不能重新打包uat的原因

  如果uat版本第一次打包成功了，重新执行打包操作，代码会认为已经存在uat版本的包，不进行重新打包。

  ```
  version = env == QA ? millstoneVersion.withCommit(commit) : millstoneVersion;
  ```

![image-20210702112849001](/Users/Yanni/Library/Application Support/typora-user-images/image-20210702112849001.png)



## build apk

- envAlias : qa uat stag
- assembleUatRelease assembleQaRelease 

```
cd foodtruck-wonder-app
cp conf/$envAlias/default.ts   app/conf/default.ts
yarn install --force
cd android
./gradlew clean assemble{$env}Release
```



- other

  ```
  ./gradlew app:dependencies --configuration compile	
  ```

  

## build app

- env: Qa Uat
- config:  Release
- appProjectFolder: foodtruck-wonder-app
- workspace: ${appProjectFolder}/ios/wonder.xcworkspace

```
cd ${appProjectFolder}/ios
pod install

xcodebuild -scheme wonder ${env} -configuration ${config} -sdk iphonesimulator -workspace ${workspace} -derivedDataPath ${appProjectFolder}
```

- 注 

   pod install --repo-update

## build ipa

- scheme: wonderQa ，wonderUat
- appProjectFolder：foodtruck-wonder-app
- packageCacheFolder: 
- workspace：${appProjectFolder}/ios/wonder.xcworkspace
- archivePath: ${packageCacheFolder}${UUID()}.xcarchive
- plist: /Users/testregression/projects/test-server/ExportOptions.plist
- exportPath: 

```
cd ${appProjectFolder}
yarn install --force
cd ${appProjectFolder}/ios
pod install

xcodebuild -scheme ${scheme} -configuration Release -workspace ${workspace} archive -archivePath ${archivePath}

xcodebuild -exportArchive -archivePath ${archivePath} -exportPath ${exportPath} -exportOptionsPlist ${plist} -allowProvisioningUpdates -allowProvisioningDeviceRegistration
```





# 问题

build apk 失败问题，执行命令（`./gradlew clean assemble{$env}Release`）失败

解决：

```shell
cd ${foodtruck-wonder-app}/android
rm -r .gradle
./gradlew clean assemble{$env}Release
```



build ipa失败问题，执行命令（pod install）失败

解决：

```shell
cd ${foodtruck-wonder-app}/ios
rm -r Pods
pod install --repo-update
```

# Mac mini磁盘清理 

```
du -c -d 1 -g | sort -n
du -c -d 1 -m | sort -n
```





```
# 模拟器
~/Library/Developer/CoreSimulator/Caches
~/Library/Developer/CoreSimulator/Devices

# XCode
~/Library/Developer/Xcode/Archives
~/Library/Developer/Xcode/DerivedData
~/Library/Developer/Xcode/iOS Device Logs
~/Library/Developer/Xcode/Products
~/Library/Developer/Xcode/Archives
~/Library/Developer/Xcode/Archives
~/Library/Developer/Xcode/Archives

# 真机
~/Library/Developer/XCTestDevices

```



# java调用命令行Runtime.getRuntime().exec()函数碰到的阻塞问题

现象：

```
调用Runtime.getRuntime().exec()执行shell命令,响应过程中断，没有日志信息打印，进入死锁状态。
```

**解决：**

```
开两个单独的线程去分别读inputstream和errorstream的内容。

注：如果需要获取子线程里面的变量，需要使用Callable而不是Runner
```

**工作原理：**

```
应用在调用Runtime.getRuntime().exec()这个方法会创建一个本机进程并返回Process子类的一个实例

创建的子进程没有自己的终端或控制台。它的所有标准 io（即 stdin、stdout 和 stderr）操作都将通过三个管道重定向到父进程（也就是调用者java应用）。三个管道用于处理标准输入流，标准输出流，标准错误流。子进程在执行过程中，会不断的向JVM写入标准输出和标准错误输出。java应用可以通过Process 提供的getOutputStream()、getInputStream() 和 getErrorStream()来获得子进程输入输出信息。因为有些本机平台仅针对标准输入和输出流提供有限的缓冲区大小，当标准输出或者标准错误输出写满缓存池时，程序无法继续写入，子进程无法正常退出。读写子进程的输出流或输入流迅速出现失败，则可能导致子进程阻塞，甚至产生死锁。
```

**判断子进程是否执行完成**（子进程是否退出）

```
1、非阻塞方法**exitValue()**获得子进程退出的状态值（0，正常退出，非0异常退出），需要注意的是**调用这个方法程序会立即得到结果**，如果子进程没有执行完，调用这个方法会抛出IllegalThreadStateException，表示此 Process 对象表示的子进程尚未终止。

2、阻塞方法 **waitFor()**导致当前线程等待，**直到子进程结束并返回退出状态**。如果已终止该子进程，此方法立即返回，如果没有终止该子进程，调用的线程将被阻塞，直到退出子进程。
```

# pod install fail :

**Error message**

```sh
[!] Error installing Mapbox-iOS-SDK
[!] /usr/bin/curl -f -L -o /var/folders/lz/cnkfv76179j3pfp7th2b8l440000gn/T/d20220129-50646-zkuij8/file.zip https://api.mapbox.com/downloads/v2/mobile-maps/releases/ios/packages/6.4.0/mapbox-ios-sdk-dynamic.zip --create-dirs --netrc-optional --retry 2 -A 'CocoaPods/1.11.2 cocoapods-downloader/1.5.1'

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:01 --:--:--     0
curl: (22) The requested URL returned error: 401 Unauthorized

```

**Solution:**

- Step1:

```sh
cd ~
touch .netrc
vi .netrc
```

- Step2: Write the following to file ` .netrc `

```sh
machine api.mapbox.com
login mapbox
password sk.eyJ1IjoicmYtc3RhZ2luZyIsImEiOiJja29zZHE5Z24wMGo2Mm9uMzh5Y2xsNm5nIn0.ORpJK-riFWs5ibe9VpWXaQ
```



# xcodebuild -schema fail

***error message***

```
error: No profiles for 'com.remarkablefoods.consumerQA' were found: Xcode couldn't find any iOS App Development provisioning profiles matching 'com.remarkablefoods.consumerQA'. Automatic signing is disabled and unable to generate a profile. To enable automatic signing, pass -allowProvisioningUpdates to xcodebuild. (in target 'wonderQa' from project 'wonder')

** ARCHIVE FAILED **
```

***solution***

1. open `Xcode`
2. Signing & Capabilities > Signing>Team > Add an Account
3. login  appid (apple deleveoper singing)
4. Download Manual Profiles

***see***: https://stackoverflow.com/questions/64007478/cocoapods-error-installing-mapbox-ios-sdk

# Xcode Archive fail

**error message 1**

```
error: Can't find the 'node' binary to build the React Native bundle.  If you have a non-standard Node.js installation, select your project in Xcode, find  'Build Phases' - 'Bundle React Native code and images' and change NODE_BINARY to an  absolute path to your node executable. You can find it by invoking 'which node' in the terminal.
```

***solution***

Step1: get node location

```
> which node
/opt/homebrew/bin/node
```

Step2: open Xcode > Build Phases > Bundle React Native code and images

把

```
export NODE_BINARY=node
```

替换成

```
export NODE_BINARY=/opt/homebrew/bin/node
```

***see***: https://www.jianshu.com/p/033db05fca5a



**Error message 2**

```
error: Provisioning profile "iOS Team Provisioning Profile: com.remarkablefoods.consumerQA" doesn't include the currently selected device "Yanni’s MacBook Pro" (identifier 00008103-000479A434D3001E). (in target 'wonderQa' from project 'wonder')
```

***sulotion***

找ios开发添加设备
