## 为什么要可解释性

机器学习模型越来越复杂，理解其决策过程至关重要...

## SHAP

```python
import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X)
```

## LIME

...

## 总结

可解释性不仅帮助调试模型，也增加了业务方的信任...
