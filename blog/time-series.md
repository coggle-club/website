<!-- 时间序列 -->
<!-- 本文整理了时间序列的知识点 -->
<!-- 2022-01-08 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/finlayliu">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->


## Part1 领域介绍
 
### 推荐教材

- Forecasting: Principles and Practice，[第三版（英文）](https://otexts.com/fpp3/)，[第二版（中文）](https://otexts.com/fppcn/)

### 推荐公开课

- [Intel 时间序列分析](https://www.intel.cn/content/www/cn/zh/developer/learn/course-time-series-analysis.html)：讲授时间序列分析，以及用于预测、处理和识别顺序数据的方法。
    - 时间序列和平稳数据简介
    - 数据平滑化、自相关性和自回归积分滑动平均 (ARIMA) 模型等应用
    - 高级时间序列概念，如卡尔曼滤波器 (Kalman Filter) 和傅里叶变换 (Fourier Transformation)
    - 用于时间序列分析的深度学习架构和方法


## Part2 时序Python库

|         | Forecasting | Classsification | Anomaly Detection | Segmentation | TSFeature |
| ------- | ----------- | --------------- | ----------------- | ------------ | ------------ |
| Prophet | ✅           |                 | ✅                 |              |              |
| Kats    | ✅           |                 | ✅                 |              | ✅            |
| GluonTS    | ✅           |                 | ✅                 |              | ✅            |
| NeuralProphet    | ✅           |                 | ✅                 |              | ✅            |



- Kats，推荐指数：⭐⭐
    - 主页：[https://facebookresearch.github.io/Kats/](https://facebookresearch.github.io/Kats/)
    - Github：[https://github.com/facebookresearch/Kats](https://github.com/facebookresearch/Kats)
    <!-- - 功能：
    - 模型： -->
- GluonTS，推荐指数：⭐⭐⭐⭐
    - 主页：[https://ts.gluon.ai/index.html](https://ts.gluon.ai/index.html)
    - Github：[https://github.com/awslabs/gluon-ts/](https://github.com/awslabs/gluon-ts/)
- NeuralProphet，推荐指数：⭐⭐⭐⭐
    - 主页：[https://neuralprophet.com/](https://neuralprophet.com/)
    - Github：[https://github.com/ourownstory/neural_prophet](https://github.com/ourownstory/neural_prophet)

## Part3 相关论文

### Time Series Classification

- LSTM FCN，[LSTM Fully Convolutional Networks for Time Series Classification](https://arxiv.org/pdf/1709.05206v1.pdf)

### Anomaly Detection

- [AAAI 2022] Towards a Rigorous Evaluation of Time-series Anomaly Detection

### Time Series Representation

- [AAAI 2022] TS2Vec: Towards Universal Representation of Time Series

### Data Augmentation

- [IJCAI 2021] Time Series Data Augmentation for Deep Learning: A Survey
- [arxiv 2020] [An empirical survey of data augmentation for time series classification with neural networks](https://arxiv.org/pdf/2007.15951.pdf)

## Part4 时序数据集

- [UCR Time Series Classification Archive](https://www.cs.ucr.edu/~eamonn/time_series_data_2018/)
- [UEA & UCR Time Series Classification Repository](http://www.timeseriesclassification.com/index.php)

## Part5 相关比赛