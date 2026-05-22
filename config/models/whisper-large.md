Whisper Large 是 OpenAI 开源的通用语音识别模型，支持多语言语音识别、翻译和语言识别。

## 核心特性

- **多语言支持**：支持 99+ 种语言的语音识别
- **多任务**：支持语音识别、翻译（X→EN）、语言识别
- **弱监督训练**：在 68 万小时多语言弱监督数据上训练

## 性能表现

Whisper Large 在多种语言的语音识别任务上达到了接近人类水平的准确率，特别是在英语语音识别上表现尤为突出。

## 使用方式

```python
import whisper

model = whisper.load_model("large")
result = model.transcribe("audio.mp3")
print(result["text"])
```
