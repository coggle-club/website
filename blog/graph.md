<!-- 图与知识图谱 -->
<!-- 图任务、图工具和领域应用案例 -->
<!-- 2023-01-29 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

## Part1 图介绍

图（Graphs）是一种对物体（objects）和他们之间的关系（relationships）建模的数据结构，物体以结点（nodes）表示，关系以边（edges）表示。图是复杂系统中常用的信息载体，可以表示现实中许多复杂关系，如社交网络、犯罪网络、交通网络等。

### 常见任务

![](https://cdn.coggle.club/img/graph-application.jpeg?imageView2/0/w/700)

- 图嵌入：将原始图数据转换到低维空间并保 留关键信息，从而提升节点分类、链接预测、节点聚类等下游任务的性能；
- 节点分类：对图中某些节点对应的类别，从而预测出生于没有标签的节点属于哪一个类别，该任务也被称为半监督节点分类。
- 节点聚类：
- 节点中心性：
- 链接预测：
- 异常检测：
- 图分类：
- 社区检测
- 图聚类：
- 图匹配：
- 图相似度：
- 图搜索：
- 图数据增强：
- 图攻击与防御：通过对某些节点的特征进行扰动、或者对图结构进行扰动使得图神经网络对于特定节点分类任务失效；

### 图类型

### 图分析

- 节点的度（Node Degree）：计算出每个节点连接边的条数，作为衡量节点的指标
- 节点中心性（Node Centrality）：

### 推荐公开课

- 坦福大学的CS224W课程：http://web.stanford.edu/class/cs224w/
- Graph Neural Networks Foundations, Frontiers, and Applications：https://graph-neural-networks.github.io/index.html

### 常见库

---

#### 图数据库

图数据库本质也是一个存储系统，它和常见的 KV 存储系统、MySQL 存储系统的相比主要区别在于目标数据的逻辑关系不同和访问模式不同，对于数据内在关系是图模型以及在图上游走类和模式匹配类的查询，比如社交关系查询，图数据库会有更大的性能优势和更加简洁高效的接口。

- Neo4j, [https://neo4j.com/](https://neo4j.com/)
- HugeGraph, [https://hugegraph.apache.org/](https://hugegraph.apache.org/)
- JanusGraph, [https://docs.janusgraph.org/](https://docs.janusgraph.org/)
- NebulaGraph, [https://www.nebula-graph.io/](https://www.nebula-graph.io/)
---

- **igraph**

https://igraph.readthedocs.io/en/stable/

igraph 是网络分析工具的集合，强调效率、便携性和易用性。 igraph 是开源且免费的。 igraph 可以用 R、Python、Mathematica 和 C/C++ 进行编程。

- https://karateclub.readthedocs.io/en/latest/index.html

- **StellarGraph**

https://stellargraph.readthedocs.io/en/stable/index.html

StellarGraph 库为图机器学习提供最先进的算法，使发现模式和回答有关图结构数据的问题变得容易。

- **PyG**

https://github.com/pyg-team/pytorch_geometric

PyG（PyTorch Geometric）是一个建立在 PyTorch 之上的库，可以轻松编写和训练图形神经网络（GNN），用于与结构化数据相关的广泛应用。

- **PyTorch Geometric**

https://pytorch-geometric.readthedocs.io/en/latest/

PyTorch Geometric (PyG) 是一个用于深度学习图形等不规则结构的 Python 库。该项目由两位博士开发和发布。来自多特蒙德大学的学生 Matthias Fey 和 Jan E. Lenssen。

除了一般的图形数据结构和处理方法外，它还包含关系学习和 3D 数据处理领域的各种最近发布的方法。PyTorch Geometric 通过利用稀疏 GPU 加速、提供专用 CUDA 内核以及为不同大小的输入示例引入高效的小批量处理来实现高数据吞吐量。

- **Deep Graph Library (DGL)**

https://www.dgl.ai/

Deep Graph Library (DGL) 是另一个易于使用、高性能和可扩展的 Python 库，用于图的深度学习。它有一个非常干净简洁的 API。DGL 引入了一个有用的高级抽象，允许自动批处理。

- **Graph Nets**

https://github.com/deepmind/graph_nets

Graph Nets用于在 Tensorflow 和 Sonnet 中构建图形网络。该库适用于 TensorFlow 的 CPU 和 GPU  版本。它提供了灵活性，几乎任何现有的 GNN 都可以使用 6 个核心函数来实现，并且可以扩展到时间图。Graph Nets 需要  TensorFlow 1，所以它感觉已经过时了，尽管它只有大约 3 年的历史。

- **Spektral**

https://graphneural.network/

Spektral 是一个基于 Keras API 和 TensorFlow 2 的开源 Python  图深度学习库。该库的主要目标是提供一个简单、灵活的框架来创建 GNN。您可以使用 Spektral 对社交网络的用户进行分类、预测分子特性、使用 GAN 生成新图、聚类节点、预测链接以及任何其他由图描述数据的任务。

- StellarGraph

https://stellargraph.readthedocs.io/

- OpenNE: An open source toolkit for Network Embedding

https://github.com/thunlp/OpenNE

- PyTorch-BigGraph

https://github.com/facebookresearch/PyTorch-BigGraph

## Part2 任务数据集

- Plain Graphs

| Name        | #nodes        | #edges         | #labels | Type       |
| ----------- | ------------- | -------------- | ------- | ---------- |
| Youtube     | 1,138,499     | 2,990,443      | 47      | undirected |
| TWeibo      | 2,320,895     | 50,655,143     | 100     | directed   |
| Orkut       | 3,072,441     | 117,185,084    | 100     | undirected |
| In-2004     | 1,382,908     | 16,539,643     | -       | directed   |
| DBLP        | 5,425,963     | 17,298,032     | -       | undirected |
| Pokec       | 1,632,803     | 30,622,564     | -       | directed   |
| LiveJournal | 4,847,571     | 68,475,391     | -       | directed   |
| IT-2004     | 41,291,594    | 1,135,718,909  | -       | directed   |
| Twitter     | 41,652,230    | 1,468,365,182  | -       | directed   |
| Friendster  | 65,608,366    | 1,806,067,135  | -       | undirected |
| UK-2007     | 105,896,555   | 3,738,733,648  | -       | directed   |
| UK-union    | 133,633,040   | 5,475,109,924  | -       | directed   |
| ClueWeb12   | 978,408,098   | 42,574,107,469 | -       | directed   |
| ClueWeb09   | 1,684,868,322 | 7,939,635,651  | -       | directed   |

- Attributed Graphs

| Name        | Type       | #nodes   | #edges    | #attributes | #labels |
| ----------- | ---------- | -------- | --------- | ----------- | ------- |
| Wiki        | directed   | 2405     | 17981     | 4973        | 19      |
| Cora        | directed   | 2708     | 5429      | 1433        | 7       |
| Citeseer    | directed   | 3312     | 4660      | 3703        | 6       |
| Pubmed      | directed   | 19717    | 44338     | 500         | 3       |
| BlogCatalog | undirected | 5196     | 343486    | 8189        | 6       |
| PPI         | undirected | 56944    | 818716    | 50          | 121     |
| Reddit      | undirected | 232965   | 11606919  | 300         | 41      |
| Flickr      | undirected | 7575     | 479476    | 12047       | 9       |
| Facebook    | undirected | 4039     | 88234     | 1283        | 193     |
| Twitter     | directed   | 81306    | 1768149   | 216839      | 4065    |
| Google+     | directed   | 107614   | 13673453  | 15907       | 468     |
| TWeibo      | directed   | 2320895  | 50655143  | 1657        | 8       |
| MAG         | directed   | 59249719 | 978147253 | 2000        | 100     |
| MAG-SC      | directed   | 10541560 | 265219994 | 2784240     | 8       |


## Part3 领域模型介绍

### 图嵌入

#### 基于矩阵分解的图嵌入

基于矩阵分解的静态图嵌入模型对节点关联信息矩阵和属性信息矩阵进行特征分解，然后将分解得到的属性嵌入和结构嵌入进行融合，生成节点的低维嵌入表示。

#### 基于随机游走的图嵌入

基于随机游走的图嵌入方法将节点转化为词，将随机游走序列作为句子，利用Skip-Gram 生成节点的嵌入向量。随机游走法可以保留图的结构特性，并且在无法完整观察的大型图上仍有不错的表现。

- **DeepWalk: Online Learning of Social Representations (KDD'14).** [[Paper]](http://www.perozzi.net/publications/14_kdd_deepwalk.pdf)

- **LINE: Large-scale Information Network Embedding (WWW'15).** [[Paper]](http://www.www2015.it/documents/proceedings/proceedings/p1067.pdf)

- **node2vec: Scalable Feature Learning for Networks (KDD'16).** [[Paper]](https://cs.stanford.edu/people/jure/pubs/node2vec-kdd16.pdf)

#### 基于自编码器的图嵌入

通过对数据中的非线性结构进行建模，自编码器使隐藏层学习到的表示维度小于输入数据，即对原始数据进行降维。

#### 基于图神经网络的图嵌入

图神经网络是专门处理图数据的深度模型，其利用节点间的消息传递来捕捉某种依赖关系，使生成的嵌入可以保留任意深度的邻域信息。

- **Watch Your Step: Learning Node Embeddings via Graph Attention (NIPS'18).** [[Paper]](https://arxiv.org/pdf/1710.09599.pdf)

- **Deep Graph Infomax (ICLR'19).** [[Paper]](https://arxiv.org/pdf/1809.10341.pdf) [[OpenReview]](https://openreview.net/forum?id=rklz9iAcKQ)

### 节点分类

- [Node classification by Harmonic function](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.node_classification.harmonic_function.html)
- [Node classification by Local and Global Consistency](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.node_classification.local_and_global_consistency.html)