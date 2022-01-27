<!-- 互联网&数据科学术语 -->
<!-- 术语解释 -->
<!-- 2022-01-28 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

## 机器学习

**Accuracy (error rate)**

    The rate of correct (incorrect) predictions made by the model over a data set (cf. coverage). Accuracy is usually estimated by using an independent test set that was not used at any time during the learning process. More complex accuracy estimation techniques, such as cross-validation and the bootstrap, are commonly used, especially with data sets containing a small number of instances.

**Association learning**

    Techniques that find conjunctive implication rules of the form ``X and Y implies A and B'' (associations) that satisfy given criteria. The conventional association algorithms are sound and complete methods for finding all associations that satisfy criteria for minimum support (at least a specified fraction of the instances must satisfy both sides of the rule) and minimum confidence (at least a specified fraction of instances satisfying the left hand side, or antecedent, must satisfy the right hand side, or consequent).

**Attribute (field, variable, feature)**

    A quantity describing an instance. An attribute has a domain defined by the attribute type, which denotes the values that can be taken by an attribute. The following domain types are common:

**Categorical**

    A finite number of discrete values. The type *nominal* denotes that there is no ordering between the values, such as last names and colors. The type *ordinal* denotes that there is an ordering, such as in an attribute taking on the values low, medium, or high.

**Continuous (quantitative)**

    Commonly, subset of real numbers, where there is a measurable difference between the possible values. Integers are usually treated as continuous in practical problems. A *feature* is the specification of an attribute and its value. For example, color is an attribute. 



**Classifier**

    A mapping from unlabeled instances to (discrete) classes. Classifiers have a form (e.g., decision tree) plus an interpretation procedure (including how to handle unknowns, etc.). Some classifiers also provide probability estimates (scores), which can be thresholded to yield a discrete class decision thereby taking into account a utility function.

**Confusion matrix**

    A matrix showing the predicted and actual classifications. A confusion matrix is of size LxL, where L is the number of different label values. The following confusion matrix is for L=2:

| actual   \  predicted | negative | positive |
| --------------------- | -------- | -------- |
| Negative              | a        | b        |
| Positive              | c        | d        |

The following terms are defined for a two by two confusion matrix:



**Accuracy**

(*a*+*d*)/(*a*+*b*+*c*+*d*).



**True positive rate (Recall, Sensitivity)**

*d*/(*c*+*d*).



**True negative rate (Specificity)**

*a*/(*a*+*b*).



**Precision**

*d*/(*b*+*d*).



**False positive rate**

*b*/(*a*+*b*).



**False negative rate**

*c*/(*c*+*d*).



**Coverage**

The proportion of a data set for which a classifier makes a prediction. If a classifier does not classify all the instances, it may be important to know its performance on the set of cases for which it is ``confident'' enough to make a prediction.



**Cost (utility/loss/payoff)**

A measurement of the cost to the performance task (and/or benefit) of making a prediction *Y'* when the actual label is *y*. The use of accuracy to evaluate a model assumes uniform costs of errors and uniform benefits of correct classifications.



**Cross-validation**

A method for estimating the accuracy (or error) of an inducer by dividing the data into *k* mutually exclusive subsets (the ``folds'') of approximately equal size. The inducer is trained and tested *k* times. Each time it is trained on the data set minus a fold and tested on that fold. The accuracy estimate is the average accuracy for the *k* folds.



**Data cleaning/cleansing**

The process of improving the quality of the data by modifying its form or content, for example by removing or correcting data values that are incorrect. This step usually precedes the machine learning step, although the knowledge discovery process may indicate that further cleaning is desired and may suggest ways to improve the quality of the data. For example, learning that the pattern Wife implies Female from the census sample at UCI has a few exceptions may indicate a quality problem.

**Data mining**

The term data mining is somewhat overloaded. It sometimes refers to the whole process of knowledge discovery and sometimes to the specific machine learning phase.



**Data set**

A schema and a set of instances matching the schema. Generally, no ordering on instances is assumed. Most machine learning work uses a single fixed-format table.



**Dimension**

An attribute or several attributes that together describe a property. For example, a geographical dimension might consist of three attributes: country, state, city. A time dimension might include 5 attributes: year, month, day, hour, minute.



**Error rate**

See Accuracy.



**Example**

See Instance.



**Feature**

See Attribute.



**Feature vector (record, tuple)**

A list of features describing an instance.



**Field**

See Attribute.



**i.i.d. sample**

A set of independent and identically distributed instances.



**Inducer / induction algorithm**

An algorithm that takes as input specific instances and produces a model that generalizes beyond these instances.



**Instance (example, case, record)**

A single object of the world from which a model will be learned, or on which a model will be used (e.g., for prediction). In most machine learning work, instances are described by feature vectors; some work uses more complex representations (e.g., containing relations between instances or between parts of instances).



**Knowledge discovery**

The non-trivial process of identifying valid, novel, potentially useful, and ultimately understandable patterns in data. This is the definition used in ``Advances in Knowledge Discovery and Data Mining,'' 1996, by Fayyad, Piatetsky-Shapiro, and Smyth.



**Loss**

See Cost.



**Machine learning**

In Knowledge Discovery, *machine learning* is most commonly used to mean the application of induction algorithms, which is one step in the knowledge discovery process. This is similar to the definition of empirical learning or inductive learning in Readings in Machine Learning by Shavlik and Dietterich. Note that in their definition, training examples are ``externally supplied,'' whereas here they are assumed to be supplied by a previous stage of the knowledge discovery process. *Machine Learning* is the field of scientific study that concentrates on induction algorithms and on other algorithms that can be said to ``learn.''



**Missing value**

The value for an attribute is not known or does not exist. There are several possible reasons for a value to be missing, such as: it was not measured; there was an instrument malfunction; the attribute does not apply, or the attribute's value cannot be known. Some algorithms have problems dealing with missing values.



**Model**

A structure and corresponding interpretation that summarizes or partially summarizes a set of data, for description or prediction. Most inductive algorithms generate models that can then be used as classifiers, as regressors, as patterns for human consumption, and/or as input to subsequent stages of the KDD process.



**Model deployment**

The use of a learned model. *Model deployment* usually denotes applying the model to real data.



**OLAP (MOLAP, ROLAP)**

On-Line Analytical Processing. Usually synonymous with MOLAP (multi-dimensional OLAP). OLAP engines facilitate the exploration of data along several (predetermined) dimensions. OLAP commonly uses intermediate data structures to store pre-calculated results on multidimensional data, allowing fast computations. ROLAP (relational OLAP) refers to performing OLAP using relational databases.



**Record**

see Feature vector.



**Regressor**

A mapping from unlabeled instances to a value within a predefined metric space (e.g., a continuous range).



**Resubstitution accuracy (error/loss)**

The accuracy (error/loss) made by the model on the *training* data.



**Schema**

A description of a data set's attributes and their properties.



**Sensitivity**

True positive rate (see Confusion matrix).



**Specificity**

True negative rate (see Confusion matrix).



**Supervised learning**

Techniques used to learn the relationship between independent attributes and a designated dependent attribute (the label). Most induction algorithms fall into the supervised learning category.



**Tuple**

See Feature vector.



**Unsupervised learning**

Learning techniques that group instances without a pre-specified dependent attribute. Clustering algorithms are usually unsupervised.

## 运营类型

### 新媒体运营

新媒体运营通过现代化移动互联网手段，通过利用抖音、快手、微信、微博、贴吧等新兴媒体平台工具进行产品宣传、推广、产品营销的一系列运营手段。
通过策划品牌相关的优质、高度传播性的内容和线上活动，向客户广泛或者精准推送消息，提高参与度，提高知名度，从而充分利用粉丝经济，达到相应营销目的。
在新媒体运营的工作中，也会涉及用户运营、活动运营、数据运营等多方面的内容。

### 用户运营

用户运营指以用户为中心，遵循用户的需求，以用户行为数据为基础，用户激励与奖励为手段，不断提高用户体验，促进用户行为转化，延长用户生命周期价值的运营。

用户运营场景为围绕用户开源、节流、促活、留存、自传播搭建起一个良性循环：
- 开源（拉动新客户）
- 节流（防止用户流失与流失用户挽回）
- 促活（促进用户活跃甚至向付费用户转化）
- 留存（已有用户的留存）
- 自传播（用户推荐）

常见的数据指标：用户独立访问量（UV），每日活跃用户数（DAU）、新增注册用户数，消费转化用户数、用户平均收入（ARPU）、各个环节转化率、留存率、活跃率等。


### 产品运营
产品运营是指以一个产品为核心，从内容建设，用户运营，活动运营三个层面来管理产品内容和用户，以提升产品的核心数据。

工作场景如下：
- 产品研发期——产品上线前：搞清楚产品的定位以及目标用户。
- 产品种子期——产品内测期：收集用户行为数据和相关的问题反馈，和产品策划一起分析讨论进行产品优化。
- 产品成长期——产品爆发期：产品要爆发，活动策划是必不可少的一部分。
- 产品成熟期：稳定期对产品意义重大的就是小版本的迭代更新。产品运营就要做好产品策划和用户之间的桥梁作用。
- 产品衰退期：这个阶段，用户的流失加剧，用户活跃度也明显下滑，营收贡献也急剧下降。公司策略方面：技术的支持减少，新产品开始推出。

常见的数据指标：下载量、注册量、用户访问深度、用户访问频次、用户数、用户在此页面停留时间长度等。

### 活动运营

活动运营是指围绕一个活动做相应的策划、资源确认、宣传推广、效果评估等一系列流程，推动整个活动流程的进度管理和执行落地，需要持续跟踪活动相关数据。

工作场景如下：活动策划（主意怎么提出来）、资源确认（策划一旦立项就需要对应的资源，需要协调各个部门确保人、财、物资源到位以及什么时间到位）、宣传推广（资源确认好后活动慢慢成型，在活动开始之前需要宣传推广然后去落地）、效果评估（review 活动，看活动做的如何）等。最终结果以目标数据来衡量。

### 数据运营

数据运营是指通过数据化的工具、技术和方法，对运营过程中的各个环节进行科学的分析，为数据使用者提供专业、准确的行业数据解决方案，从而达到优化运营效果和效率、降低运营成本、提高效益的目的。

### 电商运营

电商运营是指电商店铺的运营管理 （淘宝、京东、拼多多等电商平台）。

工作场景：负责商品品类管理、商品上下架、打造店铺活动和爆款产品等。具体工作例如文案、图片设计及短信等推广策略，相关主题活动策划和上线等。

### 社群运营
社群运营指以社群为渠道载体，建立群规范，将群体成员以一定纽带联系起来，使成员之间有共同目标和持续的相互交往，围绕着用户的新增-留存-活跃-传播四阶段给用户提供价值，建立起一个良性的循环，持续提升各类跟用户有关的数据以及为收入负责。

工作场景：负责管理社群，制定群内规则，维护社**流环境，组织群员活动，策划活动等。

常见的数据指标有：用户数、活跃用户数、精英用户数、用户停留时间、付费转化数。

### 内容运营
内容运营是指围绕内容的生产和消费，搭建起一个让用户和平台产生互动的闭环，提升跟内容相关的数据。

常见的数据指标：内容数量、内容浏览量、内容互动数、内容传播数等。

### 短视频运营
短视频运营可以说是新媒体运营的新渠道（因为目前发展速度极快，所以单拎出来），是在短视频不断发展的今天新兴起的一个运营岗位。

工作场景：在抖音、微视、火山、快手等短视频平台进行内容创作、（产品、货、课等）宣传、推广、企业营销等一系列活动。

### 渠道运营
渠道运营就是以渠道为运营载体，帮助产品提升质量，获得增长，带来更多用户，完成KPI，如APP下载量、注册量等。

渠道按形式分为付费与免费。

免费渠道：
- 平台渠道：微信、微博、豆瓣、知乎、简书等
- 搜索渠道：百度百科、百度知道、百度文库、搜狗百科、搜狗知道等
- 社群渠道：微信群、QQ群、论坛、QQ空间、朋友圈、贴吧等

付费渠道：
- 广告平台：粉丝通、广点通、DSP等
- 搜索引擎：百度竞价、搜狗竞价等
- 联盟广告：百度网盟、搜狗网盟等
- 导航类广告：2345导航、hao123导航等
- 平台类内部广告：粉丝通、微信广告等
- 线上媒体广告：腾讯网、新浪网、网易、凤凰等
- 视频广告：优酷、爱奇艺、腾讯等
- App：积分墙、ASO、ASM、安卓应用市场广告
- 个人网站广告：论坛广告、网站广告等

### 市场运营
市场运营是指企业通过市场营销、产品开发、品牌管理等市场开发行为以取得利润或提高市场占有率。其主要特点是企业着重以提高自身竞争力来实现企业利益最大化。

以Marketing为手段，通过花钱或不花钱的方式，进行对产品的一系列宣传，曝光，营销等行为的干预手段。

多见于需要一定程度砸钱的产品，因为只有离钱近，有完整盈利模式的才会在市场运营中不断扩大投入。

工作场景：以市场合作为主，跑渠道，资源或是资源置换，包括现有资源及自主拓展的市场资源。

### 商务运营
商务运营，多见于一些商务B2B的产品，分为BD和销售两种。

工作场景：围绕公司的经营指标，制定可行性方案或招商计划，拓展业务合作和市场资源，完成业务谈判、合同签订及组织实施等一系列活动。

### 游戏运营
游戏运营是将一款游戏平台推入市场，通过一系列的营销手段，使用户从接触、认识、再到了解实际线上的一种操作、最终成为这款游戏平台的忠实玩家，达到提高线上人数，刺激消费增长利润等目的的这一过程。

工作场景：
- 前期试玩：全方位了解游戏开发本身的技术优势、适用平台、题材、IP、核心玩法、开发进度计划、收费点设计、收费方式、竞争对手情况，完成筛选游戏的工作。
- 接入游戏：确定游戏的开发进度和预计上线时间，关注游戏的各个测试版本，调游戏数值和收费点。
- 测试期、上线准备：根据之前获得的信息，和媒介、市场、渠道的同事开会，讨论出游戏的宣传点和市场投放计划，把流量资源的部分搞定，预估上线时大概的用户量和成本。
- 正式上线：关注下载和注册登录流程，考虑用户留存，随时注意ROI指数，用户反馈。关心数据。
- 运营期：关注版本更新和活动的用户反馈，出现bug第一时间解决，必要时对玩家做补偿。
- 游戏下线：当游戏生命周期走到尽头，需通过运营手段将玩家平移到其他游戏内继续创造价值。 

### 生态运营

生态运营是指生产性企业以市场需求为导向，以科技进步为前提，以资源综合利用、降低消耗、减少污染为立足点，以企业效益、社会效益、生态效益为目标，在发展企业主导产品的基础上，开发关联性产品，培育相互依存、相互补充、相互促进的经营共生体，实现以尽可能少的投入，获得尽可能多的产出的经营管理方法。

### O2O
O2O是online to offline，网上与网下相结合，又细分为四种运营模式：
- online to offline是线上交易到线下消费体验
- offline to online是线下营销到线上交易
- offline to online to offline是线下营销到线上交易再到线下消费体验
- online to offline to online是线上交易或营销到线下消费体验再到线上消费体验

### C2C
C2C，consumer to consumer，个人对个人，消费者对消费者，比如淘宝的小店铺。

### B2B
B2B, business to business，企业之间，经济组织对经济组织，比如阿里巴巴。

### B2C
B2C, business to consumer，商家对个人，经济组织对消费者，比如当当、京东。

### SaaS
SaaS, Software-as-a-Service，软件服务

### M-B
MB, Mobile-Business，移动电子商务

### ABC
Agents Business Consume是由代理商（Agents)、商家（Business）和消费者（Consumer）共同搭建的集生产、经营、消费为一体的电子商务平台，被誉为继阿里巴巴B2B模式、京东商B2C模式、淘宝C2C模式之后电子商务界的第四大模式。

---

## 运营模型

### AARRR

AARRR是Acquisition、Activation、Retention、Revenue、Refer，这个五个单词的缩写，分别对应用户生命周期中的5个重要环节。
- Acquisition 用户获取：获取用户是运营产品的第一步，即推广。这个阶段最关心的数据是下载量、安装量。
- Activation 用户激活：用户通过不同渠道进入应用，运营者需利用相关运营手段将被动进入应用的用户转化为活跃用户。比如体验良好的新手教程。常用的数据指标：DAU(日活跃用户)、MAU(月活跃用户)、每次启动平均使用时长、每个用户每日平均启动次数。版本、页面转换路径和自定义事件也是很好的分析维度。
- Retention 用户留存：通常保留一个老客户的成本要远远低于获取一个新客户的成本。运营需要通过日留存率、周留存率、月留存率等指标监控应用的用户流失情况，并采取相应的手段在用户流失之前，激励这些用户继续使用应用。留存率跟应用的类型也有很大关系。通常来说，工具类应用的首月留存率可能普遍比游戏类的首月留存率要高。留存率也是检验渠道的用户质量的重要指标，如果同一个应用的某个渠道的首日留存率比其它渠道低很多，那么这个渠道的质量是比较差的。
- Revenue 获得收益：获取收益是运营最核心的一块。 收入有很多种来源，主要的有三种：付费应用、应用内付费、以及广告。无论是以上哪一种，收入都直接或间接来自用户。所以，前面所提的提高活跃度、提高留存率，对获取收入来说，是必需的基础。用户基数大了，收入才有可能上量。常用的数据指标： ARPU(平均每用户每月收入)值。
- Referral 自传播：基于社交网络的病毒式传播，已成为获取用户的一个新途径。成本低，效果好。唯一的前提是产品自身要足够好，有很好的口碑。

### RFM
用三个维度R（Recency，新近度）、F（Frequency，频次）、M（Monetary Value，现金价值）来衡量用户的价值。

### 创新扩散曲线
“创新扩散理论” 是美国学者埃弗雷特 • 罗杰斯（E.M.Rogers）提出的。埃弗雷特·罗杰斯认为创新是：“一种被个人或其他采纳单位视为新颖的观念、时间或事物。

### 用户金字塔
第一级是社区的管理人员；第二级是用户管理工具；第三级是有价值用户，即足够活跃且能够给社区贡献有效价值的用户；第四级是一般性用户。用户金字塔模型的建立，自上而下，上层影响下层。目的是让运营者对用户的构成有清晰的了解。

工作场景：
- 多用于用户的管理，确保促活和留存。
- 实际工作中，需要关注的是金字塔顶端20%的用户；可以利用模型有效地管理用户，并且每个模块可以再进行拆解成小金字塔。
- 作为管理工具，用户金字塔模型可以增加用户和用户之间的关系。

### 六角度模型
数据思维，描述、定位、需求、应用、技术和价值角度对数据思维进行了阐释，这六个角度基本上能概括用数据来分析和解决问题的过程和机理。

### Engagement-ROI模型
描述了人群的行为（兴趣）和最终变现之间的最直接关系。高兴趣而低变现（上图的第二象限）和低兴趣而高变现（上图的第四象限）都值得我们进一步挖掘。尤其是高兴趣低变现的情况，可能蕴含着未被发掘的价值或潜在机会。

### 转化漏斗模型
转化漏斗模型是指多个自定义事件序列按照指定顺序依次触发的流程中的量化转化模型。通俗的说，从起点到终点的多个环节中，每个环节都会产生用户流失，依次递减，每一步都会有一个转化率。

AIDMA理论是漏斗模型的基础。包括：
- Attention：关注
- Interest：兴趣
- Desire：渴望
- Memory：记忆
- Action：行动/购买

### MOT模型
Moment of Truth，描述消费者被营销或者激发之后发生的行为变化的关键时点。

### 归因模型
第一、对于一次成功的转化，各个渠道或触点各有多少的功劳；第二、描述各个渠道或触点对该转化进行贡献的先后关系甚至因果关系。

### 留存曲线
持续追踪不同时期开始活跃的用户群的留存率随时间的变化趋势。

### cohort模型
Cohort即分组、同期。Cohort模型通过对性质完全一样的可对比群体的留存情况的比较，来发现哪些因素影响短、中、长期的留存。

### PUGC
Professional User Generated Content，即“专业用户生产内容”或“专家生产内容”。是以UGC形式，产出的相对接近PGC的专业音频内容。

### ARGO
ARGO是在增长停滞，或者增长乏力时（也就是产品的存量阶段）的一套运营模型，基于用户生命阶段落实到具体操作的层面，在保证运营目标完成的同时，不断的提升用户生命价值LTV。

### KANO模型
模型用来分类用户需求，确定需求优先级。Kano定义了三个层次的顾客需求：基本型需求、期望型需求和兴奋型需求：
- 基本型需求：基本型需求是用户对企业提供的产品/服务因素的基本要求，是用户认为产品/服务“必须有”的属性或功能。当其特性不充足(不满足顾客需求)时，顾客很不满意;当其特性充足(满足顾客需求)时，顾客也可能不会因而表现出满意。
- 期望型需求：期望型需求是指用户满意度与需求的满足程度成比例关系的需求。期望型需求没有基本型需求那样苛刻，其要求提供的产品/服务比较优秀，但并不是“必须”的产品属性或服务行为。
- 兴奋型需求：兴奋型需求要求提供用户一些完全出乎意料的产品属性或服务行为，使用户产生惊喜。当其特性不充足时，并且是无关紧要的特性，则用户无所谓，当产品提供了这类需求时，用户就会对产品非常满意，从而提供用户的忠诚度。

### 内容运营生态轴

- 内容生产
- 内容涌现
- 内容分发
- 内容沉淀
- 内容展现

### RSM
RSM模型从角色、场景、动机三个维度入手进行增长活动策划思考：

- 角色（Role）：营销增长活动中的主要驱动者，而非所有的参与者；
- 场景（Scene）：角色参与活动的主要情境，影响用户情绪；
- 动机（Motivation）：角色愿意参与活动的原因，决定用户意愿；

### HOOK模型（上瘾模型）
HOOK模型（上瘾模型）由《上瘾》的作者尼尔·埃亚尔、瑞安·胡佛提出，主要分析如何让用户对产品“上瘾”，即让用户养成使用习惯的四大产品逻辑，包括四个要素：
触发（Trigger）、行动（Action）、奖励（Reward）、投入（Investment）。

---

## 推广术语

### CPC
Cost Per Click，以每点击一次计费。在这种模式下广告主仅为用户点击广告的行为付费，而不再为广告的显示次数付费。对 广告主来说,避免了只浏览不点击的风险 ，是网络比较成熟的国家常见的收费方式之一。

### CPM
Cost Per Mille，CPM（千人成本）是一种媒体或媒体排期表（SCHEDULING）送达1000人或”家庭”的成本计算单位。

### CPA
Cost Per Action，按照某种行为作为指标来计费。

### CPS
Cost Per Sale，以实际销售产品数量来换算广告刊登金额，即以分成模式结算。

### CPD
Cost per Download，按下载收费，是一种广告合作方式。类似于CPA（按实际效果收费 Cost Per Action），实际效果包括下载、注册、咨询、下单等。两者区别在于，CPD只适用于需要下载的产品，CPA则适用于各类产品（如咨询类，注册类，下单类）。

### CPT
Cost Per Time，每时间段展示成本，大多是以一个固定价格去买断一段时间内的广告位展示，被称作最省心的投放方式。

### CPV
Cost Per Vision，即信息流广告产品按CPV付费，也就是有多少用户登录并且看到了企业发布的内容来计算。

### CPI
Cost Per Install，即按每一次安装收费，是一种比较有效率的收费方式。CPI主要是针对海外的移动应用（APP）推广，国内较少。

### OCPC
Optimization Cost Per Click，目标转化出价功能，是一种基于以CPA为目标的智能投放模式，它的前期是在以CPC推广获得流量的基础上优化后才开始的，当进行OCPC推广的时候，CPC出价和匹配方式已经不能生效，这时候不要再去人工调CPC出价以及关键词匹配方式 等，而是要把关注点转移到CPA的效果，才能有更高的ROI。

### OCPM
Optimized Cost per Mille，即优化千次展现出价，本质还是按照cpm付费。采用更精准的点击率和转化率预估机制，将广告展现给最容易产生转化的用户，在获取流量的同时，提高转化率、降低转化成本，跑量提速更快。

### OCPX
OCPX，广告转化出价，是一种以转化成本为优化目的，根据单个流量的点击率和转化率进行智能 动态出价的调整，帮助商家有效的控制转化成本，提升广告效率，最终达成目标的工具。

### DSP
Demand-Side Platform，需求方平台。这一概念起源于网络广告发达的欧美，是伴随着互联网和广告业的飞速发展新兴起的网络广告领域。

### SSP
Sell-SidePlatform，供应方平台，即站长服务平台。

### DMP
Data Management Platform，数据管理平台。是把分散的多方数据进行整合纳入统一的技术平台，并对这些数据进行标准化和细分，让用户可以把这些细分结果推向现有的互动营销环境里的平台。

### RTB
Real Time Bidding，实时竞价。即在每个广告展示曝光的基础上进行实时竞价的新兴广告类型。

### PDB
Programmatic Direct Buying，私有程序化购买。简单来说就是广告主通过PDB私有采买媒体后，就可以通过DSP进行投放，当然PDB也不是谁都合适，本身体量及市场都比较大的品牌可能更适合这种方式。

### ROI
Return on Investment ，投资回报率。投资回报率（ROI）= （税前年利润/投资总额）*100%。在电商行业中，ROI一般指投入产出比。


### ARPU
Average Revenue Per User，平均每用户收入。即统计某时间区间内，活跃用户对产品产生的平均收入，一般以月计。


### ARPPU
Average Revenue Per Paying User，每付费用户平均收益。这个指标考核的是某时间段内平均每个付费用户为应用创造的收入。在用户数量上，ARPPU只考虑某一时间段内的付费用户，而非该时间段内所有的活跃用户。

### DAU
Daily Active User，日活跃用户数量。常用于反映网站、互联网应用或网络游戏的运营情况。

### WAU
Weekly Active Users，周活跃用户数量。表示一周之内（统计日），登录或使用了某个产品的用户数（去除重复登录的用户）。

### MAU
Monthly Active User，月活跃用户数量。一般指某App月活跃用户数量（去除重复用户数）。

### KOL
Key Opinion Leader，关键意见领袖。是营销学上的概念，通常被定义为：拥有更多、更准确的产品信息，且为相关群体所接受或信任，并对该群体的购买行为有较大影响力的人。

### UGC
User Generated Content，用户生成内容，即用户原创内容。UGC的概念最早起源于互联网领域，即用户将自己原创的内容通过互联网平台进行展示或者提供给其他用户。

### PGC
Professional Generated Content，专业生产内容。用来泛指内容个性化、视角多元化、传播民主化、社会关系虚拟化。也称为PPC(Professionally-produced Content）。

### CTR
Click-Through-Rate，即点击通过率，是互联网广告常用的术语，指网络广告（图片广告/文字广告/关键词广告/排名广告/视频广告等）的点击到达率，即该广告的实际点击次数（严格的来说，可以是到达目标页面的数量）除以广告的展现量（Show content）。

## 营销理论

## 主动学习论
主动学习论与“压力反应论”相反，其基本观点可概括为：只要广告能更好地表达产品或服务的好处，消费者就会主动遵循广告信息要求，对产品或服务形成良好的印象并采取购买行动．产品与服务的销量也会随之增加。

主动学习理论假设广告能将产品或服务的信息有效地传播给消费者，使他们认识其特性与优异之处，影响其对产品的印象。有了良好的印象，就会驱使消费者采取购买行动，这就是产品销售增加的基本原因。很明显，这种理论将广告的效用寄托于广告本身，只有能产生“学习功效”的广告。才能真正发挥作用。

## 压力反应论
压力反应论是借用心理学、物理学、市场营销学等学科的研究成果，应用于广告与销售的关系上，把广告假设为能对消费者施以压力，从而对其产生影响，达到广告的目的。这种理论从不同的市场环境、不同的经营策略，集中研究广告与销售量的关系，其结论认为销售量与广告费用成正比。因此，只要生产厂商能拟定出广告费用，就可以预测到自己产品的销售量。

压力反应论的理论概念十分简单，但其可扩展性很宽，很多广告学者凭此概念研究出众多结论，用以证实广告与销售量的关系。实际上，众多广告主之所以愿意投资大量的广告费，其随之而来的销售量增幅是重要的诱因。