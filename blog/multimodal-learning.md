<!-- 多模态机器学习 -->
<!--  -->
<!-- 2023-06-01 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/ashui233/">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!--  -->

## Image Caption

### 数据集

- [AI Challenger图像中文描述数据集](https://tianchi.aliyun.com/dataset/145781)

数据来自2017 AI Challenger，数据集对给定的每一张图片有五句话的中文描述。数据集包含30万张图片，150万句中文描述。训练集：210,000 张，验证集：30,000 张，测试集 A：30,000 张，测试集 B：30,000 张。

![](https://tianchi-public.oss-cn-hangzhou.aliyuncs.com/public/files/forum/167688733288720471676887332492.png)

### 评价指标

### 领域模型

[https://huggingface.co/models?pipeline_tag=image-to-text](https://huggingface.co/models?pipeline_tag=image-to-text)

#### Show, Attend, and Tell

[https://github.com/sgrvinod/a-PyTorch-Tutorial-to-Image-Captioning](https://github.com/sgrvinod/a-PyTorch-Tutorial-to-Image-Captioning)

#### Image Captioning with PyTorch and Transformers 💻💥

[https://github.com/senadkurtisi/pytorch-image-captioning](https://github.com/senadkurtisi/pytorch-image-captioning)


#### 其他论文

- [Fine-grained Image Captioning with CLIP Reward](https://arxiv.org/pdf/2205.13115.pdf)

传统模型通常使用文本相似性目标进行训练，但是由于公共数据集中的参考字幕通常只描述最显著的常见对象，使用文本相似性目标的模型往往会忽略图像中具体和详细的方面，这些方面使图像从其他图像中区分开来。本文提出了一种使用CLIP作为奖励函数的多模态相似性计算方法，以实现更具描述性和区分度的字幕生成，并提出了一种简单的CLIP文本编码器微调策略来改善语法，无需额外的文本注释。

- [Unsupervised Image Captioning](https://openaccess.thecvf.com/content_CVPR_2019/papers/Feng_Unsupervised_Image_Captioning_CVPR_2019_paper.pdf)

在无监督的情况下训练图像字幕Image Captioning。传统模型通常需要大量成对的图像和句子数据进行训练，这种数据集的获取非常昂贵。本文提出了一种新的方法，只需要一个图像集、一个句子语料库和一个现有的视觉概念检测器，就可以训练出一个图像字幕生成模型。

## Mathematical Expression Recognition

### 领域模型

- ICDAR 2021, Handwritten Mathematical Expression Recognition with Bidirectionally Trained Transformer
- CVPR 2022, Syntax-Aware Network for Handwritten Mathematical Expression Recognition

[https://github.com/whywhs/Pytorch-Handwritten-Mathematical-Expression-Recognition](https://github.com/whywhs/Pytorch-Handwritten-Mathematical-Expression-Recognition)


### 数据集

- [IM2LATEX-100K](https://www.kaggle.com/datasets/shahrukhkhan/im2latex100k)

A prebuilt dataset for OpenAI's task for image-2-latex system. Includes total of ~100k formulas and images splitted into train, validation and test sets. 

- [K-12 手写体（HME100K）](https://ai.100tal.com/dataset)

The HME100K dataset provides 99,109 images (74,502 for training and 24,607 for testing) with 245 kinds of symbol classes. The data size is increased tenfold compared to the CRHOME datasets. HME100K acquires the expressions from an Internet application. Therefore, we may assume that the expressions are written by tens of thousands of writers. 

- [CROHME](https://github.com/JianshuZhang/WAP/tree/master/data)