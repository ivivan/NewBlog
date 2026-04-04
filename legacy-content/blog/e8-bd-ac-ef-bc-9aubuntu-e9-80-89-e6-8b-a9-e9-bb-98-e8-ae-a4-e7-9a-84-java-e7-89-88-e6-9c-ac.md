---
title: 转：ubuntu选择默认的 Java 版本
id: 1240
categories:
  - 国境以南
  - 工作相关
date: 2012-08-30 17:07:11
tags:
---

### 选择默认的 Java 版本

如果你想使用 Sun's Java 代替开源的 GIJ (GNU Java bytecode interpreter)，你需要将它设为默认，运行：

<pre>sudo update-alternatives --config java</pre>

并从列表中选择你的选项。

{i} _注意：你很可能想同样设置 jar, javac, javadoc, javah, javap and javaws：_

<pre>sudo update-alternatives --config jar</pre>

为了使 Java 程序（使用 .deb 包安装的）能在你选择的 JVM 中运行，保证你也修改了 JVM 的配置文件：

<pre>sudo nano /etc/jvm</pre>

加入下面一行：

<pre>/usr/lib/j2sdk1.5-sun</pre>

&lt;

p&gt;软件包，比如 **ant** 所使用的 JVM 可以在这个文件中找到