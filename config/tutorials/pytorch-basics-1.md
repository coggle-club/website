## 概述

PyTorch 是由 Meta AI 主导开发的开源深度学习框架，自 2016 年发布以来迅速成为学术界和工业界的主流选择。与 TensorFlow 的静态计算图不同，PyTorch 采用**动态计算图**（Define-by-Run），使得模型的构建、调试都非常直观——你写下的每一行代码都立即执行，可以像写普通 Python 程序一样使用 `print`、`pdb` 进行调试。

本系列教程共五篇，将系统地介绍 PyTorch 的核心概念与实践：

| 章节 | 内容 |
|------|------|
| 第一篇（本篇） | 张量（Tensor）与自动求导（Autograd） |
| 第二篇 | Dataset 与 DataLoader，构建数据流水线 |
| 第三篇 | 神经网络模块（nn.Module）与训练循环 |
| 第四篇 | 卷积神经网络与计算机视觉实战 |
| 第五篇 | 迁移学习与模型部署 |

在开始之前，请确保已安装 PyTorch：

```bash
# CPU 版本
pip install torch torchvision

# GPU 版本（以 CUDA 12.1 为例，请根据显卡驱动选择）
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
```

验证安装：

```python
import torch
print(torch.__version__)        # 例如 2.2.0
print(torch.cuda.is_available())  # 是否可用 GPU
```

## 张量基础

### 什么是张量

张量（Tensor）是 PyTorch 中最基础的数据结构，可以理解为**支持 GPU 加速和自动求导的多维数组**。从标量到高维数组，张量统一了所有数据的表示方式：

| 维度 | 数学对象 | 示例 |
|------|----------|------|
| 0 维 | 标量（Scalar） | `torch.tensor(3.14)` |
| 1 维 | 向量（Vector） | `torch.tensor([1, 2, 3])` |
| 2 维 | 矩阵（Matrix） | `torch.tensor([[1, 2], [3, 4]])` |
| 3 维及以上 | 高阶张量 | 图像 `(C, H, W)`、视频 `(T, C, H, W)`、文本批次 `(B, T, D)` |

### 创建张量

PyTorch 提供了多种创建张量的方式，覆盖了绝大多数使用场景：

```python
import torch
import numpy as np

# 1. 从 Python 列表创建
x = torch.tensor([[1, 2], [3, 4]])
print(x)
# tensor([[1, 2],
#         [3, 4]])
print(x.shape)   # torch.Size([2, 2])
print(x.dtype)   # torch.int64

# 2. 创建指定形状的全 0、全 1 张量
zeros = torch.zeros(2, 3)             # 2 行 3 列，元素全为 0
ones = torch.ones(2, 3)               # 2 行 3 列，元素全为 1
print(zeros)
# tensor([[0., 0., 0.],
#         [0., 0., 0.]])

# 3. 创建与已有张量形状相同、值不同的张量
x_like = torch.zeros_like(x)          # 与 x 同形状，元素全为 0
x_rand = torch.rand_like(x, dtype=torch.float)  # 同形状，元素随机

# 4. 等差数列与等比数列
# 起始值、结束值（不含）、步长
arange = torch.arange(0, 10, 2)       # tensor([0, 2, 4, 6, 8])
# 起始值、结束值、元素个数（自动计算步长）
linspace = torch.linspace(0, 1, 5)    # tensor([0.0000, 0.2500, 0.5000, 0.7500, 1.0000])

# 5. 随机张量：覆盖均匀分布、正态分布、整数随机
torch.manual_seed(42)                  # 设置随机种子，保证结果可复现
rand = torch.rand(2, 3)               # 均匀分布 [0, 1)
randn = torch.randn(2, 3)             # 标准正态分布 N(0, 1)
randint = torch.randint(0, 10, (2, 3)) # [0, 10) 之间的整数

# 6. 从 NumPy 数组创建（共享内存，修改一方会影响另一方）
arr = np.array([1, 2, 3])
t_from_np = torch.from_numpy(arr)
np_back = t_from_np.numpy()           # 张量 → NumPy
```

### 张量的属性

每个张量都有三个核心属性，理解它们对后续调试至关重要：

```python
x = torch.randn(2, 3, 4)

print(x.shape)        # 形状：torch.Size([2, 3, 4])，等同于 x.size()
print(x.dtype)        # 数据类型：torch.float32
print(x.device)       # 设备：cpu 或 cuda:0

# 总元素个数
print(x.numel())      # 24

# 维度数量
print(x.ndim)         # 3
```

**常见的数据类型**有：

| dtype | 字节数 | 用途 |
|-------|--------|------|
| `torch.float32`（默认） | 4 | 训练主用 |
| `torch.float64` | 8 | 高精度计算 |
| `torch.float16` / `bfloat16` | 2 | 混合精度训练 |
| `torch.int32` / `int64` | 4 / 8 | 索引、类别标签 |
| `torch.bool` | 1 | 掩码 |

类型转换：

```python
x = torch.tensor([1, 2, 3])           # int64
x_float = x.float()                    # → float32
x_long = x.long()                      # → int64
# 等价写法
x_double = x.to(torch.float64)
```

### 设备迁移

深度学习训练常需要把数据和模型放到 GPU 上加速：

```python
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# 方法 1：创建时指定
x = torch.randn(3, 3, device=device)

# 方法 2：使用 .to() 迁移
x = torch.randn(3, 3).to(device)

# 多 GPU 时可以指定编号
x = x.to('cuda:0')
```

> 注意：CPU 张量与 GPU 张量不能直接运算，需要先迁移到同一设备。

## 张量操作

### 索引与切片

张量的索引语法与 NumPy 高度一致：

```python
x = torch.arange(12).reshape(3, 4)
# tensor([[ 0,  1,  2,  3],
#         [ 4,  5,  6,  7],
#         [ 8,  9, 10, 11]])

# 基本索引
x[0]            # 第 0 行：tensor([0, 1, 2, 3])
x[:, 0]         # 第 0 列：tensor([0, 4, 8])
x[0, 1]         # 标量：tensor(1)

# 切片（左闭右开）
x[:2, :2]       # 前两行前两列
# tensor([[0, 1],
#         [4, 5]])

# 布尔索引：找出大于 5 的元素
mask = x > 5
print(x[mask])   # tensor([ 6,  7,  8,  9, 10, 11])

# 花式索引
rows = torch.tensor([0, 2])
cols = torch.tensor([1, 3])
print(x[rows, cols])  # tensor([1, 11])
```

### 形状变换

```python
x = torch.arange(12)             # shape: (12,)

# view：要求张量在内存中连续
x_view = x.view(3, 4)            # shape: (3, 4)

# reshape：自动处理不连续的情况（更推荐）
x_reshape = x.reshape(3, 4)

# 增减维度
y = torch.randn(3, 4)
y.unsqueeze(0).shape             # (1, 3, 4)，在第 0 维前插入
y.squeeze(0).shape              # 移除所有长度为 1 的维度

# 转置（只交换两个维度的 stride，共享数据）
z = torch.randn(2, 3, 4)
z_t = z.transpose(0, 1)         # shape: (3, 2, 4)
# 若需要内存连续，可调用 .contiguous()
z_t_c = z_t.contiguous()
```

### 拼接与拆分

```python
a = torch.zeros(2, 3)
b = torch.ones(2, 3)

# 沿已有维度拼接
torch.cat([a, b], dim=0).shape   # (4, 3)，按行拼接
torch.cat([a, b], dim=1).shape   # (2, 6)，按列拼接

# 在新维度上堆叠
torch.stack([a, b], dim=0).shape  # (2, 2, 3)
torch.stack([a, b], dim=1).shape  # (2, 2, 3)

# 拆分
x = torch.arange(8)
torch.chunk(x, 4)                # 把 8 个元素切成 4 段，每段 2 个
torch.split(x, 3)                # 按长度 3 切，剩余的放在最后一段
```

### 广播机制

当两个张量形状不一致时，PyTorch 会尝试**自动扩展**较小张量的维度，使其与较大张量兼容——这一规则称为广播（Broadcasting）。广播遵循以下规则：

1. 从**右往左**逐维度比较；
2. 两个维度相等，或其中一个为 1，则兼容；
3. 维度为 1 的张量在该方向上被复制扩展。

```python
a = torch.ones(3, 4)             # (3, 4)
b = torch.tensor([10, 20, 30, 40])  # (4,)

# b 被广播为 (3, 4)，每行都是 [10, 20, 30, 40]
c = a + b
print(c)
# tensor([[11., 21., 31., 41.],
#         [11., 21., 31., 41.],
#         [11., 21., 31., 41.]])

# 更复杂：列向量 + 行向量 → 矩阵
col = torch.tensor([[1], [2], [3]])     # (3, 1)
row = torch.tensor([10, 20, 30])       # (3,)
print(col + row)
# tensor([[11, 21, 31],
#         [12, 22, 32],
#         [13, 23, 33]])
```

> 广播是 NumPy/PyTorch 中向量化计算的核心机制，可以**避免显式复制数据**带来的内存开销。

## 常见数学运算

### 逐元素运算

```python
x = torch.tensor([1.0, 2.0, 3.0])
y = torch.tensor([4.0, 5.0, 6.0])

# 算术运算
x + y                 # tensor([5., 7., 9.])
x * y                 # 逐元素乘：tensor([4., 10., 18.])
x ** 2                # 平方
torch.exp(x)          # 指数
torch.log(x)          # 自然对数
```

### 归约运算

归约（Reduction）是将多个元素聚合为单个值的操作：

```python
x = torch.arange(12, dtype=torch.float32).reshape(3, 4)

x.sum()                          # 所有元素之和：tensor(66.)
x.sum(dim=0)                     # 沿第 0 维求和：shape (4,)
x.sum(dim=1, keepdim=True)       # 保留被归约的维度：shape (3, 1)

x.mean()                         # 均值
x.max()                          # 最大值
x.max(dim=1)                     # 沿第 1 维最大值，返回 (values, indices)
x.std()                          # 标准差
x.var()                          # 方差

# 累积类
x.cumsum(dim=0)                  # 沿第 0 维累加
```

### 矩阵运算

```python
A = torch.randn(3, 4)
B = torch.randn(4, 5)

# 矩阵乘法（推荐写法）
C = A @ B                         # 形状 (3, 5)
C = A.matmul(B)                   # 等价

# 逐元素乘法（Hadamard 积）
A * B                             # 形状必须可广播

# 向量点积
v1 = torch.randn(5)
v2 = torch.randn(5)
torch.dot(v1, v2)
```

## 自动求导

### 什么是自动求导

深度学习的核心是**梯度下降**：对损失函数相对于模型参数的梯度进行反向传播，进而更新参数。如果手动推导梯度公式会非常繁琐，PyTorch 提供的 `autograd` 模块可以**自动计算任意可微表达式的梯度**。

`autograd` 的核心思想是：**在张量上记录所有施加于它的运算，构成一张动态计算图（Dynamic Computation Graph）；调用 `backward()` 时沿图反向传播梯度。**

### requires_grad

只有设置了 `requires_grad=True` 的张量，PyTorch 才会追踪它的运算历史：

```python
import torch

# 创建可求导张量
x = torch.ones(2, 2, requires_grad=True)
print(x)
# tensor([[1., 1., 1., 1.]], requires_grad=True)

# 任何由它派生出来的张量都会自动带上梯度追踪
y = x + 2
z = y * y * 3
out = z.mean()

print(y.requires_grad)   # True
print(z.requires_grad)   # True
print(out.requires_grad)  # True
```

也可以事后开启梯度追踪：

```python
x = torch.ones(2, 2)
x.requires_grad_(True)       # 原地开启
# 或者
x = torch.ones(2, 2).requires_grad_(True)
```

### 计算图与反向传播

调用 `backward()` 后，PyTorch 会沿计算图反向计算每个叶子节点的梯度，存放在 `.grad` 属性中：

```python
x = torch.randn(3, requires_grad=True)
y = x ** 2
y.retain_grad()               # 如果想保留 y 的梯度（非叶子节点需要显式声明）
z = y.sum()

z.backward()
print(x.grad)                 # dz/dx = 2x
# tensor([ 0.1234,  1.5678, -0.8910]) * 2 ≈ ...

# 计算图默认会被释放，再次反向会报错
# z.backward()  # RuntimeError: Trying to backward through the graph a second time
```

如果 `z` 不是标量，调用 `backward()` 时需要传入一个与 `z` 同形状的**梯度张量**作为权重：

```python
x = torch.randn(3, requires_grad=True)
y = x ** 2

# y 是向量，需要提供外部梯度
external_grad = torch.tensor([1.0, 0.5, 0.1])
y.backward(gradient=external_grad)
print(x.grad)                 # 2x * external_grad
```

### 梯度上下文控制

训练过程中，我们常常**不希望某些操作被追踪**（例如只更新评估指标时）：

```python
# 1. torch.no_grad()：上下文内的运算不会被追踪
x = torch.ones(2, 2, requires_grad=True)
with torch.no_grad():
    y = x * 2
print(y.requires_grad)        # False

# 2. detach()：从计算图中分离出一个共享数据的新张量
x = torch.ones(2, 2, requires_grad=True)
y = x.detach()
print(y.requires_grad)        # False
# y 与 x 共享内存，但 y 不参与梯度计算

# 3. 累积梯度场景：retain_graph
x = torch.randn(3, requires_grad=True)
y1 = x.sum()
y1.backward(retain_graph=True)  # 保留计算图
y2 = (x * 2).sum()
y2.backward()                   # 继续反向传播
# 此时 x.grad = 1 + 2 = 3
```

### 一个完整的例子：线性回归

下面用一个最简单的线性回归任务，把张量操作和自动求导串起来：

```python
import torch

# 1. 准备数据：y = 2x + 1，加一点噪声
torch.manual_seed(0)
X = torch.linspace(-1, 1, 100).reshape(-1, 1)
y = 2 * X + 1 + 0.1 * torch.randn(X.shape)

# 2. 初始化参数（需要求导！）
w = torch.randn(1, requires_grad=True)
b = torch.zeros(1, requires_grad=True)

# 3. 训练
lr = 0.1
for epoch in range(200):
    # 前向：计算预测值和损失
    y_pred = X * w + b
    loss = ((y_pred - y) ** 2).mean()

    # 反向：自动计算梯度
    loss.backward()

    # 更新参数：需要用 torch.no_grad() 避免追踪
    with torch.no_grad():
        w -= lr * w.grad
        b -= lr * b.grad

    # 梯度清零
    w.grad.zero_()
    b.grad.zero_()

    if (epoch + 1) % 50 == 0:
        print(f'epoch {epoch+1:3d} | loss {loss.item():.4f} | w {w.item():.3f} | b {b.item():.3f}')

# 期望：w ≈ 2.0, b ≈ 1.0
```

> **关键点**：
> - 参数更新必须在 `torch.no_grad()` 内执行，否则会被纳入计算图；
> - 每轮迭代结束后**必须手动清零梯度**（`grad.zero_()`），否则梯度会累积。

## 实战练习

请独立完成以下练习，巩固本节所学的张量与自动求导知识。

### 练习 1：张量基础操作

1. 创建一个形状为 `(3, 5)` 的张量 `A`，元素为标准正态分布随机数。
2. 找出 `A` 中绝对值最大的元素及其索引（提示：`torch.abs` + `torch.argmax`）。
3. 将 `A` 中所有小于 0 的元素替换为 0（提示：布尔索引或 `torch.clamp`）。
4. 计算 `A` 每一行的均值和标准差，组成形状为 `(3, 2)` 的张量。

### 练习 2：广播与矩阵运算

1. 给定 `X` 形状为 `(N, D)`，`w` 形状为 `(D,)`，`b` 为标量，请**仅用一行代码**实现 $\hat{y} = Xw + b$（不允许使用 `for` 循环）。
2. 计算两个形状为 `(N, D)` 的张量 `U`、`V` 之间的余弦相似度矩阵 `S`（形状 `(N, N)`），其中 $S_{ij} = \frac{U_i \cdot V_j}{\|U_i\| \|V_j\|}$。

### 练习 3：自动求导

1. 编写函数 $f(x, y) = x^2 y + y^3$，对 $x=2, y=3$ 计算 $\frac{\partial f}{\partial x}$ 和 $\frac{\partial f}{\partial y}$。
2. 编写函数 $f(x) = \sum_i \log(1 + \exp(x_i))$，计算它在 $x = [1, -2, 3]$ 处的梯度，并验证你的解析解 $\nabla f = \sigma(x)$ 是否一致（$\sigma$ 为 sigmoid）。
3. 使用自动求导实现**多项式拟合**：用三次多项式 $y = w_3 x^3 + w_2 x^2 + w_1 x + w_0$ 拟合 $y = \sin(x)$ 在 $[-\pi, \pi]$ 上的 50 个采样点（可加少量噪声），画出拟合曲线与真实曲线的对比图。

## 小结

本节我们学习了：

- **张量（Tensor）**：PyTorch 的基础数据结构，支持多维数组、GPU 加速与自动求导；
- **常见操作**：创建、索引、形状变换、广播、拼接、数学运算；
- **自动求导（Autograd）**：通过 `requires_grad` 追踪计算图，调用 `backward()` 反向传播梯度；
- **实用技巧**：`torch.no_grad()`、`detach()`、梯度清零等。

下一节我们将介绍 `Dataset` 与 `DataLoader`，学会高效地从硬盘加载数据并组织成可迭代批次。

## 参考资料

- [PyTorch 官方文档：Tensors](https://pytorch.org/docs/stable/tensors.html)
- [PyTorch 官方文档：Autograd](https://pytorch.org/docs/stable/autograd.html)
- [PyTorch 官方教程：Learn the Basics](https://pytorch.org/tutorials/beginner/basics/intro.html)
- 吴恩达《深度学习》课程：第 2 周「神经网络基础」