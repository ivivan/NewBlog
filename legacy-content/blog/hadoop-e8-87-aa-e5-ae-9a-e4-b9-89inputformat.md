---
title: Hadoop自定义Inputformat
id: 1421
categories:
  - 国境以南
  - 工作相关
date: 2012-11-23 21:59:00
tags:
---

用户可根据基本inputformat及recordreader代码修改得到自定义inputformat，此处代码提供Key为空，Value为整个文件内容的inputformat及recordreader，key与value间默认间隔符可以在执行时通过不同参数调整

修改好两个class文件后，依后文编译替换默认streaming.jar

&#160;

WholeFileInputFormat

package org.apache.hadoop.streaming;   
import java.io.IOException;    
import org.apache.hadoop.fs.*;    
import org.apache.hadoop.io.*;    
import org.apache.hadoop.mapred.*;    
// vv WholeFileInputFormat    
public class WholeFileInputFormat    
&#160;&#160;&#160; extends FileInputFormat&lt;Text, BytesWritable&gt; {    
&#160; @Override    
&#160; protected boolean isSplitable(FileSystem fs, Path filename) {    
&#160;&#160;&#160; return false;    
&#160; }    
&#160; @Override    
&#160; public RecordReader&lt;Text, BytesWritable&gt; getRecordReader(    
&#160;&#160;&#160;&#160;&#160; InputSplit split, JobConf job, Reporter reporter) throws IOException {    
&#160;&#160;&#160; return new WholeFileRecordReader((FileSplit) split, job);    
&#160; }    
}    
// ^^ WholeFileInputFormat

package org.apache.hadoop.streaming;   
// cc WholeFileRecordReader The RecordReader used by WholeFileInputFormat for reading a whole file as a record    
import java.io.IOException;    
import org.apache.hadoop.conf.Configuration;    
import org.apache.hadoop.fs.*;    
import org.apache.hadoop.io.*;    
import org.apache.hadoop.mapred.*;    
// vv WholeFileRecordReader    
class WholeFileRecordReader implements RecordReader&lt;Text, BytesWritable&gt; {    
&#160; private FileSplit fileSplit;    
&#160; private Configuration conf;    
&#160; private boolean processed = false;    
&#160; public WholeFileRecordReader(FileSplit fileSplit, Configuration conf)    
&#160;&#160;&#160;&#160;&#160; throws IOException {    
&#160;&#160;&#160; this.fileSplit = fileSplit;    
&#160;&#160;&#160; this.conf = conf;    
&#160; }    
&#160; @Override    
&#160; public Text createKey() {    
&#160;&#160;&#160; return new Text();    
&#160; }    
&#160; @Override    
&#160; public BytesWritable createValue() {    
&#160;&#160;&#160; return new BytesWritable();    
&#160; }    
&#160; @Override    
&#160; public long getPos() throws IOException {    
&#160;&#160;&#160; return processed ? fileSplit.getLength() : 0;    
&#160; }    
&#160; @Override    
&#160; public float getProgress() throws IOException {    
&#160;&#160;&#160; return processed ? 1.0f : 0.0f;    
&#160; }    
&#160; @Override    
&#160; public boolean next(Text key, BytesWritable value) throws IOException {    
&#160;&#160;&#160; if (!processed) {    
&#160;&#160;&#160;&#160;&#160; byte[] contents = new byte[(int) fileSplit.getLength()];    
&#160;&#160;&#160;&#160;&#160; Path file = fileSplit.getPath();    
&#160;&#160;&#160;&#160;&#160; FileSystem fs = file.getFileSystem(conf);    
&#160;&#160;&#160;&#160;&#160; FSDataInputStream in = null;    
//&#160;&#160;&#160;&#160;&#160; key.set('&gt;'+file.toString());    
&#160;&#160;&#160;&#160;&#160; try {    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; in = fs.open(file);    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; IOUtils.readFully(in, contents, 0, contents.length);    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; value.set(contents, 0, contents.length);    
&#160;&#160;&#160;&#160;&#160; } finally {    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; IOUtils.closeStream(in);    
&#160;&#160;&#160;&#160;&#160; }    
&#160;&#160;&#160;&#160;&#160; processed = true;    
&#160;&#160;&#160;&#160;&#160; return true;    
&#160;&#160;&#160; }    
&#160;&#160;&#160; return false;    
&#160; }    
&#160; @Override    
&#160; public void close() throws IOException {    
&#160;&#160;&#160; // do nothing    
&#160; }    
}    
// ^^ WholeFileRecordReader

&#160;

#download hadoop-1.0.0

#download commons-logging-1.1.1.jar

mkdir /home/ubuntu/hadoop-1.0.0/contrib/streaming/new_test

cd /home/ubuntu/hadoop-1.0.0/contrib/streaming

#unpack the jar and a directory org is created   
jar xvf hadoop-streaming-1.0.0.jar

#put the custom Inputformat and RecordReader (FastaInputFormat.java and FastaRecordReader.java) in org/apache/hadoop/streaming/ and compile

javac -classpath /home/ubuntu/hadoop-1.0.0/hadoop-core-1.0.0.jar ./org/apache/hadoop/streaming/ *.java

#create a jar

jar cvfm hadoop-streaming-1.0.3.jar /usr/local/hadoop/contrib/streaming/new/META-INF/MANIFEST.MF -C /usr/local/hadoop/contrib/streaming/new/ .

#replace the original jar   
rm ../hadoop-streaming-1.0.0.jar -f

cp hadoop-streaming-1.0.0.jar ../ –f