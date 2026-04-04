---
title: 'G1 字体移动'
description: 'G1 system区太小，更换大字体时很容易受限，移动到data区，再建个软链接，可解决 复制cp a /system/fonts /data/ 删除rm rf /system/fonts 软链接ln s /data/fonts /system/fonts 注意新加字体的权限，仿照其它字体修改，用R'
date: '2010-09-06'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'g1-e5-ad-97-e4-bd-93-e7-a7-bb-e5-8a-a8'
---

<div id="msgcns!1326AB98D6395CF4!2714" class="bvMsg">

G1 system区太小，更换大字体时很容易受限，移动到data区，再建个软链接，可解决

**复制cp -a /system/fonts /data/**

**删除rm -rf /system/fonts**

**软链接ln -s /data/fonts /system/fonts**

**注意新加字体的权限，仿照其它字体修改，用RE管理器即可**
  </div>
