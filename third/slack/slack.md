[toc]



# 一、开发前配置

## 1、创建slack app

- 地址：https://api.slack.com/apps

## 2、管理APP----授权

方式一：生成OAuth Access Token 

- 作用：通过token访问slack
- 地址：https://api.slack.com/apps/A016L6T83R9/oauth?success=1

- 配置操作范围，即给APP配置scopes ([OAuth Scope值](https://api.slack.com/legacy/oauth-scopes)，如：`chat.write`)
- 点击`Reinstall APP`

- 获取token值：

```
OAuth Access Token：xoxp-......
Bot User OAuth Access Token: xoxb-......
```

- token 类型：[Token types](https://api.slack.com/authentication/token-types)

方式二：启用 [Incoming Webhooks](https://api.slack.com/incoming-webhooks)

- 启用并创建webhook URL
- 作用：发送消息到指定频道

```
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```

![image-20200710104139688](D:\lyn\MyNote\slack\upload\image-20200710104139688.png)



# 二、Message格式

1、[普通文本格式](https://api.slack.com/reference/surfaces/formatting)

2、组装消息

- [块布局](https://api.slack.com/reference/block-kit/blocks)

  ```
  {
  	"blocks": []
  }
  ```

- attachments

  ```
  {
  	"attachments": [
  		{
  			"color": "#f2c744",
  			"blocks": []
  		}
  	]
  }
  ```

  

# 三、API

- [WebAPI](https://api.slack.com/methods#chat)