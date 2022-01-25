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

### Sentence Embeddings

#### 数据集

- 英文数据集：STS-B、STS-12、STS-13、STS-14、STS-15、STS-16和SICK-R
- 中文数据集：ATEC、BQ、LCQMC、PAWSX和STS-B

[数据集类型：](https://kexue.fm/archives/8541#%E5%88%86%E9%97%A8%E5%88%AB%E7%B1%BB)

1. 是非类型：这种是比较常见的类型，主要格式是“(句子1, 句子2, 是否相似)”，这里收集到的ATEC、BQ、LCQMC、PAWSX都是这种类型；

2. NLI类型：NLI的全称是Natrual Language Inference（自然语言推理），样本格式是“(句子1, 句子2, 蕴涵/中立/矛盾)”，可以视为更为精细一点的相似度数据集，当前可以找到的中文NLI数据集是英文版翻译过来的，链接位于CNSD；

3. 打分类型：这算是最精细的相似度语料，格式为“(句子1, 句子2, 相似程度)”，这个相似程度一般是比0/1更细颗粒度的等级，目前可以找到的中文数据集是STS-B，也是由对应的英文数据集翻译过来的。

| Model                 | STS 12 | STS13 | STS14 | STS15 | STS16 | STSb  | SICK-R | Avg.  |
| --------------------- | ------ | ----- | ----- | ----- | ----- | ----- | ------ | ----- |
| Avg. GloVe embeddings | 55.14  | 70.66 | 59.73 | 68.25 | 63.66 | 58.02 | 53.76  | 61.32 |
| Avg. BERT embeddings  | 38.78  | 57.98 | 57.98 | 63.15 | 61.06 | 46.35 | 58.40  | 54.81 |
| BERT CLS-vecior       | 20.16  | 30.01 | 20.09 | 36.88 | 38.08 | 16.50 | 42.63  | 29.19 |
| InferSent - Glove     | 52.86  | 66.75 | 62.15 | 72.77 | 66.87 | 68.03 | 65.65  | 65.01 |
| Sentence-BERT-NLI-base        | 70.97  | 76.53 | 73.19 | 79.09 | 74.30 | 77.03 | 72.91  | 74.89 |
| Sentence-BERT-NLI-large       | 72.27  | 78.46 | 74.90 | 80.99 | 76.25 | 79.23 | 73.75  | 76.55 |
| Sentence-RoBERTa-NLI-base     | 71.54  | 72.49 | 70.80 | 78.74 | 73.69 | 77.77 | 74.46  | 74.21 |
| Sentence-RoBERTa-NLI-large    | 74.53  | 77.00 | 73.18 | 81.85 | 76.82 | 79.10 | 74.29  | 76.68 |


#### Unsupervised Sentence Embeddings

Word Mover's Embedding，http://proceedings.mlr.press/v37/kusnerb15.pdf

[【ICLR 2016, SIF Embedding】A Simple but Tough-to-Beat Baseline for Sentence Embeddings](https://openreview.net/pdf?id=SyK00v5xx), [代码](https://github.com/PrincetonML/SIF/blob/master/src/SIF_embedding.py#L30)

1. 对Word Embedding组成的句子词向量列表，通过IDF进行加权聚合得到Sentence Embeddings临时结果。
2. 计算Sentence Embeddings临时结果的SVD，减去在主成分上的投影。


[【ICLR 2018】All-but-the-Top: Simple and Effective Postprocessing for Word Representations](https://arxiv.org/abs/1702.01417), [代码](https://gist.github.com/lgalke/febaaa1313d9c11f3bc8240defed8390)

1. 对Word Embedding组成的句子词向量列表，通过IDF进行加权聚合得到Sentence Embeddings临时结果。
2. 对Sentence Embeddings临时结果减去句子维度的均值。
2. 计算Sentence Embeddings临时结果的SVD，减去在主成分上的投影。


[Unsupervised Random Walk Sentence Embeddings: A Strong but Simple Baseline](https://aclanthology.org/W18-3012.pdf)，[代码](https://github.com/kawine/usif/blob/master/usif.py)

1. 对Word Embedding组成的句子词向量列表，通过IDF进行加权聚合得到Sentence Embeddings临时结果。
2. 计算Sentence Embeddings临时结果的SVD，进去在每个主成分进行归一化上的投影。


[【arXiv2018 p-means】Concatenated Power Mean Word Embeddings as Universal Cross-Lingual Sentence Representations](https://arxiv.org/abs/1803.01400), [代码](https://github.com/UKPLab/arxiv2018-xling-sentence-embeddings/blob/master/model/sentence_embeddings.py)

1. 对Word Embedding组成的句子词向量列表。
2. 对词向量列表分别计算：max-pooling、mean-pooling、min-pooling和Gem-pooling，然后拼接。


[【arXiv2020 S3E】Efficient Sentence Embedding via Semantic Subspace Analysis](https://arxiv.org/pdf/2002.09620.pdf), [代码](https://github.com/BinWang28/Sentence-Embedding-S3E/blob/master/utils.py)

1. 对Word Embedding组成的句子词向量列表。
2. 对Word Embedding进行聚类，然后对词向量列表进行VLAD编码。


#### Supervised Sentence Embeddings

