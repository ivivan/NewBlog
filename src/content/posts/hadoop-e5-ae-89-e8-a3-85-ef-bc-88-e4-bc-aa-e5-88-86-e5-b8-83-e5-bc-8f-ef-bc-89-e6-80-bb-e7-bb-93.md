---
title: 'Hadoop安装（伪分布式）总结'
description: '申请的电脑还没批下，只得用现有的Laptop装上ubuntu12.04搭了一个伪分布式的Hadoop系统，部分安装过程至今尚未搞清，不过还好不影响正常的运行和程序调试 系统：ubuntu12.04 64位版 Hadoop1.0.3 以下转一篇写的算是很清楚的安装日志，不过在实际过程中还是出现了一堆问'
date: '2012-08-14'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'hadoop-e5-ae-89-e8-a3-85-ef-bc-88-e4-bc-aa-e5-88-86-e5-b8-83-e5-bc-8f-ef-bc-89-e6-80-bb-e7-bb-93'
---

<font size="2" face="微软雅黑">申请的电脑还没批下，只得用现有的Laptop装上ubuntu12.04搭了一个伪分布式的Hadoop系统，部分安装过程至今尚未搞清，不过还好不影响正常的运行和程序调试</font>

<font size="2" face="微软雅黑">系统：ubuntu12.04 64位版 Hadoop1.0.3</font>

<font size="2" face="微软雅黑">以下转一篇写的算是很清楚的安装日志，不过在实际过程中还是出现了一堆问题，补充在最后</font>

**<font size="2" face="微软雅黑">一. 在Ubuntu下创建hadoop用户组和用户;</font>**

<font face="微软雅黑"></font><font size="2">**1.** 创建hadoop用户组;</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`sudo` `addgroup hadoop`</font>

<font size="2" face="微软雅黑">如图：</font>

<font size="2" face="微软雅黑">![](http://m1.img.libdd.com/farm4/247/A4F7CC07CA789BE5AC25E7952B8411F7_411_125.PNG)</font>

<font face="微软雅黑"></font><font size="2">**2\. **创建hadoop用户;</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`sudo` `adduser -ingroup hadoop hadoop`</font>

<font size="2" face="微软雅黑">如图：</font>

<font size="2" face="微软雅黑">![](http://m2.img.libdd.com/farm4/242/C09A95E53257EBCCB22E5B5C4D649DF2_500_276.jpg)</font>

<font face="微软雅黑"></font><font size="2">**3\. **给hadoop用户添加权限，打开/etc/sudoers文件;</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`sudo` `gedit ``/etc/sudoers`</font>

<font size="2" face="微软雅黑">按回车键后就会打开/etc/sudoers文件了，给hadoop用户赋予root用户同样的权限。</font>

<font size="1" face="微软雅黑">在root&#160;&#160; ALL=(ALL:ALL)&#160;&#160; ALL下添加hadoop&#160;&#160; ALL=(ALL:ALL)&#160; ALL，</font>

<font size="2" face="微软雅黑">1 </font>`<font size="2" face="微软雅黑">hadoop&#160; ALL=(ALL:ALL) ALL</font>`

<font size="2" face="微软雅黑">如图：</font>

<font size="2" face="微软雅黑">![](http://m3.img.libdd.com/farm4/90/7A4ACE8A99AE1F3DCA45BFEDE5CB985A_347_163.PNG)</font>

**<font size="2" face="微软雅黑">三. 在Ubuntu下安装JDK</font>**

<font size="2" face="微软雅黑">使用如下命令执行即可：</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`sudo` `apt-get ``install` `openjdk-6-jre`</font>

<font size="2" face="微软雅黑">如图：</font>

<font size="2" face="微软雅黑">![](http://m1.img.libdd.com/farm4/37/106AEB25E755F6FD72553E88A39EC625_500_272.jpg)</font>

**<font size="2" face="微软雅黑">四. 修改机器名</font>**

<font size="2" face="微软雅黑">每当ubuntu安装成功时，我们的机器名都默认为：ubuntu ，但为了以后集群中能够容易分辨各台服务器，需要给每台机器取个不同的名字。机器名由 /etc/hostname文件决定。</font>

<font face="微软雅黑"></font><font size="2">**1\. **打开/etc/hostname文件;</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`sudo` `gedit ``/etc/hostname`</font>

<font face="微软雅黑"></font><font size="2">**2\. **将/etc/hostname文件中的ubuntu改为你想取的机器名。这里我取&quot;dubin-ubuntu&quot;。** 重启系统后才会生效。**</font>

**<font size="2" face="微软雅黑">五. 安装ssh服务</font>**

<font size="2" face="微软雅黑">这里的ssh和三大框架:spring,struts,hibernate没有什么关系，ssh可以实现远程登录和管理，具体可以参考其他相关资料。</font>

<font size="2" face="微软雅黑">安装openssh-server;</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`sudo` `apt-get ``install` `ssh` `openssh-server`</font>

<font size="2" face="微软雅黑">这时假设您已经安装好了ssh，您就可以进行第六步了哦~</font>

**<font size="2" face="微软雅黑">六、 建立ssh无密码登录本机</font>**

<font face="微软雅黑"></font><font size="2">**首先**要转换成hadoop用户，执行以下命令：</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`su` `- hadoop`</font>

<font size="2" face="微软雅黑">如图：</font>

<font size="2" face="微软雅黑">![](http://m3.img.libdd.com/farm4/32/CF23A8FFAF35FF4D2C241118CAC23920_438_90.PNG)</font>

<font size="2" face="微软雅黑">ssh生成密钥有rsa和dsa两种生成方式，默认情况下采用rsa方式。</font>

<font face="微软雅黑"></font><font size="2">**1\. **创建ssh-key，，这里我们采用rsa方式;</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`ssh``-keygen -t rsa -P ``&quot;&quot;`</font>

<font size="2" face="微软雅黑">如图：</font>

<font size="2" face="微软雅黑">![](http://m3.img.libdd.com/farm4/17/80D479F1992B9BE98BA476ECA5D0B611_500_333.jpg)</font>

<font size="2" face="微软雅黑">（注：回车后会在~/.ssh/下生成两个文件：id_rsa和id_rsa.pub这两个文件是成对出现的）</font>

<font face="微软雅黑"></font><font size="2">**2\. **进入~/.ssh/目录下，将id_rsa.pub追加到authorized_keys授权文件中，开始是没有authorized_keys文件的;</font>

<font face="微软雅黑"></font><font size="2">`cd` `~/.``ssh`</font>

<font face="微软雅黑"></font><font size="2">`cat` `id_rsa.pub &gt;&gt; authorized_keys`</font>

<font size="2" face="微软雅黑">如图：</font>

<font size="2" face="微软雅黑">![](http://m3.img.libdd.com/farm4/172/442846248D642A775F7970A956DB4CAC_500_43.jpg)</font>

<font size="2" face="微软雅黑">（完成后就可以无密码登录本机了。）</font>

<font face="微软雅黑"></font><font size="2">**3\. **登录localhost;</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`ssh` `localhost`</font>

<font size="2" face="微软雅黑">如图：</font>

<font size="2" face="微软雅黑">( 注：当ssh远程登录到其它机器后，现在你控制的是远程的机器，需要执行退出命令才能重新控制本地主机。)</font>

<font face="微软雅黑"></font><font size="2">**4\. **执行退出命令;</font>

<font size="2" face="微软雅黑">1 </font>`<font size="2" face="微软雅黑">exit</font>`

**<font size="2" face="微软雅黑">七. 安装hadoop</font>**

<font size="2" face="微软雅黑">我们采用的hadoop版本是：hadoop-0.20.203（</font>[<font size="2" face="微软雅黑">http://www.apache.org/dyn/closer.cgi/hadoop/common/&#160; </font>](http://www.apache.org/dyn/closer.cgi/hadoop/common/)<font size="2" face="微软雅黑">），因为该版本比较稳定。</font>

<font face="微软雅黑"></font><font size="2">**1\. **假设hadoop-0.20.203.tar.gz在桌面，将它复制到安装目录 /usr/local/下；</font>

<font size="2" face="微软雅黑">1 </font><font face="微软雅黑"></font><font size="2">`sudo` `cp` `hadoop-0.20.203.0rc1.``tar``.gz ``/usr/local/`</font>

<font face="微软雅黑"></font><font size="2">**2\. **解压hadoop-0.20.203.tar.gz；</font>

<font face="微软雅黑"></font><font size="2">`cd` `/usr/local`</font>

<font face="微软雅黑"></font><font size="2">`sudo` `tar` `-zxf hadoop-0.20.203.0rc1.``tar``.gz`</font>

<font face="微软雅黑"></font><font size="2">**3\. **将解压出的文件夹改名为hadoop;</font>

<font face="微软雅黑"></font><font size="2">`sudo` `mv` `hadoop-0.20.203.0 hadoop`</font>

<font face="微软雅黑"></font><font size="2">**4\. **将该hadoop文件夹的属主用户设为hadoop，</font>

<font face="微软雅黑"></font><font size="2">`sudo` `chown` `-R hadoop:hadoop hadoop`</font>

<font face="微软雅黑"></font><font size="2">**5\. **打开hadoop/conf/hadoop-env.sh文件;</font>

<font face="微软雅黑"></font><font size="2">`sudo` `gedit hadoop``/conf/hadoop-env``.sh`</font>

<font face="微软雅黑"></font><font size="2">**6\. **配置conf/hadoop-env.sh（找到#export JAVA_HOME=...,去掉#，然后加上本机jdk的路径）;</font>

`<font size="2" face="微软雅黑">export JAVA_HOME=/usr/lib/jvm/java-6-openjdk</font>`

<font face="微软雅黑"></font><font size="2">**7\. **打开conf/core-site.xml文件;</font>

<font face="微软雅黑"></font><font size="2">`sudo` `gedit hadoop``/conf/core-site``.xml`</font>

<font size="2" face="微软雅黑">编辑如下：</font>

<font face="微软雅黑"></font><font size="2">`&lt;?``xml` `version``=``&quot;1.0&quot;``?&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;?``xml-stylesheet` `type``=``&quot;text/xsl&quot;` `href``=``&quot;configuration.xsl&quot;``?&gt;`</font>

`<font size="2" face="微软雅黑"></font>`

`<font size="2" face="微软雅黑">&lt;!-- Put site-specific property overrides in this file. --&gt;</font>`

`<font size="2" face="微软雅黑"></font>`

<font face="微软雅黑"></font><font size="2">`&lt;``configuration``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``property``&gt;&#160; `</font>

<font face="微软雅黑"></font><font size="2">`&lt;``name``&gt;fs.default.name&lt;/``name``&gt;&#160; `</font>

<font face="微软雅黑"></font><font size="2">`&lt;``value``&gt;[hdfs://localhost:9000](9000)&lt;/``value``&gt;&#160;&#160; `</font>

<font face="微软雅黑"></font><font size="2">`&lt;/``property``&gt;&#160; `</font>

<font face="微软雅黑"></font><font size="2">`&lt;/``configuration``&gt;`</font>

<font face="微软雅黑"></font><font size="2">**8\. **打开conf/mapred-site.xml文件;</font>

<font face="微软雅黑"></font><font size="2">`sudo` `gedit hadoop``/conf/mapred-site``.xml`</font>

<font size="2" face="微软雅黑">编辑如下：</font>

<font face="微软雅黑"></font><font size="2">`&lt;?``xml` `version``=``&quot;1.0&quot;``?&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;?``xml-stylesheet` `type``=``&quot;text/xsl&quot;` `href``=``&quot;configuration.xsl&quot;``?&gt;`</font>

`<font size="2" face="微软雅黑"></font>`

`<font size="2" face="微软雅黑">&lt;!-- Put site-specific property overrides in this file. --&gt;</font>`

`<font size="2" face="微软雅黑"></font>`

<font face="微软雅黑"></font><font size="2">`&lt;``configuration``&gt;&#160; `</font>

<font face="微软雅黑"></font><font size="2">`&lt;``property``&gt;&#160;&#160; `</font>

<font face="微软雅黑"></font><font size="2">`&lt;``name``&gt;mapred.job.tracker&lt;/``name``&gt;&#160; `</font>

<font face="微软雅黑"></font><font size="2">`&lt;``value``&gt;localhost:9001&lt;/``value``&gt;&#160;&#160; `</font>

<font face="微软雅黑"></font><font size="2">`&lt;/``property``&gt;&#160; `</font>

<font face="微软雅黑"></font><font size="2">`&lt;/``configuration``&gt;`</font>

<font face="微软雅黑"></font><font size="2">**9\. **打开conf/hdfs-site.xml文件;</font>

<font face="微软雅黑"></font><font size="2">`sudo` `gedit hadoop``/conf/hdfs-site``.xml`</font>

<font size="2" face="微软雅黑">编辑如下：</font>

<font face="微软雅黑"></font><font size="2">`&lt;``configuration``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``property``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``name``&gt;dfs.name.dir&lt;/``name``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``value``&gt;/usr/local/hadoop/datalog1,/usr/local/hadoop/datalog2&lt;/``value``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;/``property``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``property``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``name``&gt;dfs.data.dir&lt;/``name``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``value``&gt;/usr/local/hadoop/data1,/usr/local/hadoop/data2&lt;/``value``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;/``property``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``property``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``name``&gt;dfs.replication&lt;/``name``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;``value``&gt;2&lt;/``value``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;/``property``&gt;`</font>

<font face="微软雅黑"></font><font size="2">`&lt;/``configuration``&gt;`</font>

<font face="微软雅黑"></font><font size="2">**10\. **打开conf/masters文件，添加作为secondarynamenode的主机名，作为单机版环境，这里只需填写** localhost** 就Ok了。</font>

<font face="微软雅黑"></font><font size="2">`sudo` `gedit hadoop``/conf/masters`</font>

<font face="微软雅黑"></font><font size="2">**11\. **打开conf/slaves文件，添加作为slave的主机名，一行一个。作为单机版，这里也只需填写** localhost**就Ok了。</font>

<font face="微软雅黑"></font><font size="2">`sudo` `gedit hadoop``/conf/slaves`</font>

**<font size="2" face="微软雅黑">八. 在单机上运行hadoop</font>**

<font face="微软雅黑"></font><font size="2">**1\. **进入hadoop目录下，格式化hdfs文件系统，初次运行hadoop时一定要有该操作，</font>

<font face="微软雅黑"></font><font size="2">`cd` `/usr/local/hadoop/`</font>

<font face="微软雅黑"></font><font size="2">`bin``/hadoop` `namenode -``format`</font>

<font face="微软雅黑"></font><font size="2">**2\. **当你看到下图时，就说明你的hdfs文件系统格式化成功了。</font>

<font size="2" face="微软雅黑">![](http://m3.img.libdd.com/farm5/136/32EA7B6BD6013BAA9B160AEE5C084088_500_103.jpg)</font>

<font face="微软雅黑"></font><font size="2">**3\. **启动bin/start-all.sh</font>

<font face="微软雅黑"></font><font size="2">`bin``/start-all``.sh`</font>

<font face="微软雅黑"></font><font size="2">**4\. **检测hadoop是否启动成功</font>

`<font size="2" face="微软雅黑">jps</font>`

<font size="2" face="微软雅黑">如果有Namenode，SecondaryNameNode，TaskTracker，DataNode，JobTracker五个进程，就说明你的hadoop单机版环境配置好了！</font>

<font size="2" face="微软雅黑">如下图：</font>

<font size="2" face="微软雅黑">![](http://m3.img.libdd.com/farm5/121/1F30C66942D136BA64589626F7FAC579_406_202.PNG)</font>

<font size="2" face="微软雅黑"></font>

<font size="2" face="微软雅黑">基本上，我的Hadoop安装参考了以上日志的大部分，其中出现的问题解决如下：</font>

<font size="2" face="微软雅黑">1\. 第一次安装时我的ubuntu系统存在一个用户，hadoop用户为后添加，结果在用户的权限上出了很多问题，始终无法解决，后来把ubuntu重装，hadoop设成唯一的用户，问题解决</font>

<font size="2" face="微软雅黑">2\. 此日志中使用了open java JDK，其它很多日志提出使用java公司的JDK更好，我在最后的安装中使用了java的JDK7, openjdk为ubuntu自带，免安装，也基本不用配置，java jdk需要自行下载安装配置，比较繁琐，放在另一篇日志中详谈</font>

<font size="2" face="微软雅黑">3\. Ubuntu下测试ssh时使用ssh localhost 命令，出现错误提示connect to host localhost port 22:Connection refused</font>

<font size="2" face="微软雅黑">造成这个错误的原因可能是ssh-server未安装或者未启动。ubuntu默认安装openssh-client，但是木有安装server</font>

<font size="2" face="微软雅黑">运行 ps -e | grep ssh，查看是否有sshd进程</font>

<font size="2" face="微软雅黑">如果没有，说明server没启动，通过 /etc/init.d/ssh -start 启动server进程，如果提示ssh不存在 那么就是没安装server</font>

<font size="2" face="微软雅黑">通过 sudo apt-get install openssh-server命令安装即可</font>

<font size="2" face="微软雅黑">4\. jps命令无效</font>

<font size="2" face="微软雅黑">重启后解决</font>

&lt;

p&gt;<font size="2" face="微软雅黑">5\. ssh 如有问题，基本上是要手动设置不同文件和文件夹的权限</font>
