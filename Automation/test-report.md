[toc]

![preview](https://pic1.zhimg.com/v2-d3c8e39bc92674933834eaba7f9c4bb1_r.jpg?source=1940ef5c)



# allure 

>#### Mac OS X

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



# question

Bug log

```
java.lang.AssertionError
com.jcraft.jsch.JSchException: session is down
com.jcraft.jsch.JSchException: connection is closed by foreign host
原因：系统SSH终端连接数配置过小
vi /etc/ssh/sshd_config
MaxStartups 1000:30:1200
MaxSessions 1000
LoginGraceTime 0
/etc/init.d/ssh restart
解决：连接mac mini失败的问题，我加大了mac mini系统SSH终端连接数配置 和 加了retry休眠时间，下次测试再跟踪一下，


com.google.gson.JsonSyntaxException: java.lang.NumberFormatException: For input string: "523d9a14-5496-4e09-a901-f66150d4f02c"
原因：String 类型不能转化成 Integer类型


org.openqa.selenium.TimeoutException: Expected condition failed: (tried for 30000 second(s) with 500 milliseconds interval)


com.jcraft.jsch.JSchException: java.net.ConnectException: Connection refused (Connection refused)


2021-05-08 08:49:59 [INFO] API POST https://yannilan004.testrail.io/index.php?/api/v2/add_result_for_case/24/22, data: {elapsed=null, status_id=5, defects=null, comment=retry failed after 10 attempts
, version=null}
```





case report丢失的原因：

1. ssh session连接数不够 （已解决）

2. 用过的session没有关闭 （已解决）

3. 网络问题 （未解决）

   

   

   

#  Test rail





