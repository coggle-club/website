ResNet-50 是深度残差网络系列的代表模型，通过引入残差连接解决了深层网络退化问题，是计算机视觉领域的里程碑式模型。

## 核心特性

- **残差连接**：通过跳跃连接解决深层网络梯度消失问题
- **50 层深度**：50 层卷积神经网络的平衡选择
- **迁移学习**：广泛用作视觉任务的特征提取 backbone

## 性能表现

ResNet-50 在 ImageNet 分类任务上达到了当时最先进的性能，Top-5 错误率低于 5%。它至今仍被广泛用作计算机视觉任务的基线模型和特征提取器。

## 使用方式

```python
import torchvision.models as models

model = models.resnet50(pretrained=True)
model.eval()
```
