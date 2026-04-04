---
title: 'twitter导入sina微博'
description: '继twitter信息半成功导入人人网后，下一块硬石头新浪网也被攻克了，当然，就是不知道和人人比起来，新浪的审查是不是会更严一点....... 惯例把方法记录在此： 还是一个伟大的python脚本 使用方法： 1，修改Twitter2Sina 脚本 的最后一行，填入twitter账号，新浪微博账号和新'
date: '2010-08-13'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'twitter-e5-af-bc-e5-85-a5sina-e5-be-ae-e5-8d-9a'
---

<div id="msgcns!1326AB98D6395CF4!1969" class="bvMsg">继twitter信息半成功导入人人网后，下一块硬石头新浪网也被攻克了，当然，就是不知道和人人比起来，新浪的审查是不是会更严一点.......<div>
</div><div>惯例把方法记录在此：</div><div>
</div><div>还是一个伟大的python脚本</div><div>
</div><div><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">使用方法：</span><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">
</span><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">1，修改Twitter2Sina</span><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">脚本 的最后一行，填入twitter账号，新浪微博账号和新浪微博的密码。</span><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">
</span><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">2，修改cron.yaml修改cron job执行频率，默认使用1分钟一次。</span><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">
</span><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">3，修改app.yaml填入应用的id</span><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">
</span><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">上传到GAE即可</span></div><div><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">
</span></div><div><font face="Verdana, Geneva, Arial, Helvetica, sans-serif" size="3"><span style="font-size:13px;line-height:20px;">脚本下载在此： http://goo.gl/BnKF</span></font></div><div><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">
</span></div><div><span style="font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;font-size:13px;line-height:20px;">等了五分钟，成功搞定，没问题，就是原本twitter推里嵌入的短网址，再一次自动的被新浪缩短，这短上加短，怎么感觉反而长了...........</span></div></div>
