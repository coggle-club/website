DeepSeek-V4 是 DeepSeek 于 2026 年推出的旗舰 MoE 大语言模型系列，围绕超长上下文 + Agent + 推理效率做了一次架构升级。最新子版本 V4.1-Flash（2026-09-10）首次引入原生视觉理解。

## 核心特性

- **1M token 上下文**：采用混合注意力架构（CSA + HCA），支持百万 token 长上下文且单 token FLOPs 降至 V3.2 的 27%
- **MoE 高效推理**：V4-Pro 总参数 1.6T / 激活 49B；V4.1-Flash 总参数 552B / 输入激活 8B、输出激活 16B
- **多思考模式**：Non-think / Think High / Think Max 三种推理深度可选
- **Agent 优先**：强化 Terminal Coding、多文件代码库分析、长时间工具调用等场景能力
- **原生多模态**：V4.1-Flash 首次支持图像输入
- **完全开源**：采用 MIT License 开放权重

## 版本演进

| 版本 | 发布时间 | 总参数 | 激活参数 | 亮点 |
| --- | --- | --- | --- | --- |
| V4-Preview | 2026-04-24 | 284B (Flash) / 1.6T (Pro) | 13B / 49B | 初代发布，1M 上下文 |
| V4-Flash | 2026-07-31 | 284B | 13B | 加强 Agent Coding |
| V4-Pro | 2026-08-13 | 1.6T | 49B | 更强的 Tool Call / Agent |
| V4.1-Flash | 2026-09-10 | 552B | 输入 8B / 输出 16B | 新 Causal Encoder–Decoder 架构、原生视觉 |

## 性能表现

V4-Pro 在 Think Max 模式下部分 Benchmark 成绩：

| Benchmark | GPQA Diamond | LiveCodeBench | Terminal-Bench 2.1 | SWE Verified |
| --- | --- | --- | --- | --- |
| V4-Pro-Max | 90.1 | 93.5 | 87.9 | 80.6 |

V4.1-Flash 官方报告成绩：GPQA Diamond **90.9**、LiveCodeBench 参考 Codeforces Rating **3471**、Terminal-Bench 2.1 **90.6**、HLE with tools **63.9**。

## API 使用

当前推荐使用以下模型名称：

| API Key | 对应模型 | 说明 |
| --- | --- | --- |
| `deepseek-flash` | DeepSeek-V4.1-Flash | Flash 主力，当前推荐 |
| `deepseek-v4-pro` | DeepSeek-V4-Pro-0813 | Pro 版仍提供，计费不变 |

两者均支持 1M context、最大 384K 输出、Tool Calls、JSON Output 和 Responses API。V4.1-Flash 额外支持图像输入。

## 部署提示

V4-Pro 1.6T 参数即使 FP4/FP8 混合精度也需要数据中心级硬件部署；消费级 GPU 建议使用 API 方式访问。V4.1-Flash 因更低的 KV Cache 和激活参数比前代更易部署。

