---
title: ubuntu 修改eth0为eth1及相关网络设置
tags:
  - software
id: 2461
categories:
  - 国境以南
  - 工作相关
date: 2013-08-23 15:58:47
---

拿到了Library 里HPC的服务器root用户，扫了一眼配置果然高端， 32个E5CPU，6T硬盘，64G内存，顿时感觉这东西天天用来跑实验真是埋没了～日后手里有16个机器可用，我看很有必要装个BitCoin的矿工程序上去，挖一挖生活费就出来了～

远程连接碰上些问题，把相关命令记在此～

vim /etc/udev/rules.d/70-persistent-net.rules
修改对应ethX即可

eth0为第一个有线网卡，按顺序0123....

配置IP地址
<div>vim /etc/network/interfaces
<div></div>
<div>
<div>auto lo</div>
<div>iface lo inet loopback</div>
<div>auto eth1</div>
<div></div>
<div>iface  eth1 inet static</div>
<div>address 192.168.1.100</div>
<div>netmask 255.255.255.0</div>
<div>gateway 192.168.1.254</div>
</div>
</div>
<pre>重启网络
/etc/init.d/networking restart

每次远程时都要来来回回刷新几次才能成功，不过没想明白问题在哪，先凑合用着，以后解决～</pre>
&nbsp;