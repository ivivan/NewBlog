---
title: Twitter官方客户端自定义API -GAE搭建Gtap代理
id: 23
categories:
  - 国境以南
date: 2010-07-31 06:14:47
tags:
---

<div id="msgcns!1326AB98D6395CF4!1875" class="bvMsg">

有方法而不尝试的感觉是十分让我无法忍受的，今天中午终于走出了这一步，按网上的教程建了个Gtap的twitter api，从目前的情况看，短期内api终于不用求人了………….

方法记录如下：

1\. 注册Google App Engine

进[http://appengine.google.com/](http://appengine.google.com/ "http://appengine.google.com/") 用google帐户登陆，需要用手机收一个验证码，地区选Other，手机号前+86，把验证码一输入，搞定

填一个地址名，然后自己起一个应用名，结束。据说应用一个google 账号最多建三个，而且不可删除，不知这变态规定现在还实行不实行。

2.下载安装Google APP Engine的开发环境，和Python，不能使用3或更高的版本 <p>Google App Engine SDK 下载地址 [http://code.google.com/intl/zh-CN/appengine/downloads.html](http://code.google.com/intl/zh-CN/appengine/downloads.html) <p>Python 2.6.5 下载地址[http://http://www.python.org](http://http://www.python.org) 去官网找找，现在好像是2.7  <p>下载Gtap源码[http://gtap.googlecode.com/files/gtap-0.3.3.tar.gz](http://gtap.googlecode.com/files/gtap-0.3.3.tar.gz) <p>安装，很简单又快 <p>解压缩gtap文件夹至Google App Engine SKD 安装目录，默认为 X:Program FilesGooglegoogle_appenginegtap <p>修改app.yaml文件第一行，把 your_application_name 改为你申请的application name （例如yourid） <p>删除secure: always 关闭加密连接(针对当前SSL加密的appspot被墙，不得已而为之) <p>3\. 运行CMD <p>cd X:Program FilesGooglegoogle_appengine <p>appcfg.py update gtap <p>过程中要输入自已的google账号和密码 <p>4\. 结束后进入[http://**yourid**.appspot.com/](http://yourid.appspot.com/)看看是否显示“GTAP v0.3.3 is running!” <p>一切正常的话，现在你已经有一个可用又安全的twitter api了
  </div>