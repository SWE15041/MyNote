[toc]

定义：docker-compose 是docker的开源项目，负责实现docker容器集群的快速编排。

管理的容器分三层：工程（project）、服务（service）、容器（container）

命令手册：https://docs.docker.com/compose/reference/up/

docker  mysql8 
https://hub.docker.com/r/mysql/mysql-server

 
# 安装docker-compose

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install docker-compose

docker-compose version
```
