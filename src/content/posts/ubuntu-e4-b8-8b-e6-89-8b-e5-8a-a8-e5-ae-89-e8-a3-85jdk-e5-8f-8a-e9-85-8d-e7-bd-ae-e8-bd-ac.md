---
title: 'Ubuntu下手动安装jdk及配置-转'
description: '第一步：官网下载jdk 7 linux i586.tar.gz 第二步：解压安装 1. sudo tar zxvf ./jdk 7 linux i586.tar.gz& 160; C /usr/lib/jvm& 160;2. cd /usr/lib/jvm& 160;3. sudo mv jdk1.'
date: '2012-08-14'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'ubuntu-e4-b8-8b-e6-89-8b-e5-8a-a8-e5-ae-89-e8-a3-85jdk-e5-8f-8a-e9-85-8d-e7-bd-ae-e8-bd-ac'
---

#### 第一步：官网下载jdk-7-linux-i586.tar.gz

第二步：解压安装

1.  sudo tar zxvf ./jdk-7-linux-i586.tar.gz&#160; -C /usr/lib/jvm&#160;2.  cd /usr/lib/jvm&#160;3.  sudo mv jdk1.7.0/ java-7-sun&#160;

#### 第三步：修改环境变量

1.  vim ~/.bashrc&#160;

添加：

export JAVA_HOME=/usr/lib/jvm/java-7-sun&#160; 

1.  export JRE_HOME=${JAVA_HOME}/jre&#160;2.  export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib&#160;3.  export PATH=${JAVA_HOME}/bin:$PATH&#160;

保存退出，输入以下命令使之立即生效。

1.  source ~/.bashrc&#160;

#### 第四步：配置默认JDK版本

由于ubuntu中可能会有默认的JDK，如openjdk，所以，为了将我们安装的JDK设置为默认JDK版本，还要进行如下工作。  
执行代码:

1.  sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-7-sun/bin/java 300&#160;2.  sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-7-sun/bin/javac 300&#160;3.  sudo update-alternatives --install /usr/bin/jar jar /usr/lib/jvm/java-7-sun/bin/jar 300&#160;&#160;4.  sudo update-alternatives --install /usr/bin/javah javah /usr/lib/jvm/java-7-sun/bin/javah 300&#160;&#160;5.  sudo update-alternatives --install /usr/bin/javap javap /usr/lib/jvm/java-7-sun/bin/javap 300&#160;&#160;

执行代码：

1.  sudo update-alternatives --config java&#160;

系统会列出各种JDK版本，如下所示：

1.  snowdream@snowdream:~$ sudo update-alternatives --config java&#160;2.  有 3 个候选项可用于替换 java (提供 /usr/bin/java)。&#160;3.4.5.  &#160; 选择&#160;&#160;&#160;&#160;&#160;&#160; 路径&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; 优先级&#160; 状态&#160;6.  ------------------------------------------------------------&#160;7.  * 0&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; /usr/lib/jvm/java-6-openjdk/jre/bin/java&#160;&#160; 1061&#160;&#160;&#160;&#160;&#160; 自动模式&#160;8.  &#160; 1&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; /usr/lib/jvm/java-6-openjdk/jre/bin/java&#160;&#160; 1061&#160;&#160;&#160;&#160;&#160; 手动模式&#160;9.  &#160; 2&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; /usr/lib/jvm/java-6-sun/jre/bin/java&#160;&#160;&#160;&#160;&#160;&#160; 63&#160;&#160;&#160;&#160;&#160;&#160;&#160; 手动模式&#160;10.  &#160; 3&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; /usr/lib/jvm/java-7-sun/bin/java&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; 300&#160;&#160;&#160;&#160;&#160;&#160; 手动模式&#160;11.12.13.  要维持当前值[*]请按回车键，或者键入选择的编号：3&#160;14.  update-alternatives: 使用 /usr/lib/jvm/java-7-sun/bin/java 来提供 /usr/bin/java (java)，于 手动模式 中。&#160;

#### 第五步：测试

**[plain]** [view plain](http://blog.csdn.net/yang_hui1986527/article/details/6677450#)[copy](http://blog.csdn.net/yang_hui1986527/article/details/6677450#)

1.  snowdream@snowdream:~$ java -version&#160;2.  java version &quot;1.7.0&quot;&#160;3.  Java(TM) SE Runtime Environment (build 1.7.0-b147)&#160;4.  Java HotSpot(TM) Server VM (build 21.0-b17, mixed mode)&#160;
