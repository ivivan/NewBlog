---
title: 'ubuntu影音设置'
description: '这几天终于搞定了ubuntu的影音播放问题，格式基本上我平常用得着的都支持的差不多了.......... 视频方面：装了mplayer和smplayer 软件本身装都很方便，主要就是要另装一解码包w32codecs来支持rmvb，avi等等常用格式；主要麻烦的地方在于部分视频字幕的设置，需要手动关联'
date: '2009-02-26'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'ubuntu-e5-bd-b1-e9-9f-b3-e8-ae-be-e7-bd-ae'
---

<div id="msgcns!1326AB98D6395CF4!249" class="bvMsg"> 这几天终于搞定了ubuntu的影音播放问题，格式基本上我平常用得着的都支持的差不多了..........

视频方面：装了mplayer和smplayer
软件本身装都很方便，主要就是要另装一解码包w32codecs来支持rmvb，avi等等常用格式；主要麻烦的地方在于部分视频字幕的设置，需要手动关联一下简体字库，要不然就会出现乱码情况，总的感觉smplayer做为前台用起来比直接用mplayer要方便一些，更接近于win的习惯，而且smplayer的记忆播放位置功能我感觉很不错。
音频方面：用的Rhythmbox
软件本身自带，但要想正常使用还得装不少附加产品。要支持mp3需要sudo apt-get install gstreamer0.10-*plugins-ugly
要支持wma需要sudo apt-get install gstreamer0.10-ffmpeg
主要麻烦在于对乱码的解决，步骤如下：转
<p>首先，需要有软件包mid3iconv。
<p>可以通过如下代码自动安装：
sudo apt-get install python-mutagen 　　
然后转到你的MP3目录，执行以全命令进行转换：
mid3iconv -e GBK *.mp3 　　
如果需要包含子目录，可以将后缀改成如下格式：
mid3iconv -e GBK */*.mp3 
最后，重新导入一次rhythmbox就OK了
解决Rhythmbox乱码 
<p>子目录可同理包含多层

</div>
