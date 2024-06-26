[toc]

# with the android simulator for Mac

1. 打Android应用的apk包
2. 编写脚本 index.js 
3. start appium 
4. start android simulator (on Android Studio)
5. run index.js (node index.js)

- 命令

  ```
  npm init -y
  npm install webdriverio
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
      platformVersion: "12",
      deviceName: "Pixel 5 API 31",
      app: "/Users/yannilan/workspace/Chancetop/Automation/app/wonder_QA_2.3.0-cd74d6be2.apk",
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

  

# with ios for mac



```js
// javascript

const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "iOS",
    platformVersion: "14.4",
    deviceName: "iPhone 12",
    app: "/Users/Yanni/Automation/packages/wonderQA_1.35.0-567898db7.app",
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

- 运行

  ```sh
  node index.js
  ```

  



```js
{
  "deviceName": "iPhone 12",
  "platformVersion": "14.4",
  "platformName": "iOS",
  "app": "/Users/Yanni/Automation/packages/wonderQA_1.36.0-d6dc03486.app",
  "appPackage": "com.remarkablefoods.consumerQA",
  "automationName": "XCUITest"
}
```



# Prepare

1. 修改app代码, 去掉app黄色告警提示

   - foodtruck-wonder-app/app/bootstrap.ts

   ```
   YellowBox.ignoreWarnings([""]);
   ```

   
