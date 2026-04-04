---
title: 'hosts自动修改程序-GFW breaker'
description: '一直知道最简单的翻墙方式就是修改hosts，但总是担心可用的IP地址不知哪天又失效，还要换来换去麻烦的很，后来一度靠着免费的VPN和SSH账号度日。不过近几个月来天朝打击力度明显加大，几个存活很久的SSH账号都被搞掉，恰好看到一文介绍GFW breaker这么个自动更新hosts的工具，下来试用效果'
date: '2011-08-18'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'hosts-e8-87-aa-e5-8a-a8-e4-bf-ae-e6-94-b9-e7-a8-8b-e5-ba-8f-gfw-breaker'
---

一直知道最简单的翻墙方式就是修改hosts，但总是担心可用的IP地址不知哪天又失效，还要换来换去麻烦的很，后来一度靠着免费的VPN和SSH账号度日。不过近几个月来天朝打击力度明显加大，几个存活很久的SSH账号都被搞掉，恰好看到一文介绍GFW breaker这么个自动更新hosts的工具，下来试用效果不错，可以继续持有~

程序下载地址：http://u.115.com/file/bhd0vqnt
包括程序和已经生成好的hosts，方便Linux和Mac的用户）（江民、瑞星、金山会误报，其它杀软没问题，担心文件安全的可以下载下面的脚本程序
脚本版下载地址（共三个文件）：http://u.115.com/file/aq7a1lq4

WIN7下运行过程会出现找不到路径，这个是正常现象，Winxp没有这问题

正常运行的时候会生成两个文件，HTTP下载工具-wget.exe，hosts脚本-fgqi.bat
对文件安全有疑问的可以看最后的说明

功能：自动更新批处理脚本，用本机获取的Google北京服务器生成hosts的地址。
自动识别原hosts里面的地址，自动进行更新，不影响你添加的其它地址。

文件说明：
包含文件：wget.exe（因为自带没有http下载的工具，所以要捆绑这个下载小工具）
xiazai.bat （程序的代码包括运行wget下载新的脚本，运行脚本，以及最
后的删掉临时生成的文件，并退出）
fgqi.bat （会通过wget下载下来，里面包括自动更新hosts的脚本）
在线37个杀毒软件查杀结果：http://r.virscan.org/e659c2abd42b9144aedaf242bd168173
因为程序会下载一个脚本并运行，所以（江民、金山会误报说有木马下载代码，瑞星报是可以和程序，F-Prot报W32/Agent.JL.gen!Eldorado，其它33个杀软没问题）

我用程序版，XP系统，一切正常可用。用修改IP地址的最大好处就是解决不用浏览器用其它程序直接连接被墙网址的情况，当然也可用VPN，但还有个墙与不墙的识别问题，还是这样来得效率一些~
