---
title: '转：ubuntu选择默认的 Java 版本'
description: '选择默认的 Java 版本 如果你想使用 Sun''s Java 代替开源的 GIJ (GNU Java bytecode interpreter)，你需要将它设为默认，运行： sudo update alternatives config java 并从列表中选择你的选项。 {i} 注意：你很可能想'
date: '2012-08-30'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'e8-bd-ac-ef-bc-9aubuntu-e9-80-89-e6-8b-a9-e9-bb-98-e8-ae-a4-e7-9a-84-java-e7-89-88-e6-9c-ac'
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
