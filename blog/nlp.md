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

- [ECIR2022最新《关键词提取》](https://keyphrasification.github.io/)

### 常见NLP库

- [https://github.com/UKPLab/sentence-transformers](https://github.com/UKPLab/sentence-transformers)
- [https://github.com/dongrixinyu/JioNLP](https://github.com/dongrixinyu/JioNLP)
- [NLP Profiler句子特征提取](https://www.kaggle.com/code/neomatrix369/nlp-profiler-simple-dataset/notebook)
- [flashtext关键词匹配](https://github.com/vi3k6i5/flashtext)

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

- CBLUE：医学信息处理任务
    - 主页：[https://tianchi.aliyun.com/cblue](https://tianchi.aliyun.com/cblue)
    - Github：[https://github.com/CBLUEbenchmark/CBLUE](https://github.com/CBLUEbenchmark/CBLUE)


https://github.com/LIAAD/KeywordExtractor-Datasets

This repository contains 20 annotated datasets of Automatic Keyphrase Extraction made available by the research community.

## Part3 领域方案

### Query检索/召回/匹配

搜索、广告、推荐（搜广推）主要就是通过对内容/商品的召回和排序，来优化Query-Doc的匹配结果。
- Doc的理解：现在的候选Doc/Item是各种模态的，比如视频、商品、图片、文本，但不管哪种形式，文本都是其中的重要一种，可以利用阅读理解、信息抽取、文本匹配打标签等技术加深对内容的理解
- Query的理解：在搜索、广告中输入都是真实的Query，可以基于NLP进行意图、分词、NER等各种解析，而推荐中则是把User当作Query，这时可以把用户历史消费的内容作为用户兴趣，这件又回归到了Doc理解
- Query-Doc相关性：通过用户行为、用户信息、时空信息、上述的Query和Doc理解等海量特征来找出符合用户需求的结果。搜索和广告是命题作文，其中文本层面的Query-Doc很重要，而推荐中内容信息则可以解决用户、物品冷启动问题，也起着不可或缺的作用


传统的query结构化理解是通过分词、NER、query tagging等方式将query转换为结构化信息。query中长尾query占比99.9%，中长尾query中供给不足和算法理解问题是影响其效率的关键。


Query相关的算法：理解、匹配（Trie树）、改写、纠错


## Part4 领域模型

### 新词发现

https://aclanthology.org/2020.coling-main.572/

### 文本纠错

https://github.com/destwang/CTCResources

- 基于规则的文本纠错

传统的纠错方法一般是基于规则的方法，语言专家首先总结出来一些常见的错误规则，来判断文本是否发生了错误，然后再制定一些规则，将错误文本按照实现总结好的规则加以改正，实现纠错功能。

- N-gram文本纠错算法

在N-gram 模型中句子T的出现概率是由组成T的N个同现的连续字符出现概率组成，假定后一个字符出现的概率仅仅和前一个或者多个字符有关。使用 N-gram 算法计算文本的得分。句子得分越高，越可能是对的，句子得分越低，越有可能是错误。

将文本中的同音字或者同型字用分别用两种词表进行替换，如果替换后的结果比替换前高，说明替换的文本的位置有可能是错误的字符，而后按照句子得分将得分最高的那句话中替换的字符作为候选项提供给用户作为修改选项。

- LSTM-CRF纠错算法

利用 encoder-decoder 结构解决错误文本到正确文本的转换过程，左侧是编码端，右侧是解码端，编码端和解码端都采用LSTM结构。编码端在循环迭代之后生成整个句子的语义向量 ，解码端将生成的向量解码成相应文字，完成错误文本到正确文本的转换。

- BERT MLM纠错算法

BERT/ELECTRA/ERNIE/MacBERT等预训练模型强大的语言表征能力，基于其MASK掩码的特征，可以简单改造预训练模型用于纠错，加上fine-tune，效果轻松达到最优。

### Aspect Category Sentiment Analysis

[https://github.com/Meituan-Dianping/asap](https://github.com/Meituan-Dianping/asap)


### Sentence Embeddings

#### 数据集

- 英文数据集：STS-B、STS-12、STS-13、STS-14、STS-15、STS-16和SICK-R
- 中文数据集：ATEC、BQ、LCQMC、PAWSX和STS-B、[SimCLUE(包含上述中文数据集)](https://github.com/CLUEbenchmark/SimCLUE)

[数据集类型：](https://kexue.fm/archives/8541#%E5%88%86%E9%97%A8%E5%88%AB%E7%B1%BB)

1. 是非类型：这种是比较常见的类型，主要格式是“(句子1, 句子2, 是否相似)”，这里收集到的ATEC、BQ、LCQMC、PAWSX都是这种类型；

2. NLI类型：NLI的全称是Natrual Language Inference（自然语言推理），样本格式是“(句子1, 句子2, 蕴涵/中立/矛盾)”，可以视为更为精细一点的相似度数据集，当前可以找到的中文NLI数据集是英文版翻译过来的，链接位于CNSD；

3. 打分类型：这算是最精细的相似度语料，格式为“(句子1, 句子2, 相似程度)”，这个相似程度一般是比0/1更细颗粒度的等级，目前可以找到的中文数据集是STS-B，也是由对应的英文数据集翻译过来的。

| Model                 | STS 12 | STS13 | STS14 | STS15 | STS16 | STSb  | SICK-R | Avg.  |
| --------------------- | ------ | ----- | ----- | ----- | ----- | ----- | ------ | ----- |
| Avg. GloVe embeddings | 55.14  | 70.66 | 59.73 | 68.25 | 63.66 | 58.02 | 53.76  | 61.32 |
| SIF    | 56.2 | 56.6 | 68.5 | 71.7 | .    | 72.0 | 86.0 | 68.50 |
| Avg. BERT embeddings  | 38.78  | 57.98 | 57.98 | 63.15 | 61.06 | 46.35 | 58.40  | 54.81 |
| BERT CLS-vecior       | 20.16  | 30.01 | 20.09 | 36.88 | 38.08 | 16.50 | 42.63  | 29.19 |
| InferSent - Glove     | 52.86  | 66.75 | 62.15 | 72.77 | 66.87 | 68.03 | 65.65  | 65.01 |
| Sentence-BERT-NLI-base        | 70.97  | 76.53 | 73.19 | 79.09 | 74.30 | 77.03 | 72.91  | 74.89 |
| Sentence-RoBERTa-NLI-base     | 71.54  | 72.49 | 70.80 | 78.74 | 73.69 | 77.77 | 74.46  | 74.21 |
| 无监督-SimCSE-BERT-base |68.40 |82.41 |  74.38 |80.91 |78.56 |76.85 |72.23 |76.25 |
| ESimCSE-BERT-base     | 73.40  | 83.27 | 77.25 | 82.66 | 78.81 | 80.17 | 72.30  | 78.27 |
| SNCSE-BERT-base       | 70.67  | 84.79 | 76.99 | 83.69 | 80.51 | 81.35 | 74.77  | 78.97 |
| 无监督-SimCSE-RoBERTa-base    | 70.16  | 81.77 | 73.24 | 81.36 | 80.65 | 80.22 | 68.56  | 76.57 |
| ESimCSE-RoBERTabase・ | 69.90  | 82.50 | 74.68 | 83.19 | 80.30 | 80.99 | 70.54  | 77.44 |
| SNCSE-RoBERTa-base    | 70.62  | 84.42 | 77.24 | 84.85 | 81.49 | 83.07 | 72.92  | 79.23 |
| 有监督-SimCSE-BERT-base     | 75.30  | 84.67 | 80.19 | 85.40 | 80.82 | 84.25 | 80.39  | 81.57 |
| 有监督-SimCSE-RoBERTa-base  | 76.53  | 85.21 | 80.95 | 86.03 | 82.57 | 85.83 | 80.50  | 82.52 |

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

### 关键词抽取（Keyword Extraction）

<table>
<thead>
  <tr>
    <th rowspan="2">Models</th>
    <th colspan="3">DUC2001</th>
    <th colspan="3">Inspec</th>
    <th colspan="3">SemEval2010</th>
  </tr>
  <tr>
    <th>F1@5</th>
    <th>F1@10</th>
    <th>F1@15</th>
    <th>F1@5</th>
    <th>F1@10</th>
    <th>F1@15</th>
    <th>F1@5</th>
    <th>F1@10</th>
    <th>F1@15</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td colspan="10"><b>Unsupervised Statistical Models</b></td>
  </tr>
  <tr>
    <td>TF-IDF</td>
    <td>9.21<br></td>
    <td>10.63</td>
    <td>11.06</td>
    <td>11.28</td>
    <td>13.88</td>
    <td>13.83</td>
    <td>2.81</td>
    <td>3.48</td>
    <td>3.91</td>
  </tr>
  <tr>
    <td>YAKE<br></td>
    <td>12.27</td>
    <td>14.37</td>
    <td>14.76</td>
    <td>18.08</td>
    <td>19.62</td>
    <td>20.11</td>
    <td>11.76</td>
    <td>14.4</td>
    <td>15.2</td>
  </tr>
  <tr>
    <td colspan="10"><b>Unsupervised Graph-based Models</b></td>
  </tr>
  <tr>
    <td>TextRank</td>
    <td>11.80</td>
    <td>18.28</td>
    <td>20.22</td>
    <td>27.04</td>
    <td>25.08<br></td>
    <td>36.65</td>
    <td>3.80</td>
    <td>5.38</td>
    <td>7.65</td>
  </tr>
  <tr>
    <td>SingleRank</td>
    <td>20.43</td>
    <td>25.59</td>
    <td>25.70</td>
    <td>27.79</td>
    <td>34.46</td>
    <td>36.05</td>
    <td>5.90</td>
    <td>9.02</td>
    <td>10.58</td>
  </tr>
  <tr>
    <td>TopicRank</td>
    <td>21.56</td>
    <td>23.12</td>
    <td>20.87</td>
    <td>25.38</td>
    <td>28.46</td>
    <td>29.49</td>
    <td>12.12</td>
    <td>12.90</td>
    <td>13.54</td>
  </tr>
  <tr>
    <td>PositionRank</td>
    <td>23.35</td>
    <td>28.57</td>
    <td>28.60</td>
    <td>28.12</td>
    <td>32.87</td>
    <td>33.32</td>
    <td>9.84</td>
    <td>13.34</td>
    <td>14.33</td>
  </tr>
  <tr>
    <td>MultipartiteRank</td>
    <td>23.20</td>
    <td>25.00</td>
    <td>25.24</td>
    <td>25.96</td>
    <td>29.57</td>
    <td>30.85</td>
    <td>12.13</td>
    <td>13.79</td>
    <td>14.92</td>
  </tr>
  <tr>
    <td>Textstar</td>
    <td></td>
    <td></td>
    <td></td>
    <td>24.70</td>
    <td>34.70</td>
    <td></td>
    <td>15.20</td>
    <td>22.80</td>
    <td></td>
  </tr>
  <tr>
    <td>FRAKE</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>58.9</td>
    <td></td>
    <td></td>
    <td>37.5</td>
    <td></td>
  </tr>
  <tr>
    <td>RaKUn</td>
    <td></td>
    <td></td>
    <td></td>
    <td>10.1<br></td>
    <td>10.8</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td colspan="10"><b>Unsupervised Embedding-based Models</b></td>
  </tr>
  <tr>
    <td>EmbedRank (s2v)</td>
    <td>27.16</td>
    <td>31.85</td>
    <td>31.52</td>
    <td>29.88</td>
    <td>37.09</td>
    <td>38.40</td>
    <td>5.40</td>
    <td>8.91</td>
    <td>10.06</td>
  </tr>
  <tr>
    <td>EmbedRank (d2v)</td>
    <td>24.02</td>
    <td>28.12</td>
    <td>28.82</td>
    <td>31.51</td>
    <td>37.94</td>
    <td>37.96</td>
    <td>3.02</td>
    <td>5.08<br></td>
    <td>7.23</td>
  </tr>
  <tr>
    <td>SIFRank</td>
    <td>24.27</td>
    <td>27.43</td>
    <td>27.86</td>
    <td>29.11</td>
    <td>38.80</td>
    <td>39.59</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SIFRank+</td>
    <td>30.88</td>
    <td>33.37</td>
    <td>32.24</td>
    <td>28.49</td>
    <td>36.77</td>
    <td>38.82</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>KeyGames</td>
    <td>24.42</td>
    <td>28.28</td>
    <td>29.77</td>
    <td>32.12</td>
    <td>40.48</td>
    <td>40.94</td>
    <td>11.93</td>
    <td>14.35</td>
    <td>14.62</td>
  </tr>
  <tr>
    <td>JointModeling</td>
    <td>28.62</td>
    <td>35.52</td>
    <td>36.29</td>
    <td>32.61</td>
    <td>40.17</td>
    <td>41.09</td>
    <td>13.02</td>
    <td>19.35</td>
    <td>21.72</td>
  </tr>
  <tr>
    <td>AttentionRank</td>
    <td></td>
    <td></td>
    <td></td>
    <td>31.55</td>
    <td>39.16</td>
    <td>40.65</td>
    <td>12.72</td>
    <td>17.21</td>
    <td>19.15</td>
  </tr>
  <tr>
    <td>MDERank</td>
    <td>23.31</td>
    <td>26.65</td>
    <td>26.42</td>
    <td>26.17</td>
    <td>33.81</td>
    <td>36.17</td>
    <td>12.95</td>
    <td>17.07</td>
    <td>20.09</td>
  </tr>
  <tr>
    <td>AGRank</td>
    <td></td>
    <td></td>
    <td></td>
    <td>34.59</td>
    <td>40.70</td>
    <td>41.15</td>
    <td>15.37</td>
    <td>21.22</td>
    <td>23.72</td>
  </tr>
  <tr>
    <td>CorpusRank</td>
    <td>33.10</td>
    <td>38.88</td>
    <td>39.97</td>
    <td></td>
    <td></td>
    <td></td>
    <td>17.40</td>
    <td>22.60</td>
    <td>25.98</td>
  </tr>
  <tr>
    <td colspan="10"><b>Model-based Models</b></td>
  </tr>
  <tr>
    <td>CopyRNN<br></td>
    <td></td>
    <td></td>
    <td></td>
    <td>29.3</td>
    <td>33.6</td>
    <td></td>
    <td>29.1</td>
    <td>29.6</td>
    <td></td>
  </tr>
  <tr>
    <td>MultPAX<br></td>
    <td></td>
    <td></td>
    <td></td>
    <td>37.1</td>
    <td>21.0</td>
    <td></td>
    <td>44.9</td>
    <td>25.5</td>
    <td></td>
  </tr>
  <tr>
    <td>LSTM-NER<br></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>BERT-NER<br></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>BART<br></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>T5<br></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>GPT2</td>
    <td></td>
    <td></td>
    <td></td>
    <td>41.3</td>
    <td>46.9</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>GPT3</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</tbody>
</table>

#### 数据集

https://github.com/boudinfl/duc-2001-pre

https://github.com/LIAAD/KeywordExtractor-Datasets

- https://github.com/ydli-ai/CSL

CSL 数据获取自 国家科技资源共享服务工程技术研究中心， 包含 2010-2020 年发表的期刊论文元信息（标题、摘要和关键词）。根据中文核心期刊目录进行筛选， 并标注学科和门类标签，分为 13 个门类（一级标签）和 67 个学科（二级标签）。

为了推动中文科学文献 NLP 研究，本项目提供一系列测评基准任务。 测评任务数据集从 CSL 中抽样 10,000 条，按照 0.8 : 0.1 : 0.1的比例划分训练、验证和测试集。 为了提供公平的多任务学习设置，各任务使用相同的训练、验证和测试集。 任务数据集以 text2text 的形式提供，可以直接在基线模型（例如 T5）上进行多任务训练。

#### 工具库

[https://github.com/boudinfl/pke](https://github.com/boudinfl/pke)：支持了基础的关键词统计、图关键词统计

#### 基于统计思路

- TF-IDF

- FirstPhrases：对句子中'NOUN', 'PROPN', 'ADJ'抽取，然后选择字符长度最长的单词

- KPMiner

keyphrase candidates are sequences of words that do not contain punctuation marks or stopwords4. Candidates that appear less than three times or that first occur beyond a certain position are removed. Candidates are then weighted using a modified TF×IDF formula that account for document length.

- 【YAKE，2018】，https://liaad.github.io/yake/


#### 基于图思路

- TextRank

- RAKE

1. 使用标点符号（如半角的句号、问号、感叹号、逗号等）将一篇文档分成若干分句
2. 构建共现矩阵
3. 特征提取，词频freq、度deg
4. 定义score = deg/freq

- SingleRank

SingleRank (Wan and Xiao, 2008): keyphrase candidates are the sequences of adjacent nouns and adjectives. Candidates are ranked by the sum of their words scores, computed using TextRank (Mihalcea and Tarau, 2004) on a word-based graph representation of the document.

- TopicRank

improves SingleRank by grouping lexically similar candidates into topics and directly ranking topics. Keyphrases are produced byextracting the first occurring candidate of the highest ranked topics.

- Position Rank

- Multipartite

[【FRAKE，2021】](https://arxiv.org/pdf/2104.04830.pdf)

- Textstar

#### 基于嵌入思路

- RVA

uses the average of all the candidate phrases embeddings trained on individual files with GloVe as the reference vector, and then the similarity between the embeddings of candidate keyphrase and the reference vector is calculated and used as the score to rank

- EmbedRank

uses the cosine similarity between the embeddings of candidate keyphrase and the sentence embeddings of the document

- KeyBERT

First, document embeddings are extracted with BERT to get a document-level representation. Then, word embeddings are extracted for N-gram words/phrases. Finally, we use cosine similarity to find the words/phrases that are the most similar to the document. The most similar words could then be identified as the words that best describe the entire document.

- SIFRank: A New Baseline for Unsupervised Keyphrase Extraction Based on Pre-Trained Language Model，https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8954611

- KeyGames

- JointModeling

- MDERank

- AGRank
