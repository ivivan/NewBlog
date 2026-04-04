---
title: '如何在mac中用命令行时用sublime打开文件'
description: '如果是在默认shell下, sudo ln s "/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl" /usr/bin/subl 使用zsh的可以使用以下命令 alias subl="''/Applications/Subl'
date: '2016-04-12'
readTime: '3 min read'
image: '/assets/images/posts/post1.jpg'
slug: '如何在mac中用命令行时用sublime打开文件'
---

如果是在默认shell下,
sudo ln -s "/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl" /usr/bin/subl

***

使用zsh的可以使用以下命令
alias subl="'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl'"
alias nano="subl"
export EDITOR="subl"
