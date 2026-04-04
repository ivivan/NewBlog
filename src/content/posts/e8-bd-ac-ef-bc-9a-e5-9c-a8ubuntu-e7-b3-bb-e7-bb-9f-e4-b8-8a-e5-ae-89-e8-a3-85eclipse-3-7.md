---
title: '转：在ubuntu系统上安装Eclipse 3.7'
description: '安装Eclipse。 2.1\. 首先解压缩下载好的压缩包，在终端中输入： tar zxvf eclipse SDK 3.6.2 linux gtk.tar.gz sudo mv eclipse /opt/ sudo gedit /usr/share/applications/Eclipse.des'
date: '2012-08-30'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'e8-bd-ac-ef-bc-9a-e5-9c-a8ubuntu-e7-b3-bb-e7-bb-9f-e4-b8-8a-e5-ae-89-e8-a3-85eclipse-3-7'
---

安装Eclipse。

2.1\. 首先解压缩下载好的压缩包，在终端中输入：
<div>
<div>tar -zxvf eclipse-SDK-3.6.2-linux-gtk.tar.gz
sudo mv eclipse /opt/
sudo gedit /usr/share/applications/Eclipse.desktop</div>
</div>
在文本中填入：
<div>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
<div>[Desktop Entry]
Name=Eclipse
Comment=Eclipse IDE
Exec=/opt/eclipse/eclipse
Icon=/opt/eclipse/icon.xpm
Terminal=false
Type=Application
Categories=Application;Development;</div>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
</div>
2.2 eclipse安装结束。
