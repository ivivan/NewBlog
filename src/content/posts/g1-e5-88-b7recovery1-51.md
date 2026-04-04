---
title: 'g1刷recovery1.51'
description: '在此保存有关recovery1.51介绍及相关刷法 【 v1.5.1 版更新及特性】 full ADB access in recovery mode ADB完全访问刷机模式 Busybox v1.15.2 （生成命令工具） HW Key navigation (volume keys + CALL'
date: '2010-01-15'
readTime: '4 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'g1-e5-88-b7recovery1-51'
---

<div id="msgcns!1326AB98D6395CF4!1665" class="bvMsg"> 在此保存有关recovery1.51介绍及相关刷法<div>
</div><div><span style="border-collapse:collapse;font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:25px;">

**【<font color="#ff0000">v1.5.1</font>版更新及特性】**

full ADB access in recovery mode **ADB完全访问刷机模式
**Busybox v1.15.2 （生成命令工具）
HW-Key navigation (volume keys + CALL-ANSWER) option** 硬件导航 选项（音量键+应答键）**
**Extended menu :扩展菜单
**　　Reboot system now :: reboot your phone **重启手机**
　　USB-MS Toggle :: enable/disable USB mass storage (use when the phone is connected to your PC) 
　　　　　　　　　　**启动和禁止USB数据连接，读写SD卡。（使用时需要把手机连接到电脑上）**
　　**Backup/Restore (recovery partition not included!)备份和恢复
**　　　　Nand backup :: Make a Nand backup **备份系统**
　　　　Nand + ext backup :: Make a Nand + ext backup **备份系统和Ext分区**
　　　　Nand restore :: Restore a Nand backup **还原一个备份
**　　　　BART backup :: Make a BART backup (Nand + ext) **BART备份（系统和Ext分区）**
　　　　BART restore :: Restore latest BART backup **还原最近的BART备份
**　　Flash zip from sdcard :: Flash a zip update file from your sdcard **进入SD卡选择一个zip刷机文件**
　　**Wipe 擦除
**　　　　Wipe data/factory reset :: Wipe /data and /cache **擦除内存和缓存数据**
　　　　Wipe Dalvik-cache :: Wipe Dalvik-cache both on /data and ext **擦除缓存和Ext数据**
　　　　Wipe SD:ext partition : Wipe the ext partition on your sdcard **擦除Ext分区
**　　　　Wipe battery stats : Wipe the battery stats in /data **擦除电池数据
**　　　　Wipe rotate settings : Wipe the sensor settings in /data **擦除传感器数据
**　　**Partition sdcard 为SD卡分区**
　　　　Partition SD :: Interactive SD partitioning **自动为SD卡分区
**　　　　Repair SD:ext :: Repair the ext partition **修复Ext分区
**　　　　SD:ext2 to ext3 :: Convert ext2 to ext3 **转换Ext2为Ext3
**　　　　SD:ext3 to ext4 :: Convert ext3 to ext4 **转换Ext3为Ext4 (SD 6Class以下不建议使用)
**　　**Other 其他**
　　　　Fix apk uid mismatches :: Does extacly that **修复APK程序**
　　　　Move apps+dalv to SD :: Moves all apps and Dalvik-cache to sdcard (This will NOT enable apps2sd!) 
　　　　　　　　　　　　　　　　**移动程序和虚拟缓存到SD卡（不是APPS2SD）**
　　　　Move recovery.log to SD :: Moves the recovery log file to your sdcard. (Use when you want more detailed recovery log information) **移动刷机日志文件到SD卡（需要详细的刷机数据使用）
s available via adb : 通过adb命令可用脚本
**　　Nandroid v2.2.1 : enter &quot;nandroid-mobile.sh&quot; to start. **输入“nandroid-mobile.sh”命令开始**
　　BART v1.0.1 (Backup and Restore Tool) : enter &quot;utility&quot; to start.** 输入“utility”命令开始**
　　switchrom.sh V1.1 : enter &quot;switchrom&quot; or &quot;u&quot; to start.**输入“switchrom”或“u”命令开始
**　　sdparted v0.6 : enter &quot;sdparted&quot; to start.**输入“sdparted”命令开始**

**
**

**<span style="font-family:Tahoma, Verdana, Helvetica, Arial, sans-serif;font-weight:normal;color:rgb(68,68,68);line-height:22px;"><font size="2">备份/恢复：
</font>
<font size="2">备份功能还是比较全面的。</font>
<font size="2">提供两种备份方式。一个是Nand备份，一个是Bart备份。</font><font size="2">Bart备份默认只能留下最后一次备份存到SD卡中。</font><font size="2">可以完全备份个人数据。总之，就是你手机里有什么，备份恢复后，得到的完全一样，让你手机完全回到备份时的样子。</font><font size="2">
</font>
<font size="2">而另一种Nand备份，系统是完全能够备份的，但它有个特别之处就是能够多次备份。在恢复选项里面，可以选择你之前的备份。系统默认是以备份<span style="word-wrap:break-word;line-height:normal;cursor:pointer;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgb(255,0,0);white-space:nowrap;">时间</span>作为文件名的（年月日时分秒）。另外这个还可以不含recovery恢复。</font></span>**

**<span style="font-family:Tahoma, Verdana, Helvetica, Arial, sans-serif;font-weight:normal;color:rgb(68,68,68);line-height:22px;"><font size="2">
</font></span>**

**<span style="font-family:Tahoma, Verdana, Helvetica, Arial, sans-serif;font-weight:normal;color:rgb(68,68,68);line-height:22px;"><font size="2"><span style="font-size:14px;line-height:22px;"><font size="2">7，其它功能：
</font><font size="2">这部分功能主要是移动手机<span style="word-wrap:break-word;line-height:normal;cursor:pointer;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgb(255,0,0);white-space:nowrap;">软件</span>数据至SD分区。这个功能主要是给刚刚进行SD分区的人，这时你的软件还在手机里，SD卡分好区但里面是空的，这时你需要转移手机数据到SD卡分区，即可使用此功能。</font></span></font></span>**

**<span style="font-family:Tahoma, Verdana, Helvetica, Arial, sans-serif;font-weight:normal;color:rgb(68,68,68);line-height:22px;"><font size="2"><span style="font-size:14px;line-height:22px;"><font size="2">刷机方法：</font></span></font></span>**

<font color="#444444" face="Tahoma, Verdana, Helvetica, Arial, sans-serif"><span style="line-height:normal;font-size:small;">1.电脑端：</span></font>

<font color="#444444" face="Tahoma, Verdana, Helvetica, Arial, sans-serif"><span style="line-height:normal;font-size:small;"><span style="font-size:14px;line-height:22px;"><span style="word-wrap:break-word;line-height:normal;cursor:pointer;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgb(255,0,0);white-space:nowrap;">下载</span>文件，放到SD卡内
在电脑上执行 运行- CMD -进入命令行<span style="word-wrap:break-word;line-height:normal;cursor:pointer;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgb(255,0,0);white-space:nowrap;">模式</span>：
执行：
adb shell
$su (not required if you have <span style="word-wrap:break-word;line-height:normal;cursor:pointer;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgb(255,0,0);white-space:nowrap;">root</span> already)
#mount -a
flash_image recovery /sdcard/文件名.im</span></span></font>

<font color="#444444" face="Tahoma, Verdana, Helvetica, Arial, sans-serif"><span style="line-height:22px;">2.手机端</span></font>

<font color="#444444" face="Tahoma, Verdana, Helvetica, Arial, sans-serif"><span style="line-height:22px;"><span style="color:rgb(0,0,0);font-family:Helvetica, Arial, sans-serif;line-height:25px;"></span></span></font>
<font color="#444444" face="Tahoma, Verdana, Helvetica, Arial, sans-serif">

把下载的**img**格式文件到SD卡中（为了操作简便把文件名改为<font color="#0033ff">151.img</font>），打开手机的【超级终端】。

输入命令如下：
<font color="#e6421a">su</font>【使用高级权限】
<font color="#e61a1a">flash_image recovery</font><font color="#dd2222"> /sdcard/</font><font color="#3c3cc4">**recovery-RA-dream-v1.5.1.img**</font>【刷新刷机模式】（注意要输入sdcard）
<font color="#000000">　　(**注**：flash_image[空格]recovery[空格]/sdcard/151.img)</font>
<font color="#ee1111">reboot recovery</font> 【重启 并 打开刷机模式】 (**注**：reboot[空格]recovery)   

另：g1打下划线为右alt+E
</font></span><font color="#444444" face="Tahoma, Verdana, Helvetica, Arial, sans-serif"></font></div></div>
