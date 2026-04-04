---
title: 'Gappproxy, Android翻墙新希望'
id: 749
categories:
  - 工作相关
date: 2011-04-16 23:27:00
tags:
---

<font face="微软雅黑">自从在GAE上搭建的Twitter Api半死不活，曾经无比好用的Evovpn升级成收费服务之后，手机上twitter的频率骤降，基本达到了一月不足一次，远离了各种笑料。今天在Reader里看到一文介绍Gae proxy for Android，下载试用，果然神器，强烈推荐，装机必备….</font>

<font face="微软雅黑">翻墙过程分两大部</font>

<font face="微软雅黑">1\. 搭建GappProxy</font>

<font face="微软雅黑">惯例建GAE应用一个，从GAppProxy项目下载页 [http://code.google.com/p/gappproxy/downloads/list](http://code.google.com/p/gappproxy/downloads/list) 下载服务器源码包+自动部署工具，即uploader-2.0.0-win.zip。 </font>

<font face="微软雅黑">解压下载文件，双击执行该目录下的uploader.exe，在AppID提示后输入刚才创建的app_id，然后分别按提示输入自己的gmail用户名和密码（注意，输入密码时不会有任何显示），等待自动上传完毕</font>

<font face="微软雅黑">2\. 从Google官方市场下载软件GaeProxy</font>

<font face="微软雅黑">第一次运行 GAEProxy 请按照提示进行设置，并确保在联网并插入SD卡的状态下勾选 “安装依赖模块“。</font><font face="微软雅黑">现阶段 GAEProxy 的运行依赖于 **iptables** ，并需要获得 **ROOT** 权限。 </font>

<font face="微软雅黑">建议不要开启“全局代理”，最新版的 GAEProxy 支持“为应用分别设置代理”功能，去掉“全局代理”选项，再点击此选项，之后就可以选择你需要使用代理的应用了。 </font>

<font face="微软雅黑">端口不用改，代理类型GAppProxy，代理地址改成自己搭的</font>

<font face="微软雅黑">勾选 “开启服务”，浏览互联网</font>

<font face="微软雅黑">用官方Twitter版试验成功，速度稳定都不错，关键可以分别设置代理很强大，值得长期拥有……</font>

<font face="微软雅黑">Ps:此Proxy也可搭成供PC端翻墙用，与WallProxy类似，在这里就不介绍了</font>