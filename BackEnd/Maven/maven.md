```
src
- main
-- resources
--- app.properties
--- app-dev.properties
--- app-uat.properties
```

- app.properties

  ```properties
  env=${env}
  ```

- app-dev.properties

  ```properties
  env=dev
  ```

- app-uat.properties

  ```properties
  env=uat
  ```



```xml
<build>
    <filters>
        <!-- 这里的文件名必须与多环境配置文件的文件名相同, ${env} 会动态获取不同环境 -->
        <!-- 假如激活 dev 环境, 这时对应的文件就是 src/main/properties/application-dev.properties -->
        <filter>src/main/resources/app-${env}.properties</filter>
    </filters>
    <resources>
        <resource>
            <!-- 可以理解为真正的配置文件所在的目录 -->
            <directory>src/main/resources</directory>
            <!-- 是否替换资源中的属性, 设置为 true 才能实现动态替换 -->
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
<profiles>
    <profile>
      <id>dev</id>
      <properties>
        <env>dev</env>
      </properties>
      <activation>
        <!-- 配置默认选中环境：dev-->
        <activeByDefault>true</activeByDefault>
      </activation>
    </profile>
    <profile>
      <id>uat</id>
      <properties>
        <env>uat</env>
      </properties>
    </profile>
</profiles>
```



