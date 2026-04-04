---
title: 记住记住
id: 113
categories:
  - 工作相关
date: 2009-09-23 11:17:11
tags:
---

<div id="msgcns!1326AB98D6395CF4!1255" class="bvMsg"><span style="border-collapse:collapse;color:rgb(68,68,68);font-family:Verdana, Helvetica, Arial, sans-serif;font-size:14px;line-height:22px;"><font color="#ff0000">su 
#cp -a /data/**app** /system/**sd**/                复制**手机中/DATA/APP里的**软件到SD卡 
#rm -r /data/**app                                    删除手机中/DATA/APP<span style="word-wrap:break-word;line-height:normal;cursor:pointer;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgb(255,0,0);white-space:nowrap;">文件</span>夹**</font> 
<font color="#ff0000">#ln -s /system/**sd**/**app** /data/**app           在手机的/DATA/APP中创建软连接指向/SYSTEM/SD/APP** 
#reboot                                                  重启手机</font> </span> </div>