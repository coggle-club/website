## Numba 与 Pandas

`Numba`是常用的库，用于加速Python代码中的**计算部分**。它可以只需加入装饰器的方式加速我们的代码，然后所有的加速都将由它处理，而无需开发人员担心。

与普通的Python函数相比，大多数时候`Numba`速度要更快。但`Numba`它不能加速`Pandas`代码，因为`Pandas`是基于在`Numpy`设计的数据操作库。

使用`Numba`加速`Pandas`有两种方式：
- `Numba`加速`groupby`和`apply`
- `Numba`自定义函数

## 创建样例数据

```
import pandas as pd
import numpy as np
data = np.random.rand(int(1e5), 5)

df = pd.DataFrame(data=data, columns=list("ABCDE"))
df["Type"] = np.random.choice(["Class1","Class2"], size=(len(df)))
```

由于`Numba`主要结合`groupby`和`apply`使用，我们首先对原始数据创建滚动和分组操作：

```
rolling_df = df.iloc[:, :-1].rolling(1000)
grouped_by_types = df.groupby("Type")
```

## 功能1：加速Series计算

在调用计算函数时，通过指定`engine`可以用不同的引擎进行计算（默认`cython`）：
- `cython`：使用Cython进行计算
- `numba`：使用`Numba`进行计算

```
%time out = rolling_df.mean()
# CPU times: user 14.1 ms, sys: 402 µs, total: 14.5 ms
# Wall time: 12.9 ms

%time out = rolling_df.mean(engine='cython')
# CPU times: user 12.6 ms, sys: 0 ns, total: 12.6 ms
# Wall time: 12.2 ms

%time out = rolling_df.mean(engine='numba')
# CPU times: user 5.62 ms, sys: 2.26 ms, total: 7.88 ms
# Wall time: 7.6 ms
```

速度对比（加速150%）：
- `cython`: 12ms
- `Numba`: 7.6ms


## 功能2：加速Numpy计算

在进行计算时，如果我们设置`raw`。我们就在`Numpy`数据进行计算，而不是`Series`数据。

```
%time out = rolling_df.mean(raw=True)
CPU times: user 12.1 ms, sys: 0 ns, total: 12.1 ms
Wall time: 10.9 ms

%time out = rolling_df.mean(engine='cython', raw=True)
# CPU times: user 10.6 ms, sys: 0 ns, total: 10.6 ms
# Wall time: 10.2 ms

%time out = rolling_df.mean(engine='numba', raw=True)
# CPU times: user 7.89 ms, sys: 0 ns, total: 7.89 ms
# Wall time: 7.4 ms
```

速度对比（加速130%）：
- `cython`: 10ms
- `Numba`: 7.4ms

## 功能3：Numba设置参数

使用`Numba`进行计算，我们还可以设置具体的参数，如`nopython`, `raw`, `cache`。

```
%time out = rolling_df.std(raw=True)
# CPU times: user 15.6 ms, sys: 2.97 ms, total: 18.5 ms
# Wall time: 17.4 ms

%time out = rolling_df.std(engine='cython', raw=True)
# CPU times: user 13.2 ms, sys: 239 µs, total: 13.5 ms
# Wall time: 13.1 ms

%time out = rolling_df.std(engine='numba', nopython=True, raw=True)
# CPU times: user 11 ms, sys: 0 ns, total: 11 ms
# Wall time: 10.8 ms

%time out = rolling_df.std(engine='numba', nopython=True, cache=True, raw=True)
# CPU times: user 11.1 ms, sys: 0 ns, total: 11.1 ms
# Wall time: 10.7 ms

%time out = rolling_df.std(engine='numba', nopython=True, cache=True, parallel=True, raw=True)
# CPU times: user 11.2 ms, sys: 0 ns, total: 11.2 ms
# Wall time: 10.4 ms
```

## 功能4：自定义函数

```
def custom_mean(x):
    return (x * x).mean()
    
%time out = rolling_df.apply(custom_mean, raw=True)
# CPU times: user 2.89 s, sys: 392 µs, total: 2.89 s
# Wall time: 2.88 s

%time out = rolling_df.apply(custom_mean, engine='cython', raw=True)
# CPU times: user 2.88 s, sys: 3.62 ms, total: 2.89 s
# Wall time: 2.89 s

%time out = rolling_df.apply(custom_mean, engine='numba', raw=True)
# CPU times: user 1.23 s, sys: 117 µs, total: 1.23 s
# Wall time: 1.23 s
```

速度对比（加速200%）：
- `cython` with Numpy: 2.88s
- `numba` with Numpy: 1.23s

## 功能5：设置参数类型

使用`Numba`装饰函数，可以加入参数类型，可以进一步加速计算速度。

```
from numba import jit, njit, float64

def custom_mean(x):
    return (x * x).mean()

@jit(float64(float64[:]), nopython=True, cache=True)
def custom_mean_jitted(x):
    return (x * x).mean()
    
%time out = rolling_df.apply(custom_mean, raw=True)
# CPU times: user 2.87 s, sys: 62 µs, total: 2.87 s
# Wall time: 2.87 s

%time out = rolling_df.apply(custom_mean_jitted, raw=True)
# CPU times: user 922 ms, sys: 0 ns, total: 922 ms
# Wall time: 920 ms

%time out = rolling_df.apply(custom_mean, engine='numba', raw=True)
# CPU times: user 1.58 s, sys: 0 ns, total: 1.58 s
# Wall time: 1.58 s
```

速度对比（加速300%）：
- `cython` with 原始函数: 2.87s
- `numba` with 带参数函数: 920ms
- `numba` with 带参数函数: 1.58s


## 步骤7：自定义循环

使用`Numba`装饰函数，可以对普通的for循环进行加速。

```
from numba import jit, njit, vectorize, float64

def custom_mean(x):
    return (x * x).mean()

@jit(float64(float64[:]), nopython=True, cache=True)
def custom_mean_loops_jitted(x):
    out = 0.0
    for i in x:
        out += (i*i)
    return out / len(x)

%time out = rolling_df.apply(custom_mean, raw=True)
# CPU times: user 2.9 s, sys: 7.83 ms, total: 2.9 s
# Wall time: 2.89 s

%time out = rolling_df.apply(custom_mean, engine='numba', raw=True)
# CPU times: user 1.21 s, sys: 3.93 ms, total: 1.21 s
# Wall time: 1.21 s

%time out = rolling_df.apply(custom_mean_loops_jitted, raw=True)
# CPU times: user 689 ms, sys: 0 ns, total: 689 ms
# Wall time: 687 ms
```

速度对比（加速350%）：
- `cython` with 原始函数: 2.87s
- `numba` with 带参数函数: 1.21s
- `numba` with 带参数for函数: 675ms

## 步骤8：替换内置函数

对于内置的计算函数，`Numba`可以替换mean和std函数。

```
from numba import jit, njit, vectorize, float64, float32

@jit([float32(float32[:]), float64(float64[:])], nopython=True, cache=True)
def custom_mean(x):
    return x.mean()
    
%time out = df[list("ABCDE")].mean()
# CPU times: user 11.9 ms, sys: 0 ns, total: 11.9 ms
# Wall time: 11.3 ms

%time for col in list("ABCDE"): _ = custom_mean(df[col].values)
# CPU times: user 2.83 ms, sys: 7 µs, total: 2.84 ms
# Wall time: 2.74 ms
```

速度对比（加速400%）：
- 内置函数: 11ms
- `numba`实现: 2.7ms

## 步骤9：替换向量化计算

在计算过程中如果我们使用`apply`函数，则我们使用的向量化的计算。使用`Numba`可以加速并并行计算。

```
from numba import vectorize, float32, float64

@vectorize([float32(float32), float64(float64)])
def square(x):
    return x**2 + 2
    
%time out = df.A.apply(lambda x : x**2 + 2)
# CPU times: user 18.2 ms, sys: 4.04 ms, total: 22.2 ms
# Wall time: 21.6 ms

%time out = (df.A.values * df.A.values) + 2
# CPU times: user 0 ns, sys: 1.42 ms, total: 1.42 ms
# Wall time: 772 µs

%time out = square(df["A"].values)
# CPU times: user 0 ns, sys: 560 µs, total: 560 µs
# Wall time: 385 µs
```

速度对比（加速5600%）：
- 内置函数: 21.6ms
- `numba`实现: 385µs

## 使用总结

1. `Numba`是非常实用的加速操作，比常规的计算快。
2. `Numba`主要替代非并行的场景，如果原始本身已经并行，优化空间较小。
3. 使用`Numba`推荐设置自定义函数并设置参数类型，这样加速最多。