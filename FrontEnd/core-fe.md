# 常用命令

**配置后端地址**

```
vi ${frontend-site-project}/webpack/start.js
```

![image-20211117111558353](/Users/Yanni/Library/Application Support/typora-user-images/image-20211117111558353.png)



**拉取后端API渲染**

```
yarn api
```

**格式化前端代码**

```
yarn format
```

**检查前端代码能否正常build**

```
yarn build
```

**下载依赖**

```
yarn install
```

**启动前端项目**

```
yarn start
```



写前端代码



1. 配置路由

   - vi  {project}/src/route/index.ts

     ```ts
     import testSessionRote from "../module/testSession/route"
     
     export const FTIRoutes: FTIRoute[] = [mparticleReportRoute, testSessionRote];
     ```

     

2. 配置state

   - vi  {project}/src/type/state.ts

     ```ts
     import {State as TestSessionState} from "module/testSession/type";
     export interface RootState extends State {
         app: {
             main: MainState;
             testSession: TestSessionState;
         };
     }
     
     ```

3. s 

4. 

拉取后端API：

```
配置：
vi {project}/webpack/api.js
更新后端API地址；const apiURL = yargs.argv.url || "https://test-report.foodtruck-qa.com/_sys/api";

命令：yarn api
```



#  打包服务器

​	

```
```





# 问题

现象：本地启动前端项目，在谷歌浏览器无法访问，在Safari浏览器可以访问。

解决方式一：升级webpack-dev-server【命令：`npm install webpack-dev-server --save-dev`】

解决方式二：https://www.jianshu.com/p/5461b6ecb94f （不升级webpack-dev-server ）



```
npm install sockjs
```



- error massage

  ```
  Cannot find module 'axios' or its corresponding type declarations.ts(2307)
  
  ```

  



```
 npm install react-redux --save
 npm i react-router-dom --save
 npm install axios

```

