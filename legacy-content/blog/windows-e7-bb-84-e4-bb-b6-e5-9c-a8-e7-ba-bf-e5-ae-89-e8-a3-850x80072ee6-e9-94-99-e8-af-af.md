---
title: Windows组件在线安装0x80072ee6错误
id: 1080
categories:
  - 国境以南
  - 工作相关
date: 2012-02-12 15:06:00
tags:
---

<font size="2" face="微软雅黑">多次试图安装在线离线MSN未果，上网搜索大多集中在残留文件没清理干净，各种方式清理不见成效，最终发现原来问题如此的简单变态……</font>

<font size="2" face="微软雅黑">去IE的Internet设置中，局域网设置把使用自动配置脚本一档勾去，如下</font>

![wlw-setting](http://chiidea.com/box/image/2010-01/windowslive_10546/wlwsetting_thumb.png)

<font size="2" face="微软雅黑">问题搞定～</font>

&lt;

p&gt;<font size="2" face="微软雅黑">如有其它类似问题，去MSN系统安装日志查看一下是个不错的选择安装日志文件的路径：C:\Users\All Users\Microsoft\WLSetup\Logs</font>