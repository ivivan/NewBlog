---
title: "研究助理 Agent"
summary: "一个用于检索研究笔记、财报摘要与投资 thesis 的小型 RAG/agent 系统。"
stack: ["Python", "LLM", "RAG", "Vector DB"]
order: 3
draft: true
---

## Problem

个人研究笔记、投资 thesis 和财报摘要散落在不同地方，难以快速检索和交叉引用，长期积累的知识没有被有效复用。

## Approach

- 搭建一个小型检索增强生成（RAG）系统，索引自己的研究笔记与公开资料摘要。
- 要求所有回答附带来源引用，避免模型"自信地编造"。
- 作为个人工具迭代，优先保证可控性和可解释性，而非追求功能大而全。

## Outcome

- 可以快速定位过去某个研究笔记中的论点或数据出处。
- 为后续研究笔记的撰写提供了检索与证据引用的基础设施。

## Explainability & Governance

所有生成内容都要求可追溯到具体笔记来源；对无法在知识库中找到依据的问题，系统会明确提示"未找到可靠依据"而非直接作答。

## Stack

Python · 开源 LLM / API · 向量数据库 · RAG pipeline

## What I learned

把 LLM 工具的"诚实程度"（是否愿意承认不知道）当作和回答质量同等重要的设计目标。
