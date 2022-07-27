[toc]



# 一、概要

## docker的定义

- docker是一个开源的应用容器引擎，基于go语言开发。
- 有三个基本概念：镜像（image）、容器（container）、仓库（registry）

## docker的优点

> 官方总结

- 灵活：即使是最复杂的应用也可以集装箱化。
- 轻量级：容器利用并共享主机内核。
- 可互换：您可以即时部署更新和升级。
- 便携式：您可以在本地构建，部署到云，并在任何地方运行。
- 可扩展：您可以增加并自动分发容器副本。
- 可堆叠：您可以垂直和即时堆叠服务。

> 总结

- 相比于虚拟机，更高效利用系统资源
- 运行于系统内核，启动快
- 运行环境一致，避免其他不必要的麻烦
- 持续集成和持续部署
- 集群模式下，可弹性伸缩
- 微服务，容器独立、互不影响

## docker应用技术

> 1. 写时复制技术
>
> 2. 镜像技术
>
>    

## docker应用场景

> 1. 快速部署，节省时间
> 2. 环境一致性
> 3. 持续集成
> 4. 微服务
> 5. 集群模式下，可以弹性伸缩
> 6. 容器虚拟化技术（容器、镜像、仓库）
> 7. 一次构建、随处运行（快速应用部署、便捷升级和扩容缩容、高效利用计算机资源）

## docker容器与虚拟机的比较

### 虚拟机的缺点：

- 虚拟机运行的是一个完整的操作系统

> - 资源占用多
>
> - 冗余步骤多
>
> - 启动慢

### docker的优点：

> 共享主机内核，是一个独立运行的进程

![img](https://cdn.jsdelivr.net/gh/SWE15041/MyImg/img/20200427204833.jpeg)

## docker架构

> Client: docker客户端
>
> Docker_host：docker服务端，包含容器、镜像、docker daemon
>
> Registry：镜像注册服务器

### docker总体架构图

![img](https://cdn.jsdelivr.net/gh/SWE15041/MyImg/img/20200427204846.jpg)





### docker服务端/客户端交互架构

![image-20200428002711140](https://cdn.jsdelivr.net/gh/SWE15041/MyImg/img/20200428002714.png)

### doker详细交互架构



## docker的基本组成

> 1. 镜像：只读的模板
>
> 2. 容器：独立运行的实例对象
>
> 3. 仓库：集中存放镜像的地方
>    - 仓库分为：公开仓库和私有仓库
>    - 公开仓库：docker hub、阿里云（国内仓库做了镜像映射）、网易云等

## docker的安装

## 测试hello-world

>1. 镜像加速
>
>   - 阿里云镜像加速
>
>   - 网易云加速
>
>2. 安装成功测试命令
>
>   - docker version
>   - docker info 

```
> docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete
Digest: sha256:8e3114318a995a1ee497790535e7b88365222a21771ae7e53687ad76563e8e76
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```





# 二、命令

## 常用镜像命令

> docker image

- 作用：查看本地镜像

- 参数：

  - -a ：列出所有的镜像	
  - -q ：只显示镜像ID
  - --digest：显示镜像摘要信息
  - --no-trunc ：显示完整的镜像信息

- 例子

  ```
  [lyn@lyn /Applications/Java/changtuo/JAVA/project]$ docker images
  REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
  hello-world         latest              bf756fb1ae65        3 months ago        13.3kB
  ```

  - REPOSITORY：镜像名字
  - TAG：标签
  -  IMAGE ID：镜像ID
  - CREATED ：创建时间
  - SIZE：镜像大小（需要的运行时环境，最小）

> docker search [image]

- 作用：查找远程镜像

- 参数

  - -s : 显示收藏数不小于指定值的镜像
  - --no-trunc：显示完整的镜像信息
  - ---automated：只列出automated build类型的镜像

- 例子

  ```
  [lyn@lyn /Applications/Java/changtuo/JAVA/project]$ docker search tomcat
  NAME                          DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
  tomcat                        Apache Tomcat is an open source implementati…   2707                [OK]
  tomee                         Apache TomEE is an all-Apache Java EE certif…   77                  [OK]
  dordoka/tomcat                Ubuntu 14.04, Oracle JDK 8 and Tomcat 8 base…   53                                      [OK]
  bitnami/tomcat                Bitnami Tomcat Docker Image                     31                                      [OK]
  kubeguide/tomcat-app          Tomcat image for Chapter 1                      28
  consol/tomcat-7.0             Tomcat 7.0.57, 8080, "admin/admin"              17                                      [OK]
  cloudesire/tomcat             Tomcat server, 6/7/8                            15                                      [OK]
  aallam/tomcat-mysql           Debian, Oracle JDK, Tomcat & MySQL              12                                      [OK]
  arm32v7/tomcat                Apache Tomcat is an open source implementati…   10
  rightctrl/tomcat              CentOS , Oracle Java, tomcat application ssl…   6                                       [OK]
  maluuba/tomcat7-java8         Tomcat7 with java8.                             4
  unidata/tomcat-docker         Security-hardened Tomcat Docker container.      4                                       [OK]
  amd64/tomcat                  Apache Tomcat is an open source implementati…   2
  jelastic/tomcat               An image of the Tomcat Java application serv…   2
  arm64v8/tomcat                Apache Tomcat is an open source implementati…   2
  oobsri/tomcat8                Testing CI Jobs with different names.           1
  camptocamp/tomcat-logback     Docker image for tomcat with logback integra…   1                                       [OK]
  99taxis/tomcat7               Tomcat7                                         1                                       [OK]
  ppc64le/tomcat                Apache Tomcat is an open source implementati…   1
  i386/tomcat                   Apache Tomcat is an open source implementati…   1
  secoresearch/tomcat-varnish   Tomcat and Varnish 5.0                          0                                       [OK]
  picoded/tomcat7               tomcat7 with jre8 and MANAGER_USER / MANAGER…   0                                       [OK]
  s390x/tomcat                  Apache Tomcat is an open source implementati…   0
  cfje/tomcat-resource          Tomcat Concourse Resource                       0
  appsvc/tomcat                                                                 0
  [lyn@lyn /Applications/Java/changtuo/JAVA/project]$
  ```

> docker pull  [image]

- 作用：下载镜像

- 参数

  - 默认拉取最新版本

- 例子：

  ```
  
  ```

  

> docker	rmi [image]

- 作用：删除镜像
- 参数：
  - -f：强制删除
- 例子：



## 常用容器命令

> docker run [options] image[command] [arg....]

- 作用：新建并启动命令
- 参数：
  - --name: 容器别名
  - -i : 交互式运行容器
  - -d: 后台运行，以启动守护式容器。
  - -t：为容器重新分配伪输入终端
  - -P : 随机端口映射
  - -p： 指定端口映射（ip:hostPort:containerPort/ip::containerPort/hostPort:containPort/containerPort）

> docker ps [options]

- 参数：

  - -l : 列出最近创建的容器
  - -a : 列出当前所有正在运行的容器+历史上运行过的容器
  - -n : 显示最近创建的n个容器
  - -q : 静默模式，只显示容器编号
  - --no-trunc：不断的输出

- 例子

  ```
  [lyn@lyn /Applications/Java/changtuo/JAVA/project]$ docker ps
  CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
  [lyn@lyn /Applications/Java/changtuo/JAVA/project]$
  ```

  

> exit：

- 作用：容器停止并退出

> ctrl+P+Q

- 作用：容器不停止并退出

> docker start [cId|cName]

- 作用：启动容器

> docker restart [cId|cName]

- 作用：重启容器

>docker stop  [cId|cName]

- 作用： 停止容器

> Docker kill [cId|cName]

- 作用：强制停止容器

> docker rm [cId|cName]

- 作用：删除容器
- 参数：
  	- -f： 强制删除（docker rm -f $(docker ps -qa)）(docker ps -qa |xargs docker rm)
  	- 

# 问题

kafka日志连接失败

解决：

```sh
docker compose down --remove-orphans
docker compose up -d
```

