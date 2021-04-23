[toc]



# allure 

>#### Mac OS X
>
>

setup

https://docs.qameta.io/allure/#_get_started

```
brew install allure
allure --version
```



加入依赖 - maven

```xml
<dependency>
  <groupId>io.qameta.allure</groupId>
  <artifactId>allure-junit4</artifactId>
  <version>LATEST_VERSION</version>
  <scope>test</scope>
</dependency>
```



1. Setup allure CML, run: `brew install allure`，(check, run `allure --version`)
2. run tests and generate test result : allure-results (default: target/surefire-reports)
3. generate allure report. run `cd target` , run `allure generate allure-results --clean -o allure-report`
4. open "index.html" in browse. run  `cd allure-report` , run  `allure open .`

![image-20210420175735862](/Users/Yanni/Library/Application Support/typora-user-images/image-20210420175735862.png)





allure 注解

https://blog.csdn.net/weixin_42258032/article/details/109238193

https://blog.csdn.net/Franciz777/article/details/114968966

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023144914525.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjI1ODAzMg==,size_16,color_FFFFFF,t_70#pic_center)





sftp协议发送report

```
      <!-- https://mvnrepository.com/artifact/com.jcraft/jsch -->
        <dependency>
            <groupId>com.jcraft</groupId>
            <artifactId>jsch</artifactId>
            <version>0.1.55</version>
        </dependency>
```

