---
title: 'nmon 工具使用'
description: 'nmon 工具使用 一、下载 nmon下载地址：http://www 941.haw.ibm.com/collaboration/wiki/display/WikiPtype/nmon nmon还带了个分析工具，下载地址：http://www 941.haw.ibm.com/collaboratio'
date: '2015-11-11'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'nmon-e5-b7-a5-e5-85-b7-e4-bd-bf-e7-94-a8'
---

nmon 工具使用

一、下载
nmon下载地址：http://www-941.haw.ibm.com/collaboration/wiki/display/WikiPtype/nmon
nmon还带了个分析工具，下载地址：http://www-941.haw.ibm.com/collaboration/wiki/display/Wikiptype/nmonanalyser
二、安装
下载完成后，把压缩包解压，上传到服务器的任意目录，如/usr/local/nmon

三、启动
打开nmon所在的目录：cd /usr/local/nmon
修改启动文件的访问权限：chmod 755 nmon_x86_rhel52
启动nmon：./nmon_x86_rhel52
如果要采样nmon的数据保存成文件，可以
./nmon_x86_rhel52 -fT -s 30 -c 120
其中30表示每隔30秒nmon取一次系统性能数据，120表示取120次；
这样nmon将会在运行开始算起连续取得30sX120=60分钟，可根据实际需要时间调整；当运行以上命令后该目录下会生成一个.nmon文件，该文件会根据间隔时间被写入性能数据，当一段时间后再查看该文件，文件字节变大

利用nmonanalyser分析.nmon文件
当测试结束的同时ftp到服务器上将.nmon文件get下来，
打开nmon_analyser.zip 包下的nmon analyser v338.xls 文件，点击Analyse nomn data按钮，选择之前get来下的.nmon文件。
（如果报告以下宏的安全级别太高错误，则在“工具 -- 宏 --安全性”里把级别调低，然后重新打开 nmon analyser v338.xls 文件）
待分析结束后会生成性能分析结果文件（文件格式为.xls，其中包括CPU,IO,内存等性能分析报告）。
五、nmon运行本身就消耗系统资源的；
另外如果取到.nmon文件后确定不再需要nmon继续收集信息则应kill掉nmon；
命令：

ps -A | grep nmon #得到pid

kill -9 pid
采集数据并生成报表：
采集数据:
nmon -s10 -c60 -f -m /home/

参数解释：
-s10 每 10 秒采集一次数据。
-c60 采集 60 次，即为采集十分钟的数据。
-f 生成的数据文件名中包含文件创建的时间。
-m 生成的数据文件的存放目录。

这样就会生成一个 nmon 文件，并每十秒更新一次，直到十分钟后。
生成的文件名如： hostname_090824_1306.nmon ，"hostname" 是这台主机的主机名。

生成报表：
下载 nmon analyser （生成性能报告的免费工具）：
http://www.ibm.com/developerworks/wikis/display/Wikiptype/nmonanalyser

把之前生成的 nmon 数据文件传到 Windows 机器上，用 Excel 打开分析工具 nmon analyser v33C.xls 。点击 Excel 文件中的 "Analyze nmon data" 按钮，选择 nmon 数据文件，这样就会生成一个分析后的结果文件： hostname_090824_1306.nmon.xls ，用 Excel 打开生成的文件就可以看到结果了。

如果宏不能运行，需要做以下操作：
工具 -&gt; 宏 -&gt; 安全性 -&gt; 中，然后再打开文件并允许运行宏。

自动按天采集数据：
在 crontab 中增加一条记录：
0 0 * * * root nmon -s300 -c288 -f -m /home/ &gt; /dev/null 2&gt;&amp;1

300*288=86400 秒，正好是一天的数据。
