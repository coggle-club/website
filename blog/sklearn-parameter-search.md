在建模时模型的超参数对精度有一定的影响，而设置和调整超参数的取值，往往称为`调参`。

在实践中调参往往依赖人工来进行设置调整范围，然后使用机器在超参数范围内进行搜素。本文将演示在`sklearn`中支持的四种基础超参数搜索方法：

- `GridSearch`
- `RandomizedSearch`
- `HalvingGridSearch`
- `HalvingRandomSearch`

## 原始模型

作为精度对比，我们最开始使用随机森林来训练初始化模型，并在测试集计算精度：

```python
# 数据读取
df = pd.read_csv('https://mirror.coggle.club/dataset/heart.csv')
X = df.drop(columns=['output'])
y = df['output']

# 数据划分
x_train, x_test, y_train, y_test = train_test_split(X, y, stratify=y)

# 模型训练与计算准确率
clf = RandomForestClassifier(random_state=0)
clf.fit(x_train, y_train)
clf.score(x_test, y_test)
```

模型最终在测试集精度为：**0.802**。

## GridSearch

`GridSearch`是比较基础的超参数搜索方法，中文名字网格搜索。其原理是在计算的过程中遍历所有的超参数组合，然后搜索到最优的结果。

如下代码所示，我们对4个超参数进行搜索，搜索空间为 `5 * 3 * 2 * 3 = 90`组超参数。对于每组超参数还需要计算5折交叉验证，则需要训练`450`次。

```python
parameters = {
    'max_depth': [2,4,5,6,7],
    'min_samples_leaf': [1,2,3],
    'min_weight_fraction_leaf': [0, 0.1],
    'min_impurity_decrease': [0, 0.1, 0.2]
}

# Fitting 5 folds for each of 90 candidates, totalling 450 fits
clf = GridSearchCV(
    RandomForestClassifier(random_state=0),
    parameters, refit=True, verbose=1,
)
clf.fit(x_train, y_train)
clf.best_estimator_.score(x_test, y_test)
```

模型最终在测试集精度为：**0.815**。

## RandomizedSearch

`RandomizedSearch`是在一定范围内进行搜索，且需要设置搜索的次数，其默认不会对所有的组合进行搜索。

`n_iter`代表超参数组合的个数，默认会设置比所有组合次数少的取值，如下面设置的为10，则只进行50次训练。

```
parameters = {
    'max_depth': [2,4,5,6,7],
    'min_samples_leaf': [1,2,3],
    'min_weight_fraction_leaf': [0, 0.1],
    'min_impurity_decrease': [0, 0.1, 0.2]
}

clf = RandomizedSearchCV(
    RandomForestClassifier(random_state=0),
    parameters, refit=True, verbose=1, n_iter=10,
)

clf.fit(x_train, y_train)
clf.best_estimator_.score(x_test, y_test)
```

模型最终在测试集精度为：**0.815**。

## HalvingGridSearch

`HalvingGridSearch`和`GridSearch`非常相似，但在迭代的过程中是有参数组合减半的操作。

**最开始使用所有的超参数组合，但使用最少的数据，筛选其中最优的超参数，增加数据再进行筛选。**


`HalvingGridSearch`的思路和`hyperband`的思路非常相似，但是最朴素的实现。先使用少量数据筛选超参数组合，然后使用更多的数据验证精度。

```
n_iterations: 3
n_required_iterations: 5
n_possible_iterations: 3
min_resources_: 20
max_resources_: 227
aggressive_elimination: False
factor: 3
----------

iter: 0
n_candidates: 90
n_resources: 20
Fitting 5 folds for each of 90 candidates, totalling 450 fits
----------

iter: 1
n_candidates: 30
n_resources: 60
Fitting 5 folds for each of 30 candidates, totalling 150 fits
----------

iter: 2
n_candidates: 10
n_resources: 180
Fitting 5 folds for each of 10 candidates, totalling 50 fits
----------
```

模型最终在测试集精度为：**0.855**。


## HalvingRandomSearch

`HalvingRandomSearch`和`HalvingGridSearch`类似，都是逐步增加样本，减少超参数组合。但每次生成超参数组合，都是随机筛选的。

```
n_iterations: 3
n_required_iterations: 3
n_possible_iterations: 3
min_resources_: 20
max_resources_: 227
aggressive_elimination: False
factor: 3
----------

iter: 0
n_candidates: 11
n_resources: 20
Fitting 5 folds for each of 11 candidates, totalling 55 fits
----------

iter: 1
n_candidates: 4
n_resources: 60
Fitting 5 folds for each of 4 candidates, totalling 20 fits
----------

iter: 2
n_candidates: 2
n_resources: 180
Fitting 5 folds for each of 2 candidates, totalling 10 fits
```

模型最终在测试集精度为：**0.828**。

## 总结与对比

`HalvingGridSearch`和`HalvingRandomSearch`比较适合在数据量比较大的情况使用，可以提高训练速度。如果计算资源充足，`GridSearch`和`HalvingGridSearch`会得到更好的结果。

后续我们将分享其他的一些高阶调参库的实现，其中也会有数据量改变的思路。如在`Optuna`中，核心是参数组合的生成和剪枝、训练的样本增加等细节。