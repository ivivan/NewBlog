---
title: 如何在mac中用命令行时用sublime打开文件
date: 2016-04-12 15:33:05
tags: linux,mac,skill
categories: 国境以南
---

如果是在默认shell下,
sudo ln -s "/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl" /usr/bin/subl

***

使用zsh的可以使用以下命令
alias subl="'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl'"
alias nano="subl"
export EDITOR="subl"