---
title: VNC Server和VNC Viewer使用方法
tags:
  - linux
id: 2464
categories:
  - 国境以南
  - 工作相关
date: 2013-08-23 16:46:04
---

VNC server端：

安装： yum install vnc-server

启动 vncserver

设置密码，
linux下的每个用户都可启动一个vncserver，来让客户端连接，所以每个linux下的用户都需要设置密码。
方法：su - 到用户下，输入：vncpasswd 按提示输入密码就可以了，以后客户端连接就输入这个密码。

配置连接参数：
vi /etc/sysconfig/vncservers，添加如下内容：

VNCSERVERS="1:root 2:joe"  注：1、2、3代表窗口，比如root用户用窗口1，joe用户2，
VNCSERVERARGS[1]="-geometry 640x480 –depth 24"  注：为root用户指定分辨率和色彩数，这里的[1]指上面的“1:root”

VNCSERVERARGS[2]="-geometry 1024x768 –depth 16"  注：为joe用户指定分辨率和色彩数

**3 开机启动
**   chkconfig vncserver on

VNC viewer端：

IP:port  端口默认5901