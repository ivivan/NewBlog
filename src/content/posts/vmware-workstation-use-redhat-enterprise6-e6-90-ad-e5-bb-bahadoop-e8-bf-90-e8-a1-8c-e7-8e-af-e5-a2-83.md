---
title: 'VMWare Workstation use RedHat Enterprise6搭建Hadoop运行环境'
description: '学校不允许使用固定IP，手头没有路由器，服务器机房不通网，每周例会时间紧迫，只得用VMware 虚拟Linux3台，跑跑实验应付过关，参考他人工作，总结如下： 整个Hadoop环境搭建过程用到了三个虚拟机：Red Hat Linux1、Red Hat Linux2、Red Hat Linux3，其I'
date: '2012-11-23'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'vmware-workstation-use-redhat-enterprise6-e6-90-ad-e5-bb-bahadoop-e8-bf-90-e8-a1-8c-e7-8e-af-e5-a2-83'
---

<font size="2" face="微软雅黑">学校不允许使用固定IP，手头没有路由器，服务器机房不通网，每周例会时间紧迫，只得用VMware 虚拟Linux3台，跑跑实验应付过关，参考他人工作，总结如下：</font>

<font size="2" face="微软雅黑">整个Hadoop环境搭建过程用到了三个虚拟机：Red Hat Linux1、Red Hat Linux2、Red Hat Linux3，其IP地址分别为192.168.11.188、192.168.11.189、192.168.11.190（具体为虚拟机分配IP的过程下面详细说明）。其中192.168.11.188作为Hadoop的Namenode和Jobtracker。其他两台机器均作为Datanode和Tasktracker。</font>

<font size="2" face="微软雅黑"></font>

<font size="2" face="微软雅黑">环境搭建过程中用到的软件及版本如下：</font>

<font face="微软雅黑"></font><font size="2">**VMWare Workstation****：VMware-workstation-full-9.0.1**</font>

**<font size="2" face="微软雅黑">JDK：1.7</font>**

**<font size="2" face="微软雅黑">Hadoop：hadoop-1.0.3</font>**

**<font size="2" face="微软雅黑">Linux：Redhat Linux Enterprise 6</font>**

<font size="2" face="微软雅黑">安装过程：</font>

**<font size="2" face="微软雅黑">一、VMWare Workstation安装</font>**

<font size="2" face="微软雅黑">&#160;&#160;&#160;&#160;&#160;&#160; 略，软件官网下载，序列号下列任选</font>

<font size="2" face="微软雅黑">JA4YE-48J57-VZEF1-D91ZP-3CDP9      
4U6W2-2D290-4ZE08-2VCE6-2CDM9       
JG6QL-06J0J-ZZY21-TJAQ6-0256M       
NY0K2-2ULDJ-LZUP1-MV154-8363F       
4F4R4-AEK53-TZYU9-KK9X4-9AWPQ</font>

**<font size="2" face="微软雅黑">二、虚拟机的安装</font>**

**<font size="2" face="微软雅黑">安装过程自动，Redhat Enterprise6虚拟机至少需要划分12G硬盘空间，否则提示空间不足，可创建三次虚拟机，也可创建一次Copy两次，不过后者需要手动修改网卡Mac地址，否则三个虚拟机一样无法互联</font>**

<font size="2" face="微软雅黑"></font>

**<font size="2" face="微软雅黑">1\. 更改三个虚拟机的网络连接方式</font>**

<font size="2" face="微软雅黑">选中虚拟机点击Setting, 如下图：</font>

[<font size="2" face="微软雅黑">![0_13068324876V1G](http://ivanbuaa.files.wordpress.com/2012/11/0_13068324876v1g_thumb.gif "0_13068324876V1G")</font>](http://ivanbuaa.files.wordpress.com/2012/11/0_13068324876v1g.gif)

<font size="2" face="微软雅黑"></font>

**<font size="2" face="微软雅黑">2\. 配置虚拟机的IP地址和主机名</font>**

<font size="2" face="微软雅黑">Linux Terminal 里改为Root用户 su root</font>

<font size="2" face="微软雅黑">输入如下指令：</font>

<font size="2" face="微软雅黑">vi /etc/sysconfig/network-scripts/ifcfg-eth0</font>

<font size="2" face="微软雅黑">三台虚拟机分别设置IP地址和默认网关，进行保存</font>

<font size="2" face="微软雅黑">BOOTPROTO=&quot;static&quot;      
IPADDR=&quot;192.168.11.188&quot;       
GATEWAY=&quot;192.168.11.9&quot;       
NETMASK=&quot;255.255.255.0&quot;       
ONBOOT=&quot;yes&quot;       
添加修改以上几项即可</font>

<font size="2" face="微软雅黑">vi简单使用，i 键进入编辑模式，esc退出至只读，:进入命令行，wq保存退出</font>

<font size="2" face="微软雅黑">3\. 配置虚拟机主机名</font>

<font size="2" face="微软雅黑">vi /etc/sysconfig/network</font>

<font size="2" face="微软雅黑">HOSTNAME=redhat1</font>

[<font size="2" face="微软雅黑">![0_1306832587vUKw](http://ivanbuaa.files.wordpress.com/2012/11/0_1306832587vukw_thumb.gif "0_1306832587vUKw")</font>](http://ivanbuaa.files.wordpress.com/2012/11/0_1306832587vukw.gif)

<font size="2" face="微软雅黑">三 安装JAVA JDK</font>

<font size="2" face="微软雅黑">外部文件可直接COPY到虚拟机目录中，不需安装软件</font>

<font size="2" face="微软雅黑">例如COPY Java Jdk至 Downloads文件夹，命令行执行如下</font>

<font size="2" face="微软雅黑">rpm -ivh jdk-7u9-linux-x64.rpm</font>

<font size="2" face="微软雅黑">JDK自动安装至 /usr/java文件夹下</font>

<font size="2" face="微软雅黑">命令行输入java查看是否安装成功</font>

[<font size="2" face="微软雅黑">![0_1306833927DP9i](http://ivanbuaa.files.wordpress.com/2012/11/0_1306833927dp9i_thumb.gif "0_1306833927DP9i")</font>](http://ivanbuaa.files.wordpress.com/2012/11/0_1306833927dp9i.gif)

<font size="2" face="微软雅黑"></font>

[<font size="2" face="微软雅黑">![0_1306833972Oz5m](http://ivanbuaa.files.wordpress.com/2012/11/0_1306833972oz5m_thumb.gif "0_1306833972Oz5m")</font>](http://ivanbuaa.files.wordpress.com/2012/11/0_1306833972oz5m.gif)

**<font size="2" face="微软雅黑">至此，JDK安装和配置全部完成</font>**

**<font size="2" face="微软雅黑">四 建立虚拟机之间SSH无密码登陆</font>**

[<font size="2" face="微软雅黑">![1](http://ivanbuaa.files.wordpress.com/2012/11/1_thumb.gif "1")</font>](http://ivanbuaa.files.wordpress.com/2012/11/1.gif)

[<font size="2" face="微软雅黑">![2](http://ivanbuaa.files.wordpress.com/2012/11/2_thumb.gif "2")</font>](http://ivanbuaa.files.wordpress.com/2012/11/2.gif)

<font size="2" face="微软雅黑">注意 执行如 ssh localhost后开通ssh服务，需exit后再执行其它命令</font>

<font size="2" face="微软雅黑">Copy id_dsa.pub 文件至子结点时 scp /root/.ssh/id_dsa.pub </font>[<font size="2" face="微软雅黑">root@192.168.11.189:/root</font>](mailto:root@192.168.11.189:/root)

<font size="2" face="微软雅黑">注意写全路径或进入root目录下执行命令，否则可能找不到文件，同理之后操作</font>

<font size="2" face="微软雅黑">cat /root/id_dsa.pub &gt;&gt; /root/.ssh/authorized_keys</font>

**<font size="2" face="微软雅黑">虚拟机之间SSH无密码登录配置成功，下面就要进行Hadoop环境的安装</font>**

**<font size="2" face="微软雅黑">五 Hadoop 环境安装</font>**

**<font size="2" face="微软雅黑">1\. 安装Hadoop</font>**

**<font size="2" face="微软雅黑">官网下载，只需解压，放在/usr下</font>**

**<font size="2" face="微软雅黑">解压命令 tar –zvxf hadoop-1.0.3.tar.gz</font>**

**<font size="2" face="微软雅黑">移动命令 cp –r hadoop-1.0.3 /usr</font>**

**<font size="2" face="微软雅黑">2\. 配置Hadoop 环境变量</font>**

**<font size="2" face="微软雅黑">vi /etc/profile</font>**

[<font size="2" face="微软雅黑">![3](http://ivanbuaa.files.wordpress.com/2012/11/3_thumb.gif "3")</font>](http://ivanbuaa.files.wordpress.com/2012/11/3.gif)

[<font size="2" face="微软雅黑">![4](http://ivanbuaa.files.wordpress.com/2012/11/4_thumb.gif "4")</font>](http://ivanbuaa.files.wordpress.com/2012/11/4.gif)

<font size="2" face="微软雅黑"></font>

[<font size="2" face="微软雅黑">![5](http://ivanbuaa.files.wordpress.com/2012/11/5_thumb.gif "5")</font>](http://ivanbuaa.files.wordpress.com/2012/11/5.gif)

[<font size="2" face="微软雅黑">![6](http://ivanbuaa.files.wordpress.com/2012/11/6_thumb.gif "6")</font>](http://ivanbuaa.files.wordpress.com/2012/11/6.gif)

[<font size="2" face="微软雅黑">![7](http://ivanbuaa.files.wordpress.com/2012/11/7_thumb.gif "7")</font>](http://ivanbuaa.files.wordpress.com/2012/11/7.gif)

[<font size="2" face="微软雅黑">![8](http://ivanbuaa.files.wordpress.com/2012/11/8_thumb.gif "8")</font>](http://ivanbuaa.files.wordpress.com/2012/11/8.gif)

<font size="2" face="微软雅黑">注意去掉#注释</font>

<font size="2" face="微软雅黑">最后一副图中mapred-site.xml配置,应为：</font>

<font size="2" face="微软雅黑">&lt;name&gt;mapred.job.tracker&lt;/name&gt;</font>

三个虚拟器都要改一下

修改DNS服务器

vi /etc/resolv.conf

nameserver 192.168.11.9

vi /etc/hosts

192.168.11.188 redhat1

192.168.11.189 redhat2

192.168.11.190 redhat3

vi /etc/hostname

redhat1

&#160;

<font size="2" face="微软雅黑">环境搭建完成</font>

六 验证是否成功

在master结点主机192.168.11.188执行如下命令，格式化文件系统

`cd` `/usr/hadoop-1.0.3/`

`bin``/hadoop` `namenode –``format`

`在master结点上执行如下命令启动系统，只需在master节点执行`

`bin/start-all.sh(stop-all.sh)启动全部`

`bin/start-dfs.sh(stop-dfs.sh)启动HDFS文件系统`

`bin/start-mapred.sh(stop-mapred.sh)启动Mapreduce框架`

`在master与data结点分别运行JPS，查看是否正常开启`

`列出HDFS文件系统存在的目录`

`hadoop fs –ls 或 hadoop fs –ls \path`

`关于hadoop fs 指令详细参数说明见 hadoop fs`

`浏览器监视HDFS文件系统运行情况`

`输入[http://192.168.11.199:50070](http://192.168.11.199:50070)`

`查看任务运行情况`

`输入[http://192.168.11.188:50030](http://192.168.11.188:50030)`
