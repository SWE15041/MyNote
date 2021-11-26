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

```sh
sudo nano /usr/local/opt/jenkins-lts/homebrew.mxcl.jenkins-lts.plist
```

```sh
<string>--httpListenAddress=127.0.0.1</string>
```

Change to:

```sh
<string>--httpListenAddress=0.0.0.0</string>
```

Start 

```sh
brew services start jenkins-lts
```

Get  initial password

```sh
cat /Users/administrator/.jenkins/secrets/initialAdminPassword
```

Visit http://localhost:8080 on Safari browser. Type password

![img](https://www.macminivault.com/wp-content/uploads/unlock_jenkins.png)



Choose "install suggested plugins"

![img](https://www.macminivault.com/wp-content/uploads/customize_jenkins.png)

![image-20211025111431763](/Users/Yanni/Library/Application Support/typora-user-images/image-20211025111431763.png)  



stop

```sh
 brew services stop jenkins-lts
```



Create admin



allure generate allure_results --clean -o allure-report

https://www.swtestacademy.com/allure-report-junit/

​	

```
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
<!--                        <include>**/AppCenterExecutor.java</include>-->
                        <include>**/QAAndroidSimulatorExecutor.java</include>
                    </includes>
                    <systemProperties>
                        <property>
                            <name>allure.results.directory</name>
                            <value>${project.basedir}/allure-results</value>
                        </property>
                        <property>
                            <name>junit.jupiter.extensions.autodetection.enabled</name>
                            <value>true</value>
                        </property>
                    </systemProperties>
                </configuration>
            </plugin>
```



