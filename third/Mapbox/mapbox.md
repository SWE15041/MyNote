[toc]

```
access token: 

pk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmE0cmdzMDI4djJzczNwNXd4OG1lcCJ9.tGSLscZqtsQz_4_hjlAXbQ

sk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmF1Y3RoMDJpYzMwbWw2MmVqNGM4dCJ9.24EGX1r-Op8zDgsTDsIQ4A
```

https://docs.mapbox.com/help/tutorials/upload-curl/

![image-20200721100948628](../../../tools/Typora/upload/image-20200721100948628.png)

https://docs.mapbox.com/help/troubleshooting/uploads/#accepted-file-types-and-transfer-limits

![image-20200721101900302](mapbox.assets/image-20200721101900302.png)





区别tileset 和 dataset

- Tileset ：轻量级矢量集，当图集更新较少时选用。
- Dataset：点、线、面数据集，当图集复杂度低且需要频繁更新时选用。（需要连接到Tileset）
- 

```
Tilesets are lightweight collections of vector data that are optimized for rendering and are not editable but can be styled in the Mapbox Studio style editor. Consider uploading your data as a tileset if your data is large and doesn't need to be updated often.
-------------
Datasets provide access to feature geometries (points, lines, and polygons) and properties (attributes), both of which can be edited in the Mapbox Studio dataset editor or through the Mapbox Datasets API.
Consider using a dataset if you are working with less complex data that needs to be updated often. It is important to note that once your dataset has been created, it will need to be published into a tileset to be added to a style in the Mapbox Studio style editor. With datasets, you can continue to make changes to your data as needed, publish each update to the connected tileset, and see those changes reflected in any styles that contain that tileset.
```



```
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
  "url": "https://tilestream-tilesets-production.s3.amazonaws.com/cd/_pending/u4lk4agysp92pk520y9vtwckc/swe15041",
  "tileset": "swe15041.mytileset"
}' 'https://api.mapbox.com/uploads/v1/swe15041?access_token=sk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmF1Y3RoMDJpYzMwbWw2MmVqNGM4dCJ9.24EGX1r-Op8zDgsTDsIQ4A'
```







1、存放file到Amazon

获取S3临时凭证

```
$ curl -X POST https://api.mapbox.com/uploads/v1/username/credentials?access_token=<secret access token>

respone:
{
  "accessKeyId": "{accessKeyId}",
  "bucket": "{bucket}",
  "key": "{key}",
  "secretAccessKey": "{secretAccessKey}",
  "sessionToken": "{sessionToken}",
  "url": "{url}"
}
```

上传

```
$ curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
  "url": "http://{bucket}.s3.amazonaws.com/{key}",
  "tileset": "{username}.{tileset-name}"
}' 'https://api.mapbox.com/uploads/v1/{username}?access_token=YOUR MAPBOX ACCESS TOKEN
This endpoint requires a token with uploads:write scope.'
```







java sdk

https://github.com/mapbox/mapbox-java

https://docs.mapbox.com/android/java/overview/#installation



使用指南

https://docs.mapbox.com/help/tutorials/add-points-pt-1/?utm_medium=email&utm_source=studio-onboarding&utm_campaign=email|studio-onboarding|studio-onboarding-1&utm_term=studio-onboarding-1&utm_content=custom-data-tutorial



aws s3 （ Simple Storage Service）

- https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObjectJavaSDK.html
- https://docs.aws.amazon.com/cli/latest/reference/s3/index.html
- https://www.cnblogs.com/gaott/archive/2012/04/13/2439000.html
- https://www.jianshu.com/p/9428982b1057

```
$  export AWS_ACCESS_KEY_ID=ASIATNLVGLR2OYFEQSS5

$  export AWS_SECRET_ACCESS_KEY=3LoOpVagI7shEe6eIbLurY+PLDtD2gjJkEXeM+Mt

$  export AWS_SESSION_TOKEN=FwoGZXIvYXdzEKz//////////wEaDFnEDKaF8aac67tN0CKVAnIGwBXhZyJbP9hhBRuyyjkIucmWH8iqMckvoqNiWsbCJJJ4y5xXTsI0HkOJiYrvH7cG4X1hPj6ZMS6jovw7LJjZD3LKxXVf1qDzZea3q4onepZyNGA0kzBRXnqSAMhWice26rcz9ctFKDZfRNI0uM5eb0UllYN6FxKv/STFonMT+CT38v09gSJDUMGbCFaVXm8Jj2eC/eOWoBcN5kl+ksJJaQWpXy13A/PTYwPSf8SwPEXnlc4cy2QPXnfmZkWrRKCqMP43gHPBXvHR5bUF8bmUFhLnRJw5WdykNaUl9iVtpGE8LoTVyxEoHszAw8zCIhynnoIwy4uOf6IExom9V4jXyq0NQbG6mxBW7loT+34N6R/NGQoo4cDe+AUyKRHZbrXLhEY2nyrUsJ+2s0c1j6MX9GPy25g/kHobzpO8l+XrhJ/baj08

$  aws s3 cp 'D:/file/test.json' s3://tilestream-tilesets-production/c2/_pending/hzzpu1mjvr52bn00xkvdqwckc/swe15041 --region us-east-1

upload: D:\file\test.json to s3://tilestream-tilesets-
production/c2/_pending/hzzpu1mjvr52bn00xkvdqwckc/swe15041

```



```
export AWS_ACCESS_KEY_ID=ASIATNLVGLR2LHYN6UEQ

export AWS_SECRET_ACCESS_KEY=ObnT9yO3H/98Muv661msEMiRQ760sllQf60xKCCE

export AWS_SESSION_TOKEN=FwoGZXIvYXdzEK3//////////wEaDMNisBz+h+zrZHdQ8SKVApbl9DbMtHbTvucg7ijYgJqBpG1abue0yAiIHmY8mLwSMBVx5PStiYRpxvy6G12i9uTRywA9nsOCOjrsYmDjQpH9VExp2kgh4fvRtga/UuIGEYiqZYvFG8VauxQLH5hb2pTcfDaFERXHkPeHErC+dG2fROTuRQxfTMDjZaOivmqvnfNiOXKXGviVtEH0NvE8OoGQZhc7Ox2IW86m0t3w5NIqHjUkaHjrnJpyRS988JHwd2OirpLsV1ixUYO/YbtGtiCM8nU9HR0RSJ6a0Xg2BcB33KwdVWzoE34U7zEsd66jmQsLqeoY3Y1xVutRYc2aExsEQ2W/qM4CTUxSB3ol/rlG7e5q4elSzoTzimbRONoDp+QFmmsou+7e+AUyKcpkpVdeHaInzh53/GVoFHIjk9x+c9ewLp2J1s4V+ZdI85u0A59tq6YC

aws s3 cp 'D:/file/test.json' s3://tilestream-tilesets-production/c2/_pending/hzzpu1mjvr52bn00xkvdqwckc/swe15041 --region us-east-1

upload: D:\file\test.json  to s3://tilestream-tilesets-
production/c2/_pending/hzzpu1mjvr52bn00xkvdqwckc/swe15041
```



在Java应用中使用aws凭证

地址：https://docs.aws.amazon.com/sdk-for-java/v2/developer-guide/credentials.html



步骤：

aws sdk使用指南：https://docs.aws.amazon.com/zh_cn/sdk-for-java/v2/developer-guide/welcome.html

1、引入依赖(gradle)

- 地址：https://docs.aws.amazon.com/zh_cn/sdk-for-java/v2/developer-guide/setup-project-gradle.html
- 注：将 s3 的依赖项替换为您将在项目中使用的 AWS 服务的依赖项。

```groovy
dependencies {
  implementation platform('software.amazon.awssdk:bom:2.X.X')
  implementation 'software.amazon.awssdk:s3'
  testImplementation group: 'junit', name: 'junit', version: '4.11'
}
```

2、获取 AWS Security Token Service (AWS STS) 的临时凭证

```
bucket = tilestream-tilesets-production
key = 60/_pending/w8xk35iewr32x8o0pq92ozckc/swe15041
accessKeyId = ASIATNLVGLR2IU4NV5PX
secretAccessKey = 3ugdnDv8vtMBF5NJeW1SS5UiEi3wSoZcVmd/uidN
sessionToken = FwoGZXIvYXdzEN3//////////wEaDBZcG64qFTxxGD6foSKVAs8vGnpOJXu9WCrb3uR4lbCm5ot4KF277yWD2rAXROAjtNPBTLHYtxVyCYG7/a8udNuqsJevXKZVETL+HuhjmjNA6DzqMIJlA+e0PUzkKgs5wB11encz4tg68biV3jbfEwJalZZ4J/N5lAmt6l3GxlDsM2uT6nfuEA4YiLqeSsPMFsIDQ9tnLyZqnPnG2+uwhZ7gixwIMhQAqXX39+IVBGdRFWsIQcVXBV3Z7XPygVDmiTuLYXBqNLWNmIpWJ5uiUOtzieIf+xobDg3yQCFmYmZE3/hXVQk3q3kLV5+vkMvPoc2m+yyeGAlq/kcKhYAfsrAdlKKJwYKQ/ohM/sdJMkYmffIAZSNLE/zJo9/yNYH9zyuM6rEou6vp+AUyKahZkzhQKhGFzoCQXJvZ5gX9+L52Bzs3PlsW4j3dhHcDnwFtjI4IdIDp
url = https://tilestream-tilesets-production.s3.amazonaws.com/60/_pending/w8xk35iewr32x8o0pq92ozckc/swe15041


UploadDataResponse{complete=false, tileset='swe15041.tileset001', error='null', id='ckczo2gft0pyr22mdg44n22l2', name='tileset001', modified=2020-07-24T03:30:11.528Z[UTC], created=2020-07-24T03:30:11.528Z[UTC], owner='swe15041', progress=0}

$ curl "https://api.mapbox.com/uploads/v1/swe15041/ckczo2gft0pyr22mdg44n22l2?access_token=sk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmF1Y3RoMDJpYzMwbWw2MmVqNGM4dCJ9.24EGX1r-Op8zDgsTDsIQ4A"

$ curl "https://api.mapbox.com/uploads/v1/swe15041?access_token=sk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmF1Y3RoMDJpYzMwbWw2MmVqNGM4dCJ9.24EGX1r-Op8zDgsTDsIQ4A"

```





```
bucket = tilestream-tilesets-production
key = d6/_pending/0jk0eykq5n42ax10xbjjx3dkc/swe15041
accessKeyId = ASIATNLVGLR2EX5N3I55
secretAccessKey = dR5b+Y+YYFqfz1pKivB2U1+cVgQzGiLPnNFr7+qY
sessionToken = FwoGZXIvYXdzECUaDLJ0FM1ZaNYjjcAlwyKVAmRqTy3CPwTrCww3PVSDoWtcFip6gVrqP1p0c1K/u2Np9HIAz1MDIrflnQX/W53g3k2olM+UbG1zYlIPDsNmMHWvQlemKUlJjHAnOK+GN0wkDPWF434E3tOTbXPdV/Q2KhgJDGd12hJYVsB4QowBN/dTdCYFExUX2giFG/mTpIo0+YrHka6S0RsdA8y2Hjkpei3Z2P214Rk1FQxTfEIcge05nDyjXyb8wjt4Zjwg8KQqwHApVawlvjJDjyBBcLhPJjqHe7ZYfq4CvDBSwkhz9UvYgqj0acB+hpR+ItSoXxYmRPhowXC9XumlzWxeJtWVbXlfvsgKYzSiXa+M/9RCKODGlVdJ/5uPhStMM4aZZJoU8RRFEP8otYn5+AUyKXBEW1I+vZkK6wLYSkNZbdKyr7H5yk5O5CltAZMS0BbtyOjWM7CX1lDT
url = https://tilestream-tilesets-production.s3.amazonaws.com/d6/_pending/0jk0eykq5n42ax10xbjjx3dkc/swe15041
s3Url: https://tilestream-tilesets-production.s3.amazonaws.com/d6/_pending/0jk0eykq5n42ax10xbjjx3dkc/swe15041?X-Amz-Security-Token=FwoGZXIvYXdzEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDFnEDKaF8aac67tN0CKVAnIGwBXhZyJbP9hhBRuyyjkIucmWH8iqMckvoqNiWsbCJJJ4y5xXTsI0HkOJiYrvH7cG4X1hPj6ZMS6jovw7LJjZD3LKxXVf1qDzZea3q4onepZyNGA0kzBRXnqSAMhWice26rcz9ctFKDZfRNI0uM5eb0UllYN6FxKv%2FSTFonMT%2BCT38v09gSJDUMGbCFaVXm8Jj2eC%2FeOWoBcN5kl%2BksJJaQWpXy13A%2FPTYwPSf8SwPEXnlc4cy2QPXnfmZkWrRKCqMP43gHPBXvHR5bUF8bmUFhLnRJw5WdykNaUl9iVtpGE8LoTVyxEoHszAw8zCIhynnoIwy4uOf6IExom9V4jXyq0NQbG6mxBW7loT%2B34N6R%2FNGQoo4cDe%2BAUyKRHZbrXLhEY2nyrUsJ%2B2s0c1j6MX9GPy25g%2FkHobzpO8l%2BXrhJ%2Fbaj08&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200727T030634Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=ASIATNLVGLR2OYFEQSS5%2F20200727%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3aec43f19573c8be582bb539718e3867fa35eab53d7240f83a5846b4d05d171e
upload to mapbox success
UploadDataResponse{complete=false, tileset='swe15041.tileset001', error='null', id='ckd3xjnjl65iu23nz697022un', name='tileset001', modified=2020-07-27T03:06:35.135Z[UTC], created=2020-07-27T03:06:35.135Z[UTC], owner='swe15041', progress=0}

curl "https://api.mapbox.com/uploads/v1/swe15041?access_token=sk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmF1Y3RoMDJpYzMwbWw2MmVqNGM4dCJ9.24EGX1r-Op8zDgsTDsIQ4A"

curl "https://api.mapbox.com/uploads/v1/swe15041?access_token=pk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmE0cmdzMDI4djJzczNwNXd4OG1lcCJ9.tGSLscZqtsQz_4_hjlAXbQ"
```





```
$ curl "https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/-122.42901,37.80633.json?radius=10&access_token=pk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmE0cmdzMDI4djJzczNwNXd4OG1lcCJ9.tGSLscZqtsQz_4_hjlAXbQ"
```



```
curl "https://api.mapbox.com/uploads/v1/jaydai/ckd5sgar93gno27l91z78nn11?access_token=sk.eyJ1IjoiamF5ZGFpIiwiYSI6ImNrOGEwcTFkMzAzZGMzbG16N3pwMmljeXEifQ.5MKaR9hW3Xpmg45sEeGIkA"

curl "https://api.mapbox.com/uploads/v1/jaydai/ckcu9tuux1ajd29kgckntmofj?access_token=sk.eyJ1IjoiamF5ZGFpIiwiYSI6ImNrOGEwcTFkMzAzZGMzbG16N3pwMmljeXEifQ.5MKaR9hW3Xpmg45sEeGIkA"

curl "https://api.mapbox.com/uploads/v1/jaydai/ckcuads4t307a27ls9st3b63h?access_token=sk.eyJ1IjoiamF5ZGFpIiwiYSI6ImNrOGEwcTFkMzAzZGMzbG16N3pwMmljeXEifQ.5MKaR9hW3Xpmg45sEeGIkA"

curl "https://api.mapbox.com/uploads/v1/jaydai/ckd5sgar93gno27l91z78nn11?access_token=sk.eyJ1IjoiamF5ZGFpIiwiYSI6ImNrOGEwcTFkMzAzZGMzbG16N3pwMmljeXEifQ.5MKaR9hW3Xpmg45sEeGIkA"

curl "https://api.mapbox.com/uploads/v1/jaydai/ckd5s6isk497z23rxfolxz1jc?access_token=sk.eyJ1IjoiamF5ZGFpIiwiYSI6ImNrOGEwcTFkMzAzZGMzbG16N3pwMmljeXEifQ.5MKaR9hW3Xpmg45sEeGIkA"

curl "https://api.mapbox.com/uploads/v1/jaydai?access_token=sk.eyJ1IjoiamF5ZGFpIiwiYSI6ImNrOGEwcTFkMzAzZGMzbG16N3pwMmljeXEifQ.5MKaR9hW3Xpmg45sEeGIkA"
 
 curl "https://api.mapbox.com/uploads/v1/jaydai/ckd5to0oj22rr24nraagrk77u?access_token=sk.eyJ1IjoiamF5ZGFpIiwiYSI6ImNrOHpuOTdndTA2eTQzbW42dWd3YzQ3dDkifQ.XiNYB7HkU0Kiff6mqgtPoA"
```



```
上传数据到mapbox和后台流程
1、绘制区域，组装tileset数据
2、上报数据到mapbox（需要将数据上传暂存到ams s3服务器）
3、获取mapbox处理数据的结果
	3.1 如果成功，更新区域数据和上报数据状态及其他相关数据持久化处理
	3.2 如果失败，更新上报数据状态，不做其他处理（失败原因多个）
    
失败持久化到数据库失败的原因：
1、服务器进程终止时，线程超过25秒 且 未执行完成 被放弃执行
2、mapbox服务器异常，无法接收或处理请求
3、

数据修复机制
1、开启线程同步mapbox状态

0730 更新上报流程
1 上报数据到mapbox
2 缓存 新的配送区域 数据到redis
3 判断upload状态，
3.1 如果数据被成功处理，则判断tileList数据是否被更新，是则将区域数据持久化到本地
3.2 如果数据被处理失败或者异常，则告知前端处理失败
	3.2.1 失败原因1: 数据保存失败，
	3.2.2 失败原因2：数据格式错误，mapbox无法处理
	3.2.3 失败原因3：

```

```
$ curl "https://api.mapbox.com/tilesets/v1/swe15041?access_token=sk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmF1Y3RoMDJpYzMwbWw2MmVqNGM4dCJ9.24EGX1r-Op8zDgsTDsIQ4A"

curl "https://api.mapbox.com/tilesets/v1/swe15041?type=vector&limit=25&sortby=created&access_token=sk.eyJ1Ijoic3dlMTUwNDEiLCJhIjoiY2tjdmF1Y3RoMDJpYzMwbWw2MmVqNGM4dCJ9.24EGX1r-Op8zDgsTDsIQ4A"

```





# bounding box

![image-20200729143838259](mapbox.assets/image-20200729143838259.png)