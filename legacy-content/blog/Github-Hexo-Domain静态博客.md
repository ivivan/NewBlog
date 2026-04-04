---
title: Github+Hexo+Domain静态博客
date: 2016-05-27 15:47:23
tags: mac,life,blog,skill
categories: 国境以南
---

还是在Github上弄了一个静态网站，把流程贴在这里备份。

1. Github设置

+ 建一个Repository, 命名格式 yourname.github.io. Yourname是Github里的用户名
+ SSH密匙，用Mac版的Github客户端自动搞定，也可手动生成

2. Mac端环境设置

+ 安装Git 
  + 从Homebrew里装 `brew install git`
+ 安装Node.JS
  + 官方网站下载安装 [官方网站](https://nodejs.org/en/)
  + 或Homebrew `brew install node`
+ 安装Hexo
  + 从Homebrew里装 `npm install hexo --save`
  + 部分插件
    + sitemap `npm install hexo-generator-sitemap --save`
    + xml `npm install hexo-generator-feed --save`

3. 本地Blog设置

+ 建一个文件夹Blog
+ 在这个文件夹下执行
  + `hexo init XXXX` #新建博客目录
  + `hexo g` #根据当前目录下文件生成静态网页
  + `hexo s` #启动服务器
  + 浏览器输入http://localhost:4000就可以看到效果。
+ 修改Hexo配置文件config.yml，注意以下几部分
  ```
  Plugins:
    - hexo-generator-sitemap

  sitemap:
    path: sitemap.xml

  url: http://www.ivivan.com/
  root: /

  deploy:
  type: git
  repository: git@github.com:username/username.github.io.git
  ```
+ 主题设置
  + 用的这个主题 [fexo](http://forsigner.com)
  + 主题设置见文档
4. 自定义域名
+ Github设置
  + 在Blog文件夹source文件夹下建CNAME文件
    + 全大写无后缀，内容www.ivivan.com
  + 在Blog文件夹source文件夹下建robots.txt文件
  
    ```
    User-agent: *
    Disallow:
    Sitemap: http://www.ivivan.com/sitemap.xml
    ```  
    
+ DNS设置
  + A记录指向username.github.io页面的IP地址
  + CNAME记录www指向username.github.io
  + DNS可选不同服务商，目前用DNSPOD国际版
5. 发布Blog

+ Git 存用户名和密码
  ```
  git config --global user.name "你的名字"
  git config --global user.email  "你的邮箱"
  ```
+ Hexo部署页面
  + `hexo g -d`

虽然一直略认为前端没什么技术含量，可有些人做的主题是真好看~









