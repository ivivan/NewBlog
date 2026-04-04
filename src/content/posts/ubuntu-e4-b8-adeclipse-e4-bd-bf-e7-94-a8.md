---
title: 'ubuntu中eclipse使用'
description: '经过一番周折，终于把eclipse装好，总结如下： ubuntu源中自带的eclipse不能用，不但版本比较低是3.2，而且关键是那个eclipse自带gcj虚拟机，不用sun的，很是麻烦 自下一个3.4免安装版解压就好了，sudo gedit /etc/jvm 看一下里面的虚拟机指向，/usr/l'
date: '2009-03-01'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'ubuntu-e4-b8-adeclipse-e4-bd-bf-e7-94-a8'
---

<div id="msgcns!1326AB98D6395CF4!254" class="bvMsg"> 经过一番周折，终于把eclipse装好，总结如下：
ubuntu源中自带的eclipse不能用，不但版本比较低是3.2，而且关键是那个eclipse自带gcj虚拟机，不用sun的，很是麻烦
自下一个3.4免安装版解压就好了，sudo gedit /etc/jvm 看一下里面的虚拟机指向，/usr/lib/jvm/java-6-sun 是这个就对了
同时我们要注意几个宏定义：

JAVA_HOME、CLASSPATH、JRE_HOME、

这里没有设置这几个变量也成功了，但是后面如果安装别的软件有问题，回头设置一下下面这些变量：

JAVA_HOME=/usr/lib/jvm/java-6-sun

CLASSPATH=.:/usr/lib/jvm/java-6-sun/lib

JRE_HOME=/usr/lib/jvm/java-6-sun/jre

至此，虚拟机安装配置完全正常了，可以通过

java -version查看java虚拟机的版本
</div>
