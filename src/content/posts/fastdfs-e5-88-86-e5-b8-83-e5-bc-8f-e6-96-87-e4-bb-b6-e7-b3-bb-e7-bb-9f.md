---
title: 'FastDFS分布式文件系统'
description: '修改HDFS困难重重，FastDFS里有个Group的概念可以变通的解决现有问题，安装如下： &nbsp; FastDFS源码及AＰＩ下载：https://code.google.com/p/fastdfs/downloads 安装libevent，请确认安装路径是 /usr，下载：http://m'
date: '2013-09-12'
readTime: '8 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'fastdfs-e5-88-86-e5-b8-83-e5-bc-8f-e6-96-87-e4-bb-b6-e7-b3-bb-e7-bb-9f'
---

修改HDFS困难重重，FastDFS里有个Group的概念可以变通的解决现有问题，安装如下：

&nbsp;

FastDFS源码及AＰＩ下载：https://code.google.com/p/fastdfs/downloads

安装libevent，请确认安装路径是 /usr，下载：http://monkey.org/~provos/libevent/

解压 libevent ，然后进入解压后的目录分别执行：

1.  ./configure --prefix=/usr
2.  make clean;
3.  make
4.  make install
注意４步权限

## **安装 FastDFS**

同样习惯解压到/usr

由于要使用内置的 http 服务，因此编辑 %FastDFS%/make.sh 文件，找到
_#WITH_HTTPD=1_
修改成
_WITH_HTTPD=1_
以支持 http

进入FastDFS根目录，执行：

./make.sh

./make.sh install

如安装时报错如下：

1.  /home/FastDFS/FastDFS/tracker/../common/sched_thread.c:493: undefined reference to `pthread_create' ../common/pthread_func.o:   .....
经过在网上的查找得知：其实是不同的系统中pthread位置不一样，做法就是找到你的系统中所需要的libpthread.so文件位置，直接find就可以找到了；
<div>

1.  root@ www.linuxidc.com:~# find / -name 'libpthread.a'
2.  /usr/lib/i386-linux-gnu/xen/libpthread.a
3.  /usr/lib/i386-linux-gnu/libpthread.a
4.  root@ www.linuxidc.com:~# find / -name 'libpthread.so'
5.  /usr/lib/i386-linux-gnu/libpthread.so
</div>
接着直接在make.sh中找到这句话然后替换掉就可以了：
<div>

1.  if [ -f /usr/lib/libpthread.so ] || [ -f /usr/local/lib/libpthread.so ] || [ -f /usr/lib64/libpthread.so ] || [ -f /usr/lib/libpthread.a ] || [ -f /usr/local/lib/libpthread.a ] || [ -f /usr/lib64/libpthread.a ]; then   <span style="color:#ff0000;">LIBS</span>=<span style="color:#0000ff;">"$LIBS -lpthread"</span>
</div>
然后在进行编译就OK了。

6\. 修改配置文件(默认配置文件在路径/etc/fdfs 目录下 )，tracker 可以使用默认配置
默认使用22122 端口
#启动Tracker Server
/usr/local/bin/fdfs_trackerd /etc/fdfs/tracker.conf
#启动过程中出现的错误（成功安装libevent 就不会出现这个问题）
#./fdfs_trackerd: error while loading shared libraries: libevent-2.0.so.5: cannot open shared object file: No such file or directory
#解决办法
ln -s /usr/lib/libevent-2.0.so.5 /usr/lib64/libevent-2.0.so.5

&nbsp;

配置：

&nbsp;

FastDFS的配置文件在%FastDFS%/conf目录下，其中包括
Client.conf    客户端上传配置文件
Storage.conf    文件存储服务器配置文件
Tracker.conf    负责均衡调度服务器配置文件
http.conf        http服务器配置文件

&nbsp;

## 、配置及启动Tracker Server

A、修改%FastDFS%/conf/tracker.conf文件,修改如下
#可以自己指定目录位置，但目录必须存在，用于存储日志及storage server等信息，否则tracker server无法启动
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  base_path=/home/yuqing/fastdfs -&gt; base_path=/home/soar/fastdfs_tracker
</div>
#改成你想要的http端口，将来http下载文件的端口就是他了
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  http.server_port=8080 -&gt; http.server_port=8090
</div>
#http支持
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  ##include http.conf -&gt; #include http.conf
</div>
#默认4GB，如果空间不足，建议调小，否则会报no free space的异常，无法正常启动
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  reserved_storage_space = 4GB -&gt; reserved_storage_space = 1GB
</div>
#tracker server对storage server供服务的端口，使用默认的即可，也可以自定义
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  port=22122
</div>
&nbsp;

B、将http.conf文件拷贝到/etc/fdfs目录下，执行
<div id="">
<div>
<div>Shell代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  sudo cp %FastDFS%/conf/http.conf /etc/fdfs/
</div>
注：为了支持http，必须将这个文件拷贝到此目录，否则无法启动，报param http.XXX not exist or is empty类似的错误
C、进入/usr/local/bin/目录，启动tracker服务器，执行
<div id="">
<div>
<div>Shell代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  sudo fdfs_trackerd %FastDFS%/conf/tracker.conf

## 2、配置及启动Storage Server

A、修改%FastDFS%/conf/storage.conf文件,修改如下：
#可以自定义，但必须存在此目录，用于存储storage相关的log、group内的相关信息
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  base_path=/home/yuqing/fastdfs -&gt; /home/soar/fastdfs_storge
</div>
#文件的存储位置，在一台storage server上可以指定多个存储位置
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  store_path0=/home/yuqing/fastdfs -&gt; store_path0=/home/soar/fastdfs_storge
</div>
#必须指定
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  group_name=group1
</div>
#修改成tracker server的IP和端口信息
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  tracker_server=192.168.209.121:22122 -&gt; tracker_server=10.0.2.15:22122
</div>
#http支持
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  ##include http.conf -&gt;#include http.conf
</div>
&nbsp;

B、进入/usr/local/bin/目录，启动storage服务器，执行
<div id="">
<div>
<div>Shell代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  sudo fdfs_storaged %FastDFS%/conf/storage.conf
客户端修改：

1、修改%FastDFS%/conf/client.conf文件,修改如下：
#可自定义，但此目录必须存在，用于存放文件上传log
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  base_path=/home/yuqing/fastdfs-&gt; base_path=/home/soar/fastdfs_tracker
</div>
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  tracker_server=192.168.209.121:22122 -&gt; tracker_server=10.0.2.15:22122
</div>
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  http.tracker_server_port=8080 -&gt;http.tracker_server_port=8090
</div>
#支持http
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  ##include http.conf -&gt;#include http.conf
</div>
&nbsp;

2、进入/usr/local/bin/目录，上传文件，执行
<div id="">
<div>
<div>Txt代码  <a title="收藏这段代码">![收藏代码](http://soartju.iteye.com/images/icon_star.png)</a></div>
</div>

1.  sudo fdfs_test %FastDFS%/conf/client.conf upload a.txt
&nbsp;

test里测试文件返回链接仅为示例，无法打开正常

&nbsp;

配置总结：

很简单，基本只要把conf里local path, server address, port number，　group name定义一下即可

&nbsp;

没有web UI，这个分布式系统简陋的有点让人无法接受，还好Java API比较简单，功能简单，使用简单

附实例一择，上传文件到指定Group，已修改并测试

不明白为什么明明Cluster里设置了四个Storage Server并且全部可以上传文件成功，但这里只显示一个，实在懒得搞清楚

import java.io.File;
import java.io.FileInputStream;

import org.csource.common.NameValuePair;
import org.csource.fastdfs.ClientGlobal;
import org.csource.fastdfs.ServerInfo;
import org.csource.fastdfs.StorageClient;
import org.csource.fastdfs.StorageServer;
import org.csource.fastdfs.TrackerClient;
import org.csource.fastdfs.TrackerServer;

/**
* 测试上传
* @author gary
*
*/
public class TestUpload {
public static void main(String[] args) throws Exception{
// String classPath = new File(TestUpload.class.getResource("/").getFile()).getCanonicalPath();
// String configFilePath = classPath + File.separator + "fdfs_client.conf";
String configFilePath = "/usr/FastDFS/conf/client.conf";

System.out.println("配置文件:" + configFilePath);

ClientGlobal.init(configFilePath);

TrackerClient trackerClient = new TrackerClient();
TrackerServer trackerServer = trackerClient.getConnection();

StorageServer storageServer = null;
StorageClient storageClient = new StorageClient(trackerServer, storageServer);

NameValuePair[] meta_list = new NameValuePair[3];
meta_list[0] = new NameValuePair("width", "120");
meta_list[1] = new NameValuePair("heigth", "120");
meta_list[2] = new NameValuePair("author", "gary");

// byte[] file_buff = "F:\\pic.jpg".getBytes(ClientGlobal.g_charset);
File file = new File("/home/ivan/Downloads/README.txt");
FileInputStream fis = new FileInputStream(file);
byte[] file_buff = null;
if(fis != null){
int len = fis.available();
file_buff = new byte[len];
fis.read(file_buff);
}
System.out.println("file length: " + file_buff.length);

String group_name = null;
StorageServer[] storageServers = trackerClient.getStoreStorages(trackerServer, group_name);
if (storageServers == null) {
System.err.println("get store storage servers fail, error code: " + storageClient.getErrorCode());
}else{
System.err.println("store storage servers count: " + storageServers.length);
for (int k = 0; k &lt; storageServers.length; k++){
System.err.println(k + 1 + ". " + storageServers[k].getInetSocketAddress().getAddress().getHostAddress() + ":" + storageServers[k].getInetSocketAddress().getPort());
}
System.err.println("");
}

long startTime = System.currentTimeMillis();
// String[] results = storageClient.upload_file(file_buff, "jpg", meta_list);

String[] results = storageClient.upload_file("group3", file_buff, "jpg", meta_list);
// upload_file(file_buff, "jpg", meta_list);

System.out.println("upload_file time used: " + (System.currentTimeMillis() - startTime) + " ms");

if (results == null){
System.err.println("upload file fail, error code: " + storageClient.getErrorCode());
return;
}

group_name = results[0];
String remote_filename = results[1];
System.err.println("group_name: " + group_name + ", remote_filename: " + remote_filename);
System.err.println(storageClient.get_file_info(group_name, remote_filename));

ServerInfo[] servers = trackerClient.getFetchStorages(trackerServer, group_name, remote_filename);
if (servers == null){
System.err.println("get storage servers fail, error code: " + trackerClient.getErrorCode());
} else {
System.err.println("storage servers count: " + servers.length);
for (int k = 0; k &lt; servers.length; k++){
System.err.println(k + 1 + ". " + servers[k].getIpAddr() + ":" + servers[k].getPort());
}
System.err.println("");
}
}
}

此文件系统没有提供遍例文件的AＰＩ,　也不可以自定义上传文件名称，让人实在是无语至极，只能手动保存一份文件名映射凑合着用一下～

</div>
</div>
</div>
