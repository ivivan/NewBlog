---
title: "学习笔记：低 FPR 与 PR 曲线的工作点读法"
description: "在 ROC 上固定 FPR、在 PR 上固定 Precision，读到的都是工作点而不是面积；当每天的审核容量是硬约束时，直接看 Precision@K 与 Recall@K。"
date: 2026-11-27
category: "risk-fraud"
tags: ["模型评估", "PR-AUC", "工作点"]
---

## 1. 问题背景

- ROC 侧：想在指定 FPR 下，判断模型在低误报区间的水平。
- PR 侧：想先在 Y 轴找一个可接受的 Precision，再看对应 X 轴的 Recall。
- 业务约束：每天人工审核容量有限。

结论：两种读法都有用，但如果核心约束是“每天只能审核 $K$ 笔”，更直接的做法是取风险排名前 $K$ 笔，再看 Precision@K 和 Recall@K。

## 2. ROC 侧：指定 FPR，读的是 Recall

| 操作 | 对应指标 | 回答的问题 |
|---|---|---|
| 在 ROC 横轴取 FPR = 0.1%，读纵轴 | Recall / TPR @ FPR = 0.1% | 正常交易最多误报 0.1% 时，能抓多少欺诈？ |
| 计算 FPR 从 0 到 0.1% 的曲线面积 | partial AUC | 低误报区间的整体表现如何？ |

- 前者是一个工作点，后者才是面积。
- `roc_auc_score(..., max_fpr=0.001)` 返回的是标准化后的局部 AUC，不是原始的那一小块面积。

## 3. PR 侧：固定 Precision，看最大 Recall

业务要求例如：至少 20% 的审核案件必须是真欺诈。

$$
\max_t \ \text{Recall}(t)\quad \text{subject to}\quad \text{Precision}(t)\ge 20\%
$$

这称为 **Recall @ Precision ≥ 20%**。注意：

- 要找的是满足 Precision 下限时最大的 Recall，不要求 Precision 恰好等于 20%。
- Precision 随阈值可能波动，水平线可能有多个交点，应比较实际阈值对应的结果，不要随便取第一个交点。
- 反向同理：要求至少抓到 80% 的欺诈，就固定 Recall 下限，找最高的 Precision。

## 4. 固定审核容量 $K$

当约束是“每天最多审核 500 笔”：

1. 当天交易按风险分数从高到低排序。
2. 取前 500 笔。
3. 计算其中的真实欺诈数。
4. 得到 Precision@500 和 Recall@500。

$$
\text{Precision@}K=\frac{\text{Top K 中的真实欺诈数}}{K},\qquad \text{Recall@}K=\frac{\text{Top K 中的真实欺诈数}}{\text{全部真实欺诈数}}
$$

### 三种约束的对比示例

当天 100,000 笔交易，200 笔真欺诈，同一模型在三个阈值下：

| 工作点 | 审核笔数 | TP | FP | Precision | Recall |
|---|---:|---:|---:|---:|---:|
| 高阈值 | 200 | 80 | 120 | 40% | 40% |
| 中阈值 | 500 | 120 | 380 | 24% | 60% |
| 低阈值 | 1,000 | 160 | 840 | 16% | 80% |

- 要求 Precision ≥ 30%：只有第一个点满足，Recall 为 40%。
- 要求 Recall ≥ 80%：第三个点满足，但要审核 1,000 笔，超出人力。
- 容量上限 500：选第二个点，Precision 24%，Recall 60%。

命中率要求和容量要求是两个不同的约束。

## 5. 为什么低 FPR 只是容量的近似约束

设 $N_+$ 为真实欺诈数，$N_-$ 为真实正常数：

$$
TP=\text{Recall}\times N_+,\qquad FP=\text{FPR}\times N_-
$$

$$
K=TP+FP=\text{Recall}\times N_+ + \text{FPR}\times N_-
$$

审核队列既含误报，也含抓到的真欺诈，而 FPR 只约束了误报部分。

例：上表审核 500 笔的工作点，$\text{FPR}=380/99{,}800\approx0.381\%$。若另一个模型在同样 FPR 下抓到 160 笔欺诈，审核总量就变成 $380+160=540$，超出 500 的容量。

- 固定 FPR：比较的是误报预算相同。
- 固定 $K$：比较的是总审核工作量相同。
- 容量是硬约束时，直接比较 Top $K$ 更准确。

## 6. PR 图上换算审核量

由定义可推得：

$$
K=\frac{\text{Recall}\times N_+}{\text{Precision}}
$$

对固定 $K$：

$$
\text{Precision}=\frac{N_+}{K}\times \text{Recall}
$$

在上例中 $N_+=200$、$K=500$，所以 $\text{Precision}=0.4\times \text{Recall}$，Top 500 的点 $(0.60,\,0.24)$ 恰好满足。

由此得到一个结论：在同一批数据和同一个 $K$ 下，抓到的欺诈越多，Precision@K 和 Recall@K 会同时提高，二者不存在取舍。取舍出现在改变阈值或 $K$ 时。

## 7. 指标选择速查

| 业务问题 | 优先指标 |
|---|---|
| 正常客户误报比例不能超过上限 | Recall @ FPR ≤ 上限 |
| 每天最多审核 $K$ 笔 | Precision@K、Recall@K |
| 审核命中率不能低于某值 | 约束 Precision ≥ 下限，取最大 Recall |
| 至少要抓到某比例的欺诈 | 约束 Recall ≥ 下限，取最大 Precision |
| 比较整体排序、筛选候选模型 | ROC-AUC、AP / PR-AUC |
| 比较低误报区间的整体表现 | 局部 ROC-AUC |

## 8. 推荐的评估顺序

1. 按日计算 Precision@K、Recall@K，比较相同审核预算下的效果。
2. 补充 Recall @ 固定 FPR，评估对正常交易的误报约束。
3. 用 AP / PR-AUC 和局部 ROC-AUC 作为整体或区间排序能力的辅助摘要。

注意事项：

- 容量按天约束时，应每天分别取 Top $K$ 再汇总，不要把一个月数据合并后取 Top $30K$。
- 阈值和 Precision 目标应在验证集上确定，再在独立测试集上检验。
- 面积指标概括整条曲线，阈值决定实际动作，两者不能互相替代。

## 9. 一句话总结

- ROC 上固定 FPR 读 Recall，PR 上固定 Precision 读 Recall，都是在读工作点，而不是读面积。
- 审核容量是硬约束时，先固定 $K$，再看 Precision@K 与 Recall@K。
