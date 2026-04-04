---
title: 'wallproxy,填补IE系列上网空白'
description: '回家来用自己的老本，chrome实在是带不动，512的小内存和没有一样，无奈只得转用ie8，别的都还可以忍受，不过IE没有插件系统真是让人生气，SSH方法用不上，VPN我又不太喜欢，找了找，发现有个GAE的wallproxy可以，装上一试，还可以 方法： 1\. 同理一个GAE程序，建好应用后，去h'
date: '2011-01-31'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'wallproxy-e5-a1-ab-e8-a1-a5ie-e7-b3-bb-e5-88-97-e4-b8-8a-e7-bd-91-e7-a9-ba-e7-99-bd'
---

回家来用自己的老本，chrome实在是带不动，512的小内存和没有一样，无奈只得转用ie8，别的都还可以忍受，不过IE没有插件系统真是让人生气，SSH方法用不上，VPN我又不太喜欢，找了找，发现有个GAE的wallproxy可以，装上一试，还可以
方法：
1\. 同理一个GAE程序，建好应用后，去http://code.google.com/p/wallproxy/ 下载代码包
2\. 修改gae_server中的app.yaml，把应用名换一下
3\. 把gae_server包上传
4\. 修改本地，这里有个local文件夹，可以修改里面，也可以从外面一个窗口显示的界面进行
5\. 用界面修改，返回上级文件夹，点开wallproxy.exe，点设置如图：
[![](http://ivanbuaa.files.wordpress.com/2011/02/16.jpg "16")](http://ivanbuaa.files.wordpress.com/2011/02/16.jpg)
将图上标注的第一个红框修改成自己的GAE地址如“http://xxxx.appspot.com/fetch.php“ 并注意把autoproxylist=这行前的#号打掉
6\. 鼠标右击IE属性—Internet选项—连接—局域网设置（拨号选拨号右面的属性）—127.0.0.1：8086

用了一阵还可以，就是不知自动判断的那个规则表管用了没有，如果能管用，那这个方式还是不错，至少IE用户临时可以应应急了。听说GAE的月流量是1G，以我当年3G上网卡一月3G流量用不了半个月来看，用这个东西也就看看文字了，视频还是悠着点，下载就算了
