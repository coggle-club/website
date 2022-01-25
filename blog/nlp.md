<!-- 自然语言处理NLP -->
<!--  -->
<!-- 2021-12-28 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

## Part1 NLP介绍

### 常见任务

- 文本分类：
- 文本匹配：
- 序列标注：
- 文本生成：
- 语言模型：

### 推荐书籍

### 推荐公开课

### 常见NLP库

- [https://github.com/UKPLab/sentence-transformers](https://github.com/UKPLab/sentence-transformers)

## Part2 任务数据集

### 文本评测基准

- CLUE：中文语言理解测评基准，包括代表性的数据集、基准(预训练)模型、语料库、排行榜。我们会选择一系列有一定代表性的任务对应的数据集，做为我们测试基准的数据集。这些数据集会覆盖不同的任务、数据量、任务难度。
    - 主页：[https://www.cluebenchmarks.com/](https://www.cluebenchmarks.com/)
    - Github：[https://github.com/CLUEbenchmark/CLUE](https://github.com/CLUEbenchmark/CLUE)

- DataCLUE：数据为中心的NLP基准与工具包
    - 主页：[https://www.cluebenchmarks.com/dataclue.html](https://www.cluebenchmarks.com/dataclue.html)
    - Github：[https://github.com/CLUEbenchmark/DataCLUE](https://github.com/CLUEbenchmark/DataCLUE)

- FewCLUE：预训练模型的中文小样本学习
    - 主页：[https://www.cluebenchmarks.com/NLPCC.html](https://www.cluebenchmarks.com/NLPCC.html)
    - Github：[https://github.com/CLUEbenchmark/FewCLUE](https://github.com/CLUEbenchmark/FewCLUE)

## Part3 领域模型介绍

### Unsupervised Sentence Embeddings

[【ICLR 2016, SIF Embedding】A Simple but Tough-to-Beat Baseline for Sentence Embeddings](https://openreview.net/pdf?id=SyK00v5xx), [代码](https://github.com/PrincetonML/SIF/blob/master/src/SIF_embedding.py#L30)
- 实现过程：
    1. 对Word Embedding组成的句子词向量列表，通过IDF进行加权聚合得到Sentence Embeddings临时结果。
    2. 计算Sentence Embeddings临时结果的SVD，减去在主成分上的投影。


[【ICLR 2018】All-but-the-Top: Simple and Effective Postprocessing for Word Representations](https://arxiv.org/abs/1702.01417), [代码](https://gist.github.com/lgalke/febaaa1313d9c11f3bc8240defed8390)
- 实现过程：
    1. 对Word Embedding组成的句子词向量列表，通过IDF进行加权聚合得到Sentence Embeddings临时结果。
    2. 对Sentence Embeddings临时结果减去句子维度的均值。
    2. 计算Sentence Embeddings临时结果的SVD，减去在主成分上的投影。


[Unsupervised Random Walk Sentence Embeddings: A Strong but Simple Baseline](https://aclanthology.org/W18-3012.pdf)，[代码](https://github.com/kawine/usif/blob/master/usif.py)
- 实现过程：
    1. 对Word Embedding组成的句子词向量列表，通过IDF进行加权聚合得到Sentence Embeddings临时结果。
    2. 计算Sentence Embeddings临时结果的SVD，进去在每个主成分进行归一化上的投影。


[【arXiv2018 p-means】Concatenated Power Mean Word Embeddings as Universal Cross-Lingual Sentence Representations](https://arxiv.org/abs/1803.01400), [代码](https://github.com/UKPLab/arxiv2018-xling-sentence-embeddings/blob/master/model/sentence_embeddings.py)
- 实现过程：
    1. 对Word Embedding组成的句子词向量列表。
    2. 对词向量列表分别计算：max-pooling、mean-pooling、min-pooling和Gem-pooling，然后拼接。


[【arXiv2020 S3E】Efficient Sentence Embedding via Semantic Subspace Analysis](https://arxiv.org/pdf/2002.09620.pdf), [代码](https://github.com/BinWang28/Sentence-Embedding-S3E/blob/master/utils.py)
- 实现过程：
    1. 对Word Embedding组成的句子词向量列表。
    2. 对Word Embedding进行聚类，然后对词向量列表进行VLAD编码。


### Supervised Sentence Embeddings

