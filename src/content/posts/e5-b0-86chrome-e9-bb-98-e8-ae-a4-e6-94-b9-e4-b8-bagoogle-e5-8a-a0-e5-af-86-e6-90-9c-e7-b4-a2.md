---
title: '将chrome默认改为google加密搜索'
description: '自从google https搜索上线后，网上就已经有人详细的讲解了修改chrome地址栏默认搜索的方法，不过这几天正赶上google加密搜索换域名，而且又很自然的被天朝DNS污染了，改到小复杂了点，整理如下： 1\. 先改host，添加如下： 66.249.89.104 encrypted.goog'
date: '2010-07-27'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'e5-b0-86chrome-e9-bb-98-e8-ae-a4-e6-94-b9-e4-b8-bagoogle-e5-8a-a0-e5-af-86-e6-90-9c-e7-b4-a2'
---

<div id="msgcns!1326AB98D6395CF4!1873" class="bvMsg">自从google https搜索上线后，网上就已经有人详细的讲解了修改chrome地址栏默认搜索的方法，不过这几天正赶上google加密搜索换域名，而且又很自然的被天朝DNS污染了，改到小复杂了点，整理如下：<div>1\. 先改host，添加如下：</div><div><span style="font-size:13px;line-height:19px;">66.249.89.104 </span><span style="font-size:13px;line-height:19px;">encrypted.google.com        当然</span><span style="font-size:13px;line-height:19px;">209.85.225.104也可以</span></div><div><span style="font-size:13px;line-height:19px;">2\. 右键地址栏，修改搜索引擎</span></div><div><span style="font-size:13px;line-height:19px;">添加一个，前两项我感觉可以随便发挥，第三个填如下：</span><span style="font-size:13px;line-height:19px;">https://encrypted.google.com/search?hl=zh-CN&amp;q=%s</span></div><div><span style="font-size:13px;line-height:19px;">3\. 设为默认，保存结束</span></div></div>
