<!-- 第三届厦门国际银行比赛 -->
<!-- 赛题比赛 -->
<!-- 2021-12-28 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

## 大赛背景

随着科技发展，银行陆续打造了线上线下、丰富多样的客户触点，来满足客户日常业务办理、渠道交易等需求。面对着大量的客户，银行需要更全面、准确地洞察客户理财需求。在实际理财产品业务开展过程中，需要挖掘不同理财产品对客群的吸引力，从而找到目标客群，进行针对性营销。 

本次竞赛提供实际业务场景中的客户行为、资产信息、产品交易信息等为建模对象，一方面希望能借此展现各参赛选手的数据挖掘实战能力，另一方面需要选手在复赛中结合建模的结果提出相应的营销解决方案，充分体现数据分析的价值。


## 赛题描述

- 赛题任务：此次竞赛题目主要是针对客户购买各类理财产品存单概率进行预测，并将预测结果作为营销方案的依据。
- 数据使用规则：本赛题不能使用任何外部数据。本次提供的数据经过脱敏，部分连续型数据（如利率、价格、金融等）经过一定的线性变换，但不影响建模使用和模型预测结果。
- A/B榜规则：本次初赛采用AB榜形式。初赛时间总共一个半月，前一个月排行榜显示A榜成绩（有公私榜，公私榜比例是6:4）后半个月切换成B榜单（有公私榜），排行榜显示B榜成绩，以参赛者提交的最高分为准，最后初赛成绩=A榜成绩*0.3+B榜成绩*0.7。具体A B榜切换方式及日期详见六、大赛流程


## 评分标准
- 提交次数限制:每支团队每天最多提交5次。

- 评分指标：初赛采用A/B榜赛制，最终初赛成绩=0.3*A榜测试集F2值+0.7*B榜测试集F2值，其中：
```python
recall = TP/(TP+FN)，召回率
precision = TP/(TP+FP)，精准率
F2 = 5*recall*precision/(4*precision+recall)，F2值
```

TP是真样例，FP是假阳例，FN是假阴例，通过以上公式得到该类F2值。

- 初赛前50名进入复赛，复赛选手需要提交模型代码、说明文档和PPT，并根据模型结果设计相应的营销方案。
- 复赛成绩＝(101-初赛排名)＊0.5+专家评定成绩＊0.5。专家评分将综合参考模型的创新性、复杂度、稳定性等多项指标，并下发预测名单实际考察营销方案的优劣。专家委员会由银行零售业务专家、金融科技公司数据挖掘专家、科研机构学术专家等组成。
- 决赛主要以答辩形式进行，复赛前六名队伍将进入最终的决赛并进行答辩。决赛成绩=复赛得分*0.5+决赛答辩成绩*0.5。竞赛最终排名由决赛成绩排名确定。如最终采用现场答辩，主办方将为每位选手提供3000元的邀请费（每只队伍不超过6000元）。

## 数据说明

本次数据共分为两个数据集，主表.rar(x_train, y_train 、x_test)和数据表.rar。其中主表.rar 内含训练集的主表x_train、训练集的标签y_train和测试集的主表x_test；数据表.rar包含可供训练集和测试集用来加工衍生特征的数据表。建模的目标即根据训练集对模型进行训练，并对测试集进行预测。

训练集为7、8、9月的抽样数据，测试集为10月的抽样数据。其他数据表是2021.1到2021.9的数据（其中R表是2021.1到2021.8）。

训练集和测试集的标签定义及交易时间定义：

- 正标签及交易时间定义：某一天（2021.7.1）的在售产品在未来一个表现期内（1个月）如果对应客户有购买，则为一条正样本，交易时间定为该天（即2021.7.1）。
- 负标签及交易时间定义：某一天（2021.7.1）在售产品在未来一个表现期内（1个月）如果对应客户没有购买，则为一条负样本，交易时间也定为该天（即2021.7.1）。

下面各表可以通过core_cust_id和prod_code进行关联。以下链接文件为数据集中每张表的字段描述：[点击访问所有数据集中每张表的字段描述](https://pan.baidu.com/s/1rLznTWHbjoLXCXPoMJFooQ)。（提取码：zhyo）
