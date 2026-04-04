---
title: 'twittertorenren, twitter同步到人人网，Google app Engine的另一强大应用'
id: 20
categories:
  - 工作相关
date: 2010-08-01 12:03:00
tags:
---

<div id="msgcns!1326AB98D6395CF4!1899" class="bvMsg"> 

web2.0的时代，没有什么能阻止信息的流通，解决一切障碍也只是时间问题……….

以前因为觉得google app engine和python麻烦，错过了很多好应用，自从前几日耐不住寂寞搭了个twitter的api后，今天把很久前google reader里标星的一篇有关twitter同步人人网的文翻出来，实验一下，效果良好，记录如下：

1\. 相关下载，要求与之前写的搭api一文中相同，不再赘述

2\. 从Google app Engine里建一个新应用，方便说明，地址假定abc，其它照旧随便。这里发现原来Google app Engine只是在开通的时候要短信验证，以后建应用就不用了。而且不是传说中的只有三个，是可以建十个。

3\. 下载以下三个文件，在google_appengine文件夹下新建一个文件夹renren放入，名不要改。不知道google_appengine在哪的继续复习前文

详述：

1\. **脚本文件twitter2renren.py：下载地址：[http://goo.gl/K5OI](http://goo.gl/K5OI "http://goo.gl/K5OI")**

[![下载](http://ivanbuaa.files.wordpress.com/2010/08/e4b88be8bdbd_thumb5b15d.jpg?w=94 "下载")](https://bylmgg.bay.livefilestore.com/y1m4jRq3E2yQmEjIireCtLdWbDhxBREQxR-21H-7lsvjKIm5AWV5232rrj9KcQWmI0IATbEyo0SsNfvNREHI5k9ob8EEIbE-KFDxOgrL2a2MuIcLvetT4m0l0hW7hUk4lJqkpGrLs9QIcBgsI7FXR4zyA/%E4%B8%8B%E8%BD%BD[3].jpg?download&amp;psid=1)

打开twitter2renren.py，按其中提示的部分进行修改，其它地方不用管。

其中第17，18两行解释一下：如下图所示，在twitter上发的每一条推都有一个独一无二的编号，注意地址栏里的数字20054753629，自己看一下，选一个填上，如果看不懂，也可以不动，不影响，只不过会第一次大量的同步可能会有刷屏效果而已，也有说最多只会同步十条，没试。

[![image](https://bylmgg.bay.livefilestore.com/y1mM4kc-g6udHelcZN5KDvuV3w1BlfTiwXSb3mxI2p8KHMG37Kc1Lnp0wYFn07Tza8oomkT42PKdpCZ6-LJ4s5qDexKTqxcpM0zykQUMmfawZzB4Rz-aAtvRtuiEg0zJO8CCYT1HD4Jp5XoMQLd0gc8bA/image_thumb[3] 049ED756.png?download&amp;psid=1 "image")](https://bylmgg.bay.livefilestore.com/y1mixWA4_du9wkyfKxP-65diPqQaSdQy2OoYzH-fW9d2AxueEPyR655XfXKjf9tVn7u0x2jZHIbSAgzB1ut1eRx4BeR9RAPh0gMfwTb_IK4dZbh5W1QiJQV5fgbtX6ppvXL6_8FsrL86tG--rgvhEgnIQ/image[5] 33F10E87.png?download&amp;psid=1)

修改完后保存即可。

2\. **配置文件cron.yaml，每5分钟触发一次： 下载地址：[http://goo.gl/gRf9](http://goo.gl/gRf9 "http://goo.gl/gRf9")**

[![下载 (1)](http://ivanbuaa.files.wordpress.com/2010/08/e4b88be8bdbd28129_thumb5b15d.jpg?w=300 "下载 (1)")](https://bylmgg.bay.livefilestore.com/y1mOiPdz9bZcKT4VPZzvY3Wa4UuQh_oyPJcZ8ZDGKCemvZYG4h0bVT1L5GUvnpouHaQdCmK-1Ewf9ynT9DEpzH3jmhxiyu3oiV16J6UXes2xLqF2y62ioqTZ0A46r_XiRiuLPM_waECsHD_w5jcxMx0jQ/%E4%B8%8B%E8%BD%BD (1)[3].jpg?download&amp;psid=1)

此文件完全不用修改，如果想的话可以动一下触发时间

3\. **配置文件app.yaml，限制只有管理员才能访问/twitter2renren：下载地址：[http://goo.gl/bzvs](http://goo.gl/bzvs "http://goo.gl/bzvs")**

[![下载 (2)](http://ivanbuaa.files.wordpress.com/2010/08/e4b88be8bdbd28229_thumb5b15d.jpg?w=300 "下载 (2)")](https://bylmgg.bay.livefilestore.com/y1mx7e-2DFCdnjg_aCO2knt-kZFxmhyYHAGg2kHp6kdVp7OzMxn_0Re28LHApsly6uNEqqOBEUQHXU_meFhAptBaNxKIGhB55GkIuKz_NqsnIfAS4rIajXTeZdxa_SzjyCNF4iwjd7d-FDzOsJWXzT-yA/%E4%B8%8B%E8%BD%BD (2)[3].jpg?download&amp;psid=1)

把第一行改成自己建的app名，其实应该是那个地址名，也就是abc

其它不用管

4.以上三个文件修改后，运行cmd,进入google_appengine目录

执行上传命令，与上篇文一样   appcfg.py update renren

过程中输入google账号和密码，等待，自动完成

5\. 结束，可去google app engine控制台看一下运行情况，不出意外，很快人人网的同步消息就到了

**<font size="3">注意事项及重要补充说明：</font>**

1\. 避免使用“记事本/notepad“编辑twitter2renren.py。起码去下个notepad++再来混，这是素质问题

2\. 允许同步以&quot;@&quot;开头的tweet：注释掉第46行，同时将第47行的缩进减小一格。

python的注释用#放在句首就可以，别太业余

3.取消同步retweet：注释掉第38, 39, 42, 43, 48, 49行。

4.cron脚本是负责自动同步的。login: admin的作用是防止手动刷新

5.人人网是有自。动。审。查。的，所以遗失某些推的话不要声张，低调

6.三个文件我存到skydriver了，如下不了去那下，不过这种可能性很小

<font size="5">最重要的是第7条：</font>

7.人人网是存在于天朝的优秀社交网站，twitter这个鸟网是不存在的，因此，这其实是篇科幻小说，一切都是假象…………
  </div>