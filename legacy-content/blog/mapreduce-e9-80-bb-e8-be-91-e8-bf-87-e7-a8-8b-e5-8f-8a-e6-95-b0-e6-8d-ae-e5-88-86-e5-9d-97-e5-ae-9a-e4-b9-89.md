---
title: MapReduce逻辑过程及数据分块定义
id: 1413
categories:
  - 国境以南
  - 工作相关
date: 2012-11-23 21:38:00
tags:
---

### Map-Reduce的逻辑过程

假设我们需要处理一批有关天气的数据，其格式如下：

*   按照ASCII码存储，每行一条记录*   每一行字符从0开始计数，第15个到第18个字符为年*   第25个到第29个字符为温度，其中第25位是符号+/-  

006701199099999**1950**051507**+0000**+

004301199099999**1950**051512**+0022**+

004301199099999**1950**051518**-0011**+

004301265099999**1949**032412**+0111**+

004301265099999**1949**032418**+0078**+

006701199099999**1937**051507**+0001**+

004301199099999**1937**051512**-0002**+

004301199099999**1945**051518**+0001**+

004301265099999**1945**032412**+0002**+

004301265099999**1945**032418**+0078**+

现在需要统计出每年的最高温度。

Map-Reduce主要包括两个步骤：Map和Reduce

每一步都有key-value对作为输入和输出：

*   map阶段的key-value对的格式是由输入的格式所决定的，如果是默认的TextInputFormat，则每行作为一个记录进程处理，其中key为此行的开头相对于文件的起始位置，value就是此行的字符文本*   map阶段的输出的key-value对的格式必须同reduce阶段的输入key-value对的格式相对应  

对于上面的例子，在map过程，输入的key-value对如下：

(0, 006701199099999**1950**051507**+0000**+)

(33, 004301199099999**1950**051512**+0022**+)

(66, 004301199099999**1950**051518**-0011**+)

(99, 004301265099999**1949**032412**+0111**+)

(132, 004301265099999**1949**032418**+0078**+)

(165, 006701199099999**1937**051507**+0001**+)

(198, 004301199099999**1937**051512**-0002**+)

(231, 004301199099999**1945**051518**+0001**+)

(264, 004301265099999**1945**032412**+0002**+)

(297, 004301265099999**1945**032418**+0078**+)

在map过程中，通过对每一行字符串的解析，得到年-温度的key-value对作为输出：

(1950, 0)

(1950, 22)

(1950, -11)

(1949, 111)

(1949, 78)

(1937, 1)

(1937, -2)

(1945, 1)

(1945, 2)

(1945, 78)

在reduce过程，将map过程中的输出，按照相同的key将value放到同一个列表中作为reduce的输入

(1950, [0, 22, –11])

(1949, [111, 78])

(1937, [1, -2])

(1945, [1, 2, 78])

在reduce过程中，在列表中选择出最大的温度，将年-最大温度的key-value作为输出：

(1950, 22)

(1949, 111)

(1937, 1)

(1945, 78)

其逻辑过程可用如下图表示：

[![Image(1)](http://ivanbuaa.files.wordpress.com/2012/11/image1.png "Image(1)")](http://images.cnblogs.com/cnblogs_com/forfuture1978/WindowsLiveWriter/Hadoop_34D/image_2.png)

### 2、编写Map-Reduce程序

编写Map-Reduce程序，一般需要实现两个函数：mapper中的map函数和reducer中的reduce函数。

一般遵循以下格式：

*   map: (K1, V1)&#160; -&gt;&#160; list(K2, V2)  

public interface Mapper&lt;K1, V1, K2, V2&gt; extends JobConfigurable, Closeable {

&#160; void map(K1 key, V1 value, OutputCollector&lt;K2, V2&gt; output, Reporter reporter)

&#160; throws IOException;

}

*   reduce: (K2, list(V))&#160; -&gt;&#160; list(K3, V3)  

public interface Reducer&lt;K2, V2, K3, V3&gt; extends JobConfigurable, Closeable {

&#160; void reduce(K2 key, Iterator&lt;V2&gt; values,

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; OutputCollector&lt;K3, V3&gt; output, Reporter reporter)

&#160;&#160;&#160; throws IOException;

}

对于上面的例子，则实现的mapper如下：

public class MaxTemperatureMapper extends MapReduceBase implements Mapper&lt;LongWritable, Text, Text, IntWritable&gt; {

&#160;&#160;&#160; @Override

&#160;&#160;&#160; public void map(LongWritable key, Text value, OutputCollector&lt;Text, IntWritable&gt; output, Reporter reporter) throws IOException {

&#160;&#160;&#160;&#160;&#160;&#160;&#160; String line = value.toString();

&#160;&#160;&#160;&#160;&#160;&#160;&#160; String year = line.substring(15, 19);

&#160;&#160;&#160;&#160;&#160;&#160;&#160; int airTemperature;

&#160;&#160;&#160;&#160;&#160;&#160;&#160; if (line.charAt(25) == '+') {

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; airTemperature = Integer.parseInt(line.substring(26, 30));

&#160;&#160;&#160;&#160;&#160;&#160;&#160; } else {

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; airTemperature = Integer.parseInt(line.substring(25, 30));

&#160;&#160;&#160;&#160;&#160;&#160;&#160; }

&#160;&#160;&#160;&#160;&#160;&#160;&#160; output.collect(new Text(year), new IntWritable(airTemperature));

&#160;&#160;&#160; }

}

实现的reducer如下：

public class MaxTemperatureReducer extends MapReduceBase implements Reducer&lt;Text, IntWritable, Text, IntWritable&gt; {

&#160;&#160;&#160; public void reduce(Text key, Iterator&lt;IntWritable&gt; values, OutputCollector&lt;Text, IntWritable&gt; output, Reporter reporter) throws IOException {

&#160;&#160;&#160;&#160;&#160;&#160;&#160; int maxValue = Integer.MIN_VALUE;

&#160;&#160;&#160;&#160;&#160;&#160;&#160; while (values.hasNext()) {

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; maxValue = Math.max(maxValue, values.next().get());

&#160;&#160;&#160;&#160;&#160;&#160;&#160; }

&#160;&#160;&#160;&#160;&#160;&#160;&#160; output.collect(key, new IntWritable(maxValue));

&#160;&#160;&#160; }

}

欲运行上面实现的Mapper和Reduce，则需要生成一个Map-Reduce得任务(Job)，其基本包括以下三部分：

*   输入的数据，也即需要处理的数据*   Map-Reduce程序，也即上面实现的Mapper和Reducer*   此任务的配置项JobConf  

欲配置JobConf，需要大致了解Hadoop运行job的基本原理：

*   Hadoop将Job分成task进行处理，共两种task：map task和reduce task*   Hadoop有两类的节点控制job的运行：JobTracker和TaskTracker  

*   JobTracker协调整个job的运行，将task分配到不同的TaskTracker上*   TaskTracker负责运行task，并将结果返回给JobTracker  

*   Hadoop将输入数据分成固定大小的块，我们称之input split*   Hadoop为每一个input split创建一个task，在此task中依次处理此split中的一个个记录(record)*   Hadoop会尽量让输入数据块所在的DataNode和task所执行的DataNode(每个DataNode上都有一个TaskTracker)为同一个，可以提高运行效率，所以input split的大小也一般是HDFS的block的大小。*   Reduce task的输入一般为Map Task的输出，Reduce Task的输出为整个job的输出，保存在HDFS上。*   在reduce中，相同key的所有的记录一定会到同一个TaskTracker上面运行，然而不同的key可以在不同的TaskTracker上面运行，我们称之为partition  

*   partition的规则为：(K2, V2) –&gt; Integer， 也即根据K2，生成一个partition的id，具有相同id的K2则进入同一个partition，被同一个TaskTracker上被同一个Reducer进行处理。  

public interface Partitioner&lt;K2, V2&gt; extends JobConfigurable {

&#160; int getPartition(K2 key, V2 value, int numPartitions);

}

下图大概描述了Map-Reduce的Job运行的基本原理：

[![Image(2)](http://ivanbuaa.files.wordpress.com/2012/11/image2.png "Image(2)")](http://images.cnblogs.com/cnblogs_com/forfuture1978/WindowsLiveWriter/Hadoop_34D/image_4.png)

下面我们讨论JobConf，其有很多的项可以进行配置：

*   setInputFormat：设置map的输入格式，默认为TextInputFormat，key为LongWritable, value为Text*   setNumMapTasks：设置map任务的个数，此设置通常不起作用，map任务的个数取决于输入的数据所能分成的input split的个数*   setMapperClass：设置Mapper，默认为IdentityMapper*   setMapRunnerClass：设置MapRunner, map task是由MapRunner运行的，默认为MapRunnable，其功能为读取input split的一个个record，依次调用Mapper的map函数*   setMapOutputKeyClass和setMapOutputValueClass：设置Mapper的输出的key-value对的格式*   setOutputKeyClass和setOutputValueClass：设置Reducer的输出的key-value对的格式*   setPartitionerClass和setNumReduceTasks：设置Partitioner，默认为HashPartitioner，其根据key的hash值来决定进入哪个partition，每个partition被一个reduce task处理，所以partition的个数等于reduce task的个数*   setReducerClass：设置Reducer，默认为IdentityReducer*   setOutputFormat：设置任务的输出格式，默认为TextOutputFormat*   FileInputFormat.addInputPath：设置输入文件的路径，可以使一个文件，一个路径，一个通配符。可以被调用多次添加多个路径*   FileOutputFormat.setOutputPath：设置输出文件的路径，在job运行前此路径不应该存在  

当然不用所有的都设置，由上面的例子，可以编写Map-Reduce程序如下：

public class MaxTemperature {

&#160;&#160;&#160; public static void main(String[] args) throws IOException {

&#160;&#160;&#160;&#160;&#160;&#160;&#160; if (args.length != 2) {

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.err.println(&quot;Usage: MaxTemperature &lt;input path&gt; &lt;output path&gt;&quot;);

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.exit(-1);

&#160;&#160;&#160;&#160;&#160;&#160;&#160; }

&#160;&#160;&#160;&#160;&#160;&#160;&#160; JobConf conf = new JobConf(MaxTemperature.class);

&#160;&#160;&#160;&#160;&#160;&#160;&#160; conf.setJobName(&quot;Max temperature&quot;);

&#160;&#160;&#160;&#160;&#160;&#160;&#160; FileInputFormat.addInputPath(conf, new Path(args[0]));

&#160;&#160;&#160;&#160;&#160;&#160;&#160; FileOutputFormat.setOutputPath(conf, new Path(args[1]));

&#160;&#160;&#160;&#160;&#160;&#160;&#160; conf.setMapperClass(MaxTemperatureMapper.class);

&#160;&#160;&#160;&#160;&#160;&#160;&#160; conf.setReducerClass(MaxTemperatureReducer.class);

&#160;&#160;&#160;&#160;&#160;&#160;&#160; conf.setOutputKeyClass(Text.class);

&#160;&#160;&#160;&#160;&#160;&#160;&#160; conf.setOutputValueClass(IntWritable.class);

&#160;&#160;&#160;&#160;&#160;&#160;&#160; JobClient.runJob(conf);

&#160;&#160;&#160; }

}

### 3、Map-Reduce数据流(data flow)

Map-Reduce的处理过程主要涉及以下四个部分：

*   客户端Client：用于提交Map-reduce任务job*   JobTracker：协调整个job的运行，其为一个Java进程，其main class为JobTracker*   TaskTracker：运行此job的task，处理input split，其为一个Java进程，其main class为TaskTracker*   HDFS：hadoop分布式文件系统，用于在各个进程间共享Job相关的文件  

[![Image(3)](http://ivanbuaa.files.wordpress.com/2012/11/image3.png "Image(3)")](http://images.cnblogs.com/cnblogs_com/forfuture1978/WindowsLiveWriter/Hadoop_34D/image_6.png)

#### 3.1、任务提交

JobClient.runJob()创建一个新的JobClient实例，调用其submitJob()函数。

*   向JobTracker请求一个新的job ID*   检测此job的output配置*   计算此job的input splits*   将Job运行所需的资源拷贝到JobTracker的文件系统中的文件夹中，包括job jar文件，job.xml配置文件，input splits*   通知JobTracker此Job已经可以运行了  

提交任务后，runJob每隔一秒钟轮询一次job的进度，将进度返回到命令行，直到任务运行完毕。

#### 3.2、任务初始化

当JobTracker收到submitJob调用的时候，将此任务放到一个队列中，job调度器将从队列中获取任务并初始化任务。

初始化首先创建一个对象来封装job运行的tasks, status以及progress。

在创建task之前，job调度器首先从共享文件系统中获得JobClient计算出的input splits。

其为每个input split创建一个map task。

每个task被分配一个ID。

#### 3.3、任务分配

TaskTracker周期性的向JobTracker发送heartbeat。

在heartbeat中，TaskTracker告知JobTracker其已经准备运行一个新的task，JobTracker将分配给其一个task。

在JobTracker为TaskTracker选择一个task之前，JobTracker必须首先按照优先级选择一个Job，在最高优先级的Job中选择一个task。

TaskTracker有固定数量的位置来运行map task或者reduce task。

默认的调度器对待map task优先于reduce task

当选择reduce task的时候，JobTracker并不在多个task之间进行选择，而是直接取下一个，因为reduce task没有数据本地化的概念。

#### 3.4、任务执行

TaskTracker被分配了一个task，下面便要运行此task。

首先，TaskTracker将此job的jar从共享文件系统中拷贝到TaskTracker的文件系统中。

TaskTracker从distributed cache中将job运行所需要的文件拷贝到本地磁盘。

其次，其为每个task创建一个本地的工作目录，将jar解压缩到文件目录中。

其三，其创建一个TaskRunner来运行task。

TaskRunner创建一个新的JVM来运行task。

被创建的child JVM和TaskTracker通信来报告运行进度。

###### 

##### 3.4.1、Map的过程

MapRunnable从input split中读取一个个的record，然后依次调用Mapper的map函数，将结果输出。

map的输出并不是直接写入硬盘，而是将其写入缓存memory buffer。

当buffer中数据的到达一定的大小，一个背景线程将数据开始写入硬盘。

在写入硬盘之前，内存中的数据通过partitioner分成多个partition。

在同一个partition中，背景线程会将数据按照key在内存中排序。

每次从内存向硬盘flush数据，都生成一个新的spill文件。

当此task结束之前，所有的spill文件被合并为一个整的被partition的而且排好序的文件。

reducer可以通过http协议请求map的输出文件，tracker.http.threads可以设置http服务线程数。

##### 3.4.2、Reduce的过程

当map task结束后，其通知TaskTracker，TaskTracker通知JobTracker。

对于一个job，JobTracker知道TaskTracer和map输出的对应关系。

reducer中一个线程周期性的向JobTracker请求map输出的位置，直到其取得了所有的map输出。

reduce task需要其对应的partition的所有的map输出。

reduce task中的copy过程即当每个map task结束的时候就开始拷贝输出，因为不同的map task完成时间不同。

reduce task中有多个copy线程，可以并行拷贝map输出。

当很多map输出拷贝到reduce task后，一个背景线程将其合并为一个大的排好序的文件。

当所有的map输出都拷贝到reduce task后，进入sort过程，将所有的map输出合并为大的排好序的文件。

最后进入reduce过程，调用reducer的reduce函数，处理排好序的输出的每个key，最后的结果写入HDFS。

[![Image(4)](http://ivanbuaa.files.wordpress.com/2012/11/image4.png "Image(4)")](http://images.cnblogs.com/cnblogs_com/forfuture1978/WindowsLiveWriter/Hadoop_34D/image_8.png)

#### 3.5、任务结束

当JobTracker获得最后一个task的运行成功的报告后，将job得状态改为成功。

当JobClient从JobTracker轮询的时候，发现此job已经成功结束，则向用户打印消息，从runJob函数中返回。

&#160;

**<font size="2">基本数据划分及调度</font>**

一个输入分片(input split)是由单个map处理的输入块，即每一个map只处理一个输入分片，每个分片被划分为若干个记录(records)，每条记录就是一个key/value对，map一个接一个的处理每条记录，输入分片和记录都是逻辑的，不必将他们对应到文件上。注意，一个分片不包含数据本身，而是指向数据的引用和。

因为FileInputFormat定义的是逻辑结构，不能匹配HDFS块大小，所以TextFileInputFormat的以行为单位的逻辑记录中，很有可能某一行是跨文件块存储的，如下所示

[![Image(1)](http://ivanbuaa.files.wordpress.com/2012/11/image1_thumb.jpg "Image(1)")](http://ivanbuaa.files.wordpress.com/2012/11/image1.jpg)

The default schedule of MapReduce in Hadoop:

In this order: on the same node, on the other node within the same rack and on another node outside the rack.