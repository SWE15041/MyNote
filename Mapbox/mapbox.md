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

