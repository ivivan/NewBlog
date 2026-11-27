我建议第一版坚持一个原则：静态优先、手动/半自动更新、默认不存任何私密金融数据。你已经有 GitHub Pages 和域名，不必为了一个 dashboard 先引入数据库、后端、登录和复杂运维。GitHub Pages 本身就是从 GitHub 仓库发布 HTML/CSS/JavaScript 的静态托管，可直接绑定自定义域名；推送代码即可更新网站。

推荐定位
首页可用一句类似这样的定位：

Building practical AI systems for decision-making, risk analytics, and personal investment research.

中文也可以更有个人特点：

用 AI、数据与可复现研究，记录我对风险、投资和真实世界决策问题的探索。

核心不是“晒收益”，而是传达三件事：

你能把 AI/ML 做成实际系统，而不止是训练模型。

你对风险、评估、解释性和数据质量有成熟的方法论。

你有长期、可验证、风险意识明确的投资研究框架。

这与您做过的 fraud/risk modelling、MLOps、模型解释和数据工程非常一致。相比一个纯作品集，会更有个人差异化。

建议的网站结构
建议控制在 5 个页面以内，并让首页承担 80% 的访问需求。

页面	目的	关键内容
/ 首页	建立第一印象	定位、精选项目、公开投资快照、近期研究、联系入口
/projects AI 项目	展示技术能力和交付能力	每个项目的业务问题、系统架构、指标、技术栈、Demo/GitHub
/investing 投资追踪	展示长期框架，而非账户明细	净值指数曲线、资产配置、地区/行业暴露、方法与披露
/research 研究笔记	替代旧博客，但不是传统日更博客	短研究卡片、投资 thesis、AI 实验、模型治理思考
/about	简洁说明个人背景	你的专业方向、工作方法、公开联系渠道
首页布局
按从上到下的阅读顺序：

Hero 区

姓名 / 一句话定位

两个 CTA：

Explore AI Projects

View Investment Dashboard

不需要放大头像；可用干净的抽象数据/网络图背景，或完全留白。

Selected AI Projects

放 3 个重点项目，不要超过 4 个。

例如：

Fraud Detection & Risk Scoring

Academic Risk Prediction

AI Research / Knowledge Agent

每个卡片只显示一句问题定义、一个主要结果、技术标签。

Public Investment Snapshot

一个净值指数图。

3–4 个指标卡：成立时间、累计回报、最大回撤、近 12 个月表现。

一个资产配置堆叠条或 donut chart。

明确标注：Illustrative public dashboard — delayed and privacy-filtered data.

Research Notes

展示最新 3 条短笔记，例如：

“Why I track contribution, not just portfolio return”

“A practical framework for model monitoring”

“Building a small research pipeline with LLMs”

每条只需 150–600 字，不需要恢复旧式长博客。

Footer

GitHub、LinkedIn、邮箱或联系表单。

免责声明链接。

最后更新时间。

投资 Dashboard：公开什么，不公开什么
这里建议你把“真实账户收益”转换为一个隐私过滤后的公开组合指数。它应反映你的长期过程和方法，但不允许别人倒推出账户规模、具体券商、成本、交易时间或完整持仓。

推荐公开的数据
模块	可以展示	实施建议
净值走势	从基准日归一化到 100 的指数曲线	不展示账户余额、绝对金额
收益比较	组合 vs 一个或两个基准指数	例如 Portfolio Index、Global Equity Benchmark、Balanced Benchmark
风险指标	最大回撤、波动率、月度收益分布	用月度数据，不要展示日级交易轨迹
资产配置	股票、ETF、现金、固定收益、另类等大类	使用比例或区间，例如 60–70%
地区/币种暴露	AU、US、Global、Cash 等	只列大类，避免披露具体账户结构
行业暴露	Technology、Financials、Healthcare 等	展示 Top 5 或大类，隐藏小仓位
方法说明	再平衡周期、基准、统计口径	比选股清单更有价值
更新频率	月度或季度	页面注明 Last updated: YYYY-MM
强烈建议不要公开
账户总资产、现金余额、精确持仓市值。

券商名称、账户编号、报表截图、税务信息。

单笔买卖的日期、价格、数量、成交记录。

全部 ticker 和精确权重，尤其是小仓位与高度集中的仓位。

实时或近实时数据。

没有明确统计口径的“收益率”。

尤其是收益曲线：建议使用归一化净值，比如起点设为 100，当前为 148.6，而不是显示 $XXX,XXX。这样仍然能展示长期表现，同时最大限度去掉规模与资金进出带来的隐私暴露。

收益计算要先定义
如果你的账户有定期入金或出金，不能简单拿“当前资产 ÷ 初始资产”算收益；那会把现金流误判为投资表现。

建议公开层面使用：

时间加权收益率（TWR）：更适合评价投资策略本身，尽量剥离新增资金/取款影响。

XIRR/内部收益率（IRR）：更反映你实际资金的个人回报，但会受到入金时间影响。

最稳妥的展示方式：

主图：月度 Portfolio Index，使用 TWR 或近似的链式收益。

辅助指标：年化收益、波动率、最大回撤。

页脚：说明收益口径、是否含税费、是否含股息、更新截止日期。

像 Portfolio Performance 这类本地优先的开源工具，也强调时间加权回报率和 IRR，并支持自定义分类与报告；这可作为你的内部核算工具，而公开站点只接收去敏后的导出结果。

最适合你的技术方案
首选：Astro + GitHub Pages + 静态 JSON/CSV
这是我最建议的第一版方案：

text
GitHub Repository
├── Astro 网站源码
├── src/content/projects/        # AI 项目 Markdown
├── src/content/research/        # 研究笔记 Markdown
├── public/data/
│   ├── portfolio-monthly.json
│   ├── allocation.json
│   └── disclosures.json
├── GitHub Actions
└── GitHub Pages + 自定义域名
前端结构：

text
Astro
├── Tailwind CSS
├── Chart.js 或 Apache ECharts
├── Markdown / MDX 内容
└── 静态构建和部署
为什么这套组合最合适
不需要后端：不处理真实交易数据，不暴露 API key，也没有数据库运维。

部署成本接近零：保持 GitHub Pages 即可；自定义域名仍然可用。

对数据专业人士很友好：你可用 Python/pandas 在本地生成 JSON/CSV，前端只做展示。

适合渐进迭代：先上线项目页和假数据 dashboard，之后再接入半自动更新。

版本可追溯：每次公开数据更新都在 Git history 中，适合做“截至日期”的研究档案。

开发难度较低：Astro 适合内容型、静态型站点；不必上 Next.js server-side rendering，也不需要 FastAPI。

如果你不想学习 Astro，甚至可以从一个单页 HTML + Chart.js 开始；但从长期可维护性来看，Astro 的项目结构和 Markdown 内容管理更舒服。

不建议第一版就做的事
不要一开始接券商 API。

不要把持仓/交易数据放进前端环境变量、GitHub Secrets 后再构建公开页面——构建后结果仍可被提取和推断。

不要为了 dashboard 上 PostgreSQL、FastAPI、Docker、VPS。

不要做登录、注册、用户系统。

不要做“实时行情”；它增加合规、稳定性和成本问题，却不一定提高个人站点价值。

如果未来确实需要动态功能，例如私有 dashboard、受限分享、定时生成报告、数据 ingestion，再将公开主站部署到 Cloudflare Pages 或 Vercel，并把私有部分单独拆出去。静态部署平台通常提供 Git 自动部署、HTTPS 和 CDN；但你的 MVP 仍不需要为此迁移。

数据更新工作流
你的工作流可以保持在每月 15 分钟内：

text
券商 / 投资记录
      ↓
私有本地 Excel、Google Sheet 或 Portfolio Performance
      ↓
Python 清洗与计算
      ↓
生成已去敏的 JSON 文件
      ↓
Git commit + push
      ↓
GitHub Actions build
      ↓
公开网站更新
建议的数据层分离
务必分成两个仓库或两个数据目录：

text
private-investment-tracker/
├── transactions.csv
├── holdings.csv
├── broker_exports/
├── analysis.ipynb
└── export_public_dashboard.py

public-website/
├── public/data/portfolio-monthly.json
├── public/data/allocation.json
└── ...
私有仓库保存真实交易、账户、标的、成本、金额和原始导出；公开仓库只接受 Python 脚本处理后的、不可逆的聚合结果。

例如，公开数据可以是：

json
{
  "as_of": "2026-09-30",
  "base_index": 100,
  "series": [
    { "date": "2024-01-31", "portfolio": 100.0, "benchmark": 100.0 },
    { "date": "2024-02-29", "portfolio": 101.8, "benchmark": 102.3 },
    { "date": "2024-03-31", "portfolio": 104.2, "benchmark": 104.1 }
  ],
  "metrics": {
    "annualised_return": 0.112,
    "max_drawdown": -0.094,
    "volatility": 0.127
  }
}
而不是：

json
{
  "account_value": 423815.72,
  "holdings": [
    { "ticker": "...", "units": 1543, "cost_base": 0 }
  ]
}
更新频率建议
项目展示：完成一个阶段成果才更新。

研究笔记：不追求频率；每月 1–2 篇高质量短文已经足够。

投资 dashboard：按月更新，而不是每天。

资产配置：月末快照，或季度更新。

具体投资 thesis：只在已经有稳定观点、且不担心公开影响时写。

AI 项目如何展示
每个项目不要只堆技术名词。建议统一使用下面的卡片或详情页模板：

text
# 项目名称

## Problem
解决什么真实问题？谁受影响？原先的决策困难是什么？

## Approach
数据、特征、模型、系统架构和部署方式是什么？

## Outcome
结果是什么？例如 AUC、Recall、误报率下降、人工审核节省、
上线稳定性，或业务采用情况。

## Explainability & Governance
如何处理模型解释、偏差、监控、漂移和风险控制？

## Stack
Python · Spark · Azure ML · Snowflake · LightGBM · SHAP · MLflow

## What I learned
一个值得复用的设计原则或失败教训。
对您来说，“Explainability & Governance”应成为明显的个人标签。许多人会说自己会 LightGBM；较少人会系统说明：为什么模型被信任、如何监控、如何和业务方沟通、什么情况下不应自动化决策。

可展示的项目方向
在不泄露雇主数据和保密信息的前提下，可以做成去标识化 case study：

Fraud / risk decisioning

把商业数据、客户名和具体业绩替换为问题模式、架构和相对提升。

强调阈值设计、成本敏感评估、模型可解释性、反馈闭环。

Academic-risk prediction

展示预测流程、特征治理、干预时机与伦理边界。

不展示学生级数据、特定学校内部信息。

LLM research assistant

做一个你自己会用的小型 RAG/agent 项目。

比如：读取研究笔记、财报摘要、投资 thesis 的检索与证据引用系统。

Portfolio analytics pipeline

展示“从私有交易数据到公开匿名 dashboard”的数据流水线本身。

这会很有辨识度，因为它把数据工程、隐私设计、金融分析和产品思维结合起来。

视觉和内容风格
建议走 editorial research notebook，不要做成券商交易终端，也不要做成花哨的 AI landing page。

视觉原则
背景：米白或接近黑色，保持高对比度与阅读感。

主色：深蓝/墨绿作为可信赖的金融研究感；一个低饱和强调色即可。

字体：英文可用 Inter / Geist；中文可用 Noto Sans SC。

图表：固定一套颜色语义。

组合：深蓝。

基准：灰色。

正收益：低饱和绿色。

回撤：低饱和红色。

图表不超过首页视觉的 30–40%，其余空间留给观点和项目。

所有图表写清 As of 日期和数据频率。

内容语气
避免：

“AI expert / visionary / alpha generator”

“Beat the market”

频繁展示短期收益率或胜率

过度交易式语言

倾向于：

“Research notes, not investment advice.”

“A privacy-filtered view of a long-term portfolio process.”

“I focus on reproducible analysis, risk-aware decision-making, and explainable systems.”

一个可执行的四阶段计划
第 1 阶段：内容和边界，半天
把旧 blog 完整备份到私有仓库或导出 Markdown。

决定哪些旧内容永久下线，哪些保留为私有知识库。

写一个公开披露规则：

不出现账户金额；

不出现明细交易；

不做个股荐股；

数据按月更新；

截止时间明确标注。

准备 3 个 AI 项目素材和 1 个 dashboard 的 mock data。

第 2 阶段：搭主页，1–2 天
新建公开 personal-site 仓库。

用 Astro 初始化。

用 Tailwind 实现首页、项目页、投资页。

先用静态 JSON 和 mock portfolio index 图上线。

保留你已有域名，DNS 指向 GitHub Pages。

第 3 阶段：接真实的匿名数据，1 天
从你的私有 Excel / Portfolio Performance / 券商导出中创建月度汇总表。

用 Python 生成公开 JSON。

对数据做一次隐私审计：能否反推资金量、券商、持仓、交易日期？

推送公开 JSON 后检查浏览器 Network 和 Git 历史，确认无原始敏感数据残留。

第 4 阶段：持续维护
每月一次投资数据更新。

每季度整理一次 allocation、风险指标与 benchmark。

每完成一个 AI 项目或实验，新增一张项目卡。

每年审视一次公开范围：早期写得过细的内容可以收回或聚合。

最终建议
先继续使用 GitHub Pages，不迁移；用 Astro + Markdown + Chart.js/ECharts；投资数据通过本地 Python 脚本导出为去敏 JSON，每月手动提交更新。