```
#Example: android10=[pixel3@10.0] It's suggested to use AVD_NAME for emulator which could be found by command: "%ANDROID_SDK_HOME%/emulator/emulator --list-avds"
#Example: ios13=[iPhone 11@13.3] The device name should match Simulator or real device name for appium to match the device
ios13 = [iPhone 11@13.3]
```





```
android.appiumServer=127.0.0.1
android.appPathOnServer=
localAndroid.profile=profiles/localAndroidProfile.properties
ios.appiumServer=127.0.0.1
#iosSimulator.appPathOnServer=/Users/lyn/Documents/Automation/appium/wonderQA_1.32.0-d90565f36.ipa
iosSimulator.appPathOnServer=/Users/lyn/Documents/Automation/packages/wonderQA_1.32.0-d40463762.app
iosRealDevice.appPathOnServer=
localIOS.profile=profiles/localIOSProfile.properties
localDebugMode=false
device.default=android10
appCenter.profile.format=profiles/appCenterProfile-%d.properties
env=uat
testRailEnabled=false
reportRootFolderName=result
localRepeatFailed=true
```