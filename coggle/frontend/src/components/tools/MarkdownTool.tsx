"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import TurndownService from "turndown";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import {
  Copy,
  Check,
  Trash2,
  Code,
  Eye,
  Download,
  FileCode,
} from "lucide-react";

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  bulletListMarker: "-",
  linkStyle: "inlined",
});

// Improve code block detection
turndownService.addRule("codeBlock", {
  filter: (node) => {
    return (
      node.nodeName === "PRE" &&
      node.firstChild?.nodeName === "CODE"
    );
  },
  replacement: (content, node) => {
    const code = node.firstChild as HTMLElement;
    const lang =
      code.getAttribute("class")?.match(/language-(\S+)/)?.[1] ||
      code.getAttribute("data-language") ||
      "";
    return "\n\n```" + lang + "\n" + content + "\n```\n\n";
  },
});

function isLikelyHtml(text: string): boolean {
  const trimmed = text.trim();
  return /^</.test(trimmed) || /<\w+[^>]*>/i.test(trimmed);
}

type ViewMode = "source" | "preview" | "split";

export default function MarkdownTool() {
  const [input, setInput] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const { markdown, isHtml, showConvertNotice } = useMemo(() => {
    if (!input.trim()) return { markdown: "", isHtml: false, showConvertNotice: false };
    const html = isLikelyHtml(input);
    if (html) {
      try {
        const md = turndownService.turndown(input.trim());
        return { markdown: md, isHtml: true, showConvertNotice: true };
      } catch {
        return { markdown: input, isHtml: false, showConvertNotice: false };
      }
    }
    return { markdown: input, isHtml: false, showConvertNotice: false };
  }, [input]);

  // For the rendered preview panel — use the converted markdown if input is HTML
  const displayMarkdown = useMemo(() => {
    if (!input.trim()) return "";
    if (isHtml) return markdown;
    return input;
  }, [input, isHtml, markdown]);

  const handleCopy = useCallback(async () => {
    if (!displayMarkdown) return;
    try {
      await navigator.clipboard.writeText(displayMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [displayMarkdown]);

  const handleDownload = useCallback(() => {
    if (!displayMarkdown) return;
    const blob = new Blob([displayMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  }, [displayMarkdown]);

  const clear = useCallback(() => {
    setInput("");
  }, []);

  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    // Try to get HTML from clipboard — only if it looks like rich content
    const html = e.clipboardData.getData("text/html");
    if (html && html.length > 50 && isLikelyHtml(html)) {
      e.preventDefault();
      try {
        const md = turndownService.turndown(html);
        setInput(md);
      } catch {
        // Fallback: paste as plain text
        const text = e.clipboardData.getData("text/plain");
        setInput(text);
      }
    }
    // Otherwise let the default paste happen (plain text)
  }, []);

  const inputLines = input.split("\n").length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      {/* Input */}
      <div className="mb-3">
        <div className="mb-1.5 flex items-center justify-between">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
            粘贴内容
          </label>
          {input && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {inputLines} 行
            </span>
          )}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPaste={handlePaste}
          placeholder="粘贴 Markdown 或网页内容（自动识别富文本并转换为 Markdown）…"
          rows={10}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        />
      </div>

      {/* HTML convert notice */}
      {showConvertNotice && isHtml && (
        <div className="mb-3 rounded-lg bg-amber-50 px-4 py-2.5 text-xs text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
          检测到 HTML 内容，已自动转换为 Markdown。你也可以直接粘贴网页富文本，工具会自动提取格式。
        </div>
      )}

      {/* Toolbar */}
      {input && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {/* View toggle */}
          <div className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setViewMode("source")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-colors ${
                viewMode === "source"
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <FileCode size={13} />
              源码
            </button>
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-colors ${
                viewMode === "split"
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <Code size={13} />
              分栏
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-colors ${
                viewMode === "preview"
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <Eye size={13} />
              预览
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {copied ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <Copy size={14} />
            )}
            {copied ? "已复制" : "复制 Markdown"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <Download size={14} />
            下载 .md
          </button>
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <Trash2 size={14} />
            清空
          </button>
        </div>
      )}

      {/* Content area */}
      {input && (
        <div className={`${viewMode === "split" ? "grid grid-cols-2 gap-4" : ""}`}>
          {/* Source panel */}
          {(viewMode === "source" || viewMode === "split") && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Markdown 源码
              </label>
              <div className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                <pre className="max-h-[600px] overflow-y-auto font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                  <code>{displayMarkdown}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Preview panel */}
          {(viewMode === "preview" || viewMode === "split") && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                渲染预览
              </label>
              <div
                ref={previewRef}
                className="prose prose-sm max-w-none overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 dark:prose-invert dark:border-gray-700 dark:bg-gray-900"
              >
                <MarkdownRenderer content={displayMarkdown} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!input && (
        <div className="rounded-lg border border-dashed border-gray-300 py-14 text-center dark:border-gray-600">
          <div className="mb-3 text-gray-300 dark:text-gray-600">
            <Eye size={40} className="mx-auto" />
          </div>
          <p className="mb-1 text-sm text-gray-400 dark:text-gray-500">
            粘贴 Markdown、网页富文本或 HTML 内容
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-600">
            自动识别富文本并转换为 Markdown，实时渲染预览
          </p>
        </div>
      )}
    </div>
  );
}
