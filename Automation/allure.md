[toc]

测试过程数据收集相关的工具

```
WireMock
```

# 链接

使用手册: https://docs.qameta.io/allure

源码 : https://github.com/allure-framework/allure2

https://github.com/allure-examples/allure-junit-example



安装包：https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/

allure report doc: https://docs.qameta.io/allure-report/

https://docs.qameta.io/allure-report/frameworks/java/junit4





# 安装allure

**mac** 

```
brew install allure
```

**windows**

```sh
安装前准备
install scoop
open powerShell(admin)
> iwr -useb get.scoop.sh | iex 
env config
> $env:SCOOP='C:\Users\dev\scoop'
> [Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')
> $env:SCOOP_GLOBAL='C:\ProgramData\SCOOP'
> [Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')

test on cmd
> scoop 

安装allure
open cmd
> scoop install allure
```

**linux**  

```sh
sudo apt-add-repository ppa:qameta/allure
sudo apt-get update 
sudo apt-get install allure
```

**在docker容器中手动安装**

```sh
# write in dockerfile
RUN         apk update && apk add unzip
RUN         wget https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.16.1/allure-commandline-2.16.1.zip && unzip allure-commandline-2.16.1.zip && rm allure-commandline-2.16.1.zip
ENV         PATH="/allure-2.16.1/bin:${PATH}"
```

 step

- Install jdk or jre
- Download allure-commandline archive from https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline
- Unpack allure-commandline archive
- Add **allure** to system PATH.

# 检查安装

```sh
> allure --version
2.16.1
```





# Debug 

Maven



```sh
# 在Maven中运行单个测试方法
mvn test -Dtest=ClassName#methodName

example:
mvn test -Dtest=my.company.tests.SimpleTest#simpleTest

-e
-X

```





# allure junit

继承RunListener https://www.cnblogs.com/coolstream/p/9756336.html

```java
# extend RunListener, 重写方法
import org.junit.runner.notification.RunListener;
public class AllureListener extends RunListener {
// ...
}
```

```java
public class RunListener {
    public RunListener() {
    }

    public void testRunStarted(Description description) throws Exception {
    }

    public void testRunFinished(Result result) throws Exception {
    }

    public void testStarted(Description description) throws Exception {
    }

    public void testFinished(Description description) throws Exception {
    }

    public void testFailure(Failure failure) throws Exception {
    }

    public void testAssumptionFailure(Failure failure) {
    }

    public void testIgnored(Description description) throws Exception {
    }

    @Documented
    @Target({ElementType.TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface ThreadSafe {
    }
}
```











# Question

```
android.os.ParcelableException: java.io.IOException: Requested internal only, but not enough space
```



# 问题

1. maven项目中，运行测试用例并生成测试报告过程中，使用maven命令行进行测试可以正常生成allure报告，使用idea run无法生成allure报告

- https://github.com/allure-framework/allure2/issues/872

- ```
  The problem is that IDEA ignores maven-surefire configuration, so when you run tests using IDE Allure have no information about test start/stop event, and that causes the warnings.
  
  Attachments are generated because Allure can store the file you are trying to attach, but it can't find current execution context (AllureLifecycle stores information about current running tests in thread local storage) to add the link to the stored file.
  
  Actually I think that having logs is a good idea - thats is a signal for you that something is wrong (like in this case, you have no listener configured when run your tests via IDE).
  
  The problem is only exists for JUnit 4 projects since JUnit team decided to not add SPI support for listeners in 4.x versions (I even create a pull request with that change few years ago junit-team/junit4#1122)
  
  Also there is no possibility to configure listener for JUnit 4 in IDEA run build configuration (like for TestNG tests)
  
  Possible workarounds
  You can disable logging for AllureLifecycle class in your logger config (exact configuration depends on slf4j implementation you are using). After that the behaviour should be the same as in 2.7.0
  You can try to use allure-junit4-aspect module. This module is designed exactly for cases when you have no possibility to configure listener for JUnit 4. It uses aspects, so you need to configure AspectJ in your IDEA run build configuration (by adding aspectj-weaver agent to jvm args or using aspectj-compiler)
  try to use junit-vintage to run JUnit 4 tests and allure-junit-platform integration instead of allure-junit4
  ```

- 

2. idea 不能 run test case

   - Error output

   ```java
   [main] ERROR io.qameta.allure.AllureLifecycle - Could not start step: no test case running
   [main] ERROR io.qameta.allure.AllureLifecycle - Could not stop step: step with uuid 88911946-3f9d-41c0-a291-390704f84704 not found
   [main] ERROR io.qameta.allure.AllureLifecycle - Could not start step: no test case running
   [main] ERROR io.qameta.allure.AllureLifecycle - Could not stop step: step with uuid 7ca3d653-d4f6-4a07-948e-d7324f8d1573 not found
   [main] ERROR io.qameta.allure.AllureLifecycle - Could not start step: no test case running
   [main] ERROR io.qameta.allure.AllureLifecycle - Could not stop step: step with uuid 141a8562-b784-41c0-958b-98b68b2c8fb9 not found
   [main] ERROR io.qameta.allure.AllureLifecycle - Could not start step: no test case running
   [main] ERROR io.qameta.allure.AllureLifecycle - Could not stop step: step with uuid 8b299da4-0fcf-49f6-900f-cbc43c3d3890 not found
   
   ```

   

3. maven show dependencies

   ```
   # run in 
   mvn dependency:tree
   
   ```

   

4. slf4j-simple

   ```
   slf4j-simple
   ```

   



```
<img class="" data-croporisrc="https://mmbiz.qpic.cn/mmbiz_jpg/4dzKicQWkXEvdGGfdRhYubHHGUZY8UEHQww9MhcojPyFcf2Sv7WTFtGSSZDTPVYgtlkChNkibrv8vMJyfseT1y8Q/640?wx_fmt=jpeg" data-cropx1="0" data-cropx2="1080" data-cropy1="0" data-cropy2="1035.1557093425606" data-ratio="0.6666666666666666" data-type="jpeg" data-w="1080" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/4dzKicQWkXEvdGGfdRhYubHHGUZY8UEHQ3yWT0Gk5UQN20IwfztLxjcwrSRMZn0TiaFR6FaYrrkbPAMbEpoicibCqA/640?wx_fmt=jpeg&amp;wx_lazy=1&amp;wx_co=1" style="letter-spacing: 0.544px; overflow-wrap: break-word !important; visibility: visible !important; width: 556px !important; height: auto !important;" width="556px" _width="556px" src="https://mmbiz.qpic.cn/mmbiz_jpg/4dzKicQWkXEvdGGfdRhYubHHGUZY8UEHQ3yWT0Gk5UQN20IwfztLxjcwrSRMZn0TiaFR6FaYrrkbPAMbEpoicibCqA/640?wx_fmt=jpeg&amp;wx_lazy=1&amp;wx_co=1&amp;tp=webp&amp;wxfrom=5" wah-hotarea="click" crossorigin="anonymous" alt="Image" data-fail="0">
```



# 需求分析

1. allure 基本文字信息

   ```
   CaseStepRecorder
   AllureListener
   
   ```

   

2. allure图片

3. allure附件

   

```
cor
truck session count
zone
picking list
```





```
differs
delegation
chief
```





```
```

