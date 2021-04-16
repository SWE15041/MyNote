[toc]

# 文档

app center Test

https://docs.microsoft.com/en-us/appcenter/test-cloud/

Preparing Appium Tests for Upload

https://docs.microsoft.com/en-us/appcenter/test-cloud/frameworks/appium/



# 要求：

JUnit 4.9 - 4.12

Maven version  3.3.9 及以上

Appium version 1.18.0 

只能测一个app

Tests will be run using **Maven Surefire**



# 在Maven项目的pom.xml文件加入：

## 原样拷贝到 profiles标签下

- https://github.com/Microsoft/AppCenter-Test-Appium-Java-Extensions/blob/master/uploadprofilesnippet.xml

```xml
<profile>
  <id>prepare-for-upload</id>
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-dependency-plugin</artifactId>
        <version>2.10</version>
        <executions>
          <execution>
            <id>copy-dependencies</id>
            <phase>package</phase>
            <goals>
              <goal>copy-dependencies</goal>
            </goals>
            <configuration>
              <outputDirectory>${project.build.directory}/upload/dependency-jars/</outputDirectory>
              <useRepositoryLayout>true</useRepositoryLayout>
              <copyPom>true</copyPom>
              <addParentPoms>true</addParentPoms>
            </configuration>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-help-plugin</artifactId>
        <version>2.2</version>
        <executions>
          <execution>
            <id>generate-pom</id>
            <phase>package</phase>
            <goals>
              <goal>effective-pom</goal>
            </goals>
            <configuration>
              <output>${project.build.directory}/upload/pom.xml</output>
            </configuration>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-resources-plugin</artifactId>
        <executions>
          <execution>
            <id>copy-testclasses</id>
            <phase>package</phase>
            <goals>
              <goal>testResources</goal>
            </goals>
            <configuration>
              <outputDirectory>${project.build.directory}/upload/test-classes</outputDirectory>
              <resources>
                <resource>
                  <directory>
                    ${project.build.testOutputDirectory}
                  </directory>
                </resource>
              </resources>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</profile>
```

## 加入Maven Surefire plugin

```xml
 <plugin>
   <groupId>org.apache.maven.plugins</groupId>
   <artifactId>maven-surefire-plugin</artifactId>
   <version>2.20</version>
   <configuration>
     <testFailureIgnore>true</testFailureIgnore>
     <excludes>
       <exclude>**/*Test.java</exclude>
       <exclude>**/Test*.java</exclude>
     </excludes>
     <includes>
       <include>**/AppCenterExecutor.java</include>
     </includes>
   </configuration>
 </plugin>
```



# Maven 使用相关文档

http://maven.apache.org/surefire/maven-surefire-plugin/examples/junit.html

https://maven.apache.org/surefire/maven-surefire-plugin/examples/inclusion-exclusion.html

# 上传项目到appcenter上的流程

```
npm install -g appcenter-cli
appcenter login
mvn -DskipTests -P prepare-for-upload package
appcenter test run appium --app "Food-Truck-Inc/wonder-android-uat" --devices "Food-Truck-Inc/android-1" --app-path pathToFile.apk --test-series "master" --locale "en_US" --build-dir target/upload
```

