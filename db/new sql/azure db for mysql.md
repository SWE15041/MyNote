**azure db for mysql**



Price 



**Compute** 

按使用时长计费

(vcpu+menory) 62.42*8=499.36





0.0855$/vcpu/hour 



8vcpu+32GB memory+ 400GB disk size + 



**Monthly cost**

- By hour: **499.32**$/**monthly=**730hour*8vcpu*0.0855$/vcpu/hour 
- By day: 508$/**monthly**= 31day*24hour*8vcpu*0.0855$/vcpu/hour 
- By month: 499.32$/**monthly**=**8vcpu x 62.412$/vcpu/month**



- 



**Storage** (max = 16TB =16384GB)

412*0.12=49.44



8*62.412+412*0.115





**Backup Storage**

**Backup Storage disk size= Storage disk size 时， 免费**

**超额：**

- **LRS（**Locally redundant storage**） 0.095$/GB/Month**
- GRS( geo-redundant storage): 2***0.095$/GB/Month**





**IOPS**

两种订阅方式：

- **【selectd】Pre-provisioned IOPS:** ((Pre-provisioned IOPS - free IOPS) + HA IOPS) * 0.05$/IOPS ，free IOPS = storage disk size *3 IOPS/GB + 300IOPS/server， IOPS 会随着预置存储的大小而扩展, 每GB 分配3 IOPS, max storage disk size = 16 TB, 每个server赠送300 IOPS，
- Autoscale IOPS ： 按使用量计费， LRS = **0.20$/per** million IOPS , ZRS = **0.25$/per** million IOPS 



好神奇：为什么存储量越少， Additional IOPS越多，需要花的钱越多？



**monthly**

**超额 (Max** IOPS - min IOPS + 36 iops for HA ) * 0.0.5



假设 400GB那么IOPS = 400GB*3IOPS/GB + 300IOPS（free） = 1800 IOPS



Additional (12800-7665)+36=5171 IOPS selected. (USD 0.05 per IOPS)

(12800 - 400*3-300)Additional IOPS *0.05$/IOPS= $**565.00**



**Bandwidth**

**$0**







**Replica**

按使用资源付费：campute + storage + iops + backup + **Bandwidth**



**High Availability**

campute + storage 



Total

配置 Standard_D8ds_v4 (8 vCores, USD 62.42 per vCore) **2455GB** storage +  **5135** Additional IOPS 



8*62.412+2455 x 0.115 + 5171 x 0.05 = 1,040.171



https://azure.com/e/65a183ce83fd4bae98a6a0dadee8064b