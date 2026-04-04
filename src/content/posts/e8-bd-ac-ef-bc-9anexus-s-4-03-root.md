---
title: '转：NEXUS S 4.03 Root'
description: '用了好久原生4.03，今天闲来无事，还是给Root了一下，虽然感觉一时半会也没这需求 一切从原生4.03未做任何改动的状态开始 1. 准备工作 手机中主屏幕下，按菜单键—系统设置—开发人员选项—USB调试（打上勾） 安装好手机的USB驱动 可用此链接下载 http://u.115.com/file/'
date: '2012-01-30'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'e8-bd-ac-ef-bc-9anexus-s-4-03-root'
---

用了好久原生4.03，今天闲来无事，还是给Root了一下，虽然感觉一时半会也没这需求

一切从原生4.03未做任何改动的状态开始

1.  准备工作

手机中主屏幕下，按菜单键—系统设置—开发人员选项—USB调试（打上勾）

安装好手机的USB驱动 可用此链接下载 http://u.115.com/file/f78e5fc265#Nexus_S_Drivers_x86_&amp;_x64.rar

下载调试工具（NexusS.zip）看此贴 http://goo.gl/hAxvy 以下一切下载链接均可在此贴找到

2. 解锁_bootloader_

**电脑上：**
1.XP系统：开始——运行——cmd回车
win7系统：开始——直接键入cmd回车
这个时候应该弹出了命令行的窗口。
2.以“D:\temp\NexusS\”为例，进入该路径。不会的，按照如下输入：

<div>
<div id="code0">

1.  d:
2.  cd temp\NexusS
</div>
_复制代码_</div>

3.输入：

<div>
<div id="code1">

1.  reboot-bootloader.bat
</div>
_复制代码_</div>

手机会重启进入BOOTLOADER
4.输入：

<div>
<div id="code2">

1.  fastboot-windows.exe devices
</div>
_复制代码_</div>

确保你的机器连接正确
![](http://attachments.gfan.com/day_110904/1109041208f7365d4f021e7923.jpg)
5.运行

<div>
<div id="code3">

1.  oem unlock.bat
</div>
_复制代码_</div>

即可解锁BOOTLOADER。

**手机上：**
6.通过音量按键“+”将光标移到“yes,unlock bootloader”
7.按住电源键确认
8.手机重启，至此BOOTLOADER解锁完毕。

其中问题，在第五小步我出现了不是内部或外部命令的问题，解决方法没网上这么麻烦，直接打开我的电脑找到oem unlock.bat双击运行即可，也就是不用命令行

在进行下一步之前重起手机，进入之后系统已还原为出厂设置，误忘再调下USB调式选项，另以下附件可以去官网下载最新版

<span style="font-size:large;"><span style="color:blue;">三、通过_bootloader_安装_第三方recovery_，即_ClockWorkMod 5.0.2.3_</span></span>
**电脑上：**
1.将附件su-bin-3.0.3.2-efghi-signed.zip和Superuser-3.0.7-efghi-signed.zip这两个文件通过USB储存直接拷到手机里。
_*这两个附件亦可到官方网站获取最新版本：[http://androidsu.com/superuser/](http://androidsu.com/superuser/) 注意找到与自己手机系统版本号对应的正确版本下载。_
2.在命令行（注意路径应该仍是“D:\temp\NexusS\”）运行

<div>
<div id="code4">

1.  reboot-bootloader.bat
</div>
_复制代码_</div>

手机会重启进入BOOTLOADER
3.在命令行输入：

<div>
<div id="code5">

1.  fastboot-windows.exe devices
</div>
_复制代码_</div>

确保你的机器连接正确。
4.此步将刷入第三方RECOVERY：运行

<div>
<div id="code6">

1.  install-recovery-windows.bat
</div>
_复制代码_</div>

完了以后<span style="color:red;">不要</span>重启手机，否则这步就白做了。
至此完成第三方RECOVERY的刷入。

_*注：ClockWorkMod亦可到官方网站获取最新版本：[http://www.clockworkmod.com/rommanager](http://www.clockworkmod.com/rommanager) 请找到机型后点击“download recovery”下面的链接下载。
将下载得到的文件重命名为“recovery.img”并覆盖调试工具文件夹里的同名文件即可完成替换。_

<span style="font-size:large;"><span style="color:blue;">四、通过_ClockWorkMod 5.0.2.3_刷入root权限。</span></span>
**手机上：**
1.通过音量键移动光标、电源键执行，进入RECOVERY。手机会黑屏，然后显示google和解开的锁画面，然后进入recovery。
应该是一个黑底、天蓝字的菜单。
2.同样通过音量键移动光标、电源键执行，选择
- install zip from sdcard
- choose zip from sdcard
找到你放的两个附件（<span style="color:red;">注意次序不能刷反</span>）：
- Superuser-3.0.7-efghi-signed.zip
- Yes - Install Superuser-3.0.7-efghi-signed.zip
然后继续，
- choose zip from sdcard
- su-bin-3.0.3.2-efghi-signed.zip
- Yes - Install su-bin-3.0.3.2-efghi-signed.zip
然后修正权限：
- +++++Go Back+++++
- advanced
- Fix Permissions
这时候Recovery会在最下面用灰色字提示“Fixing permissions”。这一步可能会花上两三分钟时间，请耐心等待。
完成了之后：
- +++++Go Back+++++
- reboot system now
然后手机会自动重启。然后……然后大功告成。

重起后进入官方市场，下载Busybox， [https://market.android.com/details?id=stericson.busybox](https://market.android.com/details?id=stericson.busybox)

另，系统重启之后刷好的recovery就会自动回复原生，解决方法如下

因为原生系统每次开机都会自动检测Recovery，如果发现被更改，会运行/etc/install-recovery.sh，将其还原。
那我们要做的就很简单了，直接删除这个文件，或者重命名，以备后用。用R.E管理器找到此文件改个名即可
