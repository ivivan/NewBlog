---
title: Eclipse导入Hadoop源码项目
tags:
  - eclipse
  - hadoop
id: 2674
categories:
  - 国境以南
  - 工作相关
date: 2013-09-02 17:39:32
---

将Hadoop源码导入Eclipse有个最大好处就是通过 "ctrl + shift + r" 可以快速打开Hadoop源码文件。

&nbsp;

第一步：在Eclipse新建一个Java项目

&nbsp;

第二步：将Hadoop程序src下core, hdfs, mapred, tools几个目录copy到上述新建项目的src目录， 无关目录不要导入，不然各种错误

&nbsp;

第三步：修改将Java Build Path，删除src，添加src/core, src/hdfs....几个源码目录

&nbsp;

第四步：为Java Build Path添加项目依赖jar，可以导入Hadoop程序的lib下所有jar包（别漏掉其子目录jar包），导入ant程序lib下所有jar包（感觉不导入也可以）。

&nbsp;

第五步：理论上第四步就OK了，但是会报大量如下错误：

Access restriction: The method arrayBaseOffset(Class) from the type Unsafe is not accessible due to ......

决办法是：右键项目“propertiyes” &gt; "Java Build Path" &gt; "Libraries"，展开"JRE System Library"，双击"Access rules"，点击"Add"按钮，在"Resolution"下拉框选择"Accessible"，"Rule Pattern"填写"****/***"，保存后就OK了。