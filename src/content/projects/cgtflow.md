---
title: "CGTFlow:规则驱动的投资税务工作底稿系统"
summary: "将指定券商的交易明细标准化为可审计的澳洲股票与期权 CGT 工作底稿，覆盖多年度持仓重建、AUD 换汇、lot matching、期权生命周期与异常核对。"
stack: ["Python", "Supabase", "Azure", "Stripe", "Copilot"]
order: 1
draft: false
---

> 这个项目已经上线为 **[CGTDesk](https://www.cgtdesk.com/)**。本页分两部分：**第一部分**介绍上线的产品，**第二部分**是背后的计算管线 CGTFlow 的设计记录。  
> 页面中的截图来自 CGTDesk 官网，其中的交易与金额都是网站标注的示例数据；案例与计算结果均经过脱敏或使用模拟数据。CGTDesk 提供的是计算结果，不是个性化税务建议；它不是注册税务代理，也不代替用户准备或提交 tax return。

## 第一部分 · 产品：CGTDesk

<a class="visit-card not-prose" href="https://www.cgtdesk.com/" target="_blank" rel="noopener noreferrer">
  <span class="visit-text">
    <span class="visit-label">已上线 · 可直接使用</span>
    <span class="visit-title">访问 CGTDesk</span>
    <span class="visit-desc">上传券商交易文件，按澳洲财年算出股票与期权的资本利得</span>
  </span>
  <span class="visit-url">www.cgtdesk.com →</span>
</a>

CGTDesk 面向澳洲的股票与期权投资者：上传券商导出的交易文件，按澳洲财年（7 月 1 日至次年 6 月 30 日）逐年算出资本利得与亏损。

### 首页一览

<figure>
  <img src="/images/projects/cgtdesk/hero.webp" alt="CGTDesk 首页：上传的交易记录、数据检查结果与按财年的收益估算" loading="lazy" />
  <figcaption>一屏看完整个产品：左边是上传的券商 statement 与交易预览，中间是数据检查是否通过，右边是按财年汇总的资本利得估算（均为网站示例数据）。</figcaption>
</figure>

### 使用流程

<figure>
  <img src="/images/projects/cgtdesk/how-it-works.webp" alt="CGTDesk 使用流程五步：上传、检查数据、处理缺口、计算、下载结果" loading="lazy" />
  <figcaption>五步走完，数据不干净就不计算。</figcaption>
</figure>

1. **导出并上传**：直接上传券商提供的 CSV 或 Excel 文件，无需改格式。
2. **检查数据**：每份 statement 跑 5 项检查，并预览识别出的每一笔交易。
3. **处理缺口**：缺失、重复或对不上的数据会阻止计算，补齐文件后重新检查。
4. **计算**：填入以往年度结转的资本亏损，逐个财年计算。
5. **下载结果**：每个财年的表格、图表与报告，每个数字都能追溯到可下载的明细。

### 计算口径：每个数字怎么来的

<figure>
  <img src="/images/projects/cgtdesk/fifo.webp" alt="FIFO 示例：卖出 130 股，先匹配最早买入的 100 股，再匹配下一批中的 30 股" loading="lazy" />
  <figcaption>示例：2025 年 3 月卖出 130 股。系统先用 2023 年 7 月买入的 100 股，再用 2023 年 11 月那批中的 30 股；2024 年 2 月那批没有用到。两批都持有超过 12 个月，所以适用 CGT discount。</figcaption>
</figure>

- **股票**：卖出按先进先出（FIFO）匹配最早买入的 parcel；持有超过 12 个月的 parcel 适用 CGT discount。
- **期权**：买入的期权卖出或到期，按 CGT event C2；卖出（写出）的期权按 CGT event D2，计入开仓当年；行权时期权金并入股票交易，按当日 RBA 汇率换算。仍有争议的期权处理会被标出，留给税务代理判断。
- **依据**：ATO 的 CGT 指引与 Income Tax Assessment Act 1997。

### 支持的券商

各券商的结果分开计算、不合并，更多券商陆续接入。

| 券商 | 美股 | 澳股 | 期权 |
|---|---|---|---|
| Tiger Brokers | ✓ | ✓ | ✓ |
| CommSec | — | ✓ | — |
| Moomoo | ✓ | — | — |
| Interactive Brokers | ✓ | — | — |

### 收费

<figure>
  <img src="/images/projects/cgtdesk/pricing.webp" alt="CGTDesk 收费：免费检查数据，按券商与财年付费解锁结果" loading="lazy" />
  <figcaption>先免费检查，满意了再为需要的年份付费。</figcaption>
</figure>

注册、上传、数据检查与交易预览免费；没有交易的财年免费。解锁结果按「每个券商 × 每个财年」付费一次：500 笔以内 A\$20，501–2,000 笔 A\$30，更多另议。每个付费年度包含逐笔 disposal 与 cost base 明细、期权交易、PDF 报告与清洗后的交易 CSV。

### 数据与隐私

- 数据存储与处理在澳洲（Sydney）；文件放在私有存储中，每个请求都校验数据是否属于当前登录账户。
- 不出售数据、不用于广告；没有 AI 服务读取用户的 statement 或结果，也不用于训练模型。
- 员工默认看不到用户数据，只有用户主动开启「允许客服查看」（7 天有效）时才可访问，且每次查看都有记录。
- 只使用必要 cookie，没有广告或分析追踪。
- 基础设施：Supabase（登录、数据库、文件存储）、Microsoft Azure（托管）、Stripe（支付）、Resend（邮件）。

---

## 第二部分 · 技术实现：CGTFlow 计算管线

以下是 CGTDesk 背后的计算管线 CGTFlow 的设计记录：它要解决什么问题、怎么解决、产出什么。

### Problem

对于同时持有澳股、美股与上市期权的澳洲投资者来说，券商提供的 realised P/L 往往不能直接用于澳洲财年报税。

尤其当交易横跨多个财年时，正确计算某一财年的 CGT，并不等于筛选出当年的卖出记录后简单汇总。系统还需要回溯更早年度的买入、期权开仓、行权和 corporate actions，才能重建正确的 opening inventory、cost base 与 parcel history。

实际需要处理的问题包括：

- 同一股票在不同日期、不同价格分批买入，并在之后财年部分卖出。
- 为目标财年的 disposal events 追溯历史 acquisition lots，而不是只依赖券商的 average cost 或 realised P/L。
- 将每笔 USD 买入与卖出交易，按各自交易日的 AUD 汇率分别换算。
- 将佣金、平台费与交易相关费用正确纳入 cost base 或 capital proceeds。
- 区分股票、买入期权、卖出期权、平仓、到期、exercise、assignment 和期末未平仓合约。
- 处理 reverse split、ticker rename、share conversion 与 fractional cash-in-lieu shares 等 corporate actions。
- 检查券商导出文件是否存在数据覆盖缺失、重复行、字段缺失、仓位不平或文件过期。
- 让每一个计算结果都能追溯回原始券商 CSV、清洗后的交易记录、汇率数据和计算规则。

这个项目的目标不是复制券商报表，而是建立一条从原始交易数据到可审阅 CGT workpaper 的可重复、可验证数据管线。

### Approach

CGTFlow 使用一个明确的两阶段 pipeline，将“数据是否可靠”与“税务计算”分开处理。

```text
Raw broker exports
        ↓
Phase 1: Data health check + cleaning
        ↓
Verified clean transaction data
        ↓
Phase 2: Deterministic CGT calculation
        ↓
Year-level CGT reports + provenance
```

### Outcome

项目生成的是一组可复核的工作文件，而不只是一个最终数字。

主要输出包括：

- 每个 broker / asset track / financial year 的 CGT summary。
- 跨年度 CGT summary。
- 每个 statement period 的 data health report。
- 原始数据覆盖、重复行、字段缺失与 reconciliation 检查结果。
- 清洗后的 verified transaction data。
- 股票 FIFO parcel matching 结果。
- 期权 lifecycle 与 event-level calculation 结果。
- AUD FX conversion records 与缓存的 RBA rate data。
- 每一项计算结果对应的 source-file provenance。
- 对 blocked periods、未解决异常和规则边界的明确提示。

输出格式包括 Markdown 和 JSON，便于同时支持：

- 人工复核。
- 程序化读取。
- 后续生成 Excel CGT workpaper。
- 未来接入受控 Web UI。
- 与注册税务代理协作时提供 calculation evidence。

### 输出实例

下面是 CGTFlow 为一个券商账户生成的两份报告：先检查数据，再计算税务。报告中的券商、股票代码、笔数和金额均为虚构的示例。

<div class="report-card">
<p class="report-label">报告 1 · 数据健康检查</p>

#### Data Health Summary — demo_broker

Generated: 2026-09-30T08:33:01+00:00

Overall status: **OK**

**Periods**

| Period | Status | Blocking Issues | Transactions | Report |
|---|---|---:|---:|---|
| 2021 | OK | 0 | 18 | demo_broker_2021.md |
| 2122 | OK | 0 | 7 | demo_broker_2122.md |
| 2223 | OK | 0 | 41 | demo_broker_2223.md |
| 2324 | OK | 0 | 26 | demo_broker_2324.md |
| 2425 | OK | 0 | 35 | demo_broker_2425.md |
| 2526 | OK | 0 | 64 | demo_broker_2526.md |

**Blocking Issues (all periods)**

- None.

</div>

<div class="report-card">
<p class="report-label">报告 2 · 财年 CGT 汇总</p>

#### CGT Summary — demo_broker — FY2025-26

Generated: 2026-09-30T08:33:02+00:00

**Combined Stock + Option Result**

| ATO field | Combined AUD |
|---|---:|
| **Total current-year capital gains** | \$12,480.00 |
| Current-year capital losses | \$3,150.00 |
| CGT discount | \$1,000.00 |
| **Net capital gain** | \$7,130.00 |
| **Net capital loss carried forward** | \$0.00 |

Prior-year capital losses applied: \$1,200.00

Net capital loss carried forward: \$0.00

**Stock Disposals (current year, excerpt)**

| Symbol | Acquired | Disposed | Qty | Proceeds AUD | Cost base AUD | Gain/Loss AUD | Discount |
|---|---|---|---:|---:|---:|---:|---|
| XYZ | 2024-03-12 | 2025-08-20 | 50 | \$4,200.00 | \$2,200.00 | \$2,000.00 | Yes |
| ABC | 2025-02-19 | 2025-07-07 | 100 | \$1,150.00 | \$1,310.00 | -\$160.00 | No |

</div>

### What I learned

> 在高影响计算场景中，正确的计算公式只是开始；更重要的是确保计算只发生在可信的数据上，并且每一个结果都能回溯、解释和复现。
