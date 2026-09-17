DeepSeek-V4 是 DeepSeek 于 2026 年推出的旗舰 MoE 大语言模型系列，围绕超长上下文 + Agent + 推理效率做了一次架构升级。最新子版本 V4.1-Flash（2026-09-10）首次引入原生视觉理解。

## 核心特性

- **1M token 上下文**：采用混合注意力架构（CSA + HCA），支持百万 token 长上下文且单 token FLOPs 降至 V3.2 的 27%
- **MoE 高效推理**：V4-Pro 总参数 1.6T / 激活 49B；V4.1-Flash 总参数 552B / 输入激活 8B、输出激活 16B
- **多思考模式**：Non-think / Think High / Think Max 三种推理深度可选
- **Agent 优先**：强化 Terminal Coding、多文件代码库分析、长时间工具调用等场景能力
- **原生多模态**：V4.1-Flash 首次支持图像输入
- **完全开源**：采用 MIT License 开放权重

## 性能表现

V4.1-Flash 官方报告成绩：GPQA Diamond **90.9**、LiveCodeBench 参考 Codeforces Rating **3471**、Terminal-Bench 2.1 **90.6**、HLE with tools **63.9**。

## 部署提示

V4-Pro 1.6T 参数即使 FP4/FP8 混合精度也需要数据中心级硬件部署；消费级 GPU 建议使用 API 方式访问。V4.1-Flash 因更低的 KV Cache 和激活参数比前代更易部署。

