BERT模型可以用于多个任务，也是现在NLP模型必备的方法。在文本分类中我们会使用`[CLS]`对应的输出完成文本分类，当然也有其他的方法。

这样可以使用每个`token`对应的输出，通过`pooling`之后再进行分类。本文将介绍常见的几种与BERT搭建使用的方法。

## 方法1：MeanPooling

将每个`token`对应的输出计算均值，这里需要考虑`attention_mask`，也就是需要考虑有效的输入的`token`。

```python
class MeanPooling(nn.Module):
    def __init__(self):
        super(MeanPooling, self).__init__()
        
    def forward(self, last_hidden_state, attention_mask):
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_state.size()).float()
        sum_embeddings = torch.sum(last_hidden_state * input_mask_expanded, 1)
        sum_mask = input_mask_expanded.sum(1)
        sum_mask = torch.clamp(sum_mask, min = 1e-9)
        mean_embeddings = sum_embeddings/sum_mask
        return mean_embeddings

```

## 方法2：MaxPooling

将每个`token`对应的输出计算最大值，这里需要考虑`attention_mask`，也就是需要考虑有效的输入的`token`。

```python
class MaxPooling(nn.Module):
    def __init__(self):
        super(MaxPooling, self).__init__()
        
    def forward(self, last_hidden_state, attention_mask):
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_state.size()).float()
        embeddings = last_hidden_state.clone()
        embeddings[input_mask_expanded == 0] = -1e4
        max_embeddings, _ = torch.max(embeddings, dim = 1)
        return max_embeddings
```

## 方法3：MinPooling

将每个`token`对应的输出计算最小值，这里需要考虑`attention_mask`，也就是需要考虑有效的输入的`token`。

```python
class MinPooling(nn.Module):
    def __init__(self):
        super(MinPooling, self).__init__()
        
    def forward(self, last_hidden_state, attention_mask):
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_state.size()).float()
        embeddings = last_hidden_state.clone()
        embeddings[input_mask_expanded == 0] = 1e-4
        min_embeddings, _ = torch.min(embeddings, dim = 1)
        return min_embeddings
```

## 方法4：WeightedPooling

将每个`token`对应的输出计算出权重，这里的权重可以通过特征进行计算，也可以考虑通过IDF计算出权重。

```python
class WeightedLayerPooling(nn.Module):
    def __init__(self, num_hidden_layers, layer_start: int = 4, layer_weights = None):
        super(WeightedLayerPooling, self).__init__()
        self.layer_start = layer_start
        self.num_hidden_layers = num_hidden_layers
        self.layer_weights = layer_weights if layer_weights is not None \
            else nn.Parameter(
                torch.tensor([1] * (num_hidden_layers+1 - layer_start), dtype=torch.float)
            )

    def forward(self, ft_all_layers):
        all_layer_embedding = torch.stack(ft_all_layers)
        all_layer_embedding = all_layer_embedding[self.layer_start:, :, :, :]

        weight_factor = self.layer_weights.unsqueeze(-1).unsqueeze(-1).unsqueeze(-1).expand(all_layer_embedding.size())
        weighted_average = (weight_factor*all_layer_embedding).sum(dim=0) / self.layer_weights.sum()

        return weighted_average
```

## 方法5：AttentionPooling

将每个`token`的特征单独加入一层，用于注意力的计算，增加模型的建模能力。

```python
class AttentionPooling(nn.Module):
    def __init__(self, in_dim):
        super().__init__()
        self.attention = nn.Sequential(
        nn.Linear(in_dim, in_dim),
        nn.LayerNorm(in_dim),
        nn.GELU(),
        nn.Linear(in_dim, 1),
        )

    def forward(self, last_hidden_state, attention_mask):
        w = self.attention(last_hidden_state).float()
        w[attention_mask==0]=float('-inf')
        w = torch.softmax(w,1)
        attention_embeddings = torch.sum(w * last_hidden_state, dim=1)
        return attention_embeddings
```

## 总结

从模型复杂度上：AttentionPooling > WeightedLayerPooling >  MeanPooling / MinPooling / MaxPooling

从模型精度上：AttentionPooling > WeightedLayerPooling > MeanPooling > MaxPooling > MinPooling

使用多种Pooling的目的是增加BERT模型的多样性，考虑在模型集成中使用。