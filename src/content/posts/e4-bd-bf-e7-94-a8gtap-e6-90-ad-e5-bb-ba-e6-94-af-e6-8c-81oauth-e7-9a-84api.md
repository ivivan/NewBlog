---
title: '使用GTAP搭建支持OAUTH的API'
description: 'GTAP升级到了0.4X版本，设置方法有些变化，补充在此： 1\. 先下载最新的GTAP，地址： 2\. 登陆 打开twitter应用申请页面。有几个地方需要注意： a、在Application Type项选择Browser； b、在Callback URL:输入“https://applicati'
date: '2010-09-04'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'e4-bd-bf-e7-94-a8gtap-e6-90-ad-e5-bb-ba-e6-94-af-e6-8c-81oauth-e7-9a-84api'
---

<div id="msgcns!1326AB98D6395CF4!2713" class="bvMsg">

GTAP升级到了0.4X版本，设置方法有些变化，补充在此：

1\. 先下载最新的GTAP，地址：[http://goo.gl/UVLV](http://goo.gl/UVLV "http://goo.gl/UVLV")

2\. 登陆[http://goo.gl/9tqP](http://goo.gl/9tqP "http://goo.gl/9tqP")打开twitter应用申请页面。有几个地方需要注意： <p>a、在Application Type项选择Browser； <p>b、在Callback URL:输入“https://application-ID.appspot.com/oauth/twitter/callback”记得把application-ID替换成你在GAE中申请的application-ID,例如abc <p>c 、在Default Access type项选择Read &amp; Write读写方式。 <p>3\. 填写完毕后，点击 Resigter application 按钮，生成你的twitter应用。 <p>4\. 在application成功页面，twitter会给你的application生成对应的Consumer key和Consumer secret。记住这两个值。复制下来 <p>5\. 用写字板或其他支持 Unix 换行风格的文本编辑器打开 app.yaml，把第 1 行的 “application: ” 后面部分改成刚才在 GAE 上的那个 Application Identifier，按照前面的假设，这里就应该改成 gtap，再把第 12 行的 “secure: always” 改成 “secure: optional”，最后 app.yaml 应该像下面这样。 > <p>`application: abc
> version: 1
> runtime: python
> api_version: 1` <p>handlers:
> - url: /static
> static_dir: static <p>- url: /.*
> script: main.py
> secure: optional 

6\. 用写字板或其他支持 Unix 换行风格的文本编辑器打开 main.py，把在 Twitter 上建立 APP 获得的 CONSUMER_KEY 跟 CONSUMER_SECRET 替换第 14、15 行的对应内容。照旧上传

7\. 在浏览器中打开这个 API 地址 [http://abc.appspot.com](http://abc.appspot.com)，点击 “Sign in with Twitter”，在Twitter官网登录后点 “Allow”，重定向后会显示 current key，这就是在 Twitter 客户端使用这个 API 登录用的密码，最好改成容易记住的组合，在下面的 the new key 中填入，然后点击 “Change the Key”。
  </div>
