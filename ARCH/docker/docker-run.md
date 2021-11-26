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
 docker run -d -p 8000:8000 test-report-site
 docker ps 
 docker exec -it ${containerID} /bin/bash
 allure --version
 
```

