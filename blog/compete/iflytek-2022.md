<!-- 科大讯飞2022AI开发者大赛 -->
<!-- 练习赛 & 算法赛 资料 -->
<!-- 2022-6-1 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

## Datawhale赛事大满贯

### 电信客户流失预测挑战赛

比赛报名地址：[https://challenge.xfyun.cn/topic/info?type=telecom-customer&ch=ds22-dw-zs01](https://challenge.xfyun.cn/topic/info?type=telecom-customer&ch=ds22-dw-zs01)

#### 赛事背景

随着市场饱和度的上升，电信运营商的竞争也越来越激烈，电信运营商亟待解决减少用户流失，延长用户生命周期的问题。对于客户流失率而言，每增加5%，利润就可能随之降低25%-85%。因此，如何减少电信用户流失的分析与预测至关重要。

鉴于此，运营商会经常设有客户服务部门，该部门的职能主要是做好客户流失分析，赢回高概率流失的客户，降低客户流失率。某电信机构的客户存在大量流失情况，导致该机构的用户量急速下降。面对如此头疼的问题，该机构将部分客户数据开放，诚邀大家帮助他们建立流失预测模型来预测可能流失的客户。

#### 赛事任务

给定某电信机构实际业务中的相关客户信息，包含69个与客户相关的字段，其中“是否流失”字段表明客户会否会在观察日期后的两个月内流失。任务目标是通过训练集训练模型，来预测客户是否会流失，以此为依据开展工作，提高用户留存。

#### 评审规则

1. 数据说明

赛题数据由训练集和测试集组成，总数据量超过25w，包含69个特征字段。为了保证比赛的公平性，将会从中抽取15万条作为训练集，3万条作为测试集，同时会对部分字段信息进行脱敏。

特征字段包括：客户ID、地理区域、是否双频、是否翻新机、当前手机价格、手机网络功能、婚姻状况、家庭成人人数、信息库匹配、预计收入、信用卡指示器、当前设备使用天数、在职总月数、家庭中唯一订阅者的数量、家庭活跃用户数、....... 、过去六个月的平均每月使用分钟数、过去六个月的平均每月通话次数、过去六个月的平均月费用、是否流失

2. 评估指标

本次竞赛的评价标准采用AUC指标，正样本为1。

#### 比赛分享

- [基础baseline](https://gitee.com/coggle/competition-baseline/blob/master/competition/%E7%A7%91%E5%A4%A7%E8%AE%AF%E9%A3%9EAI%E5%BC%80%E5%8F%91%E8%80%85%E5%A4%A7%E8%B5%9B2022/%E7%94%B5%E4%BF%A1%E5%AE%A2%E6%88%B7%E6%B5%81%E5%A4%B1%E9%A2%84%E6%B5%8B_baseline.ipynb)

---