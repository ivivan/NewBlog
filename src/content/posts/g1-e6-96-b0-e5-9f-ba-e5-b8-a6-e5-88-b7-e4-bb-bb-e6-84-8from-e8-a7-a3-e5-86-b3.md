---
title: 'G1新基带刷任意rom解决'
description: '新基带出了很久，众说纷云，一直在用2.1观望。前几日实在无聊，把hboot和radio都刷到最新，加上阿兴的2.2rom，久违的流畅感觉又回来了。刷机是个持续的过程，最近看到有新的2.2版本，想刷，发现和新基带不兼容。好像很多rom都会有这问题，搜索一下，解决如下： 1\. 打开/META INF/'
date: '2011-02-17'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'g1-e6-96-b0-e5-9f-ba-e5-b8-a6-e5-88-b7-e4-bb-bb-e6-84-8from-e8-a7-a3-e5-86-b3'
---

新基带出了很久，众说纷云，一直在用2.1观望。前几日实在无聊，把hboot和radio都刷到最新，加上阿兴的2.2rom，久违的流畅感觉又回来了。刷机是个持续的过程，最近看到有新的2.2版本，想刷，发现和新基带不兼容。好像很多rom都会有这问题，搜索一下，解决如下：
1\. 打开/META-INF/com/google/andrond目录编辑updater-script文件，找到getprop(“ro.bootloader”) == “1.33.0013″改成getprop(“ro.bootloader”) == “1.33.0013d”保存并且更新到ROM中
2\. 使用自动签名软件把修改后的ROM进行签名：
3\. 刷完ROM先别重启直接刷防重启补丁
步骤很简单，注意如下：
1\. 修改时我起初用rar先解，再修改，再打包zip，试了几次不成功。7zip有个直接修改压缩包的功能，经试验可以解决
2\. 自动签名以前用过一次是个命令行软件，现在有高手制作了个界面版，还有防重起补丁，找起来也比较麻烦，可从此教程贴下载http://bbs.nduoa.com/android_gphone_thread-27633-1-1.html
