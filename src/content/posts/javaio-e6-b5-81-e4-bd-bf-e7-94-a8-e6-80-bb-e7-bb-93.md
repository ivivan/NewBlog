---
title: 'JavaIO流使用总结'
description: 'Java IO的一般使用原则： 一、按数据来源（去向）分类： 1、是文件： FileInputStream, FileOutputStream, FileReader, FileWriter 2、是byte[]：ByteArrayInputStream, ByteArrayOutputStream'
date: '2012-11-23'
readTime: '34 min read'
image: '/assets/images/posts/post1.jpg'
slug: 'javaio-e6-b5-81-e4-bd-bf-e7-94-a8-e6-80-bb-e7-bb-93'
---

Java IO的一般使用原则：

一、按数据来源（去向）分类：

1、是文件： FileInputStream, FileOutputStream, FileReader, FileWriter

2、是byte[]：ByteArrayInputStream, ByteArrayOutputStream

3、是Char[]: CharArrayReader, CharArrayWriter

4、是String: StringBufferInputStream, StringReader, StringWriter

5、网络数据流：InputStream, OutputStream, Reader, Writer

二、按是否格式化输出分：

1、要格式化输出：PrintStream, PrintWriter

三、按是否要缓冲分：

1、要缓冲：BufferedInputStream, BufferedOutputStream, BufferedReader, BufferedWriter

四、按数据格式分：

1、二进制格式（只要不能确定是纯文本的）: InputStream, OutputStream及其所有带Stream结束的子类

2、纯文本格式（含纯英文与汉字或其他编码方式）；Reader, Writer及其所有带Reader, Writer的子类

五、按输入输出分：

1、输入：Reader, InputStream类型的子类

2、输出：Writer, OutputStream类型的子类

六、特殊需要：

1、从Stream到Reader,Writer的转换类：InputStreamReader, OutputStreamWriter

2、对象输入输出：ObjectInputStream, ObjectOutputStream

3、进程间通信：PipeInputStream, PipeOutputStream, PipeReader, PipeWriter

4、合并输入：SequenceInputStream

5、更特殊的需要：PushbackInputStream, PushbackReader, LineNumberInputStream, LineNumberReader

决定使用哪个类以及它的构造进程的一般准则如下（不考虑特殊需要）：

**第一，考虑最原始的数据格式是什么：是否为文本？**

**第二，是输入还是输出?**

**第三，是否需要转换流：InputStreamReader, OutputStreamWriter?**

**第四，数据来源（去向）是什么：文件？内存？网络？**

**第五，是否要缓冲：bufferedReader （特别注明：一定要注意的是readLine()是否有定义，有什么比read, write更特殊的输入或输出方法）**

**第六，是否要格式化输出：print?**

**总结二：**

首先是java的IO。这破东西可真费事，I/O类库常使用”流(stream)”这种抽象。所谓”流”是一种能生成或接受数据的，代表数据的源和目标的对象。流把I/O设备内部的具体操作给隐藏起来了。 正如JDK文档所显示的，Java的I/O类库分成输入和输出两大部分。所有InputStream和Reader的派生类都有一个基本的，继承下来的，能读取单个或byte数组的read( )方法。同理，所有OutputStream和Writer的派生类都有一个基本的，能写入单个或byte数组的write( )方法。但通常情况下，你是不会去用这些方法的；它们是给其它类用的 —— 而后者会提供一些更实用的接口。因此，你很少会碰到只用一个类就能创建一个流的情形，实际上你得把多个对象叠起来，并以此来获取所需的功能。Java的流类库之所以会那么让人犯晕，最主要的原因就是”你必须为创建一个流而动用多个对象”。

**Java的IO类结构：     
**根接口是InputStream/OutputStream，充当数据源的IO类有FileInputStream /FileOutputStream，ByteArrayInputStream&#160; / ByteArrayOutputStream&#160; 等，充当装饰功能的IO类有BufferedInputStream&#160; /&#160;&#160; BufferedOutputStream，DataInputStream&#160;&#160; /&#160;&#160; DataOutputStream等，    
它们都是继承装饰接口FilterInputStream/FilterOutputStream。    
使用IO时，首先创建一个数据源IO，然后根据需要的功能创建装饰类IO，其构造函数的参数为已创建的数据源IO。    
我们以创建一个具有缓冲的文件输入流为例，假定需要从磁盘读取文件“C:\log.txt”：    
// 创建一个FileInputStream:    
FileInputStream fileInput = new FileInputStream(”C:\\log.txt”);    
// 创建一个BufferedInputStream:    
BufferedInputStream bufferedInput = new BufferedInputStream(fileInput);    
// 现在得到的bufferedInput即是具有缓冲的文件输入流    
或者进一步简写如下：    
InputStream input = new BufferedInputStream(new FileInputStream(”C:\\log.txt”));    
// 现在得到的input即是具有缓冲的文件输入流

**java.io.Reader 和 java.io.InputStream 区别**    
java.io.Reader 和 java.io.InputStream 组成了 Java 输入类。Reader 用于读入16位字符，也就是 Unicode 编码的字符；而 InputStream 用于读入 ASCII 字符和二进制数据。    
在 Java 中，有不同类型的 Reader 输入流对应于不同的数据源：    
FileReader 用于从文件输入；    
CharArrayReader 用于从程序中的字符数组输入；    
StringReader 用于从程序中的字符串输入；    
PipedReader 用于读取从另一个线程中的 PipedWriter 写入管道的数据。    
相 应的也有不同类型的 InputStream 输入流对应于不同的数据 源：FileInputStream，ByteArrayInputStream，StringBufferInputStream，PipedInputStream。 另外，还有两种没有对应 Reader 类型的 InputStream 输入流：    
Socket 用于套接字；    
URLConnection 用于 URL 连接。    
这两个类使用 getInputStream() 来读取数据。    
相应的，java.io.Writer 和 java.io.OutputStream 也有类似的区别。

**1、Java技术支持两种数据类型的流     
**InputStream和OutputStream：字节流。其它字节流都是InputStream或OutputStream的子类。    
Reader和 Writer：字符流。其它字符流都是Reader或Writer的子类。

**2、节点流**    
Java 2 SDK中有三种基本类型的节点：文件(file)、内存(memory)、管道(pipe)。

**3、过程流**    
过程流在其它流之上，完成排序、变换等操作。过程流也被称做过滤流。    
当你需要改变输入流的原始数据时，你可以将一个过滤输入流连接到一个原始的输入流上。    
用过滤流将原始数据变换成你需要的格式。

**4、基本字节流类**    
4.1、FileInputStream和FileOutputStream    
这两个节点流用来操纵磁盘文件。这些类的构造函数允许你指定它们所连接的文件。    
要构造一个FileInputStream，所关联的文件必须存在而且是可读的。    
如果你要构造一个FileOutputStream而输出文件已经存在，则它将被覆盖。    
FileInputStream infile = new FileInputStream(”myfile.dat”);    
FileOutputStream outfile = new FileOutputStream(”results.dat”);    
4.1、 BufferInputStream和BufferOutputStream    
这些是过滤器流，它们可以提高I/O操作的效率。    
4.3、 PipedInputStream和PipedOutputStream    
管道流用来在线程间进行通信。一个线程的PipedInputStream对象从另一个线程的PipedOutputStream对象读取输入。    
要使管道流有用，必须有一个输入方和一个输出方。    
4.4、 DataInputStream和DataOutputStream    
这些过滤器通过流来读写Java基本类

**5、 基本字符流类**    
图阐述了Reader和Writer字符流的体系结构。    
5.1、InputStreamReader 和 OutputStreamWriter    
用于字节流与字符流之间的转换接口。    
当你构造一个InputStreamReader或OutputStreamWriter时，转换规则定义了16位Unicode和其它平台的特定表示之间的转换。    
InputStreamReader从一个数据源读取字节，并自动将其转换成Unicode字符。    
如果你特别声明，InputStreamReade会将字节流转换成其它种类的字符流。    
OutputStreamWriter将字符的Unicode编码写到输出流，如果你的使用的不是Unicode字符，OutputStreamWriter会将你的字符编码转换成Unicode编码。    
5.2.、缓冲读者和作者    
因为在各种格式之间进行转换和其它I/O操作很类似，所以在处理大块数据时效率最高。    
在InputStreamReader和OutputStreamWriter的结尾链接一个BufferedReader和BufferedWriter是一个好主意。    
记住对BufferedWriter使用flush()方法。    
5.3、 使用其它字符转换    
如果你需要从一个非本地(例如，从连接到一个不同类型的机器的网络连接读取)的字符编码读取输入，    
你可以象下面这个程序那样，使用显式的字符编码构造ir=new InputStreamReader(System.in,&#160; “8859_1″);    
注：如果你通过网络连接读取字符，就应该使用这种形式。    
否则，你的程序会总是试图将所读取的字符当作本地表示来进行转换，而这并不总是正确的。ISO 8859-1是映射到ASCII的Latin-1编码模式。

**6、 对象串行化**    
java.io.Serializable接口支持将一个Java技术对象存放到一个流中。    
将一个对象存放到某种类型的永久存储器上称为”保持”。    
如果一个对象可以被存放到磁盘或磁带上，或者可以发送到另外一台机器并存放到存储器或磁盘上，那么这个对象就被称为可保持的。    
java.io.Serializable接口没有任何方法，它只作为一个”标记”，用来表明实现了这个接口的类可以串行化。    
类中没有实现Serializable接口的对象不能被保持。    
// 文件实现追加：    
// 其中的FileWriter()中的第二个参数的含义是:是否在文件中追加内容    
PrintWriter out = new PrintWriter(new FileWriter(logFileName, true), true);    
Java读写文件最常用的类是FileInputStream/FileOutputStream和FileReader/FileWriter。    
其中FileInputStream和FileOutputStream是基于字节流的，常用于读写二进制文件。    
读写字符文件建议使用基于字符的FileReader和FileWriter，省去了字节与字符之间的转换。    
但这两个类的构造函数默认使用系统的编码方式，如果文件内容与系统编码方式不一致，可能会出现乱码。    
在这种情况下，建议使用FileReader和FileWriter的父类：InputStreamReader/OutputStreamWriter，    
它们也是基于字符的，但在构造函数中可以指定编码类型：InputStreamReader(InputStream in, Charset cs) 和OutputStreamWriter(OutputStream out, Charset cs)。

// 读写文件的编码：   
InputStreamReader r = new InputStreamReader(new FileInputStream(fileName), “utf-8″);    
OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(fileName),”utf-8″);

**/**     
三种IO性能比较:      
在读写一个10k文件的时候，三种方式的耗时如下:      
InputStreamReader And OutputStreamWriter : 63ms (可以设置文件的编码，如果不用buffer)      
BufferedReader And BufferedWriter : 31ms      
BufferedInputStream And BufferedOutputStream : 16ms      
*/**

/**   
* Description: Test the java IO’s efficiency    
* Author: AllanCao    
* Date: 2007-02-18    
*/    
import java.io.*;

/**   
* **using the InputStreamReader And OutputStreamWriter**    
*/    
class EncoderRW {    
public static String read(String fileName) throws IOException {    
StringBuffer sb = new StringBuffer();    
/*此处读文件时用了buffer，如果不用，性能损失一倍*/    
BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(fileName), “utf-8″));    
String s;    
while((s = in.readLine()) != null) {    
sb.append(s);    
sb.append(”\n”);    
}    
in.close();    
return sb.toString();    
}    
public void write(String fileName, String text) throws IOException {    
OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(fileName),”utf-8″);    
out.write(text);    
out.flush();    
out.close();    
}    
}

/**   
* **using the BufferedReader And BufferedWriter     
***/    
class WriterReader {    
public String read(String fileName) throws IOException {    
StringBuffer sb = new StringBuffer();    
BufferedReader in = new BufferedReader(new FileReader(fileName));    
String s;    
while((s = in.readLine()) != null) {    
sb.append(s);    
sb.append(”\n”);    
}    
in.close();    
return sb.toString();    
}    
public void write(String fileName, String text) throws IOException {    
PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(fileName)));    
out.print(text);    
out.close();    
}    
}

/**   
* **using the BufferedInputStream And BufferedOutputStream**    
*/    
class BufferedStream{    
public byte[] read(String fileName) throws IOException {    
BufferedInputStream remoteBIS = new BufferedInputStream(new FileInputStream(fileName));    
ByteArrayOutputStream baos = new ByteArrayOutputStream(10240);    
byte[] buf = new byte[1024];    
int bytesRead = 0;    
while(bytesRead &gt;= 0)    
{    
baos.write(buf, 0, bytesRead);    
bytesRead = remoteBIS.read(buf);    
}    
byte[] content = baos.toByteArray();    
return content;    
}    
public void write(String fileName, byte[] content)&#160; throws IOException {    
BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(fileName));    
out.write(content);    
out.flush();    
out.close();    
}    
}

public class TestIO   
{    
public static void main(String[] args)throws IOException {    
long currentTime = System.currentTimeMillis() ;    
EncoderRW rw = new EncoderRW();    
rw.write(”index.dat”,rw.read(”FileUtil.java”));    
System.out.println(”cost time:” + Long.toString(System.currentTimeMillis()-currentTime) + ” ms”);

currentTime = System.currentTimeMillis() ;   
WriterReader wr = new WriterReader();    
wr.write(”index.dat”,wr.read(”FileUtil.java”));    
System.out.println(”cost time:” + Long.toString(System.currentTimeMillis()-currentTime) + ” ms”);

currentTime = System.currentTimeMillis() ;   
BufferedStream bf = new BufferedStream();    
bf.write(”index.dat”,bf.read(”FileUtil.java”));    
System.out.println(”cost time:” + Long.toString(System.currentTimeMillis()-currentTime) + ” ms”);    
}    
}

&#160;

**一、基本概念**

**1\. 概述**

&#160;&#160;&#160; 使用IO时，首先创建一个数据源IO，然后根据需要，创建装饰类IO。

**2\. Java IO的使用原则**

**决定使用哪个类以及它的构造进程的一般准则如下（不考虑特殊需要） **    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; 第一，考虑最原始的数据格式是什么：是否为文本？    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; 第二，是输入还是输出?    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; 第三，是否需要转换流：InputStreamReader, OutputStreamWriter?    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; 第四，数据来源（去向）是什么：文件？内存？网络？    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; 第五，是否要缓冲：bufferedReader （特别注明：一定要注意的是readLine()是否有定义，有什么比read, write更特殊的输入或输出方法）    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; 第六，是否要格式化输出：print?

**(1) 按数据来源（去向）分类**    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 是文件： FileInputStream, FileOutputStream, FileReader, FileWriter    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 是byte[]：ByteArrayInputStream, ByteArrayOutputStream    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 是Char[]: CharArrayReader, CharArrayWriter    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 是String: StringBufferInputStream, StringReader, StringWriter    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 网络数据流：InputStream, OutputStream, Reader, Writer

**(2) 按是否格式化输出分**    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 要格式化输出：PrintStream, PrintWriter

**(3) 按是否要缓冲分 **    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 要缓冲：BufferedInputStream, BufferedOutputStream, BufferedReader, BufferedWriter

**(4) 按数据格式分 **    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 二进制格式（只要不能确定是纯文本的）: InputStream, OutputStream及其所有带Stream结束的子类    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 纯文本格式（含纯英文与汉字或其他编码方式）；Reader, Writer及其所有带Reader, Writer的子类

**(5) 按输入输出分 **    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 输入：Reader, InputStream类型的子类    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 输出：Writer, OutputStream类型的子类

**(6) 特殊需要 **    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 从Stream到Reader,Writer的转换类：InputStreamReader, OutputStreamWriter    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 对象输入输出：ObjectInputStream, ObjectOutputStream    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 进程间通信：PipeInputStream, PipeOutputStream, PipeReader, PipeWriter    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 合并输入：SequenceInputStream    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; - 更特殊的需要：PushbackInputStream, PushbackReader, LineNumberInputStream, LineNumberReader

**二、 例子代码**

**1.文件操作**

**(1) 从文件读**

**- 字节流**

**FileInputStream 的read方法 **: throws IOException    
int read()读取单个字节    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; int read(byte[] b)从输入流中将最多 b.length 个字节的数据读入到 byte 数组中    
b - 存储读取数据的缓冲区。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; 返回：读入缓冲区的字节总数，如果到达文件末尾而没有更多的数据，返回 -1    
int read(byte[] b, int off,int len)读取len个字节到字节数组b中的指定位置    
b - 目标缓冲区。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; off - 开始存储字节处的偏移量。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; len - 要读取的最大字节数。

Java代码 [![收藏代码](http://zzqrj.iteye.com/images/icon_star.png)](http://zzqrj.iteye.com/blog/)

1.  //1\. 以字节为单位读取文件内容，一次读一个字节
2.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; FileInputStream in = new FileInputStream(file);&#160;3.  int temp;&#160;4.  while ((temp = in.read()) != -1) {//将读取的字节赋值给temp
5.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.write(temp);&#160;6.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;7.  &#160;&#160;&#160; in.close();&#160;8.9.  //2\. 以字节为单位读取文件内容，一次读多个字节
10.  int byteread = 0;&#160;11.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; FileInputStream in = new FileInputStream(fileName);&#160;12.  byte[] tempbytes = new byte[in.available()];// 一次读多个字节
13.  // 读入多个字节到字节数组中，byteread为一次读入的字节数
14.  while ((byteread = in.read(tempbytes)) != -1) {&#160;15.  // String s=new String(tempbytes,&quot;UTF-8&quot;);
16.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.write(tempbytes, 0, byteread);&#160;17.  &#160;&#160;&#160; }&#160;  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; //3\. 带缓冲的读文件&#160;&#160;&#160; BufferedInputStream 只有read方法,没有readLine方法

**BufferedInputStream的read方法** ：throws IOException    
int read()读取单个字节    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; int read(byte[] b)从输入流中将最多 b.length 个字节的数据读入到 byte 数组中    
&#160; b - 存储读取数据的缓冲区。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; 返回：读入缓冲区的字节总数，如果到达文件末尾而没有更多的数据，返回 -1    
int read(byte[] b, int off,int len)读取len个字节到字节数组b中的指定位置    
b - 目标缓冲区。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; off - 开始存储字节处的偏移量。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; len - 要读取的最大字节数。

Java代码 [![收藏代码](http://zzqrj.iteye.com/images/icon_star.png)](http://zzqrj.iteye.com/blog/)

1.  byte[] data = new byte[10];&#160;2.  BufferedInputStream bis = new BufferedInputStream(&#160;3.  new FileInputStream(&quot;C:\\readFile.txt&quot;));&#160;4.  BufferedOutputStream bos = new BufferedOutputStream(&#160;5.  new FileOutputStream(&quot;C:\\saveFile.txt&quot;));&#160;6.  while (bis .read(data) != -1) bos.write(data);&#160;7.  // 将缓冲区中的资料全部写出
8.  bos.flush();&#160;  

**- 字符流**

**FileReader的read方法： **    
int read()读取单个字节    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; int read(byte[] b)从输入流中将最多 b.length 个字节的数据读入到 byte 数组中    
b - 存储读取数据的缓冲区。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; 返回：读入缓冲区的字节总数，如果到达文件末尾而没有更多的数据，返回 -1    
int read(byte[] b, int off,int len)读取len个字节到字节数组b中的指定位置    
b - 目标缓冲区。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; off - 开始存储字节处的偏移量。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; len - 要读取的最大字节数。

Java代码 [![收藏代码](http://zzqrj.iteye.com/images/icon_star.png)](http://zzqrj.iteye.com/blog/)

1.  //1.一次读多个字符 read(byte[] b)
2.  char data[] = new char[10];//建立可容纳10个字符的数组
3.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; FileReader fr = new FileReader(&quot;algorithms.xml&quot;);&#160;4.  int num = fr.read(data);// 将数据读入字符列表data内
5.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; String str = new String(data, 0, num);// 将字符列表转换成字符串
6.  &#160;&#160;&#160; fr.close();&#160;7.8.  //2.一次读多个字符&#160; read(byte[] b, int off,int len)
9.  File fileName=new File(&quot;d:\\temp\\save.txt&quot;);&#160;10.  char data[] = new char[(int)fileName.length()];//根据文件长度建立数组
11.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; FileReader fr = new FileReader(fileName);&#160;12.  int num = fr.read(data,4,6);//从文件中读6个字符放到data数组中，起始位置为data[4]&#160;&#160;&#160;&#160;&#160;&#160;&#160; //返回值num为从文件中读取字符的长度，即6&#160;&#160;&#160;&#160;&#160;&#160;13.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; String str = new String(data, 0, num);// 将字符列表转换成字符串
14.  &#160;&#160;&#160; fr.close();&#160;  

&#160;&#160;&#160;&#160;&#160;&#160;&#160; //3\. 带缓冲的读文件

**BufferedReader的read方法： **增加了一个**readLine() **方法throws IOException    
int&#160;&#160;&#160; read() 读取单个字符。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; int read(char[] cbuf, int off, int len) 将字符读入数组的某一部分。    
&#160; cbuf - 目标缓冲区    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; off - 开始存储字符处的偏移量    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; len - 要读取的最大字符数    
String readLine() 读取一个文本行。

Java代码 [![收藏代码](http://zzqrj.iteye.com/images/icon_star.png)](http://zzqrj.iteye.com/blog/)

1.  //以行为单位从一个文件读取数据, BufferedReader 有read方法和readLine方法
2.  BufferedReader in = new BufferedReader( new FileReader(&quot;F:\\TestIO.java&quot;));&#160;3.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; String s=null;&#160;4.  while((s = in.readLine()) != null) {&#160;5.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; s+=&quot;\n&quot;;&#160;6.  System.out.print(s);&#160;7.  }&#160;8.  in.close();&#160;&#160;&#160;&#160;&#160;  

**(2) 写文件**

**- 字节流**

**FileOutputStream的write方法： **throws IOException&#160;&#160;&#160;&#160;&#160;&#160; 

void write(int b)将指定字节b写入文件   
b - 要写入的字节    
void write(byte[] b)将b.length 个字节从指定 byte 数组写入此文件输出流中    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; void write(byte[] b,int off,int len)将byte数组中从偏移off开始的len个字节写入文件输出流    
b - 数据    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; off - 数据中的起始偏移量    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; len - 要写入的字节数

Java代码 [![收藏代码](http://zzqrj.iteye.com/images/icon_star.png)](http://zzqrj.iteye.com/blog/)

1.  //1\. 不带缓冲的写文件
2.  byte b[]=new byte[512];&#160;3.  int count=System.in.read(b); //从键盘读取一行字符(写一个读一个，最大读取512个，回车读取结束)，存储到缓冲区
4.  boolean a = true;//true表示追加，false表示覆盖
5.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; FileOutputStream fos = new FileOutputStream(&quot;C:\\saveFile.txt&quot;, a);&#160;6.  fos.write(b);//把缓冲区b的内容写到指定的文件中
7.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; fos.close();&#160;  

&#160;&#160;&#160;&#160;&#160;&#160;&#160; //2\. 带缓冲的写文件 见文件操作(读)

**BufferedOutputStream的方法： **throws IOException    
void write(int b)将指定字节b写入文件    
b - 要写入的字节    
void write(byte[] b)将b.length 个字节从指定 byte 数组写入此文件输出流中    
void write(byte[] b,int off,int len)将byte数组中从偏移off开始的len个字节写入文件输出流    
b - 数据    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; off - 数据中的起始偏移量    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; len - 要写入的字节数    
void flush()刷新此缓冲的输出流，迫使所有缓冲的输出字节被写出到底层输出流中

**- 字符流**

&#160;&#160;&#160;&#160;&#160;&#160;&#160; //1\. 不带缓冲的写文件   
**FileWriter的write方法： **throws IOException    
void write(int b)将指定字节b写入文件    
b - 要写入的字节    
void write(byte[] b)将b.length 个字节从指定 byte 数组写入此文件输出流中    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; void write(byte[] b,int off,int len)将byte数组中从偏移off开始的len个字节写入文件输出流    
b - 数据    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; off - 数据中的起始偏移量    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; len - 要写入的字节数

Java代码 [![收藏代码](http://zzqrj.iteye.com/images/icon_star.png)](http://zzqrj.iteye.com/blog/)

1.  FileReader fr = null;&#160;2.  FileWriter fw = null;&#160;3.  int bi;&#160;4.  fr = new FileReader(&quot;d:\\temp\\read.txt&quot;);&#160;5.  fw = new FileWriter(&quot;d:\\temp\\save1.txt&quot;);&#160;6.  while ((bi = fr.read()) != -1) {&#160;7.  &#160;&#160;&#160; fw.write(bi);//一次读一个字符(一个汉字字符占两个字节，一个英文字符占一个字节)
8.  }&#160;9.  fr.close();&#160;10.  fw.close();&#160;  

&#160;&#160;&#160;&#160;&#160;&#160;&#160; //2\. 带缓冲的写文件   
**BufferedWriter的方法： **throws IOException    
void write(char[] cbuf, int off, int len) 写入字符数组的某一部分。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; void write(int c) 写入单个字符。    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; void write(String s, int off, int len) 写入字符串的某一部分    
s - 要写入的字符串    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; off - 开始读取字符处的偏移量    
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; len - 要写入的字符数    
void newLine() 写入一个行分隔符。行分隔符字符串由系统属性 line.separator 定义，并且不一定是单个新行 ('\n') 符    
&#160;&#160;&#160;&#160;&#160;&#160;&#160; void flush()刷新此缓冲的输出流，迫使所有缓冲的输出字节被写出到底层输出流中

Java代码 [![收藏代码](http://zzqrj.iteye.com/images/icon_star.png)](http://zzqrj.iteye.com/blog/)

1.  public class BufferedReaderWriterDemo {&#160;2.  public static void main(String[] args) {&#160;3.  try {&#160;4.  // 缓冲System.in输入流
5.  // System.in是位流，可以通过InputStreamReader将其转换为字符流
6.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; BufferedReader bufReader = new BufferedReader(&#160;7.  new InputStreamReader(System.in));&#160;8.  // 缓冲FileWriter
9.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; BufferedWriter bufWriter = new BufferedWriter(new FileWriter(&#160;10.  &quot;F:\\saveFile.txt&quot;));&#160;11.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; String input = null;&#160;12.  // 每读一行进行一次写入动作
13.  while (!(input = bufReader.readLine()).equals(&quot;quit&quot;)) {&#160;14.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufWriter.write(input);&#160;15.  // newLine()方法写入与操作系统相依的换行字符，依执行环境当时的OS来决定该输出那种换行字符
16.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufWriter.newLine();&#160;17.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;18.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufReader.close();&#160;19.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufWriter.close();&#160;20.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; } catch (ArrayIndexOutOfBoundsException e) {&#160;21.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.println(&quot;没有指定文件&quot;);&#160;22.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; } catch (IOException e) {&#160;23.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; e.printStackTrace();&#160;24.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;25.  &#160;&#160;&#160; }&#160;26.  }&#160;  

**2\. 内存读写**

ByteArrayInputStream和ByteArrayOutputStream是将位数组当作流输入来源、输出目的地的类。   
CharArrayReader和CharArrayWriter将字符数组当作字符数据输入输出的来源和目的

**ByteArrayInputStream的方法： **throws IOException    
构造函数：ByteArrayInputStream(byte[] buf)    
创建一个 ByteArrayInputStream，使用 buf 作为其缓冲区数组。    
ByteArrayInputStream(byte[] buf, int offset, int length)    
创建 ByteArrayInputStream，使用 buf 作为其缓冲区数组。    
buf - 输入缓冲区。    
offset - 缓冲区中要读取的第一个字节的偏移量。    
length - 从缓冲区中读取的最大字节数。    
int read()读取单个字节    
int read(byte[] b)从输入流中将最多 b.length 个字节的数据读入到 byte 数组中    
b - 存储读取数据的缓冲区。    
返回：读入缓冲区的字节总数，如果到达文件末尾而没有更多的数据，返回 -1    
int read(byte[] b, int off,int len)读取len个字节到字节数组b中的指定位置    
b - 目标缓冲区。    
off - 开始存储字节处的偏移量。    
len - 要读取的最大字节数。    
**ByteArrayOutputStream的方法： **    
byte[]&#160; toByteArray()    
创建一个新的 byte 数组，大小是此输出流的当前大小，并且缓冲区的有效内容已复制到该数组中。    
String toString() 使用平台默认的字符集，通过解码字节将缓冲区内容转换为字符串。    
String toString(String charsetName)    
使用指定的 charsetName，通过解码字节将缓冲区内容转换为字符串。    
void write(byte[] b, int off, int len)    
将byte数组中从偏移量off开始的len个字节写入此byte数组输出流。    
b - 数据。    
off - 数据的初始偏移量。    
len - 要写入的字节数。    
void write(int b) 将指定的字节写入此 byte 数组输出流。    
void writeTo(OutputStream out) 将此 byte 数组输出流的全部内容写入到指定的输出流参数中。

Java代码 [![收藏代码](http://zzqrj.iteye.com/images/icon_star.png)](http://zzqrj.iteye.com/blog/)

1.  public class ByteArrayStreamDemo {&#160;2.  public static void main(String[] args) {&#160;3.  try {&#160;4.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; BufferedInputStream bufInputStream = new BufferedInputStream(&#160;5.  new FileInputStream(&quot;F:\\read.txt&quot;));&#160;6.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();&#160;7.  byte[] bytes = new byte[1];&#160;8.  // 将文件内容写入位数组流
9.  while (bufInputStream.read(bytes) != -1) {&#160;10.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; arrayOutputStream.write(bytes);&#160;11.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;12.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; arrayOutputStream.close();&#160;13.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufInputStream.close();&#160;14.  // toByteArray()方法，以字符方式显示位数组内容
15.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bytes = arrayOutputStream.toByteArray();&#160;16.  for (int i = 0; i &lt; bytes.length; i++) {&#160;17.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.print((char) bytes[i]);&#160;18.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;19.  //toString()方法
20.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.println(arrayOutputStream.toString());&#160;21.22.  // writeTo方法
23.  //写到控制台输出流(能直接输出)
24.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; arrayOutputStream.writeTo(System.out);&#160;&#160;25.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; FileOutputStream fo=new FileOutputStream(&quot;F:\\saveFile.txt&quot;,true);&#160;26.  //写到文件输出流，能直接输出
27.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; arrayOutputStream.writeTo(fo);&#160;28.29.  // 让使用者输入位置与字符修改位数组内容
30.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; Scanner scanner = new Scanner(System.in);&#160;31.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.print(&quot;请输入修改位置：&quot;);&#160;32.  int pos = scanner.nextInt();&#160;33.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.println(&quot;输入修改字符&quot;);&#160;34.  // 修改数组中对应的字符
35.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bytes[pos - 1] = (byte) scanner.next().charAt(0);&#160;36.  // 将位数组内容存回文件
37.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(&#160;38.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bytes); // 参数是数组
39.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; BufferedOutputStream bufOutputStream = new BufferedOutputStream(&#160;40.  new FileOutputStream(&quot;F:\\read.txt&quot;));&#160;41.  byte[] tmp = new byte[1];&#160;42.  while (byteArrayInputStream.read(tmp) != -1)//从字节数组中读取数据
43.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufOutputStream.write(tmp);&#160;44.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; byteArrayInputStream.close();&#160;45.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufOutputStream.flush();&#160;46.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufOutputStream.close();&#160;47.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; } catch (ArrayIndexOutOfBoundsException e) {&#160;48.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.println(&quot;请指定文件名称&quot;);&#160;49.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; } catch (IOException e) {&#160;50.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; e.printStackTrace();&#160;51.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;52.  &#160;&#160;&#160; }&#160;53.  }&#160;  

**CharArrayReader的方法： **    
构造函数：CharArrayReader(char[] buf)创建一个 CharArrayReader，使用 buf 作为其缓冲区数组。    
CharArrayReader (char[] buf, int offset, int length)    
创建 CharArrayReader，使用 buf 作为其缓冲区数组。    
&#160;&#160;&#160;&#160; buf - 输入缓冲区。    
&#160;&#160;&#160;&#160; offset - 缓冲区中要读取的第一个char的偏移量。    
&#160;&#160;&#160;&#160; length - 从缓冲区中读取的最字符数。    
int read()读取单个字符    
int read(char[] c)将最多 c.length 个字符读入到 char 数组中    
c - 存储读取数据的缓冲区。    
&#160;&#160;&#160;&#160; 返回：读取的实际字符数；如果到达流末尾，则返回 -1    
int read(char[] c, int off,int len)读取len个字节到字节数组b中的指定位置    
&#160; c - 目标缓冲区。    
&#160;&#160;&#160;&#160; off - 开始存储字符的偏移量。    
len - 要读取的最大字符数。

**CharArrayWriter的方法： **    
char[]&#160; toCharArray() 返回输入数据的副本。    
String toString() 将输入的数据转换为字符串。    
void write(char[] b, int off, int len)    
将char数组中从偏移量off开始的len个字节写入此CharArrayWriter数组输出。    
c - 数据。    
off - 数据的初始偏移量。    
len - 要写入的字符数。    
void write(String str, int off, int len) 将字符串的某一部分写入缓冲区。    
str -要写入的字符串。    
off - 数据的初始偏移量。    
len - 要写入的字符数。    
void write(int b) 将一个字符写入缓冲区。    
void writeTo(Writer out) 将缓冲区的内容写入另一个字符流。

Java代码 [![收藏代码](http://zzqrj.iteye.com/images/icon_star.png)](http://zzqrj.iteye.com/blog/)

1.  public class CharArrayReaderWriterDemo {&#160;2.  public static void main(String[] args) {&#160;3.  try {&#160;4.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; BufferedReader bufInputReader = new BufferedReader(new FileReader(&#160;5.  &quot;F:\\read.txt&quot;));&#160;6.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; CharArrayWriter charArrayWriter = new CharArrayWriter();&#160;7.  char[] array = new char[1];&#160;8.  // 将文件读入字符数组
9.  while (bufInputReader.read(array) != -1) {&#160;10.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; charArrayWriter.write(array);&#160;11.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;12.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; charArrayWriter.close();&#160;13.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufInputReader.close();&#160;14.15.  // toCharArray()方法 显示字符内容
16.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; array = charArrayWriter.toCharArray();&#160;17.  for (int i = 0; i &lt; array.length; i++) {&#160;18.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.print(array[i] + &quot; &quot;);&#160;19.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;20.  //toString()方法
21.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.println(charArrayWriter.toString());&#160;22.23.  // writeTo方法&#160; 写到文件输出流，能直接输出
24.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; FileWriter fw=new FileWriter(&quot;F:\\saveFile.txt&quot;);&#160;25.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; charArrayWriter.writeTo(fw);&#160;26.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; fw.close();&#160;27.28.  // 将字符数组内容存回文件
29.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; CharArrayReader charArrayReader = new CharArrayReader(array);&#160;30.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; BufferedWriter bufWriter = new BufferedWriter(new FileWriter(&quot;F:\\read.txt&quot;));&#160;31.  char[] tmp = new char[1];&#160;32.  while (charArrayReader.read(tmp) != -1) {&#160;33.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufWriter.write(tmp);&#160;34.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;35.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; charArrayReader.close();&#160;36.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufWriter.flush();&#160;37.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bufWriter.close();&#160;38.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; } catch (ArrayIndexOutOfBoundsException e) {&#160;39.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.out.println(&quot;请指定文件名！&quot;);&#160;40.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; } catch (IOException e) {&#160;41.  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; e.printStackTrace();&#160;42.  &#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;43.  &#160;&#160;&#160; }&#160;44.  }&#160;  

**3\. 其它**

InputStreamReader 和 OutputStreamWriter，用于字节流与字符流之间的转换   
InputStreamReader从一个数据源读取字节，并自动将其转换成Unicode字符，除非特别声明    
OutputStreamWriter将字符的Unicode编码写到输出流，如果你的使用的不是Unicode字符，OutputStreamWriter会将你的字符编码转换成Unicode编码。    
在InputStreamReader和OutputStreamWriter的结尾链接一个BufferedReader和BufferedWriter是一个好主意。记住对BufferedWriter使用flush()方法。

// 读写文件的编码：   
InputStreamReader r = new InputStreamReader(new FileInputStream(fileName), &quot;utf-8&quot;);    
OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(fileName),&quot;utf-8&quot;);
