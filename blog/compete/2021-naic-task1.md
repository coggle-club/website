2021年人工智能大赛：AI+视觉特征编码

https://www.heywhale.com/home/competition/61b81042902a13001708eb17


## 赛事背景

大赛以“AI赋能视界”为主题，分为“AI+无线通信”、“AI+视觉特征编码”两个赛道。

赛道面向视觉大数据应用，针对码率约束条件下的机器视觉任务，**探索视觉信息压缩技术与智能处理分析技术的融合。**

## 赛题任务

### 初赛

- 阶段1（进行中）：行人/车辆再识别
- 阶段2：行人/车辆视觉特征编码

第一阶段排名前 200 的团队将进入初赛第二阶段，进行重建特征任务的测评，获取重建误差得分。

### 复赛/决赛

- 行人/车辆视觉特征提取
- 行人/车辆视觉特征压缩编码
- 行人/车辆重识别

## 初赛数据

### 训练集
- 含有 259,450 个训练特征文件和对应的ID标签，可以用于模型训练
- 每个特征文件提供行人或车辆的对应ID标签，共有 259,478 个匹配对应关系

### 检索集

query包含 20,000 个特征文件，gallery包含 428,794 个特征文件，特征文件名与对应的原始图像一致，特征文件为小端储存的 32 位浮点数表示的固定长度序列。

## 初赛：阶段1思路

由于阶段1是一个典型的ReID任务，所以可以参考ReID的解题过程：

- `train_feature`：训练特征
- `query_feature_A`：待检索特征
- `gallery_feature_A`：带匹配特征

阶段1需要将`query_feature_A`中每个特征在`gallery_feature_A`中检索Top100结果，具体的评价指标如下：

$$ACC\_reid=\frac{1}{2}(AP@1+mAP@100)$$

### 入门思路

由于赛题阶段1依据提供了`2048`维度的特征，所以可以根据相似度完成检索。这里的检索任务直接考虑使用内积完成。

#### 步骤1：读取DAT文件
```python
test_query_path = glob.glob('./input/test_A/query_feature_A/*.dat')
test_query_path = np.array(test_query_path)
test_query = [read_dat(path) for path in tqdm(test_query_path)]
test_query = np.vstack(test_query)

test_gallery_path = np.array(glob.glob('./input/test_A/gallery_feature_A/*.dat'))
test_gallery_path = np.array(test_gallery_path)
test_gallery = [read_dat(path) for path in tqdm(test_gallery_path)]
test_gallery = np.vstack(test_gallery)
```

#### 步骤2：对特征进行L2

```python
test_query = normalize(test_query)
test_gallery = normalize(test_gallery)
```

#### 步骤3：特征检索

```python
with open('input/sub_a.json') as up:
    sub = json.load(up)
    
total_idx = 0
for idx in range(test_query.shape[0]//1000 + 1):
    idss = np.dot(test_query[idx*1000: (idx+1)*1000], test_gallery.T)
    for ids in idss:
        ids_path = test_gallery_path[ids.argsort()[::-1][:100]]
        sub[os.path.basename(test_query_path[total_idx])] = [os.path.basename(x) for x in ids_path]
        total_idx += 1        
```

通过上述步骤，则可以达到0.89的分数，在排行榜Top30的位置，能够进入复赛。这里的需要的机器配置是需要16G内存，需要30分钟的运行时间。

### 进阶思路

由于入门思路是简单的特征相似度计算，因此可以从以下角度进行改进：
- 检索精度：
  - 若不使用训练集标注，则可以尝试query expansion和database feature augmentation
  - 若使用训练集标注，则可以考虑训练一个新的全连接层，并使用度量损失提高精度
- 检索速度：使用FASSI或HNSW加速