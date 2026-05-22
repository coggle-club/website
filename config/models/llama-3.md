Llama 3 是 Meta 发布的开源大语言模型系列，以卓越的性能和开放性成为开源 LLM 的重要标杆。

## 核心特性

- **高性能**：在同规模开源模型中达到领先水平
- **开放权重**：提供多种尺寸的预训练和指令微调版本
- **生态丰富**：拥有活跃的开源社区和工具链支持

## 性能表现

Llama 3 在多项基准测试中展现了与闭源模型竞争的能力，特别是在代码生成、推理和对话任务上。

## 使用方式

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")
```
