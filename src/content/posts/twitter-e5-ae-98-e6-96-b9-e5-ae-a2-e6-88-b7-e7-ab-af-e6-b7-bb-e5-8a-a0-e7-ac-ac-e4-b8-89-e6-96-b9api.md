---
title: 'twitter官方客户端添加第三方API'
description: 'g1用了半年，终于干了第一件不不劳而获的事情，用自已珍藏的一个速度不错的第三方api修改了官方twitter,成功的取代twitteroid成为我现在的首选，现把过程记录如下，基本转载： 安装 1.先装JAVA环境，JDK/JRE都行， 装过的就跳过吧 2.下载apktool.jar及相关文件，这里'
date: '2010-05-16'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'twitter-e5-ae-98-e6-96-b9-e5-ae-a2-e6-88-b7-e7-ab-af-e6-b7-bb-e5-8a-a0-e7-ac-ac-e4-b8-89-e6-96-b9api'
---

<div id="msgcns!1326AB98D6395CF4!1749" class="bvMsg">

g1用了半年，终于干了第一件不不劳而获的事情，用自已珍藏的一个速度不错的第三方api修改了官方twitter,成功的取代twitteroid成为我现在的首选，现把过程记录如下，基本转载：

### 安装

1.先装JAVA环境，JDK/JRE都行，[官网下载](http://java.sun.com/javase/downloads/index.jsp) 装过的就跳过吧 <p>2.下载apktool.jar及相关文件，这里下[apktool-1.0.0.tar.bz2 ](http://android-apktool.googlecode.com/files/apktool-1.0.0.tar.bz2)和[apktool-install-windows-2.1_r01-1.zip](http://android-apktool.googlecode.com/files/apktool-install-windows-2.1_r01-1.zip) <p>3.解压apktool.jar到 C:Windows 解压apktool-install-windows.zip到任意文件夹(例如D盘根目录) <p>4.Win+R 运行CMD，用cd命令转到apktool-install-windows所在文件夹，输入apktool看看。会列出一些帮助的话就成功了。 

### 反编译Twitter客户端
 <p>运行CMD ,转入apktool文件夹运行（我的是D:apktool） <p>下载官方twitter的客户端 [下载地址](http://u.115.com/file/f3c1d017ba) > <p>进入D:apktool&gt;              输入 apktool d twitter.apk twitter 

打开[notepad++ ](http://sourceforge.net/projects/notepad-plus/)按CTRL+F 选择文件查找选项卡 <p>选择目录 d:apktoolapktooltwittersmali <p>替换[http://twitter.com/](http://twitter.com/)为 api的地址 (例如:[https://gtapserver1.appspot.com/)](https://gtapserver1.appspot.com/) <p>替换[http://api.twitter.com/](http://api.twitter.com/)为 api的地址/api/ (例如:[https://gtapserver1.appspot.com/api/)](https://gtapserver1.appspot.com/) <p>替换[http://search.twitter.com/](http://search.twitter.com/)为 api的地址/search/ (例如:[https://gtapserver1.appspot.com/](https://gtapserver1.appspot.com/)[search](http://yourid.appspot.com/search/)[/)](https://gtapserver1.appspot.com/) <p>替换[http://www.twitter.com/](http:///)为 api的地址 (例如:[https://gtapserver1.appspot.com/)](https://gtapserver1.appspot.com/)) <p>[![image](http://ivanbuaa.files.wordpress.com/2010/05/image_thumb5b105d.png?w=244 "image")](https://bylmgg.bay.livefilestore.com/y1mOo1c_i-NsITLMsmTs1-IvKStR75Dufpy0q-xjEMHt-XcupNZb0m7uylOpw7Au5zvC5fbtCBPMC8aA1GlKqKpLRrFA7hEqTZj696I--or2RbIuoBi753w6bVEhKZFA8S09qsxHTFR1RQ7HzZh_UFKgw/image[14].png)  <p>

替换后会自动保存，直接退出notepad++

CMD运行   apktool b twitter    生成的文件在D:apktooltwitterdist下 

### 签名
 <p>1.把修改后的APK包重命名为 unsigned.apk 放到Auto-Sign目录下 [下载 Auto-Sign](http://lvwind.net/wp-content/uploads/2010/01/Auto-sign.rar)（需要java环境） <p>auto-sian目录随意 <p>2.运行sign.bat签名，在同目录生成signed.apk，这就是签名后的 APK包 <p>搞定
  </p></p></div>
