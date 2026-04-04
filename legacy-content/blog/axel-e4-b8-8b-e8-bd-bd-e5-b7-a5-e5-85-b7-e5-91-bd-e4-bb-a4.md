---
title: axel下载工具命令
id: 73
categories:
  - 工作相关
date: 2010-04-12 13:33:08
tags:
---

<div id="msgcns!1326AB98D6395CF4!1738" class="bvMsg">ubuntu下命令行式的下载工具，据说有第三方的界面，没仔细去搜，还是用命令行比较有感觉<div>
</div><div>常用参数和命令如下：</div><div><span style="color:rgb(51,51,51);font-family:Arial;font-size:14px;">首先安装axel： 
sudo apt-get install axel </span></div><div><span style="color:rgb(51,51,51);font-family:Arial;font-size:14px;">
</span></div><div><span style="color:rgb(51,51,51);font-family:Arial;font-size:14px;"><span style="color:rgb(10,20,20);font-family:宋体;font-size:12px;line-height:16px;">

#axel [选项] [下载目录] [下载地址]

<div align="left" style="font-family:宋体;border-color:initial;border-style:initial;border-width:0;margin:0;padding:0;"><table cellspacing="0" cellpadding="2" width="400" align="left" border="1" style="font-family:宋体;border-color:initial;border-style:initial;border-width:0;margin:0;padding:0;"><tbody><tr style="font-family:宋体;border-color:initial;border-style:initial;border-width:0;margin:0;padding:0;"><td bgcolor="#e6e6e6" style="font-family:宋体;border-color:initial;border-style:initial;border-width:0;margin:0;padding:0;">

-s [x]：指定每秒下载最大比特数。
n [x]：指定同时打开的线程数。
-o f：指定本地输出文件。
-S [x]：搜索镜像并从X servers服务器下载。
-N：不使用代理服务器。
-v：打印更多状态信息。
-a：打印进度信息。
-h：该版本命令帮助。
-V：查看版本信息号

<span style="line-height:16px;font-size:12px;color:rgb(10,20,20);"><p align="left" style="font-family:宋体;font-size:14px;line-height:21px;border-color:initial;border-style:initial;border-width:0;margin:0;padding:0;">一个典型下载如下：
<div align="left" style="font-family:宋体;border-color:initial;border-style:initial;border-width:0;margin:0;padding:0;"><table cellspacing="0" cellpadding="2" width="400" align="left" border="1" style="font-family:宋体;border-color:initial;border-style:initial;border-width:0;margin:0;padding:0;"><tbody><tr style="font-family:宋体;border-color:initial;border-style:initial;border-width:0;margin:0;padding:0;"><td bgcolor="#e6e6e6" style="font-family:宋体;border-color:initial;border-style:initial;border-width:0;margin:0;padding:0;">

# axel -n 10 -o /home/zm/  http://lab.sa.bupt.cn/ewebeditor/UploadFile/ 
200752117642450.doc
</td></tr></tbody></table></div>

用10线程将指定路径的文件下载到/home/zm目录下。

<span style="color:rgb(51,51,51);font-family:Arial;line-height:20px;"><p style="line-height:normal;">当然，如果你厌倦每次都输入存放目录，也可以“修改”默认存放目录， 这里可以用到alias命令，

_**alias axel='axel -o /home/nakwan/Downloads/'**_

下次再下载的时候&quot;axel&quot;就代替来长长的&quot;axel -o /home/nakwan/Downloads/&quot;，

_gedit /home/nakwan/.bashrc _把上面这条命令添加进去就可以永久保存了。
</span></p></span></p></td></tr></tbody></table></div></span></span></div></div>