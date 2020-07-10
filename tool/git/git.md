[toc]

一、给多个github账号添加不同的ssh key

1、创建新的ssh-key，键入key存放的文件名（不使用默认），之后一路回车

```
$ cd ~/.ssh
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

2、在~/.ssh目录下创建`config`文件，内容如下

```
Host my #别名
HostName github.com  
PreferredAuthentications publickey  
IdentityFile ~/.ssh/my_rsa  #私钥位置
  
Host chancetop  
HostName github.com  
PreferredAuthentications publickey  
IdentityFile ~/.ssh/id_rsa
```



3、将私钥添加到`ssh-agent`下管理

```
$ ssh-agent bash

$ ssh-add ~/.ssh/id_rsa
$ ssh-add ~/.ssh/my_rsa
```

4、测试github连通性

```
$ ssh -T git@my
Hi SWE15041! You've successfully authenticated, but GitHub does not provide shell access.

$ ssh -T git@chancetop
Warning: Permanently added the RSA host key for IP address '13.250.177.223' to the list of known hosts.
Hi YanniLan! You've successfully authenticated, but GitHub does not provide shell access.
```

5、下载仓库代码

- 注：克隆地址由 `git@github.com:SWE15041/test.git`改为` git@my:SWE15041/test.git`
- 即：`git@别名:github账号/仓库` （别名：config文件中定义的host别名）

```
$ git clone git@my:SWE15041/test.git
```





