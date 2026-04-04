---
title: windows下cvs服务器配置+eclipse
id: 128
categories:
  - 工作相关
date: 2009-07-31 05:58:51
tags:
---

<div id="msgcns!1326AB98D6395CF4!1047" class="bvMsg">

两个电脑轮流用，版本的一致问题一直让我很头痛，撇开word不提，这里先把java代码的问题解决一下。从网上搜了搜，加上看得一本书，总结如下：

用的是eclipse3.5+cvsnt服务端

安装没什么问题，基本不需要改什么，再在repository configuration选项卡里add个目录用来存放版本文件，这里有人建议把name栏改为绝对路径，我的感觉是还是用自动生成的相对路径好。把server settings里改为现在的windows登陆用户,compatibility options里勾上respond as cvs 1.11.2 to version r

然后就是在命令行下给服务器分配一个用户。照例是刚才选择的windows登陆用户，

_set cvsroot=:pserver:administrator@127.0.0.1/tarena/cvs_ <p>注意，这里的administrator是当前windows用户名，既run as中选择的那个，/tarena/cvs是之前添加的CVS仓库的别名，如果你的设置不同，请把它们替换成自己的值，以后不再说明。 <p>接着_cvs login_命令登录CVS服务器，会提示输入密码，此时需要输入administrator账户的密码：
cmd中输入
cvs login 回车 <p>基本上这样就可以了，然后是eclipse端的配置 <p>**在Myeclipse中连接cvs服务器：
**在还没有没有添加cvs版本控制的工程上（已添加了的，菜单会有所不同）
在工程名上右键-&gt;team-&gt;share project-&gt;create a new repository location，填入必须的信息，像我的是本地的，就填：
host：localhost
Repository path：tarena/cvs（上面配置时候的那个仓库别名）
填上合适的用户名与密码，端口与类型，如果服务器没有修改过的话，都用默认的就行
这样子，这个工程文件就会被上传到CVSROOT目录上，本地的文件系统打开这个目录，也可以看见被上传的工程。
以后就可以方便的使用版本控制了。
  </div>