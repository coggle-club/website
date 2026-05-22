## 概述

PyTorch 是当前最流行的深度学习框架之一...

## 张量基础

```python
import torch
x = torch.tensor([[1, 2], [3, 4]])
print(x.shape)  # torch.Size([2, 2])
```

## 自动求导

```python
x = torch.randn(3, requires_grad=True)
y = x ** 2
y.backward(torch.ones_like(x))
print(x.grad)
```

## 练习

1. 创建一个 3x3 的随机张量
2. 计算其平方并求导
