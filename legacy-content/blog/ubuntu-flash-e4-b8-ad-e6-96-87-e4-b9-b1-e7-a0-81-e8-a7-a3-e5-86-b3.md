---
title: ubuntu flash中文乱码解决
id: 208
categories:
  - 工作相关
date: 2009-03-04 02:56:02
tags:
---

<div id="msgcns!1326AB98D6395CF4!256" class="bvMsg"> <span>buntu</span>装好之后， 为浏览器firefox安装<span>flash</span>插件， 后来发现中文会变成方框。

如何解决？

输入：

cd /etc/fonts/conf.d/

为了安全，备份一下：

sudo cp 49-sansserif.conf 49-sansserif.conf_backup

输入如下指令：

sudo gedit ./49-sansserif.conf

此时文件显示内容。

将其中的第1、2、4个后面的sans-serif或者serif用你自己系统中支持中文的字体的名字代替，注意字体名字的大小写

结果如下：

    &lt;match target=&quot;pattern&quot;&gt;

        &lt;test qual=&quot;all&quot; name=&quot;family&quot; compare=&quot;not_eq&quot;&gt;

            &lt;string&gt;iYaHei&lt;/string&gt;

        &lt;/test&gt;

        &lt;test qual=&quot;all&quot; name=&quot;family&quot; compare=&quot;not_eq&quot;&gt;

            &lt;string&gt;iYaHei&lt;/string&gt;

        &lt;/test&gt;

        &lt;test qual=&quot;all&quot; name=&quot;family&quot; compare=&quot;not_eq&quot;&gt;

            &lt;string&gt;monospace&lt;/string&gt;

        &lt;/test&gt;

        &lt;edit name=&quot;family&quot; mode=&quot;append_last&quot;&gt;

            &lt;string&gt;iYaHei&lt;/string&gt;

        &lt;/edit&gt;

    &lt;/match&gt;
  </div>