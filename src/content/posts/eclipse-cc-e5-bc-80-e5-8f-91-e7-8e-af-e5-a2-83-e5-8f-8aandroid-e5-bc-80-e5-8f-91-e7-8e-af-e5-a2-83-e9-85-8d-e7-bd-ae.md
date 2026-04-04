---
title: 'Eclipse C/C++开发环境及Android开发环境配置'
description: '1. 首先安装JAVA环境，Ecplise及Android SDK都需要，自然官网下载 2. 安装Android SDK 下载ZIP或EXE一样，安装后打开SDK Manager才开始正式安装 过程及其漫长，全管即可，不是非常必要确保不要选MOTO相关的XOOM等几个机型，MOTO相关资源下载要输入'
date: '2012-01-29'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'eclipse-cc-e5-bc-80-e5-8f-91-e7-8e-af-e5-a2-83-e5-8f-8aandroid-e5-bc-80-e5-8f-91-e7-8e-af-e5-a2-83-e9-85-8d-e7-bd-ae'
---

1.  首先安装JAVA环境，Ecplise及Android SDK都需要，自然官网下载
2.  安装Android SDK [http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html) 下载ZIP或EXE一样，安装后打开SDK Manager才开始正式安装

过程及其漫长，全管即可，不是非常必要确保不要选MOTO相关的XOOM等几个机型，MOTO相关资源下载要输入MOTO的注册账号，导致下载暂停，取消这几项后，挂着电脑，睡一觉搞定。最后把D:\Program Files\Android\android-sdk\tools加进path，当然具体地址看安装情况

1.  安装Ecplise，这里选了classic版，官网下载，解压即可

<li>

安装CDT，采用在线安装的方式，
</li>

打开eclipse，在help - &gt; install new software，输入http://download.eclipse.org/tools/cdt/releases/indigo

出现CDT Main Features, CDT Optional Features和TCF，选择CDT Main Features就行了

安装完成之后会提示重启eclipse，重启就可以创建C/C++项目了

1.  安装WinGW和MSYS

MinGW (Minimalist GNU for Windows)是一个自由软件，可以将C/C++撰写的原始程序编译为 Windows 环境下的可执行文件

到MinGW的网站http://mingw.sourceforge.net上，下载之后运行exe文件安装

_MSYS_不是一个操作系统，而是一个通过将Linux源代码在Win32上编译而成的UNIX工作环境。安装完之后可以在windows下用Linux的命令。

![](http://static.oschina.net/uploads/space/2012/0117/014207_KI2M_8123.jpg)

然后就会在线下载文件，安装完成之后设置MinGW和MSYS的环境变量。

设置MinGW环境变量

1.  在PATH里加入C:\MinGW\bin，记得，如果里面还有其他的变量，记得要加个分号啊，分号得在英文输入模式下输入的。
2.  新建LIBRARY_PATH变量，如果有的话，在值中加入C:\MinGW\lib，这是标准库的位置。
3.  新建C_INCLUDEDE_PATH变量，值设为C:\MinGW\include

在bin目录里复制一份mingw32-make.exe 改名为make.exe方便以后使用

打开cmd，输入gcc --version 出现版本信息说明安装MinGW成功，输入ls，如果有文件列表说明MSYS安装成功。

没找到msys的配置方法，暂时略去

1.  安装eclipse amdroid插件，和CDT一样，在线地址https://dl-ssl.google.com/android/eclipse

在perfermance里改下android sdk的安装址址
