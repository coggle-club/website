"use client";

import { useState, useRef } from "react";
import OpenAI from "openai";
import { Send, Trash2, StopCircle } from "lucide-react";

interface ModelPanel {
  name: string;
  baseURL: string;
  apiKey: string;
  model: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PanelState {
  config: ModelPanel;
  messages: Message[];
  status: "idle" | "streaming" | "done" | "error";
  durationMs: number | null;
  firstTokenMs: number | null;
  tokenCount: number | null;
  tokenSpeed: number | null;
  error: string | null;
}

const defaultConfig: ModelPanel = {
  name: "模型 A",
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: "",
  model: "qwen-plus",
};

function initPanel(name: string): PanelState {
  return {
    config: { ...defaultConfig, name },
    messages: [],
    status: "idle",
    durationMs: null,
    firstTokenMs: null,
    tokenCount: null,
    tokenSpeed: null,
    error: null,
  };
}

export default function LlmChatPage() {
  const [panels, setPanels] = useState<PanelState[]>([
    initPanel("模型 A"),
    initPanel("模型 B"),
  ]);
  const [prompt, setPrompt] = useState("");
  const [abortControllers, setAbortControllers] = useState<(AbortController | null)[]>([null, null]);
  const panelARef = useRef<HTMLDivElement>(null);
  const panelBRef = useRef<HTMLDivElement>(null);

  function updatePanel(index: number, updater: (p: PanelState) => PanelState) {
    setPanels((prev) => {
      const next = [...prev];
      next[index] = updater(next[index]);
      return next;
    });
  }

  function updateConfig(index: number, field: keyof ModelPanel, value: string) {
    updatePanel(index, (p) => ({
      ...p,
      config: { ...p.config, [field]: value },
    }));
  }

  async function sendToPanel(index: number) {
    if (!prompt.trim()) return;
    const panel = panels[index];
    if (!panel.config.apiKey.trim()) {
      updatePanel(index, (p) => ({ ...p, status: "error", error: "请输入 API Key" }));
      return;
    }

    const userMessage: Message = { role: "user", content: prompt };
    updatePanel(index, (p) => ({
      ...p,
      messages: [...p.messages, userMessage],
      status: "streaming",
      durationMs: null,
      error: null,
    }));

    const controller = new AbortController();
    setAbortControllers((prev) => {
      const next = [...prev];
      next[index] = controller;
      return next;
    });

    const startTime = performance.now();
    let firstTokenRecorded = false;
    let totalTokens = 0;
    const client = new OpenAI({
      apiKey: panel.config.apiKey,
      baseURL: panel.config.baseURL,
      dangerouslyAllowBrowser: true,
    });

    try {
      const stream = await client.chat.completions.create(
        {
          model: panel.config.model,
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...panel.messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: prompt },
          ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
          stream: true,
          stream_options: { include_usage: true },
        },
        { signal: controller.signal },
      );

      let content = "";
      for await (const chunk of stream) {
        // usage 信息出现在最后一个 chunk（choices 为空时）
        if (chunk.usage) {
          totalTokens = chunk.usage.completion_tokens || 0;
          continue;
        }
        const delta = chunk.choices?.[0]?.delta?.content || "";
        if (!delta) continue;

        // 记录首 token 时间
        if (!firstTokenRecorded) {
          firstTokenRecorded = true;
          const ttft = performance.now() - startTime;
          updatePanel(index, (p) => ({ ...p, firstTokenMs: Math.round(ttft) }));
          // 粗略估算 token 数（中文约 1.5 chars/token，英文约 4 chars/token）
          totalTokens = Math.max(totalTokens, Math.round(delta.length / 2));
        } else {
          totalTokens += Math.round(delta.length / 2);
        }

        content += delta;
        updatePanel(index, (p) => {
          const msgs = [...p.messages];
          const last = msgs[msgs.length - 1];
          if (last?.role === "assistant") {
            msgs[msgs.length - 1] = { ...last, content };
          } else {
            msgs.push({ role: "assistant", content });
          }
          return { ...p, messages: msgs, status: "streaming" };
        });
      }

      const duration = performance.now() - startTime;
      const tokenSpeed = duration > 0 ? Math.round((totalTokens / duration) * 1000 * 10) / 10 : 0;
      updatePanel(index, (p) => ({
        ...p,
        status: "done",
        durationMs: Math.round(duration),
        tokenCount: totalTokens,
        tokenSpeed,
      }));
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        updatePanel(index, (p) => ({ ...p, status: "idle" }));
      } else {
        const msg = err instanceof Error ? err.message : "请求失败";
        updatePanel(index, (p) => ({ ...p, status: "error", error: msg }));
      }
    } finally {
      setAbortControllers((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });
    }
  }

  function stopPanel(index: number) {
    abortControllers[index]?.abort();
  }

  function sendToAll() {
    sendToPanel(0);
    sendToPanel(1);
  }

  function clearPanel(index: number) {
    updatePanel(index, (p) => ({
      ...p,
      messages: [],
      status: "idle",
      durationMs: null,
      firstTokenMs: null,
      tokenCount: null,
      tokenSpeed: null,
      error: null,
    }));
    setPrompt("");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
        大模型对话
      </h1>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        配置 API 信息后发送消息，支持双模型并列对比响应速度
      </p>
      <p className="mb-6 text-xs text-amber-600 dark:text-amber-400">
        ⚠ 本站不会存储您的 API Key，所有请求由浏览器直接发送至您配置的 API 地址
      </p>

      {/* 配置区 */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {panels.map((panel, idx) => (
          <div
            key={idx}
            ref={idx === 0 ? panelARef : panelBRef}
            className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
          >
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              {panel.config.name}
            </h2>
            {panel.durationMs !== null && (
              <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                <span>总耗时 <strong>{panel.durationMs}ms</strong></span>
                {panel.firstTokenMs !== null && (
                  <span>首 token <strong>{panel.firstTokenMs}ms</strong></span>
                )}
                {panel.tokenSpeed !== null && (
                  <span>速度 <strong>{panel.tokenSpeed} tok/s</strong></span>
                )}
                {panel.tokenCount !== null && (
                  <span>输出 <strong>{panel.tokenCount} tok</strong></span>
                )}
              </div>
            )}
            <div className="mb-3 space-y-2">
              <input
                type="text"
                placeholder="名称（如 模型 A）"
                value={panel.config.name}
                onChange={(e) => updateConfig(idx, "name", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
              <input
                type="text"
                placeholder="baseURL"
                value={panel.config.baseURL}
                onChange={(e) => updateConfig(idx, "baseURL", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
              <input
                type="password"
                placeholder="API Key"
                value={panel.config.apiKey}
                onChange={(e) => updateConfig(idx, "apiKey", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
              <input
                type="text"
                placeholder="模型名（如 qwen-plus）"
                value={panel.config.model}
                onChange={(e) => updateConfig(idx, "model", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 对话区 */}
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        {panels.map((panel, idx) => (
          <div
            key={idx}
            className="flex min-h-[300px] flex-col rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
          >
            {/* 状态栏 */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-700">
              <span className="text-xs text-gray-500">
                {panel.status === "streaming" && (panel.firstTokenMs !== null ? "生成中..." : "等待首 token...")}
                {panel.status === "done" && `完成 · ${panel.durationMs}ms · ${panel.tokenSpeed ?? "-"} tok/s`}
                {panel.status === "error" && "出错"}
                {panel.status === "idle" && (panel.messages.length > 0 ? `${panel.messages.length} 条消息` : "等待输入")}
              </span>
              <div className="flex gap-1">
                {panel.status === "streaming" && (
                  <button
                    onClick={() => stopPanel(idx)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
                    title="停止"
                  >
                    <StopCircle size={16} />
                  </button>
                )}
                {panel.messages.length > 0 && (
                  <button
                    onClick={() => clearPanel(idx)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
                    title="清空"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {panel.messages.length === 0 && (
                <p className="text-center text-sm text-gray-400">在此处查看回复</p>
              )}
              {panel.messages.map((msg, mi) => (
                <div
                  key={mi}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary-50 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200"
                      : "bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                >
                  <div className="mb-0.5 text-xs font-medium text-gray-400">
                    {msg.role === "user" ? "你" : "AI"}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              ))}
              {panel.error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {panel.error}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 输入区 */}
      <div className="flex gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (panels.some((p) => p.status === "streaming")) return;
              sendToAll();
            }
          }}
          placeholder="输入消息（Enter 发送，Shift+Enter 换行）"
          rows={2}
          className="min-h-[44px] flex-1 resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          onClick={sendToAll}
          disabled={panels.some((p) => p.status === "streaming") || !prompt.trim()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={16} />
          发送
        </button>
      </div>
    </div>
  );
}
