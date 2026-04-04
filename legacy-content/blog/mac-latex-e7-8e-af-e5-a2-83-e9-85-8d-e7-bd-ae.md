---
title: Mac Latex环境配置
tags:
  - Mac
  - software
id: 3675
categories:
  - 国境以南
date: 2015-10-28 20:22:28
---

配好了Mac下的Latex使用环境，争取早目卸载Mac上的虚拟机

* * *

使用软件: MacTex + Sublime 3 + Skim

参考了几个知乎答案，现总结如下：

1.  ＭacTex 安装 [下载地址](https://tug.org/mactex/)
2.  Sublime 3 Package Control [地址](https://packagecontrol.io)

3.  Skim 安装 [下载地址](http://skim-app.sourceforge.net)

4.  Sublime中安装LaTeXTools这个包，直接内搜索就成

5.  LaTexTools进阶调整，[参考](http://liam0205.me/2014/12/14/advanced-builder-latextools/)，实际没用到

* * *

安装完后使用过程：

1.  按下 Cammand + B 编译
2.  编译完成后，会自动弹出 Skim 窗口预览 PDF 文件。
3.  在 Skim 窗口中按下 Cammand + , 打开偏好设置，在「同步」标签中找到 PDF-TeX 同步支持，选择「Sublime Text」。
4.  在 Skim 窗口中，按下 Cammand + Shift，在需要的位置按下触摸板，即可跳转回 Sublime Text 到对应的代码位置，这个功能一直没成功，不知为何