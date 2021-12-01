/Users/Yanni/Java/foodtruck-test-automation/test-report-site

![image-20211126175140678](/Users/Yanni/Library/Application Support/typora-user-images/image-20211126175140678.png)



- dockerfile

  ```dockerfile
  FROM        adoptopenjdk/openjdk15:alpine-jre
  LABEL       app=test-report-site
  RUN         addgroup --system app && adduser --system --no-create-home --ingroup app app
  RUN         apk update && apk add unzip
  RUN         mkdir /allure && mkdir /allure-config
  RUN         wget https://github.com/allure-framework/allure2/releases/download/2.16.1/allure-2.16.1.zip && unzip allure-2.16.1.zip -d /allure && rm allure-2.16.1.zip
  ENV         PATH="/allure/allure-2.16.1/bin:${PATH}"
  ENV         ALLURE_CONFIG="/allure-config/allure.properties"
  USER        app
  COPY        package/dependency      /opt/app
  COPY        package/app             /opt/app
  CMD         ["/opt/app/bin/test-report-site"]
  ```

  



```shell
 docker build -t test-report-site . 
 docker run -d -p 8090:8090 test-report-site
 docker ps 
 docker exec -it ${containerID} /bin/bash
 allure --version
 
```



```
allure generate allure-results  --clean -o allure-reports

RUN 				apk update && apk add unzip 
RUN         apk add openjdk8
ENV         JAVA_HOME="/usr/lib/jvm/java-8-openjdk"

/tmp/8f7a1464-a97f-4136-8e48-a926b579ec99/1.54.0/AndroidEmulator_10.0/7cc0f3d850e34bc5b658dfa1687ddf2e

```



allure

 ```
 ```

