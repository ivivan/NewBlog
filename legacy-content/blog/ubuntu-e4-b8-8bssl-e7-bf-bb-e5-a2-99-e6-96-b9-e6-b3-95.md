---
title: ubuntu下ssl翻墙方法
id: 51
categories:
  - 工作相关
date: 2010-06-17 11:38:35
tags:
---

<div id="msgcns!1326AB98D6395CF4!1804" class="bvMsg">  想换个地方上上网，可惜笔记本里装的是ubuntu系统，在实验室台式机里配置好的xp环境ssl翻墙方法是用不上了，从网上搜了下，有如下方法，看似非常简便，就是不知速度和实用性怎样，先记录在此，待实际试用后再加修正：<div><span style="color:rgb(51,51,51);font-family:'Microsoft YaHei', Verdana, Geneva, sans-serif;font-size:12px;line-height:18px;">

<font face="宋体"><span style="font-size:medium;">
</span></font>

<font face="宋体"><span style="font-size:medium;"><font color="#000000">
</font></span></font>

<font face="宋体"><span style="font-size:medium;"><font color="#000000">在ubuntu里 可以直接在终端窗口使用ssh命令，不用特别安装软件</font></span></font>
> <font face="宋体"><span style="font-size:medium;"><font color="#000000">ssh -qTfnN -D 7070 name@proxy.94cat.com</font></span></font>

<font face="宋体"><span style="font-size:medium;"><font color="#000000">proxy.94cat.com 是你ssh的服务器地址</font></span></font>

<font face="宋体"><span style="font-size:medium;"><font color="#000000">name 是你的用户名</font></span></font>

<font face="宋体"><span style="font-size:medium;"><font color="#000000">7070为端口</font></span></font>

<font face="宋体"><span style="font-size:medium;"><font color="#000000">参数如下</font></span></font>
> <font face="宋体"><span style="font-size:medium;"><font color="#000000">-q :- be very quite, we are acting only as a tunnel.
> -T :- Do not allocate a pseudo tty, we are only acting a tunnel.
> -f :- move the ssh process to background, as we don’t want to interact with this ssh session directly.
> -N :- Do not execute remote command.
> -n :- redirect standard input to /dev/null.</font></span></font>

<font face="宋体"><span style="font-size:medium;"><font color="#000000">在终端运行 运行后输入以下 yes 回车 然后输入你的ssh密码  接下来 在浏览器设置你的代理就行了 和windows运行好ssh软件是一样的操作</font></span></font>

<font face="宋体"><span style="font-size:medium;"><font color="#000000">我喜欢chrome chrome可以使用Proxy Switchy! 扩展</font></span></font>

<font face="宋体"><span style="font-size:medium;"><font color="#000000">扩展的设置和xp里一样，一开始默认填127.0.0.1就可以，没问题，使用通过</font></span></font>
</span></div></div>