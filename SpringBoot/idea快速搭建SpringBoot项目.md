

一、创建步骤

1. 创建Spring Initializer项目

![image-20200325101044943](/Users/lyn/Library/Application Support/typora-user-images/image-20200325101044943.png)

2. 配置项目结构

   ![image-20200325101752881](/Users/lyn/Library/Application Support/typora-user-images/image-20200325101752881.png)

3. 在/src/main/java下的项目结构

   ```
   |_annotation：放置项目自定义注解
   |_aspect：放置切面代码
   |_config：放置配置类
   |_constant：放置常量、枚举等定义
      |__consist：存放常量定义
      |__enums：存放枚举定义
   |_controller：放置控制器代码
   |_filter：放置一些过滤、拦截相关的代码
   |_mapper：放置数据访问层代码接口
   |_model：放置数据模型代码
      |__entity：放置数据库实体对象定义
      |__dto：存放数据传输对象定义
      |__vo：存放显示层对象定义
   |_service：放置具体的业务逻辑代码（接口和实现分离）
      |__intf：存放业务逻辑接口定义
      |__impl：存放业务逻辑实际实现
   |_utils：放置工具类和辅助代码
   ```

   

4. 在/src/main/resources目录下的项目结构

   ```
   |_mapper：存放mybatis的XML映射文件（如果是mybatis项目）
   |_static：存放网页静态资源，比如下面的js/css/img
      |__js：
      |__css：
      |__img：
      |__font：
      |__等等
   |_template：存放网页模板，比如thymeleaf/freemarker模板等
      |__header
      |__sidebar
      |__bottom
      |__XXX.html等等
   |_application.yml       基本配置文件
   |_application-dev.yml   开发环境配置文件
   |_application-test.yml  测试环境配置文件
   |_application-prod.yml  生产环境配置文件
   ```

   

