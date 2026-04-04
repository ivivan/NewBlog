---
title: '攻克HTC G7Desire，无痛root加完全root'
description: '一直不想对Desire下手，感觉有这么大的内存，就算垃圾进程多点也影响不大。无奈最近Google Map在天朝又间歇性的不给力，想改个hosts，发现需要权限，只好行动 还算一切顺利，中途有点教程外的小情况，用时一小时不到估计 无痛root： 准备工作： 1\. 没装官方的同步管理软件，不存在杀进程'
date: '2011-01-13'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'e6-94-bb-e5-85-8bhtc-g7desire-ef-bc-8c-e6-97-a0-e7-97-9broot-e5-8a-a0-e5-ae-8c-e5-85-a8root'
---

一直不想对Desire下手，感觉有这么大的内存，就算垃圾进程多点也影响不大。无奈最近Google Map在天朝又间歇性的不给力，想改个hosts，发现需要权限，只好行动

还算一切顺利，中途有点教程外的小情况，用时一小时不到估计

无痛root：
准备工作： 1\. 没装官方的同步管理软件，不存在杀进程的问题
              2\. 下载android_usb_driver.zip（用于bootloader模式下的windows驱动): 地址：http://goo.gl/PKXsQ 115网盘
              3\. 下载一键破解包，去官网 http://goo.gl/6wGR
              4\. 十二月份出厂的新机，需要单独下最新的recovery, 用recovery-RA-desire-v2.0.1 搜一下从国外论坛下载，下完后放在第三部的软件
               reflash_package.exe 同一文件夹下
开始root:  5\. 拔掉手机usb线
              6\. 到该目录中执行reflash.exe
              7\. 从File菜单中选择Custom Recovery...，然后选中recovery-RA-desire-v2.0.1.img
              8\. 插回手机usb线
              9\. 在手机上，home-&gt;menu-&gt;设置-&gt;应用程序-&gt;开发-&gt;USB调试（打勾）
              10\. 此时程序会自动重启手机，手机进入bootloader状态
              11\. 进入bootloader后，在电脑上打开”开始-&gt;我的电脑（计算机）-&gt;鼠标右键属性-&gt;设备管理器，会看到一个打着黄色问号的Android 1.0设
                   备（如果没有黄色问号的设备则可以略过此步直接进下一步），在此设备上点鼠标右键选更新驱动，在下一个页面中选择“浏览计算机以查找
                   驱动程序”，找到在第二步中解压缩的android_usb_driver所在目录，点确定开始更新驱动程序，在弹出的任何警告框中点“确认”，等待驱
                   动安装完毕。
                   其实这里会直接弹出找到新硬件，没这么麻烦，如果以前装过那就可以直接略过
              12\. 驱动安装完毕后手机会再次自动重新启动
              13\. 在短暂的白屏后，会再次自动重新启动
              14\. 进入黑底色绿色字体的recovery界面，此时手机已经破解成功，可以用这个界面刷任何第三方ROM了
无痛还是很简单，可是无痛的意义不是很大，主要是不能改system文件夹下的文件，改了一重起又有，很多操作还是进行不了，于是，继续完全root
完全Root:
准备工作： 1\. 没用刻盘法，浪费，想用U盘引导，麻烦点，最后选了虚拟机，基实还不如用U盘
              2\. 下载安装配置虚拟机，很简单，基本下一步，官网下 Oracle VM VirtualBox，自带中文
              3\. 下光盘文件 http://alpharev.shadowchild.nl/
开始ROOT:4\. 打开虚拟系统，在设备中选择分配光驱，选中光盘文件
              5\. 重起进入光盘系统，初始化后点空格继续。我选中光盘文件就自动进入了，连重起都没用
              6\. 连上手机USB线，分配USB设备，选中HTC手机
              7\. 看屏幕，一出现wait，就分配下USB设备，选中手机，如果已经有勾就不用
              8\. 最后一步我手机屏幕显示好，但虚拟系统一直没反映，看USB设备未知，如果有这情况，重新插拔一下USB线就好
                 如想看图可去http://bbs.gfan.com/android-242674-1-1.html
显示S-OFF，搞定，可以随便蹂躏Desire了
