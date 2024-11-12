<!-- 自然语言处理NLP -->
<!--  -->
<!-- 2024-11-11 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

## Part1 NLP介绍

### 常见任务

- 文本分类：
- 文本匹配：
- 序列标注：
- 文本生成：
- 语言模型：

### Part2 相关论文

- Beyond Benchmarks: Evaluating Embedding Model Similarity for Retrieval Augmented Generation Systems, ACM SIGIR Workshop on Information Retrieval’s Role in RAG Systems, July 18, 2024

> https://ceur-ws.org/Vol-3784/short4.pdf

论文评估了RAG系统中嵌入模型的相似性。评估分为两个方面：首先，使用中心化核对齐（Centered Kernel Alignment）在成对级别上比较嵌入；其次，由于这对RAG系统特别相关，评估这些模型之间检索结果的相似性，使用Jaccard相似度和排名相似度。 作者比较了不同家族的嵌入模型，包括专有模型，在流行的基准信息检索（BEIR）的五个数据集上进行。通过实验，作者识别出了与模型家族相对应的模型集群。
