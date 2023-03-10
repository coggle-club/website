<!-- 文本智能校对大赛 -->
<!-- 文本智能校对是自然语言处理的重要应用领域之一。该任务主要是针对文本中出现的错误进行检测和纠正，属于综合性的自然语言处理研究方向。 -->
<!-- 2022-07-15 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

![](https://ai.bdstatic.com/file/3063D21E6B454954917772FF52D3B0A0)


## 赛题介绍

文本智能校对是自然语言处理的重要应用领域之一。该任务主要是针对文本中出现的错误进行检测和纠正，属于综合性的自然语言处理研究方向，能够比较全面体现自然语言处理的技术水平。国际上，针对英文智能校对的相关研究在上世纪六十年代就已开展，而中文智能校对研究相较英文起步较晚，任务复杂性与技术挑战性也更为明显。其巨大挑战来自于中文文本与英文文本的显著差异，首先中文是表意文字，英文是表音文字；其次中文与英文的文本结构不同，英文的词与词之间有空格，而中文的词与词不以空格作为分隔；第三中英文字符集规模的差异较大，英文的字符集仅包含26个字母及标点符号，而中文的字符集则远远大于英文，这导致了中文智能校对系统在构建时比英文智能校对系统更为复杂。

往年文本校对相关评测比赛常使用外国语言学习者撰写的中文文本，这些文本的错误大多数都不是中文母语写作者会犯的错误。而对于中文语言环境下的学校、机关、新闻出版、广播影视、网络信息、公共服务等系统来说，一款针对以中文为母语的用户所使用的智能校对系统将会提供更大的帮助。因此，本次比赛主要选择中文母语写作者撰写的文本经人工标注后作为校对评测数据，从拼写错误、语法错误、语病错误等多个方面考察机器的认知智能能力。

赛题报名链接👉：[https://aistudio.baidu.com/aistudio/competition/detail/404/0/introduction](https://aistudio.baidu.com/aistudio/competition/detail/404/0/introduction)

### 赛题任务


本次赛题选择网络文本作为输入，从中检测并纠正错误，实现中文文本校对系统。即给定一段文本，校对系统从中检测出错误字词、错误类型，并进行纠正。

需注意的是：为降低输出复杂度，任务评测只关注校对后的文本，会自动定位校对后文本的错误位置和错误类型。参赛队伍在对文本校对后只需输出校对后的文本即可，具体的评测脚本可参考baseline代码。


### 评审规则

主办方将对参赛队伍产生的评测结果与比赛主办方公布的标准结果进行一致性评估，最终得到各参赛队伍初赛作品的评测结果。考虑到文本校对中字粒度得分与句子粒度得分有两个结果，我们将综合考虑字粒度得分和句子粒度得分进行评测综合得分计算，评测综合得分 = 0.8 * 字粒度得分 + 0.2 * 句子粒度得分，其中字粒度得分和句子粒度得分均采用F-score计算,具体计算方法如下:



$$F^{final}_1 = 0.8 * F^{token level}_1 + 0.2 * F^{sentence level}_1$$



$$F^{token level}_1 = 0.8 * 字粒度错误检测F1 + 0.2 * 字粒度错误纠正F1$$



$$F^{sentence level}_1 = 句子粒度错误纠正F1$$

### 赛题奖项

本赛事最终选出冠军1队、亚军2队、季军3队，对应奖励如下：

| 奖项名称    | 金额（人民币） |
| ----------- | -------------- |
| 冠军（1队） | 5万/队         |
| 亚军（2队） | 3万/队         |
| 季军（3队） | 1万/队         |


## 赛题数据


1.**本赛题数据来源**于互联网短文本，分为有真实场景数据样本和伪数据样本，供选手使用。

2.**数据集**：本次比赛提供**数据集大小约320MB**，包括部分伪数据和真实场景的错误数据，考虑到真实场景下互联网内容中既包含正确文本也包含错误文本，因此，真实场景数据将包含正确文本及错误文本两部分。

-   初赛阶段
    -   **训练集**约100万条伪数据及约1000条真实场景下的错误数据。
    -   **验证集和测试集**各约1000条真实场景数据（约500条正确文本及约500条错误文本）。
-   决赛阶段
    -   **训练集**：提供2500条真实场景下的错误数据训练集供选手训练使用。
    -   **验证集**：约1000条真实场景数据（包括约500条正确文本及约500条错误文本）。
    -   **测试集**：约4000条真实场景数据（包括约2000条正确文本及约2000条错误文本）

3.**数据中可能包含错误类型**：拼写错误（包括错别字、错别词）；语法错误（包括冗余、缺失、乱序）；语病错误（包括字词使用不当、语义重复、句式杂糅、成分残缺）。

4.**数据格式**：数据文件均为JSON格式，可使用JSON加载查阅，JSON数据字段包括：

-   `id`: 文本id
-   `source`: 源文本（可能包含错误的文本）
-   `target`: 目标文本（正确文本）
-   `type`: positive代表正样本， negative代表负样本
-   `inference`: 预测文本（参赛队伍的校对系统针对source的预测文本）


4.1. 设输入JSON文件格式示例：

```
[
    {
        "source": "领导的按排，我坚决服从",
        "id": 1
    },
    {
        "source": "今天的天气真错！",
        "id": 2
    }
]
```

4.2. 提交JSON文件输出格式示例:

- 初赛a榜提交JSON文件名为: preliminary_a_test_inference.json
- 初赛b榜提交JSON文件名为: preliminary_b_test_inference.json

```
[
    {
        "inference": "领导的安排，我坚决服从",
        "id": 1
    },
    {
        "inference": "今天的天气真不错！",
        "id": 2
    }
]
```

## 学习路线

### 文本纠错基础

英文文本纠错的相关研究早在 20 世纪 60 年代就开始，在英文文本纠错的处理中，大部分采用基于统计的方法和语义的方法，或将几种方法相结合。常用的方法中

- N-gram 语言模型
- 最小编辑距离方法
- 贝叶斯方法

在基于统计的方法中，主要是通过对大规模的语料进行统计，从中提取语言规律信息来建立统计语言模型，通过字词间上下文的共现规律来进行文本纠错。在建立 N-gram 语言模型时，需要考虑 N-gram的平滑度问题；字、词混淆集的建立是一个重点，要从字形、字义、音近、音同等几个方面去考虑。对于要纠错的文本，计算局部位置的 N-gram 概率，过字、词混淆集去构建候选的词，用候选词替换原词，再计算 N-gram 概率，如果显著上升，则是比较可信的候选词。

国内中文文本纠错技术主要是以不断积累的纠错规则和字典来进行文本纠错。在传统的中文文本纠错中主要是先通过规则、统计模型等方法进行查错，然后再进行纠错。主要有两种方法：

- 将错误类型进行分类，然后对这些分类利用 Maxent、SVM 等分类方法再次进行二次识别；
- 将统计机器翻译（SMT）的思想运用到文本纠错，将文本纠错问题转化为机器翻译问题；


利用 seq2seq 模型把文本纠错以机器翻译进行处理，这已经成为文本纠错的主流技术。主要思想是把文本纠错问题转化为在同一类语言中的翻译问题，即将错误文本翻译为正确文本的过程，训练过程是基于注意力机制的Encoder-Decoder模型，其核心由语言模型和翻译模型组成。

### 中文错误类型

常见的错误类型一般包括三种，同音词错误、同形字错误以及语法错误。从处理难度上是处理难度上：字词错误 < 句法错误 < 语义错误。


![](https://cdn.coggle.club/img/chinese-char-error-type.png)

> 图来源：http://blog.nghuyong.top/2021/05/26/NLP/text-corrector/


### 中文纠错模型

- 基于规则的文本纠错

传统的纠错方法一般是基于规则的方法，语言专家首先总结出来一些常见的错误规则，来判断文本是否发生了错误，然后再制定一些规则，将错误文本按照实现总结好的规则加以改正，实现纠错功能。

- N-gram文本纠错算法

在N-gram 模型中句子T的出现概率是由组成T的N个同现的连续字符出现概率组成，假定后一个字符出现的概率仅仅和前一个或者多个字符有关。使用 N-gram 算法计算文本的得分。句子得分越高，越可能是对的，句子得分越低，越有可能是错误。

将文本中的同音字或者同型字用分别用两种词表进行替换，如果替换后的结果比替换前高，说明替换的文本的位置有可能是错误的字符，而后按照句子得分将得分最高的那句话中替换的字符作为候选项提供给用户作为修改选项。

- LSTM-CRF纠错算法

利用 encoder-decoder 结构解决错误文本到正确文本的转换过程，左侧是编码端，右侧是解码端，编码端和解码端都采用LSTM结构。编码端在循环迭代之后生成整个句子的语义向量 ，解码端将生成的向量解码成相应文字，完成错误文本到正确文本的转换。

- BERT MLM纠错算法

BERT/ELECTRA/ERNIE/MacBERT等预训练模型强大的语言表征能力，基于其MASK掩码的特征，可以简单改造预训练模型用于纠错，加上fine-tune，效果轻松达到最优。


### 中文纠错流程

错误检测部分先通过结巴中文分词器切词，由于句子中含有错别字，所以切词结果往往会有切分错误的情况，这样从字粒度和词粒度两方面检测错误， 整合这两种粒度的疑似错误结果，形成疑似错误位置候选集；

错误纠正部分，是遍历所有的疑似错误位置，并使用音似、形似词典替换错误位置的词，然后通过语言模型计算句子困惑度，对所有候选集结果比较并排序，得到最优纠正词。

### BERT 原理简述

BERT 是一个预训练模型，首先对大量的无标注数据语料做无监督训练，这一操作可以学习到许多先验的语言、句法、词义等信息，然后将学习到的特征用于下游任务。BERT 与传统模型不同之处是它将双向的 Transformer 作为特征提取器用于语言模型，传统模型大部分都是单向的对文本序列进行输入，或者将left-to-right 和 right-to-left 的训练结合起来。经


Masked Language Model (MLM)核心思想就是在 encoder 的输出层增加一个分类层，首先利用嵌入矩阵与输出向量相乘将其转换为词汇相同的维度，然后再利用softmax 函数对词汇表中每个单词进行概率计算。简单的说就是随机 mask 掉句子中的一个单词，然后依照英语中完形填空的思想，让模型同时根据这个单词的前后上下文信息内容去对这个词进行预测。

## 赛题分享

> 直播录屏：「竞赛大神易显维：带你深度认知校对问题」

<iframe src="//player.bilibili.com/player.html?aid=556092874&bvid=BV1fe4y1X7XW&cid=777658737&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="430"> </iframe>

- 【ERNIE baseline】[https://aistudio.baidu.com/aistudio/projectdetail/4337707](https://aistudio.baidu.com/aistudio/projectdetail/4337707)
- 【ERNIE + T5 baseline】[https://aistudio.baidu.com/aistudio/projectdetail/4340298](https://aistudio.baidu.com/aistudio/projectdetail/4340298)
- 【Pytorch BERT baseline】[https://github.com/bitallin/MiduCTC-competition](https://github.com/bitallin/MiduCTC-competition)


## 打卡任务

- 任务1：报名并读取数据
    - 步骤1：报名比赛👉[报名链接](https://aistudio.baidu.com/aistudio/competition/detail/404/0/introduction)
    - 步骤2：从比赛数据页面下载比赛数据；
    - 步骤3：解压并读取数据

```python
import json
import pandas as pd
import numpy

train_data = json.load(open('preliminary_a_data/preliminary_train.json'))
exttrain_data = json.load(open('preliminary_a_data/preliminary_extend_train.json'))
val_data = json.load(open('preliminary_a_data/preliminary_val.json'))
testa_data = json.load(open('preliminary_a_data/preliminary_a_test_source.json'))
```

- 任务2：pycorrector基础思路
    - 步骤1：安装pycorrector，并阅读基础文档；
    - 步骤2：使用pycorrector对验证集进行错误矫正，查看预测结果。
    - 步骤3：使用pycorrector对测试集进行错误矫正，生成结果文件。

```shell
# 安装方法，基础使用不需要GPU
pip install -U pycorrector kenlm
```

基础demo的纠错使用：

```python
import pycorrector

corrected_sent, detail = pycorrector.correct('现在上学无非是之后能有咯好的机会拿到称心的工作赚到钱过的好。')
print(corrected_sent, detail)
# 现在上学无非是之后能有个好的机会拿到称心的工作赚到钱过的好。 [('咯', '个', 11, 12)]
```

生成结果提交文件，线上得分0.12左右：

```python
submit = []
for ins in tqdm_notebook(testa_data[:]):
    corrected_sent, detail = pycorrector.correct(ins['source'])
    submit.append({
        "inference": corrected_sent,
        "id": ins['id']
    })
    idx += 1
json.dump(submit, open('preliminary_test_inference.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=4)
```


## 相关资料

### 相关工具
- [https://github.com/shibing624/pycorrector](https://github.com/shibing624/pycorrector)
- [百度大脑-文本纠错服务](https://ai.baidu.com/tech/nlp_apply/text_corrector)


### 推荐博客
- [文本校对算法的一些看法](https://zhuanlan.zhihu.com/p/358402360)
- [策略算法工程师之路-Query纠错算法](https://zhuanlan.zhihu.com/p/145198390)
- [医疗健康领域的短文本解析探索（三) ----文本纠错](https://www.toutiao.com/article/6835877270935044616/)