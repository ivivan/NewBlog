---
title: 'mesos安装总结'
description: '安装mesos之前的系统要求： & 160;& 160;& 160;& 160;& 160;& 160;& 160; （1）g++ 4.1或更高版本, ( redhat enterprise 需自装) & 160;& 160;& 160;& 160;& 160;& 160;& 160; （2）Pyt'
date: '2013-02-25'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'mesos-e5-ae-89-e8-a3-85-e6-80-bb-e7-bb-93'
---

**安装mesos之前的系统要求：**

&#160;&#160;&#160;&#160;&#160;&#160;&#160; （1）g++ 4.1或更高版本, ( redhat enterprise 需自装)

&#160;&#160;&#160;&#160;&#160;&#160;&#160; （2）Python 2.6 （用于mesos的web界面） 自带

&#160;&#160;&#160;&#160;&#160;&#160;&#160; （3） Python 2.6 developer packages 需自装

&#160;&#160;&#160;&#160;&#160;&#160;&#160; （4）cppunit (用于构建zookeeper)

&#160;&#160;&#160;&#160;&#160;&#160;&#160; （5）ava JDK 1.6 或更高版本 自装

以下是具体安装的过程：

&#160;&#160;&#160;&#160;&#160;&#160;&#160; （1）从[镜像网站](http://www.apache.org/dyn/closer.cgi/incubator/mesos/mesos-0.9.0-incubating/)下载Mesos 0.9.0-incubating，得到压缩文件mesos-0.9.0-incubating.tar.gz。

&#160;&#160;&#160;&#160;&#160;&#160;&#160; （2） 将压缩文件拷贝到master结点的某个目录中，使用如下命令解压文件, 得到文件夹mesos-0.9.0，进入该文件。
  <pre>tar zxvf mesos-0.9.0-incubating.tar.gz</pre>

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; （3）进入文件夹mesos-0.9.0后，使用configure脚本配置mesos。有两个比较重要的参数需要传递，一个是JDK安装的根目录，另一个是安装mesos的目标位置。（请将上述两个参数换成你自己系统中的具体位置。如果不指定安装的目标位置，默认位置是/usr/local。）具体命令如下：

<pre>./configure --with-java-home=/home/dummy/.java/jdk1.6.0_33 --prefix=/home/dummy/mesos</pre>

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; （4）还是在文件夹mesos-0.9.0下使用如下两个命令来build和安装mesos。 mesos被安装在第（3）步中--prefix参数指定的位置，即/home/dummy/mesos目录下，下面都使用`&lt;prefix&gt;来代表mesos的安装目录。`

<pre>make
make install</pre>

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; （5）使用如下命令将mesos拷贝到所有的slave结点。注意，主结点和所有从结点上mesos的位置要保持一致。

<pre>scp -r ~/mesos slave1:~/
scp -r ~/mesos slave2:~/
scp -r ~/mesos slave3:~/</pre>

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; （6）在master结点上做如下两个配置。

编辑文件&lt;prefix&gt;/var/mesos/deploy/masters（如果没有可以创建）,在文件中列出主结点的主机名或者IP地址。

编辑文件 &lt;prefix&gt;/var/mesos/deploy/slaves`（如果没有可以创建），在文件中列出从结点的主机名或者IP地址。`

我的配置如下所示：

<pre>#masters文件的内容
master

#slaves文件的内容
slave1
slave2
slave3</pre>

 编辑文件`&lt;prefix&gt;/var/mesos/conf/mesos.conf（如果没有可以创建），配置主结点的日志文件目录。我的配置如下：`

<pre>log_dir=/home/dummy/mesos/log/</pre>

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; （7）在所有从结点上做如下配置。

 编辑文件（如果没有可以创建），配置从结点的日志文件目录、主结点URI和从结点资源。从结点的资源可以根据每个结点的CPU和内存的空闲情况进行配置，以供mesos调度使用。其中cpus后面的数字代表CPU有几个核，而mem后面的数字代表分配多少空闲内存给mesos使用，单位是MB。

<pre>master=master:5050
log_dir=/home/dummy/mesos/log
resources=cpus:4;mem:2300</pre>

&#160;&#160;&#160;&#160;&#160;&#160;&#160; （8）启动与停止mesos集群管理器。

 如果配置正确无误，就可以进入目录 `&lt;prefix&gt;/sbin/，使用如下命令启动集群管理器。`

<pre>bash mesos-start-cluster.sh</pre>

 停止mesos集群管理器的命令如下

<pre>bash mesos-stop-cluster.sh</pre>

&#160;&#160;&#160;&#160;&#160;&#160;&#160; (9) mesos启动后，可以通过Web界面来查看集群中的资源，以及集群中正在运行的框架和任务。具体的访问方式是通过浏览器访问master结点的8080接口，即[http://master:8080/](http://master:8080/)。如果mesos启动正常，可以在该web界面上看到整个集群的资源总和和每一个slave结点的资源。如果有框架正在运行，还可以看到框架的信息，以及正在执行的任务信息。

 重要提示信息：

&#160;&#160;&#160;&#160;&#160;&#160; 1）如果提交作业给mesos后，发现作业执行异常，或无法执行，可以查看每个slave结点的/tmp/mesos/slaves/..../stderr文件，以确定问题原因。

&#160;&#160;&#160;&#160;&#160;&#160; 2）mesos安装目录下的&lt;prefix&gt;/lib/libmesos-0.9.0.so文件很重要，在以后配置Spark时会需要。
