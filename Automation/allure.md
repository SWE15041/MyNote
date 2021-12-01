[toc]

# 链接

使用手册: https://docs.qameta.io/allure

源码 : https://github.com/allure-framework/allure2

安装包：https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/



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



