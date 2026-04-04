---
title: 'ubuntu 终端命令集'
description: '用了几天ubuntu，主要都在忙着更新组件和新装软件，对于ubuntu文件系统的结构还不太清楚，唯一的感觉就是读取win7的那两个ntfs分区时速度有感觉变慢，看来跨系统读文件还不是一个很好的选择，考虑过几天win7用的差不多了把整个电脑都划成ubuntu用。 装软件时的一个明显感觉就是很多事情，用'
date: '2009-02-20'
readTime: '4 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'ubuntu-e7-bb-88-e7-ab-af-e5-91-bd-e4-bb-a4-e9-9b-86'
---

<div id="msgcns!1326AB98D6395CF4!247" class="bvMsg"> 用了几天ubuntu，主要都在忙着更新组件和新装软件，对于ubuntu文件系统的结构还不太清楚，唯一的感觉就是读取win7的那两个ntfs分区时速度有感觉变慢，看来跨系统读文件还不是一个很好的选择，考虑过几天win7用的差不多了把整个电脑都划成ubuntu用。
装软件时的一个明显感觉就是很多事情，用终端的命令行去做很容易，用图形界面往往很复杂，而且很多时候还会出现权限的问题，对于ubuntu的用户权限，现在的唯一感觉就是权限在ubuntu里很重要，很多操作都对应着相应的权限
现在把常用的一些命令在这里集中一下，这样以后自己用着也方便一点，不用再开好几个页面看来看去了：

以下均为网上搜集，非原创...........

#### <span>sudo:需要提升权限执行的命令 </span>

#### <span>文件 &amp; 目录类命令 </span>

*   **pwd**：**pwd** 命令查看您当前所处的路径（**pwd** 代表 &quot;打印当前工作目录&quot;）。例如：在桌面文件夹中执行 &quot;pwd&quot; 命令将输出 &quot;~/Desktop&quot;。注意，Gnome 的终端在窗口标题中也会显示这一信息-具体请看本页顶部的截屏图片。

*   **cd**：**cd**命令用来改变当前工作目录。当您打开一个终端的时候，您就位于您的home目录中。如果想要切换到其它的目录，就要用 **cd**命令。例如：
<li> 进入root目录，输入 **&quot;cd /&quot;**
<li> 进入到您自己的目录（home目录），输入 **&quot;cd&quot;**
<li> 进入当前目录的上一层目录，输入 **&quot;cd ..&quot;**(译者注：cd 与 .. 之间有空格)
<li> 进入前一个操作的目录，输入 **&quot;cd -&quot;**
<li> 一次进入多层目录，输入 **&quot;cd /var/www&quot;**,将会直接切换到/var的子目录/www中。另一个例子， **&quot;cd ~/Desktop&quot;**将会进入到您的桌面目录

*   **cp**：**cp**命令用来复制文件。例如：**&quot;cp file foo&quot;**命令将会创建一个&quot;file&quot;的精确的副本，并命名为&quot;foo&quot;,而 &quot;file&quot;不会有任何变化。如果是复制目录，那就得用**&quot;cp -r directory foo&quot;**（递归地复制）。

*   **mv**：**mv**命令将文件移动到另一个位置或者给文件更名。看下面的例子：**&quot;mv file foo&quot;**命令会将文件&quot;file&quot;更名为&quot;foo&quot;。**&quot;mv foo ~/Desktop&quot;**会将文件&quot;foo&quot;移动到桌面目录，但不会更名。如果想更名，你必须要指定一个新的名字。

*   为了输入方便，您可以用 '~' 符号来代替您的home目录。

*   如果在用mv命令的时候前面加上了sudo，那么“~“这个符号将可以正常使用，终端会把他替换成你自己（普通用户）的home目录。而如果你用
”sudo -i“或者”sudo -s“打开了一个root用户的终端，那么这时”~“将指代root用户的home目录，而非你自己的。

*   **rm**：这个命令用来移动或删除文件。对于非空的目录，用这个命令不能删除。

*   **mkdir**：**mkdir** 命令用来创建目录。例如：**&quot;mkdir music&quot;**将会创建一个 music 目录。

<a></a>

#### <span>[](http://wiki.ubuntu.org.cn/index.php?title=UbuntuHelp:UsingTheTerminal/zh&amp;action=edit&amp;section=10 "UbuntuHelp:UsingTheTerminal/zh&amp;action=edit&amp;section=10")</span><span>系统信息类命令 </span>

*   **df**：**df**命令用来查看各个文件系统当前的空间使用状况。**&quot;df -h&quot;**可能是最有用的选项了-它以M和G为单位输出，而不是以块为单位。(**-h** 的含义是“便于阅读”)

*   **du**：**du**命令可以显示某一个目录使用了多少磁盘空间。它可以显示该目录中的各个子目录分别使用了多少空间，也可以显示当前目录一共占了多少空间。<li> **-s** 代表”概况、总览“，**-h** 则代表”易于人阅读“。

*   **uname -a**：**uname**命令的 **-a** 参数用来查看系统的所有信息，包括 机器名，内核名称 &amp; 版本 和一些其它的细节。它最大的用处是用来查看当前所用内核的信息。<li>**lsb_release -a**：**lsb_release**命令的**-a**参数查看当前运行的linux的版本信息<li>**ifconfig**显示当前系统的网络接口信息。

    #### <span>添加新用户 </span>

    <li> **&quot;adduser newuser&quot;**命令用来创建一个用户名为&quot;newuser&quot;的新用户，为新用户 newuser 创建一个密码，使用如下命令**&quot;passwd newuser&quot;**。
<a></a>

### <span>[](http://wiki.ubuntu.org.cn/index.php?title=UbuntuHelp:UsingTheTerminal/zh&amp;action=edit&amp;section=12 "UbuntuHelp:UsingTheTerminal/zh&amp;action=edit&amp;section=12")</span><span>选项 </span>

命令的默认操作常常会被指定一个确定的 **--参数**所修改。例如**ls**命令有一个**-s**参数，因此 **&quot;ls -s&quot;**就会额外的显示出文件的大小。它也有一个 **-h**参数，将文件的大小以很好的可读性的格式输出。参数可以以簇聚合,比如 **&quot;ls -sh&quot;**和**&quot;ls -s -h&quot;**的效果相同。大多数的参数都很长，两个破折号前缀代表一个参数，所以**&quot;ls --size --human-readable&quot;**也和上面得命令相同。

<a></a>

### <span></span> <span>'Man' 和 获得帮助 </span>

<p>**man _command_**, **info _command_** and **_command_ --help**是命令行下面最重要的工具。
<p>在linux下面，几乎每一个命令和每一个应用程序都会有一个man(manual)文件，所以只要简单的键入**&quot;man &quot;command&quot;&quot;**就能看到这个命令的手册页。例如，**&quot;man mv&quot;**会打开mv (Move) 的手册页。
<p>利用键盘上的方向键移动手册页面，用**&quot;q&quot;**退出。
<p>**&quot;man man&quot;**会查看**man**命令的手册页，这里是一个很好的开始！
<p>**&quot;man intro&quot;**也非常有用 －它能够查看 &quot;用户命令介绍&quot;，写的非常好！是一份很简介的linux命令的介绍。
<p>还有一个就是**info**命令了，它通常比**man**还深入。输入**&quot;info info&quot;**命令可得到info页的介绍。
<p>一些软件开发人员喜欢用 **info** 而不是 **man** （例如Debian和GNU开发人员）。所以，如果你发现一个很常见的命令或者程序没有 **man** 页面，那么就试试 **info** 页面。
<p>几乎所有的命令都能接受一个**-h**(或 **--help**)选项，能够输出命令的简要的描述和参数，然后自动退回命令提示符。可以输入**&quot;man -h&quot;**或**&quot;man --help&quot;**查看。
<p>警告：一些软件不认为 **-h** 选项代表帮助，虽然少但是存在这种情况。这时候可以先试试 **man** 或者 **info** 页面，以及使用较长的选项 **--help**。

<a></a>

#### <span></span><span>搜索man文档 </span>

<p>如果您不确定用哪个命令或程序，您可以试试搜索**man**文件。

*   **man -k _foo_ **会搜索关于foo的man文件。试试看**&quot;man -k nautilus&quot;**是怎样的。<li> 注意：这同**apropos** 命令是一样的。
<li> **man -f _foo_ **仅仅搜所系统man文件的标题。试试**&quot;man -f gnome&quot;**。<li> 这个同 **whatis**命令是相同的。

    #### <span>节省输入 </span>

    <table border="1" cellspacing="0">

    <tbody><tr>
<td> **Up Arrow** or **ctrl+p**
<td>
    <td> 滚动显示你之前输入的命令.（译者注，与msdos相似）

    <tr>
<td> **Down Arrow** or **ctrl+n**
<td>
    <td> 回到较近的命令.（与up arrow相反，反方向滚动）

    <tr>
<td> **Enter**
<td>
    <td> 找到你要的命令时按回车确认

<tr>
<td> **tab**
<td>
    <td> 一个非常有用的功能。如果只有一个选项，则自动补全命令或文件名；否则给出所有选项的列表。

    <tr>
<td> **ctrl+r**
<td>
    <td> 搜索你已经输入的命令.当你已经输入了一条很长很复杂的命令并且要重复它时, 使用这个按键组合，然后输入命令的一部分将会从你的集合历史中搜索. 找到它后，只要轻轻按下回车
</td></td></td></td></td></tr></td></td></tr></td></td></td></tr></td></td></tr></tbody></table>
<a></a><span></span><span>更改字体 </span>
<p>不能用鼠标。你可以容左/方向键来移动。当游标在你想让它在的地方时，输入 _inserts_ text - ie 它不会改写那儿的文字。

    <table border="1" cellspacing="0">

    <tbody><tr>
<td> **ctrl+a** or **Home**
<td>
    <td> 移动游标到行首.

    <tr>
<td> **ctrl+e** or **End**
<td>
    <td> 移动游标到行尾.

    <tr>
<td> **ctrl+b**
<td>
    <td> 移动游标到上一个或当前单词的前面.

    <tr>
<td> **ctrl+k**
<td>
    <td> 删除从当前游标到行尾的文字.

    <tr>
<td> **ctrl+u**
<td>
    <td> 删除当前整行.

    <tr>
<td> **ctrl+w**
<td>
    <td> 删除游标前的单词.
</tr></td></td></tr></td></td></tr></td></td></td></tr></td></td></tr></tbody></table>
</p></p></p></p></p></p></p></div>
