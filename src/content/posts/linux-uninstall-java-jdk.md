---
title: 'Linux uninstall java JDK'
description: '一.jdk1.4卸载 由于redhat Enterprise 5 中自带安装了jdk1.4的，所以在安装jdk1.6前我把jdk1.4的卸了，步骤如下： 1.打开终端输入 rpm qa | grep gcj ，其现实内容有： java 1.4.2 gci compat......... java 1'
date: '2013-03-20'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'linux-uninstall-java-jdk'
---

一.jdk1.4卸载
由于redhat Enterprise 5 中自带安装了jdk1.4的，所以在安装jdk1.6前我把jdk1.4的卸了，步骤如下：

1.打开终端输入#rpm -qa | grep gcj ，其现实内容有：
java-1.4.2-gci-compat.........
java-1.4.2-gcj-compat-devel.....(具体忘了是什么了，反正有两个java开头的文件)

2.卸载
#rpm -e --nodeps java-1.4.2-gci... (利用rpm -e --nodeps 命令删除上面查找的内容)
此时jdk1.4已被卸了。

二.jdk1.6安装
1\. 从网站上下载jdk1.6包(jdk-6u10-linux-i586-rpm.bin ),通过leapFTP上传到linux系统的/var/ftp/pub目录下

2.在linux中切换到 /var/ftp/pub目录下，修改jdk1.6的使用权限：#chmod u+x jdk-6u10-linux-i586-rpm.bin

3.解压并安装：#./ jdk-6u10-linux-i586-rpm.bin (默认安装在/usr/java中)

4.环境变量配置：
#vi /etc/profile
在该profile文件中添加：
JAVA_HOME=/usr/java/jdk1.6.0_10
JRE_HOME=/usr/java/jdk1.6.0_10/jre
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/jt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib(注意：前面的.: ，linux中的；号为：号)
export JAVA_HOME JRE_HOME PATH CLASSPATH
添加完毕保存退出

刷新Profile, 切记〜
#source /etc/profile

#java -version
显示 java version "1.6.0_10" (jdk1.6安装成功)

卸载rpm版的jdk：
#rpm -qa|grep jdk
显示：jdk-1.6.0_10-fcs
卸载：#rpm -e --nodeps jdk-1.6.0_10-fcs

以上为实践总结

以上方法不使用于ubuntu 12.04 openjdk卸载

方法补充如下：

1\.  卸载系统自带的openjdk :

sudo apt-get purge openjdk*
