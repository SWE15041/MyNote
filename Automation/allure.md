[toc]



# allure 

>#### Mac OS X
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





# allure 在线访问



 步骤：

0. 安装 allure、p7zip、anywhere

   ```
   brew install allure
   brew install p7zip
   npm install anywhere -g
   ```

1. 测试，生成测试结果压缩包文件（*.7z)

2. 把（*.7z）压缩包发送到Mac Mini 服务器的指定目录下（/users/testregression/appcenter）

   ```
   7z x zip/'*.7z' -oallure_results -y 
   allure generate allure_results --clean -o allure-report
   ```

   

3. 生成可在线访问的测试报告（执行解压缩命令&生成allure测试报告的命令）

4. 在测试结果存放父目录下(/users/testregression/appcenter)，执行anywhere命令`nohup anywhere -p 8888 &`

   ```sh
   # Mac Mini 服务器
   cd /users/testregression/appcenter
   nohup anywhere -p 8888 &
   ```

5. 通过http协议访问报告(`http://ip:port`): http://192.168.11.14:8888

   

Ps: 测试报告目录结构

    - appcenter
      - {app_version}
        - {device_name_os_version}
          - zip
          - allure_results
          - allure-reports 
         
     - appcenter
       - 1-38-0
         - iphone_11_13.3
           - zip
           - allure_results
           - allure-reports 
