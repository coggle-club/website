DeepSeek-R1 是 DeepSeek 推出的推理增强大语言模型，通过强化学习训练，在数学、编程和推理任务上表现优异。

## 核心特性

- **推理能力**：采用强化学习训练，在复杂推理任务上表现突出
- **开源**：模型权重完全开源，支持研究和商业使用
- **多尺寸**：提供多种参数规模的版本

## 性能表现

在多项数学和编程基准测试中，DeepSeek-R1 达到了领先水平，尤其是在数学推理（MATH、GSM8K）和代码生成（HumanEval）任务上。

## 使用方式

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-R1-Distill-Qwen-7B")
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-R1-Distill-Qwen-7B")
```
