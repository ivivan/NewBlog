---
title: 'Ubuntu环境下Hadoop Eclipse插件编译及远程调试'
description: '断断续续花了将近一个星期的时间，终于成功在Ubuntu环境下编译成功了Hadoop Eclipse插件，并成功的远程连接学校HPC机房里搭好的Hadoop Cluster～ 相当的考验了严重不足的耐性～ Eclipse插件编译 所有Linux环境中的软件均为手动安装： Hadoop 1.2.1 Ja'
date: '2013-08-29'
readTime: '7 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'ubuntu-e7-8e-af-e5-a2-83-e4-b8-8bhadoop-eclipse-e6-8f-92-e4-bb-b6-e7-bc-96-e8-af-91-e5-8f-8a-e8-bf-9c-e7-a8-8b-e8-b0-83-e8-af-95'
---

断断续续花了将近一个星期的时间，终于成功在Ubuntu环境下编译成功了Hadoop Eclipse插件，并成功的远程连接学校HPC机房里搭好的Hadoop Cluster～ 相当的考验了严重不足的耐性～

Eclipse插件编译

所有Linux环境中的软件均为手动安装：

Hadoop 1.2.1 ~~ Java JDK1.7~～Eclipse 4.3～～Ant 1.9.2

只需在本地下载Hadoop1.2.1包，无需配置Hadoop，

网上教程很多，基本各有小区别，但最后发现异处完全无关痛痒～这里总结出其中一种

总共需要修改如下文件

hadoop根路径下的src/contrib/eclipse-plugin，修改build.xml

hadoop根路径下的src/contrib/eclipse-plugin/META-INF，修改MANIFEST.MF

build.xml 改为如下：

&lt;?xml version="1.0" encoding="UTF-8" standalone="no"?&gt;
&lt;project default="jar" name="eclipse-plugin"&gt;
 &lt;property name="name" value="${ant.project.name}"/&gt;
 &lt;property name="root" value="${basedir}"/&gt;
 &lt;property name="hadoop.root" location="/home/ivan/Downloads/hadoop-1.2.1"/&gt;
 &lt;property name='version' value='1.2.1'/&gt;
 &lt;property name='eclipse.home' location="/usr/eclipse"/&gt;
 &lt;property name="build.dir" location="${hadoop.root}/build/contrib/${name}"/&gt;
 &lt;property name="build.classes" location="${build.dir}/classes"/&gt;
 &lt;property name="src.dir" location="${root}/src/java"/&gt;

 &lt;path id="eclipse-sdk-jars"&gt;
 &lt;fileset dir="${eclipse.home}/plugins/"&gt;
 &lt;include name="org.eclipse.ui*.jar"/&gt;
 &lt;include name="org.eclipse.jdt*.jar"/&gt;
 &lt;include name="org.eclipse.core*.jar"/&gt;
 &lt;include name="org.eclipse.equinox*.jar"/&gt;
 &lt;include name="org.eclipse.debug*.jar"/&gt;
 &lt;include name="org.eclipse.osgi*.jar"/&gt;
 &lt;include name="org.eclipse.swt*.jar"/&gt;
 &lt;include name="org.eclipse.jface*.jar"/&gt;
 &lt;include name="org.eclipse.team.cvs.ssh2*.jar"/&gt;
 &lt;include name="com.jcraft.jsch*.jar"/&gt;
 &lt;/fileset&gt; 
 &lt;/path&gt;
 &lt;!-- Override classpath to include Eclipse SDK jars --&gt;
 &lt;path id="classpath"&gt;
 &lt;fileset dir="${hadoop.root}"&gt;
 &lt;include name="*.jar"/&gt;
 &lt;/fileset&gt;
 &lt;path refid="eclipse-sdk-jars"/&gt;
 &lt;/path&gt;

&lt;target name="compile"&gt;
 &lt;mkdir dir="${build.dir}/classes"/&gt;
 &lt;javac
 encoding="ISO-8859-1"
 srcdir="${src.dir}"
 includes="**/*.java"
 destdir="${build.classes}"
 debug="on"
 deprecation="off"&gt;
 &lt;classpath refid="classpath"/&gt;
 &lt;/javac&gt;
 &lt;/target&gt;
 &lt;!-- Override jar target to specify manifest--&gt;
 &lt;target name="jar" depends="compile"&gt;
 &lt;mkdir dir="${build.dir}/lib"/&gt;
 &lt;copy file="${hadoop.root}/hadoop-core-${version}.jar" tofile="${build.dir}/lib/hadoop-core.jar" verbose="true"/&gt;
 &lt;copy file="${hadoop.root}/lib/commons-cli-1.2.jar" todir="${build.dir}/lib" verbose="true"/&gt;
 &lt;copy file="${hadoop.root}/lib/commons-configuration-1.6.jar" todir="${build.dir}/lib" verbose="true"/&gt;
 &lt;copy file="${hadoop.root}/lib/commons-httpclient-3.0.1.jar" todir="${build.dir}/lib" verbose="true"/&gt;
 &lt;copy file="${hadoop.root}/lib/jackson-core-asl-1.8.8.jar" todir="${build.dir}/lib" verbose="true"/&gt;
 &lt;copy file="${hadoop.root}/lib/commons-lang-2.4.jar" todir="${build.dir}/lib" verbose="true"/&gt;
 &lt;copy file="${hadoop.root}/lib/jackson-mapper-asl-1.8.8.jar" todir="${build.dir}/lib" verbose="true"/&gt;
 &lt;jar
 jarfile="${build.dir}/hadoop-${name}-${version}.jar"
 manifest="${root}/META-INF/MANIFEST.MF"&gt;
 &lt;fileset dir="${build.dir}" includes="classes/ lib/"/&gt;
 &lt;fileset dir="${root}" includes="resources/ plugin.xml"/&gt;
 &lt;/jar&gt;
 &lt;/target&gt;
&lt;/project&gt;

其中只要修改Hadoop位置及版本，Eclipse位置，以及最后部分打包第三方Jar时具体的版本，这个方法改动稍大，好处是不用再去修改其它位置的文件，全部在此build.xml中定义

MANIFEST.MF改动如下处

Bundle-ClassPath: classes/,lib/hadoop-core.jar,lib/commons-cli-1.2.jar,lib
 /commons-httpclient-3.0.1.jar,lib/jackson-mapper-asl-1.8.8.jar,lib/commons-config
 uration-1.6.jar,lib/commons-lang-2.4.jar,lib/jackson-core-asl-1.8.8.jar

这里与build.xml最后部分导入jar的名称对应

修改好后，在Terminal里进入src/contrib/eclipse-plugin，执行ant，搞定

生成的插件Jar在根目录build/contrib/eclipse-plugin下，自行复制到Eclipse/plugins即可

在这个过程中起初无数次遇上ant过程中出现100个javac错误，jar文件没有导入的问题，久查无头绪，最后发现当时Eclipse不是自行下载安装，而是用ubuntu软件中心自动安装版本，自动安装版本的Eclipse付带openJDK，导致出现问题，切记Eclipse自行下载安装

Eclipse远程调试Hadoop Cluster

1\. 插件copy进plugins目录，重起Eclipse，在Preferences下出现Hadoop Map/Reduce项

此处路径填此客户端的Hadoop位置即可，与Cluster无关，如此处填/usr/hadoop-1.2.1, 并且此Eclipse客户端的Hadoop也无需要进行参数配置

2\. 在Windows Show view 里打开Map/Reduce， 下方出现打开Map/Reduce Locations视图，New hadoop Locations

其中Location name随便， Map/Reduce Master里的Host与Post与Cluster里mapred-site.xml配置文件中设置相同， DFS Master与core-site.xml配置文件设置相同， User name 填Cluster里的用户名，不过感觉似乎无所谓

Advanced里hadoop.tmp.dir项与Cluster里core-site.xml配置文件一致

点击"finish"之后，会发现Eclipse软件下面的"Map/Reduce Locations"出现一条信息，就是我们刚才建立的"Map/Reduce Location"

双击此建立的Location后左侧应该出现DFS Locations目录，如果没有任何反应，记得切一下Perspective,切成Map/Reduce而不是Java

如可以刷新出远程的目录，则连接成功

其中遇到显示权限不足的问题org.apache.hadoop.security.AccessControlException:Permission denied...，解决如下：

在Cluster所有结点$HADOOP_HOME/conf/hdfs-site.xml中加入：

&lt;property&gt;  

&lt;name&gt;dfs.permissions&lt;/name&gt;  

&lt;value&gt;false&lt;/value&gt;  

&lt;/property&gt; 

重新连接即可解决～

Cluster Hadoop需要先启动，然后启动Eclipse连接

三 Eclipse 下运行WordCount实例

成功连接后从左侧树结构里可以直接操作HDFS， 新建文件夹，上传文件删除等等

1\. 从"Window"菜单下选择"Preference"，弹出一个窗体，从窗体的左侧找见"Java"，选择"Installed JREs"， 确认JDK为1.7

2\. 接着设置Complier, 也在Java目录下， 选为1.7

3\. 设置Eclipse的编码为UTF-8， 此处在General/Wordspace里

4\. 创建MapReduce项目

从"File"菜单，选择"Other"，找到"Map/Reduce Project"，然后选择它

接着，填写MapReduce工程的名字为"WordCountProject"，点击"finish"完成。

目前为止我们已经成功创建了MapReduce项目，我们发现在Eclipse软件的左侧多了我们的刚才建立的项目

选择"WordCountProject"工程，右击弹出菜单，然后选择"New"，接着选择"Class"，然后填写如下信息：

此处注意， Package与Hadoop保持一致 org.apache.hadoop.examples

Name也一致 WordCount

其它不变，Finish

5\. 在此目录下找到wordcount.java, copy其中的内容到此class中

-src

|---examples

|---org

|---apache

|---hadoop

|---examples

在HDFS中建立input目录，加入几个文本文件以便测试

在左侧选择此WordCount，右键，run Configurations， Arguments里填input 及 output文件夹的Hdfs路径， output文件夹不用提前建立

Run，即可显示结果，需要刷新左侧目录树，显示新生成的文件夹和结果文件
