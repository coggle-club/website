你是否曾经遇到各种评价指标而不知道含义？或者不知道如何使用Numpy进行计算？在本文我们将介绍常见的回归评价指标，并包含公式和Numpy计算代码。

## Mean Absolute Error，MAE

平均绝对误差（Mean Absolute Error，MAE），也称为 L1 损失，是最简单的损失函数之一，也是一种易于理解的评估指标。它是通过取预测值和实际值之间的绝对差值并在整个数据集中取平均值来计算的。从数学上讲，它是绝对误差的算术平均值。 MAE 仅测量误差的大小，不关心它们的方向。 MAE越低，模型的准确性就越高。

$$
\mathrm{MAE}=\frac{1}{n} \sum_{i=1}^n\left|y_i-\hat{y}_i\right|
$$

优点：
- 由于采用了绝对值，因此所有误差都以相同的比例加权。
- 如果训练数据有异常值，MAE 不会惩罚由异常值引起的高错误。
- 它提供了模型执行情况的平均度量。

缺点：
- 有时来自异常值的大错误最终被视为与低错误相同。
- 在零处不可微分。许多优化算法倾向于使用微分来找到评估指标中参数的最佳值。在 MAE 中计算梯度可能具有挑战性。


```python
def mean_absolute_error(true, pred):
    abs_error = np.abs(true - pred)
    sum_abs_error = np.sum(abs_error)
    mae_loss = sum_abs_error / true.size
    return mae_loss
```

## Mean Bias Error (MBE)

平均偏差误差是测量过程高估或低估参数值的趋势。偏差只有一个方向，可以是正的，也可以是负的。正偏差意味着数据的误差被高估，负偏差意味着误差被低估。平均偏差误差 是预测值与实际值之差的平均值。该评估指标量化了总体偏差并捕获了预测中的平均偏差。**它几乎与 MAE 相似，唯一的区别是这里没有取绝对值。这个评估指标应该小心处理，因为正负误差可以相互抵消。**

$$
\text { MBE }=\frac{1}{n} \sum_{i=1}^n\left(y_i-\widehat{y}_i\right)
$$


优点：
- 想检查模型的方向（即是否存在正偏差或负偏差）并纠正模型偏差，MBE 是一个很好的衡量标准。

缺点：
- 就幅度而言，这不是一个好的衡量标准，因为误差往往会相互补偿。
- 它的可靠性不高，因为有时高个体错误会产生低MBE。
- 作为一种评估指标，它在一个方向上可能始终是错误的。


```python
def mean_bias_error(true, pred):
    bias_error = true - pred
    mbe_loss = np.mean(np.sum(diff) / true.size)
    return mbe_loss
```

## Relative Absolute Error (RAE)

相对绝对误差是通过将总绝对误差除以平均值和实际值之间的绝对差来计算的。RAE并以比率表示。 RAE的值从0到1。一个好的模型将具有接近于零的值，其中零是最佳值。

$$
\mathrm{RAE}=\frac{\sum_{i=1}^n\left|y_i-\hat{y}_i\right|}{\sum_{i=1}^n\left|y_i-\bar{y}\right|},  \bar{y}=\frac{1}{n} \sum_{i=1}^n y_i
$$

优点：

- RAE 可用于比较以不同单位测量误差的模型。
- RAE 是可靠的，因为它可以防止异常值。



```python
def relative_absolute_error(true, pred):
    true_mean = np.mean(true)
    squared_error_num = np.sum(np.abs(true - pred))
    squared_error_den = np.sum(np.abs(true - true_mean))
    rae_loss = squared_error_num / squared_error_den
    return rae_loss
```

## Mean Absolute Percentage Error (MAPE)

平均绝对百分比误差是通过将实际值与预测值之间的差值除以实际值来计算的。MAPE 也称为平均绝对百分比偏差，随着误差的增加而线性增加。 MAPE 越小，模型性能越好。

$$
\text { MAPE }=\frac{1}{n} \sum_{i=1}^n \frac{\left|y_i-\hat{y_i}\right|}{y_i} \cdot 100 \%
$$

优点：
- MAPE与变量的规模无关，因为它的误差估计是以百分比为单位的。
- 所有错误都在一个共同的尺度上标准化，很容易理解。
- MAPE避免了正值和负值相互抵消的问题。

缺点：

- 分母值为零时，面临着“除以零”的问题。
- MAPE对数值较小的误差比对数值大的误差错误的惩罚更多。
- 因为使用除法运算，所欲对于相同的误差，实际值的变化将导致损失的差异。


```python
def mean_absolute_percentage_error(true, pred):
    abs_error = (np.abs(true - pred)) / true
    sum_abs_error = np.sum(abs_error)
    mape_loss = (sum_abs_error / true.size) * 100
    return mape_loss
```

## Mean Squared Error (MSE)

均方误差也称为 L2 损失，MSE通过将预测值和实际值之间的差平方并在整个数据集中对其进行平均来计算误差。 MSE 也称为二次损失，因为惩罚与误差不成正比，而是与误差的平方成正比。平方误差为异常值赋予更高的权重，从而为小误差产生平滑的梯度。

MSE 永远不会是负数，因为误差是平方的。误差值范围从零到无穷大。 MSE 随着误差的增加呈指数增长。一个好的模型的 MSE 值接近于零。

$$
\mathrm{MSE}=\frac{1}{n} \sum_{i=1}^n\left(y_i-\hat{y}_i\right)^2
$$

优点：

- MSE会得到一个只有一个全局最小值的梯度下降。
- 对于小的误差，它可以有效地收敛到最小值。没有局部最小值。
- MSE 通过对模型进行平方来惩罚具有巨大错误的模型。

缺点：

- 对异常值的敏感性通过对它们进行平方来放大高误差。
- MSE会受到异常值的影响，会寻找在整体水平上表现足够好的模型。


```python
def mean_squared_error(true, pred):
    squared_error = np.square(true - pred) 
    sum_squared_error = np.sum(squared_error)
    mse_loss = sum_squared_error / true.size
    return mse_loss
```

## Root Mean Squared Error (RMSE)

RMSE 是通过取 MSE 的平方根来计算的。 RMSE 也称为均方根偏差。它测量误差的平均幅度，并关注与实际值的偏差。 RMSE 值为零表示模型具有完美拟合。 RMSE 越低，模型及其预测就越好。

$$
\mathrm{RMSE}=\sqrt{\frac{1}{n} \sum_{i=1}^n\left(y_i-\hat{y}_i\right)^2}
$$

优点：
- 易于理解，计算方便

缺点：
- 建议去除异常值才能使其正常运行。
- 会受到数据样本大小的影响。


```python
def root_mean_squared_error(true, pred):
    squared_error = np.square(true - pred) 
    sum_squared_error = np.sum(squared_error)
    rmse_loss = np.sqrt(sum_squared_error / true.size)
    return rmse_loss
```

## Relative Squared Error (RSE)

相对平方误差需要使用均方误差并将其除以实际数据与数据平均值之间的差异的平方。


$$
\mathrm{RSE}=\frac{\sum_{i=1}^n\left(y_i-\hat{y}_i\right)^2}{\sum_{i=1}^n\left(y_i-\bar{y}\right)^2}, \bar{y}=\frac{1}{n} \sum_{i=1}^n y_i
$$

优点

- 对预测的平均值和规模不敏感。


```python
def relative_squared_error(true, pred):
    true_mean = np.mean(true)
    squared_error_num = np.sum(np.square(true - pred))
    squared_error_den = np.sum(np.square(true - true_mean))
    rse_loss = squared_error_num / squared_error_den
    return rse_loss
```

## Normalized Root Mean Squared Error (NRMSE)

归一化 RMSE 通常通过除以一个标量值来计算，它可以有不同的方式。有时选择四分位数范围可能是最好的选择，因为其他方法容易出现异常值。当您想要比较不同因变量的模型或修改因变量时，NRMSE 是一个很好的度量。它克服了尺度依赖性，简化了不同尺度模型甚至数据集之间的比较。


    RMSE / maximum value in the series
    RMSE / mean
    RMSE / difference between the maximum and the minimum values (if mean is zero)
    RMSE / standard deviation
    RMSE / interquartile range



```python
def normalized_root_mean_squared_error(true, pred):
    squared_error = np.square((true - pred))
    sum_squared_error = np.sum(squared_error)
    rmse = np.sqrt(sum_squared_error / true.size)
    nrmse_loss = rmse/np.std(pred)
    return nrmse_loss
```

## Relative Root Mean Squared Error (RRMSE)

RRMSE 是 RMSE 的无量纲形式，是由均方根值归一化的均方根误差，其中每个残差都根据实际值进行缩放。


    Excellent when RRMSE < 10%
    Good when RRMSE is between 10% and 20%
    Fair when RRMSE is between 20% and 30%
    Poor when RRMSE > 30%


$$
\text { RRMSE }=\sqrt{\frac{\frac{1}{n} \sum_{i=1}^n\left(y_i-\hat{y}_i\right)^2}{\sum_{i=1}^n\left(\hat{y}_i\right)^2}}
$$


```python
def relative_root_mean_squared_error(true, pred):
    num = np.sum(np.square(true - pred))
    den = np.sum(np.square(pred))
    squared_error = num/den
    rrmse_loss = np.sqrt(squared_error)
    return rrmse_loss
```

## Root Mean Squared Logarithmic Error (RMSLE)

均方根对数误差是通过将 log 应用于实际值和预测值然后取它们的差异来计算的。 RMSLE 对于小误差和大误差被均匀处理的异常值是稳健的。如果预测值小于实际值，则对模型进行更多的惩罚，而如果预测值大于实际值，则对模型进行较少的惩罚。

$$
\mathrm{RMSLE}=\sqrt{\left(\log \left(y_i+1\right)-\log \left(\hat{y}_i+1\right)\right)^2}
$$

优点：
- 不依赖于比例，并且适用于各种比例。
- 它不受大异常值的影响。
- 它只考虑实际值和预测值之间的相对误差。


```python
def root_mean_squared_log_error(true, pred):
    square_error = np.square((np.log(true + 1) - np.log(pred + 1)))
    mean_square_log_error = np.mean(square_error)
    rmsle_loss = np.sqrt(mean_square_log_error)
    return rmsle_loss
```

## Huber Loss 

Huber损失是线性和二次评分方法的组合。它有一个超参数 delta，可以根据数据进行调整。对于高于 delta 的值，损失将是线性的（L1 损失），对于低于 delta 的值，损失将是二次的（L2 损失）。它平衡并结合了 MAE（平均绝对误差）和 MSE（均方误差）的良好特性。

$$
L_\delta(y, f(x))= \begin{cases}\frac{1}{2}(y-f(x))^2 & \text { for }|y-f(x)| \leq \delta \\ \delta|y-f(x)|-\frac{1}{2} \delta^2 & \text { otherwise }\end{cases}
$$

优点：

- 它在零处是可微的。
- 由于 delta 以上的线性度，异常值得到了正确处理。
- 可以调整超参数delta以最大限度地提高模型准确性。

缺点：

- 为了最大限度地提高模型精度，需要优化delta，这是一个迭代过程。
- 它只能微分一次。


```python
def huber_loss(true, pred, delta):
    huber_mse = 0.5 * np.square(true - pred)
    huber_mae = delta * (np.abs(true - pred) - 0.5 * (np.square(delta)))
    return np.where(np.abs(true - pred) <= delta, huber_mse, huber_mae)
```

## Log Cosh Loss

Log cosh 计算误差的双曲余弦的对数。这个函数比二次损失更平滑。它像 MSE 一样工作，但不受大预测误差的影响。

$$
\log \cosh (t)=\sum_{i=1}^n \log \left(\cosh \left(\hat{y}_i-y_i\right)\right)
$$

优点：
- 同时处处可二次微分
- 比 Huber需要更少的计算

缺点：
- 适应性较差，因为它遵循固定的比例。
- 与Huber loss相比，推导更复杂，需要深入研究。


```python
def huber_loss(true, pred, delta):
    diff = np.cosh(pred - delta)
    diff = np.log(diff)
    return diff.mean()
```

## Quantile Loss

分位数回归损失函数用于预测分位数。分位数是确定组中有多少值低于或高于某个限制的值。它跨预测变量（自变量）的值估计响应变量（因变量）的条件中位数或分位数。


