---
title: ubuntu ant 安装
tags:
  - apache ant
id: 2588
categories:
  - 国境以南
  - 工作相关
date: 2013-08-27 16:44:36
---

手动安装

1.  到Apache官网下载最新版本的ant：http://ant.apache.org/bindownload.cgi
2.  解压下载下来的`.tar.gz文件： tar -xvf apache-ant-1.9.2-bin.tar.gz`

`  3.将解压出来的文件移动到/usr/下：sudo mv apache-ant-1.9.2 /usr`

`  4.配置环境变量：sudo gedit /etc/profile，在原来基础上添加以下蓝体字：`

export ANT_HOME=/opt/apache-ant-1.8.2
export PATH=$JAVA_HOME/bin:$PATH:$ANT_HOME/bin

5.验证是否安装成功： ant -version