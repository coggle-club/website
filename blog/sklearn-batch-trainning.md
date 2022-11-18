在比赛和工作中，我们经常会遇到数据量太大而导致内存不够的问题。这里可以细分为两种情况：

- 情况1：数据太大，无法加载到内存；
- 情况2：加载数据但训练时内存不够；

针对情况1可以考虑使用`Spark`或者`Dask`来逐步完成计算。对于情况2，则需要考虑从模型的角度入手。

本文将介绍在`sklearn`中支持迭代训练的模型，然后展示相关的代码案例。

## 模块划分

在`sklearn`中的多个模块都支持迭代进行训练 & 拟合，如果按照模块进行划分汇总如下：

```python
# 线性模型
sklearn.linear_model.LogisticRegression
sklearn.linear_model.LogisticRegressionCV
sklearn.linear_model.PassiveAggressiveClassifier
sklearn.linear_model.PassiveAggressiveRegressor
sklearn.linear_model.Perceptron
sklearn.linear_model.SGDClassifier
sklearn.linear_model.SGDOneClassSVM
sklearn.linear_model.SGDRegressor

# 贝叶斯模型
sklearn.naive_bayes.BernoulliNB
sklearn.naive_bayes.CategoricalNB
sklearn.naive_bayes.ComplementNB
sklearn.naive_bayes.GaussianNB
sklearn.naive_bayes.MultinomialNB

# SVM模型
sklearn.svm.LinearSVC

# 神经网络
sklearn.neural_network.BernoulliRBM
sklearn.neural_network.MLPClassifier
sklearn.neural_network.MLPRegressor

# 多分类 & 多输出模型
sklearn.multiclass.OneVsOneClassifier
sklearn.multiclass.OneVsRestClassifier
sklearn.multioutput.MultiOutputClassifier
sklearn.multioutput.MultiOutputRegressor

# 特征提取 & 特征筛选
sklearn.feature_extraction.text.HashingVectorizer
sklearn.feature_selection.SelectFromModel

# 数据预处理
sklearn.preprocessing.MaxAbsScaler
sklearn.preprocessing.MinMaxScaler
sklearn.preprocessing.StandardScaler
```

这里支持的模块有什么共同点呢？主要是他们都支持`partial_fit`方法，也就是多次训练的过程。

更多的介绍可以参考：
https://scikit-learn.org/stable/search.html?q=partial_fit

## 分类案例
首先我们构建一个样例数据集，并将数据转换为多批量的形式，这里批量可以自定义，可以写在循环内部，也可以提前对数据维度进行转换。

```
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import SGDClassifier

# 产生数据集
X, Y = datasets.make_classification(n_samples=32000, n_features=30, n_informative=20, n_classes=2)
# 划分测试集
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.9, random_state=123)

# 将数据集组织成批量的形式
X_train, X_test = X_train.reshape(-1,32,30), X_test.reshape(-1,32,30)
Y_train, Y_test = Y_train.reshape(-1,32), Y_test.reshape(-1,32)

# 加载模型
classifier = SGDClassifier(random_state=123)
# 迭代训练，epoch维度
epochs = 10
for k in range(epochs):
    # 迭代训练，batch维度
    for i in range(X_train.shape[0]):
        X_batch, Y_batch = X_train[i], Y_train[i]
        classifier.partial_fit(X_batch, Y_batch, classes=list(range(2)))
```

## 聚类案例

与分类案例类似，我们首先需要构建一个聚类数据集，然后转换维度。

```
from sklearn.cluster import MiniBatchKMeans

# 加载模型
clustering_algo = MiniBatchKMeans(n_clusters=5, random_state=123)
# 迭代训练，epoch维度
epochs = 10
for k in range(epochs):
    # 迭代训练，batch维度
    for i in range(X_train.shape[0]):
        X_batch, Y_batch = X_train[i], Y_train[i]
        clustering_algo.partial_fit(X_batch, Y_batch)
```

## 预处理案例

与分类案例类似，我们首先需要构建一个预处理数据集，然后转换维度。

```
from sklearn.preprocessing import StandardScaler

# 加载预处理方法
scaler = StandardScaler()
# 迭代，epoch维度
for i in range(X_train.shape[0]):
    # 迭代，batch维度
    X_batch, Y_batch = X_train[i], Y_train[i]
    scaler.partial_fit(X_batch, Y_batch)
```

## 降维案例

与分类案例类似，我们首先需要构建一个待降维数据集，然后转换维度。

```
from sklearn.decomposition import IncrementalPCA

# 加载降维方法
pca = IncrementalPCA(n_components=20)
# 迭代，epoch维度
for i in range(X_train.shape[0]):
    # 迭代，batch维度
    X_batch, Y_batch = X_train[i], Y_train[i]
    pca.partial_fit(X_batch, Y_batch) ## Partially fitting data in batches
```

## 使用总结

`sklearn`中不少模块支持迭代训练和处理，特点是这些模块包含`partial_fit`方法。

在使用过程中需要考虑处理数据集为多批次的过程，需要考虑批大小和批个数，同时也需要考虑对最终精度的影响。

与使用全量数据的处理相比，使用迭代训练和处理在效果和精度上可能会稍差，但可以在内存有限的情况下使用。