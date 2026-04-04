---
title: 'Windows 下Eclipse的C++开发环境配置'
description: '下期毕设的软件，说不准就要用c++，毕竟c++的现成代码摆在这了，比上网找开源还方便，没理由不考虑，用eclipse习惯了，不想看vc6.0恶心的界面，从网上找了找eclipse下c++的配置，转在这，以备不时之需 安装 总共需要下面的文件 1\. Eclipse的CDT 插件 http://www'
date: '2009-07-29'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'windows-e4-b8-8beclipse-e7-9a-84c-e5-bc-80-e5-8f-91-e7-8e-af-e5-a2-83-e9-85-8d-e7-bd-ae'
---

<div id="msgcns!1326AB98D6395CF4!1045" class="bvMsg">

###### 下期毕设的软件，说不准就要用c++，毕竟c++的现成代码摆在这了，比上网找开源还方便，没理由不考虑，用eclipse习惯了，不想看vc6.0恶心的界面，从网上找了找eclipse下c++的配置，转在这，以备不时之需

安装
----
总共需要下面的文件
1\. Eclipse的CDT 插件
   http://www.eclipse.org/cdt/
2\. MinGW, 主要提供编译C/C++文件的GCC、GDB 和 Make
   http://www.mingw.org/download.shtml
安装CDT插件和MinGW,

插件直接放到相应的文件夹下，MinGW在线安装

然后修改Windows的环境变量(设MinGW安装在C:MinGW)
&quot;PATH&quot; = &quot;C:MinGWbin;%PATH%&quot;
&quot;LIBRARY_PATH&quot; = &quot;C:MinGWlib&quot;
&quot;C_INCLUDE_PATH&quot; = &quot;C:MinGWinclude&quot;
&quot;CPLUS_INCLUDE_PATH&quot; = &quot;C:MinGWincludec++3.2.3;D:MinGWincludec++3.2.3mingw32;D:MinGWincludec++3.2.3backward;D:MinGWinclude&quot;
Eclipse 具体使用
------------
1\. 新建项目
   打开eclipse,new-&gt;project-&gt;Standard Make C++ Project
2\. 配置Make命令
   在Project-&gt;Properties-&gt;C/C++ make project
   build command 的“make”改为“mingw32-make”,再按“应用” “确定” 
3\. 新建源代码文件和Makefile文件
4\. 配置生成目标
window-&gt;show view -&gt;make targets  add maketargets  按“ok”,再双击这个maketargets 它就自动帮你make 生成exe
5\. 在Project-&gt;Properties-&gt;C/C++ Make Project-&gt;Binary Parser 把ELF Parser改成PE Windows Parser
6\. 大功告成  Run-&gt;Run as-&gt;C Local Application
  </div>
