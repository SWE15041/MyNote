## Installer

```sh
# install
brew install jenkins-lts
# start
brew services start jenkins-lts
# restart
brew services restart jenkins-lts
# upgrade
brew upgrade jenkins-lts
```

After starting the Jenkins service, visit http://localhost:8080 on Safari browser.

install guide：https://www.macminivault.com/installing-jenkins-on-macos/



**配置服务器访问权限**

open 

```
sudo nano /usr/local/opt/jenkins-lts/homebrew.mxcl.jenkins-lts.plist
```

```
<string>--httpListenAddress=127.0.0.1</string>
```

Change to:

```
<string>--httpListenAddress=0.0.0.0</string>
```

Start 

```
brew services start jenkins-lts
```

Get  initial password

```
cat /Users/administrator/.jenkins/secrets/initialAdminPassword
```

Visit http://localhost:8080 on Safari browser. Type password

![img](https://www.macminivault.com/wp-content/uploads/unlock_jenkins.png)



Choose "install suggested plugins"

![img](https://www.macminivault.com/wp-content/uploads/customize_jenkins.png)

![image-20211025111431763](/Users/Yanni/Library/Application Support/typora-user-images/image-20211025111431763.png)  



Create admin



allure generate allure_results --clean -o allure-report

https://www.swtestacademy.com/allure-report-junit/

​	