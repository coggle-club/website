<!-- 2022人民网人工智能算法大赛 -->
<!-- 算法有态度，价值有主张 -->
<!-- 2022-12-01 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!-- <a href="data.sklccc.com/2022">比赛官网</a> -->

![](http://data.sklccc.com/img/matchbanner2022.cb92fa3e.jpg)

## 赛事介绍

为推进人工智能领域的学术交流、人才培养、技术发展，鼓励广大学生积极学习和研发符合我国主流价值观的优秀算法， 2022年11-12月举办“2022人民网人工智能算法大赛”，赛事由人民网股份有限公司主办，传播内容认知全国重点实验室承办。
赛事网站

本届比赛的报名、赛题发布、竞赛数据集发布及结果提交、实时榜单发布，都通过竞赛官网（data.sklccc.com/2022）进行， 比赛的相关通知及赛制介绍也将通过此网站发布。

## 赛程安排

- 开放报名、赛题发布：11月7日10:00
- 发布数据集，开放结果提交：11月29日10:00
- 结果提交截止：12月18日
- 结果审核：12月19日-12月25日
- 结果公布：12月26日10:00
- 颁奖仪式：待定


## 赛题1：对话生成

文本生成是自然语言处理中一个重要的研究领域，具有广阔的应用前景。随着深度学习和大规模预训练模型能力的提升，文本生成任务在社交媒体领域，特别是以文字为主要输出形式的媒体上，有了更大落地应用的可能性。

此任务提供微博对话数据集，每条数据主要包含微博文本内容，以及微博对应的回复。参赛选手需要根据给定的数据集，训练一个文本生成模型，可以生成自然流畅、信息丰富，符合话题场景的回复内容。

此任务的评估机制分为客观评估、主观评估两个阶段，客观评估阶段（11月29日-12月18日）的前10名参赛队伍提交模型及代码文件，由评委在新话题下生成评估数据，进行主观评估，得出最终排名。

### 数据说明

- 训练集：train.csv， 共有三个字段，每个字段以\t划分.
  - text，微博文本正文
  - comment，回复文本内容
  - weibo_id，微博文本对应的id

- 测试集：test_A.csv和test_B.csv 共有两个字段，每个字段以\t划分。测试集有两个，分别用于客观测试和主观测试。

- weibo_id，微博ID
- text，微博文本正文

### 评估方式

评估机制分为客观评估、主观评估两个阶段。其中客观评估阶段在测试集A上针对客观指标进行自动评估，客观评估表现优秀者进入主观评估阶段。 主观评估阶段需要参赛队伍提交模型文件及代码文件，评审人员基于参赛队伍的模型在测试集B上生成提交文件并进行主观评估。 

在主观评估阶段，参赛队伍需要基于anaconda环境进行开发，遵循特定输入输出数据格式规范，提供anaconda中依赖环境、相关模型以及代码，以便评审人员能够评估模型能力。

 自动评估阶段的得分为： 
 
$$
\text { Score }=\frac{1}{4}\left[\begin{array}{l}
\left(B L E U_1+B_{L E U_2}\right)+\left(\text { DISTINCT }_1+\text { DISTINCT }_2\right) \\
+\text { BertScoreFlrelation }+\text { BertScoreF1similarity }
\end{array}\right]
$$

其中BLEU表示预测回复与标准回复的字粒度值；DISTINCT是对话内容多样性的自动指标。 （其计算方式： 对于一个weibo_id的多个生成评论内容求多样性，然后求所有weibo_id对应的多样性的平均)。

BertScoreFlrelation值用来评估生成的文本与博文的相关性，以及BertScoreF1similarity生成文本与真实评论的相似度 （针对每一条生成的评论，将该评论与所有真实评论求相似度，然后取最高分作为该条评论的相似度得分。最终将相似性得分求平均）。 

## 赛题2：微博话题识别

新浪微博作为新型社交媒体积累了各领域的海量数据，从中挖掘出潜在的特征并及时识别出话题，能够带来可观的社会价值。

本次比赛提供微博识别数据集，每条数据包括微博文本数据及对应的话题标签，每个数据样本可能包含一个或多个话题标签。

参赛选手需要通过训练集数据建立预测模型，对测试集数据的话题标签作出识别。

### 数据说明

- 训练集包含一批文本信息样本及其标签，文件名为train.csv，各字段以tab分隔，格式如下：
  - Text，微博文本内容
  - Label，话题标签

- 测试集包含一批不含标签的样本，文件名为test.csv，格式如下：
  - ID，样本ID
  - Text，微博文本内容

### 评价指标

在此任务中，为了更好的反应模型的能力，我们对评估样本采用部分正确的评估方法。

```
from sklearn import metrics
import numpy as np
y_true = np.array([0,1,0,1], [1,0,1,0])
y_pred = np.array([0,1,1,0], [1,0,1,0])

F1_score = metrics.f1_score(y_true, y_pred, average="samples")
```

## 赛题3：微博流行度预测

互联网新媒体，特别是微博的兴起，极大地促进了信息的广泛传播。对微博信息的流行度规模作出精准预测，有利于对互联网舆情态势作出准确研判。

本次比赛提供微博传播数据集，包括一批微博数据，每条微博数据附带用户在当时的基本信息数据。参赛选手需要预测微博在指定时间的流行度。其中，流行度由微博的转发量、评论量、点赞量三者共同决定。

### 数据说明

数据集数据来源于新浪微博，用户Id、微博Id等信息已经过脱敏。数据集分为训练集和测试集，所有文件均为csv格式。

- 训练集数据格式：
  - userid	用户Id(字段加密)
  - verified	是否微博认证
  - uservip	用户类别
  - userLocation	用户所在地
  - userCreatetime	用户创建时间
  - gender	性别
  - statusesCount	用户历史发微博数
  - followersCount	粉丝数
  - weiboid	微博Id(字段加密)
  - content	微博文字内容
  - pubtime	发布时间
  - ObserveTime	采集时间
  - retweetNum	微博在采集时间的转发数量
  - likeNum	微博在采集时间的点赞数量
  - commentNum	微博在采集时间的评论数量

- 测试集数据格式：
  - userid	用户Id(字段加密)
  - verified	是否微博认证
  - uservip	用户类别
  - userLocation	用户所在地
  - userCreatetime	用户创建时间
  - gender	性别
  - statusesCount	用户历史发微博数
  - followersCount	粉丝数
  - weiboid	微博Id(字段加密)
  - content	微博文字内容
  - pubtime	发布时间
  - ObserveTime	采集时间
  - retweetNum	微博在采集时间的转发数量
  - likeNum	微博在采集时间的点赞数量
  - commentNum	微博在采集时间的评论数量

### 评价指标

针对每条微博的转发量、评论量、点赞量，我们采用平均绝对百分比误差（mean absolute percentage error）来评价预测效果的优劣。

$$M A P E=\frac{1}{M} \sum_{m=1}^M\left|\frac{\widehat{N}_m-N_m}{\max \left(N_m, \varepsilon\right)}\right|$$

## 赛题4：微博转发行为预测

在线社交网络中,微博平台的便捷性和开放性,给信息的传播和爆发提供了很大的便利。转发是微博平台上用户的重要行为,也是信息传播的关键机制。基于转发行为,分析一条推文是否被用户转发,可以使我们更好地了解信息的传播特性,探索用户的行为与兴趣,以此推进信息推荐、预防突发事件和舆情感知等应用发展。

本次比赛提供微博传播数据集，包括一批微博转发数据，源发帖数据，附带用户基本信息数据。参赛选手需要预测在特定观测时间内，用户对特定微博是否会发生转发行为。

### 数据说明

- repost.data.csv
  - rootweiboid	源微博Id(字段加密)
  - rootuserid	源用户Id(字段加密)
  - weiboid	转发微博Id(字段加密)
  - userid	转发用户Id(字段加密)
  - content	转发微博文字内容
  - pubtime	转发时间
- post.data.csv
  - rootweiboid	源微博Id(字段加密)
  - rootuserid	源用户Id(字段加密)
  - content	源微博文字内容
  - pubtime	源微博发帖时间
- user.data.csv
  - userid	用户Id(字段加密)
  - userVip	用户类别
  - userLocation	用户所在地
  - userCreatetime	用户创建时间
  - followersCount	粉丝数
  - statusesCount	发微博数
  - verified	微博认证
  - gender	性别
- infer.data.csv
  - rootweiboid	源微博Id(字段加密)
  - rootuserid	源用户Id(字段加密)
  - weiboid	转发微博Id(字段加密)
  - userid	转发用户Id(字段加密)
  - observetime	观测时间

### 评价指标

此任务使用F1值作为评价指标

## 社交媒体机器人识别

社交媒体机器人已经成为传播学研究的重要议题，对其进行有效准确识别是相关研究开展的前提。 当前基于账号特征、信息特征、社会网络信息识别、机器学习识别等方法正面临全新挑战。 为了应对这些挑战，新的社交机器人识别体系应当包含账号的社交行为、集群行为和情感行为等指标，并借助不同账号间的协同行为、账号互动能力等网络行为特征对社交机器人进行识别。

本次比赛提供社交机器人数据集，主要包括账号个人信息、推文信息、邻居信息等数据。 参赛选手需要通过训练集数据建立分类模型，对测试集数据进行机器人身份识别。

### 数据说明

- 训练集包含一批账号ID及其标签，文件名为train.csv，各字段以\t分隔，格式如下：
  - ID	用户ID
  - Label	机器人身份标签，“1”表示为机器人账号，“0”表示为人类账号
- 用户信息数据包含一批账号的详细数据，文件名为user.json，格式如下：
  - ID	用户ID
  - tweet	用户近期发布的200条推文
  - profile	用户个人信息，包括用户ID、用户昵称、个人描述、地点等
  - id	用户id，用户唯一标识符的整数表示形式
  - id_str	用户id，用户唯一标识符的字符串表示形式
  - name	用户定义的用户名
  - screen_name	用户使用的屏幕名称或名别，该值是唯一的
  - location	用户定义位置
  - profile_location	用户定义位置的配置信息
  - description	用户个人描述
  - url	用户配置信息中关联的url
  - protected	用户推文是否设置保护其推文
  - followers_count	粉丝数
  - friends_count	关注数
  - listed_count	用户所属的公用名单的数量
  - created_at	用户注册时间，UTC格式
  - favourites_count	点赞数
  - verified	是否为认证用户
  - statuses_count	发文数
  - lang	使用语言类型
  - profile_image_url	用户头像链接
  - has_extended_profile	是否存在扩展信息配置项
  - default_profile	是否使用系统默认用户配置
  - default_profile_image	是否使用系统默认用户头像
- 关系信息数据包含账号之间的关系数据，文件名为edge.json，格式如下：
  - seed_user_id	主节点账号ID
  - relation	关系类型，包括followers和friends
  - relation_user_id	关系账号ID

### 评价指标

此任务使用Macro-F1作为评估指标，我们分别计算每个类的准确率、召回率、f1分数，并报告两个类的平均分数。
