# ivivan.com

Ivan 的个人网站：AI 系统、风控与反欺诈、投资方法的项目与研究笔记。用 [Astro](https://astro.build) 构建为纯静态站点，部署在 GitHub Pages（自定义域名 `ivivan.com`）。

## 本地开发

需要 Node.js 22.23 或更高版本（Astro 7 的要求）。

| 命令 | 作用 |
| :-- | :-- |
| `npm install` | 安装依赖 |
| `npm run dev` | 本地开发服务器，`http://localhost:4321` |
| `npm run build` | 构建到 `dist/`（同时校验内容的 frontmatter） |
| `npm run preview` | 预览构建结果 |

## 内容在哪里

| 内容 | 位置 |
| :-- | :-- |
| 项目案例 | `src/content/projects/*.md` |
| 研究笔记 | `src/content/research/*.md` |
| 笔记分类（名称、描述、顺序） | `src/config/content.ts` 中的 `researchCategories` |
| 首页、关于页等页面文案 | `src/config/content.ts` |
| 图片 | `public/images/` |

### 写一篇研究笔记

在 `src/content/research/` 新建一个 `.md` 文件：

```yaml
---
title: "标题"
description: "一句话摘要"
date: 2026-11-27
category: "risk-fraud"   # ai-systems | risk-fraud | investing | essays
tags: ["模型评估"]
draft: false              # true 时不发布
---
```

正文支持 Markdown 和 LaTeX 公式：行内用 `$...$`，独立公式把 `$$` 各放一行。因为 `$` 会被当作公式，正文里的金额请写成 `\$20` 或“20 美元”。

## 部署

推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）会构建并发布到 GitHub Pages。不存在的地址（包括旧博客的链接）会显示 `404` 页面。

## 投资页面（暂时隐藏）

投资记录页面目前隐藏：`src/config/content.ts` 中 `siteConfig.features.investing = false`，页面文件为 `src/pages/_investing.astro`（下划线开头不会被构建）。恢复时把开关设为 `true`，并把文件改回 `investing.astro`。页面只展示 `public/data/` 中经过隐私处理的数据（归一化指数、风险指标、大类配置），不包含账户金额、券商、持仓或交易记录。

## 旧博客

旧的 Hexo 文章备份在 `legacy-content/blog/`，不参与构建，也不在网站上显示。
