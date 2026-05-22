Stable Diffusion 3 是 Stability AI 发布的文本到图像生成模型，采用扩散 Transformer 架构（DiT），生成质量显著提升。

## 核心特性

- **扩散 Transformer**：使用 DiT 架构替代传统的 U-Net 骨干网络
- **文本理解**：采用三路文本编码器（CLIP + T5），文本理解能力大幅提升
- **高质量生成**：在图像质量、文本对齐方面达到新高度

## 性能表现

Stable Diffusion 3 在文本到图像生成质量上显著超越了前代版本，特别是在文本渲染、多物体场景和构图准确性上表现优异。

## 使用方式

```python
from diffusers import StableDiffusion3Pipeline
import torch

pipe = StableDiffusion3Pipeline.from_pretrained(
    "stabilityai/stable-diffusion-3-medium-diffusers",
    torch_dtype=torch.float16
)
pipe = pipe.to("cuda")

image = pipe("A cat holding a sign that says hello world").images[0]
image.save("cat.png")
```
