Vision Transformer (ViT) 将 Transformer 架构应用于图像分类，展示了纯注意力机制在视觉任务上的强大能力。

## 核心特性

- **纯注意力机制**：将图像分割为 patches，使用标准 Transformer 编码器处理
- **全局感受野**：自注意力机制天然支持全局特征建模
- **规模化潜力**：随模型规模增大性能持续提升

## 性能表现

ViT 在 ImageNet 等大规模图像分类数据集上取得了与 CNN 相当甚至更好的性能，特别是在足够大的数据集上预训练时优势明显。

## 使用方式

```python
from transformers import ViTImageProcessor, ViTForImageClassification

processor = ViTImageProcessor.from_pretrained("google/vit-base-patch16-224")
model = ViTForImageClassification.from_pretrained("google/vit-base-patch16-224")
```
