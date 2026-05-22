## DataLoader

```python
from torch.utils.data import DataLoader, Dataset

class MyDataset(Dataset):
    def __len__(self):
        return len(self.data)
    def __getitem__(self, idx):
        return self.data[idx], self.targets[idx]
```

## 构建模型

```python
import torch.nn as nn

class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(784, 10)
    def forward(self, x):
        return self.fc(x)
```
