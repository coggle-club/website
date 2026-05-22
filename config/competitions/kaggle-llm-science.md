## 竞赛简介

本次竞赛要求参赛者使用大语言模型回答来自多个学科的科学考试题目...

## 评估指标

使用准确率（Accuracy）作为主要评估指标...

## 我们的方案

我们采用了检索增强生成（RAG）方案...

## 关键代码

```python
# RAG pipeline
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
```

## 总结

获得了银牌，主要收获在于 RAG 的调优经验...
