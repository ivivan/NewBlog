---
title: 爬墙头普及2--转
id: 97
categories:
  - 工作相关
date: 2009-12-29 12:49:24
tags:
---

<div id="msgcns!1326AB98D6395CF4!1658" class="bvMsg"><span style="line-height:22px;color:rgb(64,64,64);font-family:Verdana, Simsun;font-size:13px;">前段时间听说：豆瓣上和“饭否”有关的小组，全都被解散；百度的饭否贴吧被关闭，百度百科的饭否词条被清除。当时俺琢磨着：随着党国的六十大寿一天天临近，估计ＧＦW要发飚了。果不其然，最近不断有博客的读者来信反映，说 _自_由_門_ 和 _無_界_ 都不好使了。到了本周，ＧＦW变本加厉，对TＯR也下了毒手。不过还好，TＯR还是蛮强壮滴（依然坚挺）。今天俺就来介绍一下，在网络严重封锁的非常时期，各种戴套（TＯR）的法子。
　　注：本文提及的TＯR，是指包含TＯR的Vidalia套装软件包。此软件包很牛很强大，非常适合傻瓜用户。另外，为了照顾一些非IT专业的用户，本文写得比较啰嗦，请那些懂行的同学不要嫌烦。

　　★**如何获取TＯR**
　　关于这个问题，俺在之前的“[如何翻墙？](http://program-think.spaces.live.com/blog/cns!F5B0090663FEEADA!144.entry)”里面，已经有介绍，此处再多啰嗦一下。
　　◇方法1：通过Web网页代理获取
　　通过**加密**的Web网页代理，访问TＯR的官方站点（在“[这里](http://www.torproject.org/)”），下载最新的软件包。记住，一定要用**加密的**（也就是**HTTPS**协议的）网页代理。
　　这个方法的缺点是：在非常时期，可能很难找到好用的加密Web网页代理。

　　◇方法2：通过邮件获取
　　这个方式在封锁加剧的时期，比较合适。除非我党把所有国外的Email提供商都和谐掉，否则咱们总是有机可趁。具体操作如下：
　　发送主题为“help”的<font color="red">纯文本</font>邮件到**[gettor@torproject.org](mailto:gettor@torproject.org)**，收到回复后根据邮件的提示再回复一次，即可在你的邮箱中收取Tor的软件包。建议使用<font color="red">HTTPS</font>方式的**Gmail**，以确保最佳效果。切记要用**纯文本**的邮件格式。

　　★**如何用TＯR上网**
　　考虑到本文的读者可能是一些非IT专业的电脑用户，简单说一下如何用TＯR。
　　◇步骤1
　　把获取的软件包解压缩到某个目录下。

　　◇步骤2
　　启动里面的一个名叫“Start Tor Browser.exe”的程序。启动之后，会跳出一个“Vidalia Control Panel”的窗口。
![不见图，请翻墙](https://blob-s-docs.googlegroups.com/docs/OAAAAGsy3N0oo2bc_9eOzHbj5uYNjnD341O7h_qjQCjF05q387jujGpWqDjyxKmmmgvo7QbIxilBUhMAiCdDUgeAgSQA15jOjF_sESpY-cIOrJ9XrBOr3JfTdZjs)
　　假如你不喜欢/不习惯洋文的界面，可以点控制面板中的“Settings”按钮，然后进入到“Apperance”标签页，选择你喜欢的语言（比如中文）。然后，就会立即生效。
　　具体效果如下图所示：
![不见图，请翻墙](https://blob-s-docs.googlegroups.com/docs/OAAAAJdOkClPevwGNVK1BD2brEbv8gE7k4ETdGZ5O_hVxd74O9iKzEFZOxDa8CBu4beW0Yz4YYUVtJGpYVO7P17qZYAA15jOjMYzQOSdFUCgirzfBgVv35ay7pIc)
![不见图，请翻墙](https://blob-s-docs.googlegroups.com/docs/OgAAAEIf9aq_KjkBl3EyRjve6soVPL34mzOzvTeMg_FdcR4zZl2ASf_Ksx_f3_N_oryvZ6EI9LSXrSOTRhsXzlpbeVMA15jOjDbY3960VSxWjQLJBYrjNwm8TJ0G)

　　◇步骤3
　　如果能够正常连接到互联网，则该程序会自动运行内置的一个Firefox浏览器。如果你从来没有用过Firefox，不必担心，这玩意儿的用法和IE差不多。

　　◇步骤4
　　万一你不喜欢它内置的浏览器，想用自个儿喜欢的那个，也没有关系。直接在你自个的浏览器中设置HTTP代理。代理的地址设置为：127.0.0.1；代理的端口设置为：8118 即可。
　　IE的设置如下图：
![不见图，请翻墙](https://blob-s-docs.googlegroups.com/docs/OgAAAAKMzxLcataKe0ivweyX_8FK021ZEoUZY0fAAAy-fblo3YbPx30CEHqxg0x1bqlhKfT3YDbFjZZQohT9Hh2By6MA15jOjCv-ccNWO0Op-9QUUY46E76DI6MQ)
　　Firefox的设置如下图：
![不见图，请翻墙](https://blob-s-docs.googlegroups.com/docs/OgAAALXb-WiuagaRVljBrTPu_R3ZwjEFFMODeiZrRJo7rowazk86UkdalsIZaDoMTU0IMLsTPFCM0daNjJeDi55i-_UA15jOjFkaxivhLXjc1OCCjt52DYF4UgeF)

　　★**如何使用TＯR网桥中继**
　　在封锁加剧的非常时期（比如临近党国60大寿的时候），直接用TＯR，也会碰到上网困难。此时可以通过手动设置TＯR的网桥中继来突破封锁。
　　◇步骤1
　　首先，给**[bridges@torproject.org](mailto:bridges@torproject.org)** 发送一封邮件（记得要用<font color="red">纯文本</font>格式），邮件的标题和正文写上 **get bridges**（注意当中有空格）。和前面获取TＯR的方式一样，也建议用**Gmail**，以确保最佳效果。

　　◇步骤2
　　大约不到一炷香的功夫，就会收到回信。回信中会提及一些网桥中继的地址，比如俺刚才收到的邮件，会有如下内容：

================传说中的华丽分割线================

Here are your bridge relays:

bridge 188.192.128.179:443 a26a90bf16c07f0139d46adf1725fae9ae94fc17
bridge 88.89.22.94:9001 8a254c35a251e720a35662d313b0173e2c705015
bridge 87.145.137.5:7443 c5efeffd8104e6d3dbfbb7d6ecdf70c8f53bfbfa

================传说中的华丽分割线================

里面的每一个 “IP 冒号 端口”（比如：188.192.128.179:443），都表示一个 网桥中继。考虑到本文是扫盲帖，就不具体介绍网桥中的工作原理了。

　　◇步骤3
　　然后，到“Vidalia控制面板”中，点击“设定”按钮；进入&quot;网络&quot;标签页；在里面勾选“我的ISP阻挡了对TＯR网络的连接”。
　　如下图所示：
![不见图，请翻墙](https://blob-s-docs.googlegroups.com/docs/OgAAAGxhKPQNmsOue51lr18WQqxRTSJtVw1pRzlhavHOQiozBkljM1V7MBWFK3EZrECaFsB0b0OXNLhRfA-EoUEsYWcA15jOjIIHShL8mqY8-Hm6-fglIJSNcj3y)

　　勾选之后，会出现一个编辑框和一个列表框；把刚才那些网桥中继，全部都添加到列表框中。（多填写一些网桥中继，有利于对抗ＧＦW的封锁）
　　如下图所示：
![不见图，请翻墙](https://blob-s-docs.googlegroups.com/docs/OgAAAHctM2GCzCep6ugYsgoqadfA_a9wXx8Fur950H2MHGZpAAOGgoSOBI54DylmxMZOqAJfy8lK5HUGZYBTKXfJko0A15jOjN86LBKI4UUwf6vk6icOLncmIVKt)

　　◇步骤4
　　完成上述步骤之后，你就可以重新呼吸互联网上自由的空气了！！！

　　★**如何配置TＯR网桥中继，造福他人**
　　前面说了如何使用TＯR的网桥中继来穿墙。如果你是当代活雷锋，具有助人为乐的精神，还可以考虑把自己的电脑配置成网桥中继，供别的同学使用。具体的配置方式，TＯR的官方网站上都有（在“[这里](https://www.torproject.org/docs/tor-doc-relay.html.zh-cn)”），俺就不多费口水了，自个儿翻墙去看。

　　听了这许多TＯR的高级用法，各位同学们相必很兴奋。不过捏，大伙们不要高兴得太早。没准过几天，ＧＦW直接把HTTPS的443端口给封了，那咱就都歇菜了 :-(</span> </div>