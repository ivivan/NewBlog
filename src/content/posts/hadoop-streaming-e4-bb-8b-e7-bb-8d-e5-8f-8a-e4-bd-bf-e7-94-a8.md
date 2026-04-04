---
title: 'Hadoop Streaming介绍及使用'
description: 'Hadoop MapReduce和HDFS采用Java实现，默认提供Java编程接口，另外提供了C++编程接口和Streaming框架。Streaming框架允许任何程序语言实现的程序在Hadoop MapReduce中使用，方便已有程序向Hadoop平台移植。 Streaming的原理是用Java'
date: '2012-11-23'
readTime: '6 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'hadoop-streaming-e4-bb-8b-e7-bb-8d-e5-8f-8a-e4-bd-bf-e7-94-a8'
---

Hadoop MapReduce和HDFS采用Java实现，默认提供Java编程接口，另外提供了C++编程接口和Streaming框架。Streaming框架允许任何程序语言实现的程序在Hadoop MapReduce中使用，方便已有程序向Hadoop平台移植。

Streaming的原理是用Java实现一个包装用户程序的MapReduce程序，该程序负责调用MapReduce Java接口获取key/value对输入，创建一个新的进程启动包装的用户程序，将数据通过管道传递给包装的用户程序处理，然后调用MapReduce Java接口将用户程序的输出切分成key/value对输出。如下图所示，其中Streaming Java Mapper通过管道将key/value输入传递给用户mapper程序的标准输入，并获取用户mapper程序的标准输出；Streaming Java Reducer调用Java接口通过InputFormat从HDFS获取输入数据，从管道将key/value传递给用户 reducer程序的标准输入，获取用户reducer程序的标准输出并调用Java接口通过OutputFormat输出数据；用户mapper和reducer程序负责处理数据，都从标准输入读取数据，向标准输出写入数据。

Streaming有如下一些优点：&#160; 
1)开发效率高，很多现有程序（包括脚本）能够方便的移植到hadoop平台上去运行&#160; 
2)某些程序运行效率高，对于某些cpu密集型程序，如果map-reduce程序用C++编写，效率有可能提高&#160; 
Streaming存在如下一些不足：&#160; 
1) Hadoop Streaming默认只能处理文本数据。&#160; 
2) Streaming中的mapper和reducer默认只能向标准输出写数据，不能方便地处理多路输出。&#160; 
3) 用Java编写的MapReduce程序直接处理框架从输入数据中得到的key/value对，在Streaming中Java程序不直接处理key/value对，而是通过管道写到mapper程序的标准输入，mapper程序再从key/tvalue中解析出key/value对，这个过程多了两次数据拷贝和解析（分割），带来一定的开销。对于reducer也是一样的。

streaming命令参数列表：

**-input _&lt;path&gt;_**

输入数据路径

**-output _&lt;path&gt;_**

输出数据路径

**-mapper &lt;cmd|JavaClassName&gt;**

mapper可执行程序或Java类

**-reducer &lt;cmd|JavaClassName&gt;**

reducer可执行程序或Java类

**-file _&lt;file&gt; _Optional**

分发本地文件

**-cacheFile _&lt;file&gt; _Optional**

分发HDFS文件

**-cacheArchive _&lt;file&gt; _Optional**

分发HDFS压缩文件

**-numReduceTasks _&lt;num&gt;_ Optional**

reduce任务个数

**-jobconf | -D NAME=VALUE Optional**

作业配置参数

**-combiner _&lt;JavaClassName&gt;_ Optional**

Combiner Java类

**-partitioner _&lt;JavaClassName&gt;_ Optional**

Partitioner Java类

**-inputformat _&lt;JavaClassName&gt;_Optional**

InputFormat Java类

**-outputformat _&lt;JavaClassName&gt;_Optional**

OutputFormat Java类

**-inputreader _&lt;spec&gt;_ Optional**

InputReader配置

**-cmdenv _&lt;n&gt;=&lt;v&gt;_ Optional**

传给mapper和reducer的环境变量

**-mapdebug _&lt;path&gt;_ Optional**

mapper失败时运行的debug程序

**-reducedebug _&lt;path&gt;_ Optional**

reducer失败时运行的debug程序

**-verbose Optional**

详细输出模式

下面是对各个参数的详细说明：

-input &lt;path&gt;：指定作业输入，path可以是文件或者目录，可以使用*通配符，-input选项可以使用多次指定多个文件或目录作为输入。&#160; 
-output &lt;path&gt;：指定作业输出目录，path必须不存在，而且执行作业的用户必须有创建该目录的权限，-output只能使用一次。&#160; 
-mapper：指定mapper可执行程序或Java类，必须指定且唯一。&#160; 
-reducer：指定reducer可执行程序或Java类，必须指定且唯一。&#160; 
-file, -cacheFile, -cacheArchive：分别用于向计算节点分发本地文件、HDFS文件和HDFS压缩文件。&#160; 
-numReduceTasks：指定reducer的个数，如果设置-numReduceTasks 0或者-reducer NONE则没有reducer程序，mapper的输出直接作为整个作业的输出。&#160; 
-combiner：指定combiner Java类，对应的Java类文件打包成jar文件后用-file分发。&#160; 
-partitioner：指定partitioner Java类，Streaming提供了一些实用的partitioner实现，参考_[KeyBasedFiledPartitoner](/backup/zxm/Desktop/HADOOP/%23_KeyFieldBasedPartitioner)_和_[IntHashPartitioner](/backup/zxm/Desktop/HADOOP/%23_IntHashPartitioner)_。&#160; 
-inputformat, -outputformat：指定inputformat和outputformat Java类，用于读取输入数据和写入输出数据，分别要实现InputFormat和OutputFormat接口。如果不指定，默认使用TextInputFormat和TextOutputFormat。&#160; 
-cmdenv NAME=VALUE：给mapper和reducer程序传递额外的环境变量，NAME是变量名，VALUE是变量值。&#160; 
-mapdebug, -reducedebug：分别指定mapper和reducer程序失败时运行的debug程序。&#160; 
-verbose：指定输出详细信息，例如分发哪些文件，实际作业配置参数值等，可以用于调试。&#160; 
-jobconf | -D NAME=VALUE：指定作业参数，NAME是参数名，VALUE是参数值，可以指定的参数参考hadoop-default.xml。特别建议用-jobconf mapred.job.name='My Job Name'设置作业名，使用-jobconf mapred.job.priority=VERY_HIGH | HIGH | NORMAL | LOW | VERY_LOW设置作业优先级，使用-jobconf mapred.job.map.capacity=M设置同时最多运行M个map任务，使用-jobconf mapred.job.reduce.capacity=N设置同时最多运行N个reduce任务。

常见的作业配置参数如下表所示：

**_mapred.job.name_**

作业名

**_mapred.job.priority_**

作业优先级

**_mapred.job.map.capacity_**

最多同时运行map任务数

**_mapred.job.reduce.capacity_**

最多同时运行reduce任务数

**_hadoop.job.ugi_**

作业执行权限

**mapred.map.tasks**

map任务个数

**mapred.reduce.tasks**

reduce任务个数

**mapred.job.groups**

作业可运行的计算节点分组

**mapred.task.timeout**

任务没有响应（输入输出）的最大时间

**mapred.compress.map.output**

map的输出是否压缩

**mapred.map.output.compression.codec**

map的输出压缩方式

**mapred.output.compress**

reduce的输出是否压缩

**mapred.output.compression.codec**

reduce的输出压缩方式

**stream.map.output.field.separator**

map输出分隔符

&#160;

Streaming应用实例

write two c++ codes

1\. map.cpp

#include &lt;string&gt;   
#include &lt;iostream&gt;

using namespace std;

int main()   
{    
string line;    
while (cin&gt;&gt;line)    
{    
cout&lt;&lt;line&lt;&lt;&quot;\t&quot;&lt;&lt;1&lt;&lt;endl;    
}    
return 0;    
}

2\. reduce.cpp

#include &lt;map&gt;   
#include &lt;string&gt;    
#include &lt;iostream&gt;

using namespace std;   
int main()    
{    
string key;    
string value;    
map&lt;string,int&gt; word_count;    
map&lt;string,int&gt; :: iterator it;    
while (cin&gt;&gt;key)    
{    
cin&gt;&gt;value;    
it=word_count.find(key);    
if(it!=word_count.end())    
{    
++(it-&gt;second);    
}    
else    
{    
word_count.insert(make_pair(key,1));    
}    
}    
for(it=word_count.begin();it!=word_count.end();++it)    
cout&lt;&lt;it-&gt;first&lt;&lt;&quot;\t&quot;&lt;&lt;it-&gt;second&lt;&lt;endl;    
return 0;    
}

g++ -o map map.cpp

g++ -o reduce reduce.cpp

2\. prepare for the input files

creat two txt files

File1.txt：hello hadoop helloworld

File2.txt：this is a firsthadoop

3\. start hadoop

format hadoop file system

`bin``/hadoop ``namenode -``format`

start hadoop

`bin``/start-all``.sh`

3\. upload input files to the Hadoop file system

hadoop fs –put File1.txt File2.txt&#160; ans

4\. set input output folders

5\. run the program
  <pre>bin/hadoop jar /usr/local/hadoop/contrib/streaming/hadoop-streaming-1.0.3.jar  </pre>

<pre>-file /home/hadoop/Documents/c/hadooptest/mapper </pre>

<pre>-file /home/hadoop/Documents/c/hadooptest/reduce </pre>

<pre>-input /usr/local/hadoop/inputfiles/* </pre>

<pre>-output /usr/local/hadoop/outputfiles</pre>

<pre>-inputformat WholeFileInputFormat        (name of class)</pre>

inputformat 可选内置或用户自定义

<pre>-mapper /home/hadoop/Documents/c/hadooptest/mapper </pre>

<pre>-reducer /home/hadoop/Documents/c/hadooptest/reduce</pre>

<pre>6\. see the status</pre>

*   NameNode -&#160; [http://localhost:50070/](http://localhost:50070/)
*   JobTracker -&#160; [http://localhost:50030/](http://localhost:50030/)
