[toc]

一、工具和环境配置

node 、appium、xcode（or Android studio）、Intellij IDEA、allure

- Node

>brew install node
>
>node -v
>npm -v

- appium and appium-doctor

>npm install -g appium
>appium -v
>
>npm install -g appium-doctor
>appium-doctor --version

- xcode (download from App Store)

- Android studio 

  1. download from https://developer.android.google.cn/studio
  2. 设置环境变量

  >vi ~/.bash_profile
  >source ~/.bash_profile

```shell
# android sdk env setting on bash_profile
export ANDROID_HOME=/Users/lyn/Library/Android/sdk
export ANDROID_SDK_HOME=/Users/lyn/Library/Android/sdk
export ANDROID_AVD_HOME=/Users/lyn/.android/avd
export PATH=$PATH:$ANDROID_HOME/platform-tools

#jdk1.8 env setting on bash_profile
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home
export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar
export PATH=$PATH:$JAVA_HOME/bin
```

- allure (see https://docs.qameta.io/allure/#_installing_a_commandline)

> brew install allure
> allure --version

二、getting started demo with the android simulator for Mac

1. 打Android应用的apk包
2. 编写脚本 index.js 
3. start appium 
4. start android simulator (on Android Studio)
5. run index.js (node index.js)

- 命令

  ```
  appium
  node 
  ```

- index.js脚本

  ```javascript
  // javascript
  
  const wdio = require("webdriverio");
  const assert = require("assert");
  
  const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
      platformName: "Android",
      platformVersion: "8",
      deviceName: "Pixel_XL_8",
      app: "/Users/lyn/Documents/Automation/appium/ApiDemos-debug.apk",
      appPackage: "io.appium.android.apis",
      appActivity: ".view.TextFields",
      automationName: "UiAutomator2"
    }
  };
  
  async function main () {
    const client = await wdio.remote(opts);
  
    const field = await client.$("android.widget.EditText");
    await field.setValue("Hello World!");
    const value = await field.getText();
    assert.strictEqual(value,"Hello World!");
  
    await client.deleteSession();
  }
  
  main();
  
  ```

  

三、started demo with ios for mac



