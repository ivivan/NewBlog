---
title: 'Surge+Shadowsocks+DigitalOcean'
description: '没想到目前买的最贵的软件竟然会是Surge, 虽然目前根本用不到，不过感觉这功能太强大了，不买真是不行。 然后提前搭了一个SS proxy，准备以后回国用。 Ubuntu环境 安装： apt get update apt get install python pip pip install shad'
date: '2015-11-05'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'surgeshadowsocksdigitalocean'
---

没想到目前买的最贵的软件竟然会是Surge, 虽然目前根本用不到，不过感觉这功能太强大了，不买真是不行。
然后提前搭了一个SS proxy，准备以后回国用。

* * *

Ubuntu环境

安装：

*   apt-get update
*   apt-get install python-pip
*   pip install shadowsocks

建一个配置文件
[参考链接](https://github.com/shadowsocks/shadowsocks/wiki/Configuration-via-Config-File)

[多文件配置参考](https://github.com/shadowsocks/shadowsocks/wiki/Configure-Multiple-Users)

* * *

Surge端

下载这个配置模板 [链接](http://d.pr/f/1idn6)

导入以后修改proxy部分

Proxy = custom,ip address,port,aes-256-cfb,password,[http://proxy.sofi.sh/SSEncrypt.module](http://proxy.sofi.sh/SSEncrypt.module)

选中，自动下载external module, start
