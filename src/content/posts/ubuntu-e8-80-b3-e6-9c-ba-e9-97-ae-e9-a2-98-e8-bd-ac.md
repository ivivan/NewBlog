---
title: 'ubuntu 耳机问题 转'
description: '我的笔记本声卡AL880，音响是正常的，但是插上耳机之后耳机没声音（耳机是好的），而且音量控制里面没有headphone的选项。相信论坛上很多朋友都遇到了类似的问题。 我经过一番折腾，终于找到了解决的办法，如果想直接看方法，可以跳过前面直接看后面的 红字部分 按照这个帖子9楼的回复 引用: 我这有解'
date: '2009-02-24'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'ubuntu-e8-80-b3-e6-9c-ba-e9-97-ae-e9-a2-98-e8-bd-ac'
---

<div id="msgcns!1326AB98D6395CF4!248" class="bvMsg"> 我的笔记本声卡AL880，音响是正常的，但是插上耳机之后耳机没声音（耳机是好的），而且音量控制里面没有headphone的选项。相信论坛上很多朋友都遇到了类似的问题。

我经过一番折腾，终于找到了解决的办法，如果想直接看方法，可以跳过前面直接看后面的<span style="color:rgb(255,0,0);">红字部分</span>

按照这个帖子9楼的回复
[http://forum.ubuntu.org.cn/viewtopic.php?f=126&amp;t=163400](http://forum.ubuntu.org.cn/viewtopic.php?f=126&amp;t=163400)

<div>**引用:**</div><div>我这有解决方法 我也是这个问题 用这个方法解决了 你可以试试看：

打开/etc/modprobe.d目录，编辑下面的aliases文件，将上面以alias开头的行加入其中
代码:
# ALSA portion
alias char-major-116 snd
alias snd-card-0 snd-hda-intel
options snd-hda-intel model=z71v position_fix=1

# OSS/Free portion
alias char-major-14 soundcore
alias sound-slot-0 snd-card-0

# card #1
alias sound-service-0-0 snd-mixer-oss
alias sound-service-0-1 snd-seq-oss
alias sound-service-0-3 snd-pcm-oss
alias sound-service-0-8 snd-seq-oss
alias sound-service-0-12 snd-pcm-oss

然后重新启动，打开alsamixer看一下，应该有headphone这一项了。
</div>

照着这个做，耳机有声音了，而且选项卡里有headphone的选项了。但是有一个问题就是启动的时候要读一大堆东西，而且非常非常慢……

后来经过一番google，终于找到更详细的解决方法。帖子在这里：
[http://www.blog.edu.cn/user3/HareCat/archives/2006/1532728.shtml](http://www.blog.edu.cn/user3/HareCat/archives/2006/1532728.shtml)

<div>**引用:**</div><div>参考http://www.fedoraforum.org/forum/showthread.php?t=109654

我
的ASUS A6000V上用的是这一款声卡，在安装linux的过程中，内核会将其自动识别为Intel HD
Audio，安装之后，出现的问题是外放能出声，但插上耳机却没有声音，在音量调节中（不管是alsa
mixer还是gmixer还是kmix其它的）也没有Headphone这一项。

如果你的/etc/目录下有modprobe.conf或者modules.conf或者conf.modules，那么只要将其中有关声卡的部分用#注释掉，然后加入以下内容：

# ALSA portion
alias char-major-116 snd
alias snd-card-0 snd-hda-intel
options snd-hda-intel model=z71v position_fix=1

# OSS/Free portion
alias char-major-14 soundcore
alias sound-slot-0 snd-card-0

# card #1
alias sound-service-0-0 snd-mixer-oss
alias sound-service-0-1 snd-seq-oss
alias sound-service-0-3 snd-pcm-oss
alias sound-service-0-8 snd-seq-oss
alias sound-service-0-12 snd-pcm-oss

然后重新启动，打开alsamixer看一下，应该有headphone这一项了。

如果你用的是Ubuntu，在/etc/目录下找不到那些文件，这时候需要打开/etc/modprobe.d目录，编辑下面的aliases文件，将上面以alias开头的行加入其中，同时将
       options snd-hda-intel model=z71v position_fix=1
加到/etc/modprobe.d/options里，然后重启，这样耳机应该能够使用了。</div>

<span style="color:rgb(255,0,0);">下面是我总结的ubuntu8.04里笔记本音响正常，耳机没声音的解决办法。

1.运行
<div>**代码:**</div><div>sudo gedit /etc/modprobe.d/aliases</div>
把# character devices 那部分下面的以alias char-major开头的每一行都用＃注释掉。然后在后面加入下面的代码，最后保存。
# ALSA portion
alias char-major-116 snd
alias snd-card-0 snd-hda-intel
options snd-hda-intel model=z71v position_fix=1

# OSS/Free portion
alias char-major-14 soundcore
alias sound-slot-0 snd-card-0

# card #1
alias sound-service-0-0 snd-mixer-oss
alias sound-service-0-1 snd-seq-oss
alias sound-service-0-3 snd-pcm-oss
alias sound-service-0-8 snd-seq-oss
alias sound-service-0-12 snd-pcm-oss

基本上做完这个就算是完成了，但是这样的话启动的时候会非常之慢，而且在你调出音量控制器，以及用mplayer打开视频文件的时候，也要有一个比较长的读取过程。所以，为了优化速度，可以做第2步。

2.运行
<div>**代码:**</div><div>sudo gedit /etc/modprobe.d/options</div>
在其中加入
options snd-hda-intel model=z71v position_fix=1
保存，退出。

这样，就成功的解决了笔记本在ubuntu8.04下（估计8.10方法类似）耳机不出声的问题了。</span>

我之所以在前面引用那么多别人的方法主要是尊重别人的劳动成果，别嫌我罗嗦阿，呵呵。

另外，小提示，用mplayer看电影的时候，如果没有声音，只要在preferences里audio选项里选择oss或alsa，选应用，就会有声音</div>
