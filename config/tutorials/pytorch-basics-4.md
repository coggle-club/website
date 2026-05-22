## 迁移学习原理

迁移学习利用在大规模数据上预训练的模型...

## 加载预训练模型

```python
import torchvision.models as models
model = models.resnet18(pretrained=True)
for param in model.parameters():
    param.requires_grad = False
```

## 微调

...
