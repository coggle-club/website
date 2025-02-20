<!-- 自然语言处理NLP -->
<!--  -->
<!-- 2024-11-11 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

## Part1 ES介绍

> https://www.elastic.co/

Elastic业界领先的搜索驱动型解决方案平台，致力于帮助每个人（包括组织、组织员工和他们的客户）更快地找到所需内容，在确保应用程序平稳运行的同时防范网络威胁。

- 为什么需要搜索？

对于我们每天完成的很多事情，搜索都至关重要。但其影响程度比您意识到的要更加深入。搜索的故事绝不仅限于搜索框和前 10 条结果。实际上，您每天遇到的很多问题真的很可能就是搜索问题，正好我们可以帮您解决这些问题。

随着人工智能、大数据、云计算、物联网、5G等新技术的发展，数据呈爆炸式增长，并且成为战略
性资源。据国际数据公司（DC）的报告，2030年数据规模将达到2500ZB。此外，思科2022年的报告
中指出，视频类型的数据在互联网数据中的比例超过了82%，1s内通过全网的视频数据时长总计达
106min。
数据规模高速增长，急需大数据相关的技术对大数据进行获取、存储、管理、处理、分析等。
如何实现海量数据的存储？如何从海量数据中挖掘有价值的信息？如何基于特定规则实现数据的聚
合？如何确保海量数据的安全、容灾、可扩展及高可用？这些都离不开大数据技术。在大数据领域，
2010年开源的Elasticsearch一枝独秀。它多年来一直占据开源搜索引擎领域的榜首，并且根据DB-
Engines排名来看，它的受欢迎程度也很高，如图1-1所示。Elasticsearch在国内外各大中小型企业的
大数据领域都有非常广泛的应用。
正如Elasticsearch官方文档所介绍的，搜索是许多体验的基础，从查找文档到监测基础设施，再到系
统保护免受安全威胁，都离不开搜索。

- Elastic的组成

2015年，Elasticsearch公司更名为Elastic，新的品牌名称能够更好地代表逐渐扩大的产品生态系统
和用例套件。与此同时，Elastic公司在AWS上与提供Elasticsearch主机托管服务的公司Found实现
了合作。通过这一合作，Elastic能够提供市场上最方便、最全面的产品组合。
Kibana
可视化
存储、
Elasticsearch
查询
Elastic Stack
Beats
Logstash
采集、清洗
图1-2 Elastic Stack组成示意图
2017年6月，Elastic并购了位于哥本哈根的应用程序性能监测APM公司—Opbeat，以及位于旧金
山的站点和企业搜索公司—Swiftype。然后Elastic公司开始考虑正式推出整体解决方案服务。每套
解决方案背后都有实际产品作为支撑，而且在短短几分钟内即可部署完毕。
Elastic公司于2018年6月提交了首次公开募股申请，估值在15亿～30亿美元之间，并于2018年10月5
日在纽约证券交易所挂牌上市。

Elastic Stack由Logstash、 Beats、
asticsearch和Kibana四大核心产品组成，在数据摄取、存储
计算分析及数据可视化方面有着无可比拟的优势。
Elasticsearch是Elastic Stack核心的分布式搜索和分析引擎，基于Java编程语言构建，可以在主流
硬件平台上运行。在存储、计算和分析方面，Elasticsearch允许执行和合并多种类型的搜索，适用于
不断涌现的各种新用例，并在充分保障集群安全的前提下具有极高的可用性及容错性。
近期，Elasticsearch官 方网站的宣传语发生变化，由原来的“You know，for search”改成“You
know, for search（and analysis）”。这是因为Elasticsearch能为几乎所有类型的数据提供高效的存储
和索引、近实时的搜索和分析。这些数据类型包含但不限于结构化文本、非结构化文本、数值数据、
地理空间数据等。
Elasticsearch的分布式特性、横向扩展能力可以应对数据和查询量增长的情况。尽管并非所有问题都
是搜索问题，但Elasticsearch仍 然具备出色的在各种用例中处理数据的速度和灵活性。2022年，在
Elastic全球社区大会上，Elastic公司创始人Shay Banon提出了 “index everything”（一切皆可索引
和检索）的理念。他倡导将所有类型的数据纳入索引，使之可以被搜索和分析，从而赋予数据更多价
值。这体现了Elastic公司始终秉持的创新精神。尽管Elastic公司已经取得了显著的成就，但该公司仍
然富有激情，怀揣着大有可为的愿景，以灵活变化的姿态去拥抱不断发展的技术领域。


## Part2 ES安装

### IK 安装

IK官网：https://github.com/infinilabs/analysis-ik

IK稳定版：https://release.infinilabs.com/analysis-ik/stable/

智能开放搜索 OpenSearch

https://www.aliyun.com/product/opensearch