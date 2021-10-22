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

