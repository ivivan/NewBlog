---
title: Openshift 搭建Ghost Blog平台及绑定域名
tags:
  - fun
id: 3332
categories:
  - 国境以南
  - 最近比较烦
date: 2013-12-30 20:48:44
---

每个人都有自己的爱好，我就好这一口，折腾后深感无语

没忍住，花了一个晚上和半个白天，又搭起Blog平台一个，这次感觉上应该不会再中途删除了，倒不是因为Ghost的平台有多么简洁，关键是这个Theme很合我胃口

记录下安装过程：

1.  Openshift安装Application
此过程和各种PssP平台的使用方式大同小异，参见此文： [在Openshift上免费架设Ghost博客并绑定域名](http://www.yangjinkun.cn/post/openshift-ghost) 基本没什么问题，补充几点：

    *   SSH密钥public只需要填在Openshift网页中，Private一定要保存好，以后读取的都是Private密钥，Putty曾经出现过读取时出现警告，忽略就好
    *   Putty是个command的工具，有时候还是需要一个ftp，修改theme更方便顺手，可用_WinSCP_，所填内容与Putty一样

2.  安装主题
按上文所说，把主题解压后上传到theme文件夹下就可，和wordpress一样 推荐一个现在所用的主题 [Ghostium](http://ghostium.oswaldoacauan.com/)，注意修改文件添加中文的时候编码要用UTF-8，否则中文乱码。其次在修改Theme填网址的时候注意有时要以http开头，不然会出奇怪的问题。Theme中修改静态文件可以直接刷新Blog看效果。 更多主题在Github, 搜索Ghost theme
3.  绑定域名
从Godaddy买的.com域名，绑定过程分几步，Openshift这边，先按上文中所述把网站别名设置一下，再修改一下后台文件。Godaddy登陆后找到domain，在上面菜单旁边有个DNS，从那里设置一下，找了好久，加一条记录：

    www openshiftdomain(openshift安装好Ghost的那个二级域名)

    yourdomain不加http和www

    我之前还设了Forward到Openshift使用的这个域名上。
4.  导wordpress文章到Ghost
光建好没什么意义，wordpress上五百多篇Blog能成功导入才叫成功。 Wordpress里有个Ghost插件，用那个官方插件导出json文件，然后看下那个官方插件的说明，打开Ghost的Debug后台，然后选择文件Import. 我7mb多的文件前前后后试了几十次才成功，不知道是什么原因，太大？？
为了防止Ghost用了不久又被抛弃，在IFTTT上有个Ghost到Evernote的触发，可以用一下就当是自动保存下文章。Debug也有Export，不过没试过导出的格式怎样
5.  社交部分
分享到网站也可以从IFTTT实现，现在似乎Ghost本身的插件系统还基本没成型，还是先用第三方的服务比较好

    社会化评论用Disqus，我现在用的theme直接整合了，不用自己修改代码，也可以用国内如多说等

上面就是整个安装过程，还算是很快速，关键是没有那么多插件要安装，而且我个人Blog也没有过度优化的必要

要说问题也有一些：

*   没有手机APP，现在Iphone不离手，又是4G网络，之前wordpress坚持这么长时间就和wordpress有官方软件可以随时写一把很有关系
*   没有站内搜索，根本定位不到以前的文章，特别是我现在五百多篇，想找出指定的一篇根本没可能
*   没有发现tag cloud之类的，可能是这个theme的原因，以后得研究研究，现在基本上就是除了新文章，旧文章定位很难
*   后台编辑太简洁，基本上只能编辑最近的几篇文章，往前只能不停下拉手工找，不现实
*   好像Ghost没有登陆一说？还是说后台自动登陆浏览器保存了？总感觉提示不明显
*   网页编辑器不自动上滚啊，打字一多还要自己拖动，有点坑爹

不过总的还算不错，特别是mobile端的显示效果相当的给力，要是能找个APP辅助编辑发文就很理想了~

www.ivivan.com，效果很理想