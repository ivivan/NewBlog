---
title: 转：在ubuntu系统上安装Eclipse 3.7
tags:
  - technology
id: 1242
categories:
  - 国境以南
  - 工作相关
date: 2012-08-30 17:14:18
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