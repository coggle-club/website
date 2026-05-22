Qwen2.5 是阿里云通义千问系列的最新版本，包含多种尺寸的基座模型和指令微调模型，支持多语言和长上下文。

## 核心特性

- **多语言支持**：支持中文、英文等多种语言
- **长上下文**：支持 128K tokens 的上下文长度
- **多尺寸系列**：从 0.5B 到 72B 多种参数规模

## 性能表现

Qwen2.5 系列在多个基准测试中展现了优秀的性能，特别是在中文理解和生成任务上表现突出。

## 使用方式

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-7B-Instruct")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-7B-Instruct")
```
