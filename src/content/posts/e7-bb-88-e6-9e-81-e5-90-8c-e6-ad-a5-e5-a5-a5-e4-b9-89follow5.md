---
title: '终极同步奥义——follow5'
description: '前几天用月光的教程搭个GAE的应用，每天运行正常的很，流量也够猛，就是没有效果，今天再次研究才发现，原来是sina这鸟地方也跟风改成Oauth认证了，我说怎么就同步不过去 再次参阅教程改进，看来在同步到墙内只靠GAE是力不从心了，只能配合follow5来实现。这follow5听说许久，本以为就是个普'
date: '2010-10-15'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'e7-bb-88-e6-9e-81-e5-90-8c-e6-ad-a5-e5-a5-a5-e4-b9-89follow5'
---

<font color="#000000" face="微软雅黑">前几天用月光的教程搭个GAE的应用，每天运行正常的很，流量也够猛，就是没有效果，今天再次研究才发现，原来是sina这鸟地方也跟风改成Oauth认证了，我说怎么就同步不过去</font>

<font color="#000000" face="微软雅黑">再次参阅教程改进，看来在同步到墙内只靠GAE是力不从心了，只能配合follow5来实现。这follow5听说许久，本以为就是个普普通通的微博服务，不过今天注册了一下，发现这其它地方虽然亮点有限，可这同步功能可算是我见过的最强大的，墙内各网，无所不能同，当然，除了狗日的腾讯</font>

<font color="#000000" face="微软雅黑">步骤还是如以前，大概记录一下：</font>

<font color="#000000" face="微软雅黑">1\. 先建个GAE的app, 起个名当然</font>

<font color="#000000" face="微软雅黑">2\. 下载脚本 [http://j.mp/cabJi6](http://j.mp/cabJi6 "http://j.mp/cabJi6")， 没测试是不是和我当时下的一样，应该是这个， 原出处懒得去看了</font>

<font color="#000000" face="微软雅黑">3\. 小改一下：</font>

<font color="#000000" face="微软雅黑">用写字板打开app.yaml，修改第一行的yourappid为你建立的APP应用名字，保存关闭</font>

<font color="#000000" face="微软雅黑">用写字板打开cron.yaml，修改schedule: every 5 minutes这一行的数字为你希望的同步间隔，保存关闭；</font>

<font color="#000000" face="微软雅黑">用写字板打开twitter.py，找到下面这段：</font>

<font color="#000000" face="微软雅黑"># You MUST modify your username and password here #</font>

<font color="#000000" face="微软雅黑">#ret = send_sina_msgs(&quot;username @sina.com&quot;,&quot; password &quot;,text)</font>

<font color="#000000" face="微软雅黑">#ret = send_163_msgs(&quot;username@163.com&quot;,&quot;password&quot;,text)</font>

<font color="#000000" face="微软雅黑">#ret = send_sohu_msgs(&quot;username@sohu.com&quot;,&quot;password&quot;,text)</font>

<font color="#000000" face="微软雅黑">#ret = send_9911_msgs(&quot;username&quot;,&quot;password&quot;,text)</font>

<font color="#000000" face="微软雅黑">#ret = send_zuosa_msgs(&quot;username &quot;,&quot; password &quot;,text)</font>

<font color="#000000" face="微软雅黑">#ret = send_renjian_msgs(&quot;username&quot;,&quot;password&quot;,text)</font>

<font color="#000000" face="微软雅黑">#ret = send_follow5_msgs(&quot;username &quot;,&quot; password &quot;,text)</font>

<font color="#000000" face="微软雅黑">#ret = send_pingfm_msgs(&quot;api_key&quot;,&quot;user_app_key&quot;,text)</font>

<font color="#000000" face="微软雅黑">#ret = send_hellotxt_msgs(&quot;user_key&quot;,&quot;app_key&quot;,text)</font>

<font color="#000000" face="微软雅黑">打掉注释，改一下follow5那行即可</font>

<font color="#000000" face="微软雅黑">4\. 老方法上传</font>

<font color="#000000" face="微软雅黑">5\. 去follow5那把同步功能选几个想要的开了</font>

<font color="#000000" face="微软雅黑">搞定</font>
