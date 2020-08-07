[toc]

# 开发前须知

## git源码 

https://github.com/wso2-extensions/esb-connector-dayforce/blob/master/docs/employeeEmploymentInformation/employeeEmploymentTypes.md#retrieving-employee-employment-types



## 开发文档

https://developers.dayforce.com/Special-Pages/Registration.aspx 

https://developers.dayforce.com/Special-Pages/Logon.aspx

https://developers.dayforce.com/Build/API-Explorer/Employee-Employment-Information/Employment-Types/GET-Employee-Employment-Types.aspx



## 管理工具

https://wso2.com/integration/integration-studio/



## dayforce后台

```
https://usconfigr58.dayforcehcm.com/mydayforce/login.aspx

```

# 项目分析

## **dayforce-service**

作用：

1、应用kafka订阅员工 排班变更信息，再使用sftp 将 员工排班变更信息 上传给dayforce。（数据来源：shift-schedule）

2、启用job任务 ，（自己发布自己订阅）

​	自己发布：触发kafka发布 指定时间范围内 需要去获取的员工信息、balabala等

​	自己订阅：从dayforce获取相关数据， upsert 到 comos db（数据存放位置：employee-service）

## **employee-service**

作用：

1、操作cosmos db中的员工信息

## **shift-schedule-service**

作用：

1.1、应用kafka发布员工 排班**变更**消息(fill、cancel) 到dayforce-service，并且将保存到cosmos db

1.2、应用kafka发布员工 排班**变更**信息(fill、unfill ) 给truck-service 

2、使用kafka订阅卡车排班信息，将数据保存到 cosmos db。（数据来源：truck-service）

3、ChangeFeedProcessor是啥？？？

## **shift-schedule-site**

作用：

1、网页端展示数据用

## **shift-solver-service**

作用：

1、将卡车排班信息和员工有效信息进行匹配，生成完整的排班信息

问题：

哪个地方在调用（/bo/shiftsolver/solve put）这个接口？？？



## **backend:schedule-service**

作用：

1、job1: 把dayforce上的employee数据更新到cosmos db。

2、job2 : 把dayforce上的EmployeeAvailability数据更新到 cosmos db。





# 接口

1、获取可用员工

