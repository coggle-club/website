BERT-Base 是 Google 提出的预训练语言表示模型，通过双向 Transformer 在大量无标注文本上进行预训练，是 NLP 领域的里程碑。

## 核心特性

- **双向编码**：使用 Masked Language Model 实现双向上下文建模
- **预训练 + 微调**：在大规模语料上预训练，下游任务微调
- **12 层 Transformer**：Base 版本包含 12 层 Transformer、110M 参数

## 性能表现

BERT 在 11 项 NLP 基准测试中刷新了记录，包括问答（SQuAD）、文本分类（GLUE）等任务，开启了 NLP 领域的预训练时代。

## 使用方式

```python
from transformers import BertTokenizer, BertModel

tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-base-uncased")
```
