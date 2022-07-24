<!-- 华为2022全球校园AI算法 -->
<!-- 2022鸿蒙开发者赛事之华为全球校园AI算法精英赛道，正式面向全球全日制高等院校及以上在校学生开启报名通道，专项奖励基金超百万人民币。 -->
<!-- 2022-06-24 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

## 赛题介绍

2022鸿蒙开发者赛事之华为全球校园AI算法精英赛道，正式面向全球全日制高等院校及以上在校学生开启报名通道，专项奖励基金超百万人民币。本届大赛由江苏省人工智能学会(JSAI)、华为终端云服务部、华为南京研究所共同举办。华为希望联动更多高校和学者，探寻AI新技术覆盖更多场景的可能性，为构建万物互联的智能世界贡献算法力量。

自2019年起，华为全球校园AI算法精英赛事已成功举办三届，吸引了45个国家和地区近8000支队伍参赛，聚集了2500多个优质算法成果，共有150多个优秀学子获奖、1名天才少年候选人和多名C9高校顶尖人才入职华为。

通过汇聚数智时代新生力量，赛事逐渐成为连接知识理论与应用实践的枢纽，选手们通过创新思考、创意设计和整合开发，不仅探索AI算法领域新技术，更让AI技术真正落地应用，为产业发展和AI领域的关键突破做出贡献。

赛题报名地址：[https://developer.huawei.com/consumer/cn/activity/digixActivity/digixdetail/101655281685926449?ha_source=co&ha_sourceId=89000234](https://developer.huawei.com/consumer/cn/activity/digixActivity/digixdetail/101655281685926449?ha_source=co&ha_sourceId=89000234)


### 赛题介绍

- 赛题一“知识驱动口语对话”：针对当前生成式对话技术存在回复无意义、信息量少等问题，希望对话系统能充分利用外部知识，生成更有意义、内容更丰富的回复;以及容忍口语表述不规范、不精确等问题，生成正确的标准回复。

- 赛题二“车道渲染数据智能质检”：导航过程中所看到的背景道路界面是基于地图数据渲染生成，部分数据会存在问题导致渲染生成的道路存在缺陷。根据问题数据所具有的共同模式建模，提高模型精度是降低成本的关键。希望挖掘计算机视觉方向人才。

- 赛题三“广告-信息流跨域ctr预估”：针对广告域数据中用户行为类型相对单一的问题，希望参赛选手基于广告日志数据、用户基本信息和跨域数据优化广告ctr预估准确率。

### 赛题赛程

- 06/24-08/24，报名和选拔赛

参赛者需在2022/08/24之前登录华为开发者联盟官网帐号（如无帐号，需进行注册），点击“立即报名”进行组队报名。如您是队长，请点击“创建团队”；如您是队员，请点击“加入团队”并选择您需要加入的团队，提交申请。完成报名后，请选择一个赛题提交算法结果，进行在线比赛，您可以通过排行榜实时查看排名。

- 08/26-08/31，选拔赛评选

大赛评审团根据排行榜上自动化评分结果及资格复核结果评选出三大赛题入围精英赛的21支队伍。

- 09/01-09/03，入围队伍公示

入围精英赛队伍将于2021/09/01-09/03在大赛官网进行公示。

- 9月中旬，精英赛&颁奖

所有入围队伍需进行线上竞赛，并完成线下答辩，确定最终排名。评审团将综合评定每个赛题最终奖项。

### 赛题奖金

每道赛题奖金设置如下：

- 冠军（1名）：US$35,000
- 亚军（1名）：US$15,000
- 季军（1名）：US$10,000
- 星光卓越奖（4名）：US$2,500


## 知识驱动口语对话

当前生成式对话技术存在回复无意义、信息量少等问题，因此希望对话系统能充分利用外部知识，生成更有意义、内容更丰富的回复。知识涉及多个领域，各领域的样本量并不一定均匀；并且有时需要对图谱知识进行复杂的查询或推理，才能得到问题的答案。此外，现实的对话往往有口语化表达和ASR识别错误等问题，因此希望对话模型鲁棒性更强，能够容忍口语表述不规范、不精确以及ASR中的词法或语法错误问题，并生成正确的标准的回复。

### 赛题任务

评价指标：各个指标加权得分SCORE

本题目将为选手提供多轮对话数据和知识图谱数据，参赛选手基于给定的数据构建知识对话模型。赛题任务如下：

- 知识选择
    - 目标：理解用户问题，选择与用户问题相关的知识三元组；
    - 输入：对话历史、知识库
    - 输出：知识三元组
    - 评估指标：精准率、召回率、F1值
- 对话生成
    - 目标：结合生成模型和知识三元组，生成回复语句；
    - 输入：对话历史、知识库、知识三元组
    - 输出：自然、流畅、合理的回复语句
    - 评估指标：自动化评估指标（基于字的BLEU-1/2,Distinct-1/2, generation_F1值）和人工评估（丰富度0-2，连贯性0-2，知识准确率0-2）

数据划分成训练集/验证集/测试集，对每支队伍的各个自动评估指标计算加权得分，先根据加权后最终得分筛选出 top15 队伍。然后评审人员再对 top15 模型进行人工评估，决出top7 队伍，最终比赛排名以人工评审为准。

### 数据说明

数据包括对话数据和图谱数据，对话数据划分为训练集、验证集和测试集。

训练集包含多个对话样例，对话中标注了话语message涉及的知识三元组attrs，一个语句可能涉及多个知识三元组，每个知识三元组来自图谱文件，包含了attrname，attrvalue，name三个字段信息，数据样例如下：

```
"messages":
[
  {
    "message": "对话语句"
  },
  {
    "message": "对话语句",
    "attrs": [
      "attrname:实体属性名",
      "attrvalue:实体属性值",
      "name:实体"
    ]
  },
  "..."
]

"name":"对话开始的实体"
```             

验证集的数据格式和训练集类似，不同的是，验证集中部分语句带有ASR错误，参赛者需要正确理解带有ASR错误的语句，选择正确的知识并给出正确的回复语句。

测试集中给出多个对话样例，每个对话样例带有id和对话历史，参赛者根据对话历史，选择知识（如果语句涉及知识），给出回复，数据样例如下：

```
"样例id:"[

        {
  "message": "对话语句"
},

"..."
]
```

知识图谱文件包含多个实体，实体包含多个属性三元组，属性三元组的格式为（实体，属性，属性值）。

```
"实体":[

    [
  "实体",
  "属性",
  "属性值"
],
              

"..."
] 
```

### 评测方法

对每支队伍的各个自动评估指标计算加权得分，根据分数筛选 top15 队伍。评审人员对top15 模型进行人工评审，决出 top7 队伍，最终比赛排名以人工评审为准。

知识选择采用精确率（Precision），召回率（Recall），F1 值进行评估：

$$
\begin{gathered}
\text { Precision }=\frac{\text { Count }(\text { correct predicted knowledge triples })}{\text { Count }(\text { predicted knowledge triples })} \\

\text { Recall }=\frac{\text { Count }(\text { correct predicted knowledge triples })}{\text { Count }(\text { ground }-\text { truth knowledge triples })} \\

F 1=\frac{2 * \text { Precision } * \text { Recall }}{\text { Precision }+\text { Recall }}

\end{gathered}
$$

- Count(correct predicted knowledge triples)表示预测正确的知识三元组数量
- Count(predicted knowledge triples)表示当前样例预测的知识三元组数量
- Count(ground-truth knowledge triples)表示当前样例真实的知识三元组数量

文本生成采用基于字粒度计算 BLEU-N（N=1,2）、DISTINCT-N（N=1,2）和 generation_F1值进行评估。计算公式如下：

$$
\begin{aligned}
&B L E U-N=B P \cdot \exp \left(\sum_{n=1}^{N} w_{n} \log P_{n}\right)\\
&B P= \begin{cases}1 & \text { if } c>r \\ e^{1-r / c} & \text { if } c \leq r\end{cases}
\end{aligned}
$$

其中$w_n$表示权重，取1/N，N 取值为[1,2]；$P_n$表示 n-gram 准确率；$c$表示预测回复文本长度，$r$示标准回复文本长度。

$$
\text { DISTINCT }-N=\frac{\text { Count(unique ngram })}{\text { Count(prediction_response ngram })}
$$

Count(unique ngram)表 示 回 复 中 不 重 复 的 ngram 数 量 ，ount(prediction_response ngram }表示预测回复中 ngram 的总数量，N 取值为[1,2]， DISTINCT-N 越大表示生成的多样性越高。

$$
\begin{gathered}
p=\frac{\text { Count }(\text { common word })}{\text { Count }(\text { prediction response word })} \\
r=\frac{\text { Count }(\text { common word })}{\text { Count(ground }-\text { truth response word })} \\
\text { generation_F1 }=\frac{2 * p * r}{(p+r)}
\end{gathered}
$$

𝐶𝑜𝑢𝑛𝑡(𝑐𝑜𝑚𝑚𝑜𝑛 𝑤𝑜𝑟𝑑) 表 示 预 测 回 复 和 标 准 回 复 文 本 中 共 同 出 现 的 字 ，𝐶𝑜𝑢𝑛𝑡(𝑝𝑟𝑒𝑑𝑖𝑐𝑡𝑖𝑜𝑛 𝑟𝑒𝑠𝑝𝑜𝑛𝑠𝑒 𝑤𝑜𝑟𝑑) 表 示 预 测 回 复 文 本 长 度 ， 𝐶𝑜𝑢𝑛𝑡(ground −truth 𝑟𝑒𝑠𝑝𝑜𝑛𝑠𝑒 𝑤𝑜𝑟𝑑)表示标准回复文本长度。

对每支队伍的各个指标进行加权得分，公式如下：

$$
𝑠𝑐𝑜𝑟𝑒 = 0.3 ∗ (𝑃𝑟𝑒𝑐𝑖𝑠𝑖𝑜𝑛 + 𝑅𝑒𝑐𝑎𝑙𝑙 + 𝐹1) + 0.7 ∗ (𝐵𝐿𝐸𝑈 − 1 + 𝐵𝐿𝐸𝑈 − 2 + 𝑔𝑒𝑛𝑒𝑟𝑎𝑡𝑖𝑜𝑛_𝐹1) 4
$$

根据总分数筛选 top15 队伍，评审人员对 top15 模型进行人工评估，决出 top7 队伍，最终比赛排名以人工评审为准。人工评估指标包括丰富度、连贯性和知识准确率，具体描述如下：
- 丰富度（0-2）：评价回复句子本身的信息丰富程度。
- 连贯性（0-2）：评价回复句子回复输入上文的合适程度，是否话题契合、逻辑正确等。
- 知识准确率（0-2）：评价回复句子所用知识的准确率。

### 提交方式

选手提交结果为一个 result.json 文件, 编码采用无 BOM 的 UTF-8。需要给出对应样例的 id，以及其中涉及的 attrs，和回复文本 message。如果样例不涉及知识，只需给出对应的message，数据格式如下所示：

```
"样例id:"{
    "message":"对话语句",
    "attrs":[
        "attrname":"实体属性名"
        "attrvalue":"实体属性值"
        "name":"实体"]
},
"样例id:"{
    "message":"对话语句"}
```

### 比赛baseline

- [https://github.com/timberding/Knowledge-driven-spoken-dialogue](https://github.com/timberding/Knowledge-driven-spoken-dialogue)

## 车道渲染数据智能质检

在地图业务中，导航过程中所看到的背景道路界面是基于地图数据渲染生成。渲染过程中，部分数据会存在不同程度的问题，导致该部分数据渲染生成的道路存在缺陷，诸如缺边少角，异形道路等。为了更高效的检测这部分数据，降低人工成本，质检模型需要达到更高的准确度。根据问题数据所具有的共同模式建模，提高模型精度是降低成本的关键。希望通过本次比赛，挖掘计算机视觉方向人才，推动该领域发展。

### 赛题介绍

本赛题为选手提供地图渲染数据及其部分标注。训练集包括车道渲染数据的图片集及部分标注，选手使用训练数据进行模型训练。测试集分为 A/B 两个测试集。测试集仅提供车道渲染数据图片集，选手使用模型预测测试图片是否存在问题。

### 数据说明 
本赛题给出的车道渲染数据为图片格式，包含两个大类，即问题图片和无问题图片，问题图片的问题范围包括：中心线问题、停止线问题、引导面问题、路肩问题、路面问题、箭头问题、车道线问题。请注意存在问题的图片可能有多个问题。图 1~7 分别给出了中心线、停止线、引导面、路肩、路面、箭头、车道线问题图片的例子。

![](https://developer.huawei.com/consumer/cn/activity/starAI2022/algo/img/driveway1.6800f7ce.png)

标注文件以 csv 文件形式给出。每行包括图片名及该图片是否存在问题标注(若存在问题，会给到具体的问题编号)。格式如下：
```
imagename, defect_type
image_0.png, 1
image_1.png, 0
```

### 评估方式 
选手根据测试集图片，预测图片是否存在问题(无需给出具体问题类别)。比赛使用AUC(Area Under Curve)作为评价指标，AUC 越高，代表结果越优，排名越靠前。 

### 提交方式 
选手提交 csv 文件，编码采用无 BOM 的 UTF-8。格式如下：

```
imagename, defect_prob
```

其中 imagename 对应测试图片的图片名，defect_prob 表示测试图片存在问题的概率。imagename, defect_prob 间采用英文逗号分隔。

### 比赛baseline

- [https://github.com/timberding/Intelligent-quality-inspection](https://github.com/timberding/Intelligent-quality-inspection-of-lane-rendering-data)

##  广告流跨域CTR预估
广告推荐主要基于用户对广告的历史曝光、点击等行为进行建模，如果只是使用广告域数据，用户行为数据稀疏，行为类型相对单一。而引入同一媒体的跨域数据，可以获得同一广告用户在其他域的行为数据，深度挖掘用户兴趣，丰富用户行为特征。引入其他媒体的广告用户行为数据，也能丰富用户和广告特征。本赛题希望选手基于广告日志数据，用户基本信息和跨域数据优化广告ctr预估准确率。目标域为广告域，源域为信息流推荐域，通过获取用户在信息流域中曝光、点击信息流等行为数据，进行用户兴趣建模，帮助广告域ctr的精准预估。


### 赛题介绍


本赛题提供 7 天数据用于训练，T 天数据用于测试，数据包括目标域(广告域)用 户行为日志， 用户基本信息， 广告素材信息，源域(信息流域) 用户行为数据， 源域(信 息流域)物品基本信息等。希望选手基于给出的数据，识别并生成源域能反映用户兴趣， 并能应用于目标域的用户行为特征表示，基于用户行为序列信息，进行源域和目标域的 联合建模，预测用户在广告域的点击率。 所提供的数据经过脱敏处理，保证数据安全。

### 数据说明

提供的数据包括目标域用户行为数据，源域用户行为数据, 以下按照这2个维度分别 说明。

- 目标域用户行为数据

| 序号 | 字段名称     | 字段含义                 | 是 否 可 为空 | 字段类 型 | 取值样例 |
| ---- | ------------ | ------------------------ | ------------- | --------- | -------- |
| 1    | label        | 是否点击， 0：否， 1：是 | 否            | int       | 0，1     |
| 2    | user_id      | 用户 id                  | 否            | String    | 1，2…    |
| 3    | age          | 年龄                     | 是            | String    | 1，2,3…  |
| 4    | gender       | 性别                     | 是            | String    | 1，2…    |
| 5    | residence    | 常住地-省份              | 是            | String    | 1，2…    |
| 6    | city         | 常住地-市-编号           | 是            | String    | 1，2…    |
| 7    | city_rank    | 常住地-市-等级           | 是            | String    | 1，2…    |
| 8    | series_dev   | 设备系列                 | 是            | String    | 1，2…    |
| 9    | series_group | 设备系列分组             | 是            | String    | 1，2…    |
| 10   | emui_dev     | emui 版本号              | 是            | String    | 1，2…    |
| 11   | device_name  | 用户使用的手机机型       | 是            | String    | 1，2…    |
| 12   | device_size  | 用户使用手机的尺寸       | 是            | String    | 1，2…    |
| 13   | net_type           | 行为发生的网络状态             | 是   | String    | 1，2…        |
| 14   | task_id            | 广告任务唯一标识               | 是   | String    | 1，2…        |
| 15   | adv_id             | 广告任务对应的素材 id          | 是   | String    | 1，2…        |
| 16   | creat_type_cd      | 素材的创意类型 id              | 是   | String    | 1，2…        |
| 17   | adv_prim_id        | 广告任务对应的广告主 id        | 是   | String    | 1，2…        |
| 18   | inter_type_cd      | 广告任务对应的素材的交 互类型  | 是   | String    | 1，2…        |
| 19   | slot_id            | 广告位 id                      | 是   | String    | 1，2…        |
| 20   | site_id            | 媒体 id                        | 是   | String    | 1，2…        |
| 21   | spread_app_id      | 投放广告任务对应的应用 id      | 是   | String    | 1，2…        |
| 22   | Tags               | 广告任务对应的应用的标 签      | 是   | String    | 1，2…        |
| 23   | app_second_class   | 广告任务对应的应用的二 级分类  | 是   | String    | 1，2…        |
| 24   | app_score          | app 得分                       | 是   | Int       | 4            |
| 25   | ad_click_list_00 1 | 用户点击广告任务 id 列表       | 是   | [string,] | [1^2…]       |
| 26   | ad_click_list_00 2 | 用户点击广告对应广告主 id 列表 | 是   | [string,] | [1^2…]       |
| 27   | ad_click_list_00 3 | 用户点击广告推荐应用列 表      | 是   | [string,] | [1^2…]       |
| 28   | ad_close_list_00 1 | 用户关闭广告任务列表           | 是   | [string,] | [1^2…]       |
| 29   | ad_close_list_00 2 | 用户关闭广告对应广告主 列表    | 是   | [string,] | [1^2…]       |
| 30   | ad_close_list_00 3 | 用户关闭广告推荐应用列 表      | 是   | [string,] | [1^2…]       |
| 31   | pt_d               | 时间戳                         | 否   | String    | 202205221430 |
| 32   | log_id             | 样本 id                        | 否   | Int       | 12345678     |

- 源域用户行为数据

| 序号 | 字段名称           | 字段含义               | 是 否 可 为空 | 字段类 型 | 取值样例 |
| ---- | ------------------ | ---------------------- | ------------- | --------- | -------- |
| 1    | u_userId           | 用户标识               | 否            | String    | 0001     |
| 2    | u_phonePrice       | 用户手机价格           | 是            | String    | 13       |
| 3    | u_browserLifeCycle | 浏览器用户活跃度       | 是            | String    | 10       |
| 4    | u_browserMode      | 浏览器业务类型         | 是            | String    | 11       |
| 5    | u_feedLifeCycle    | 信息流用户活跃度       | 是            | String    | 12       |
| 6    | u_refreshTimes     | 信息流日均有效刷新次数 | 是            | String    | 16       |
| 7    | u_newsCatInterests    | 信息流图文 点击 分类偏 好   | 是   | [string,] | [1^2…]       |
| 8    | u_newsCatDislike      | 信息流图文 负反馈 分类 偏好 | 是   | [string,] | [1^2…]       |
| 9    | u_newsCatInteres tsST | 用户短时 兴趣 分类偏好      | 是   | [string,] | [1^2…]       |
| 10   | u_click_ca2_news      | 用户图文 类别 点击序列      | 是   | [string,] | [1^2…]       |
| 11   | i_docId               | 文章 docid                  | 是   | String    | 0001         |
| 12   | i_s_sourceId          | 文章来源的 sourceid         | 是   | String    | 0001         |
| 13   | i_regionEntity        | 文章地域词 id               | 是   | String    | 0001         |
| 14   | i_cat                 | 文章类别 id                 | 是   | String    | 0001         |
| 15   | i_entities            | 文章实体词 id               | 是   | [string,] | [1^2…]       |
| 16   | i_dislikeTimes        | 文章负反馈量                | 是   | String    | 60           |
| 17   | i_upTimes             | 文章点赞量                  | 是   | String    | 22           |
| 18   | I_dtype               | 文章展现形式                | 是   | String    | 20           |
| 19   | e_ch                  | 频道                        | 是   | String    | 1,2…         |
| 20   | e_m                   | 事件来源设备机型            | 是   | String    | 1,2…         |
| 21   | e_po                  | 第几位                      | 是   | String    | 9            |
| 22   | e_pl                  | 拜访地                      | 是   | String    | 1,2…         |
| 23   | e_rn                  | 第几刷                      | 是   | String    | 1            |
| 24   | e_section             | 信息流场景类型              | 是   | String    | 13           |
| 25   | e_et                  | 时间戳                      | 否   | String    | 202205221430 |
| 26   | label                 | 是否点击， -1：否， 1：是   | 否   | String    | 1            |
| 27   | cilLabel              | 是否点赞，-1：否，  1：是   | 否   | String    | 1            |
| 28   | pro                   | 文章浏览进度                | 否   | String    | 1,2…         |

 
### 评估方式

评估方式： 统计广告域的样本 CTR 预估值， 计算 GAUC 和 AUC

评测指标： 本次比赛使用 GAUC 和 AUC 的加权求和作为评估指标， 具体公式如下：$xAUC = \alpha * GAUC + \beta * AUC$

xAUC 越高，代表结果越优，排名越靠前。其中，AUC为全体样本的 AUC 统计， GAUC 为分组 AUC 的加权求和， 以用户为维度分组，分 组权值为分组内曝光量/总曝光)

$$
\mathrm{GAUC}= \frac{\sum_{k=i}^n AUC_{i} * Impression_{i} } {\sum_{k=i}^{n} \text { Impression }_{i}}
$$

初赛：α 为 0.7，𝛽为 0.3

### 提交方式

选手提交结果为一个 submission.csv 文件,  编码采用无 BOM 的 UTF-8 ，格式如下：

```
log_id,pctr
```

其中 log_id 为对应测试样本中的 log_id，pctr 对应测试样本经由模型计算出的预 估 ctr 值， pctr 保留 6 位小数。提交文件参考如下示例：

```
log_id,pctr
1, 0.002345
2, 0.010456
```

## 比赛baseline

[https://github.com/timberding/CTR-prediction](https://github.com/timberding/CTR-prediction-through-cross-domain-data-from-ads-and-news-feeds)
