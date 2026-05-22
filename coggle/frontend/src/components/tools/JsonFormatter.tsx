"use client";

import { useState, useCallback } from "react";
import {
  Trash2,
  Copy,
  Check,
  Code,
  Minus,
  Maximize2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

type JsonView = "formatted" | "compressed";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<JsonView>("formatted");

  const processJson = useCallback(
    (mode: "format" | "minify" | "validate") => {
      if (!input.trim()) {
        setError("请输入 JSON");
        setOutput("");
        setIsValid(null);
        return;
      }
      try {
        const parsed = JSON.parse(input.trim());
        setIsValid(true);

        if (mode === "validate") {
          setOutput(JSON.stringify(parsed, null, 2));
          setError(null);
          setView("formatted");
          return;
        }

        if (mode === "format") {
          const formatted = JSON.stringify(parsed, null, 2);
          setOutput(formatted);
          setView("formatted");
        } else {
          const minified = JSON.stringify(parsed);
          setOutput(minified);
          setView("compressed");
        }
        setError(null);
      } catch (e: any) {
        const msg = e.message ?? "JSON 解析失败";
        // Try to extract position info from error
        const posMatch = msg.match(/position\s+(\d+)/i);
        if (posMatch) {
          const pos = parseInt(posMatch[1]);
          const before = input.trim().substring(0, pos);
          const line = (before.match(/\n/g) || []).length + 1;
          const col = pos - before.lastIndexOf("\n");
          setError(`第 ${line} 行第 ${col} 列附近出错: ${msg}`);
        } else {
          setError(msg);
        }
        setOutput("");
        setIsValid(false);
      }
    },
    [input],
  );

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [output]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
    setIsValid(null);
  }, []);

  const outputLines = output ? output.split("\n").length : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      {/* Input */}
      <div className="mb-3">
        <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          JSON 文本
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // Clear validation state when input changes
            if (isValid !== null) setIsValid(null);
            if (error) setError(null);
          }}
          placeholder='粘贴 JSON 到这里…&#10;&#10;例如:&#10;{ "name": "coggle", "year": 2024 }'
          rows={8}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        />
      </div>

      {/* Actions */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => processJson("format")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm text-white transition-colors hover:bg-primary-700"
        >
          <Code size={14} />
          格式化
        </button>
        <button
          type="button"
          onClick={() => processJson("minify")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Minus size={14} />
          压缩
        </button>
        <button
          type="button"
          onClick={() => processJson("validate")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <CheckCircle size={14} />
          校验
        </button>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Trash2 size={14} />
          清空
        </button>

        {/* Validation badge */}
        {isValid === true && (
          <div className="ml-auto flex items-center gap-1 rounded bg-green-100 px-2.5 py-1 text-xs text-green-700 dark:bg-green-900/40 dark:text-green-300">
            <CheckCircle size={12} />
            JSON 格式正确
          </div>
        )}

        {/* Stats */}
        {output && isValid === true && (
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            {view === "compressed" && <span>{output.length} 字符</span>}
            {view === "formatted" && (
              <>
                <span>{outputLines} 行</span>
                <span>{output.length} 字符</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Error display */}
      {error && isValid === false && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Output */}
      {output && isValid === true && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
              {view === "compressed" ? "压缩结果" : "格式化结果"}
            </label>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              {copied ? (
                <Check size={12} className="text-green-500" />
              ) : (
                <Copy size={12} />
              )}
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <pre className="font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!input && !output && !error && isValid === null && (
        <div className="rounded-lg border border-dashed border-gray-300 py-16 text-center dark:border-gray-600">
          <div className="mb-3 text-gray-300 dark:text-gray-600">
            <Maximize2 size={40} className="mx-auto" />
          </div>
          <p className="mb-1 text-sm text-gray-400 dark:text-gray-500">
            输入 JSON 文本，点击格式化、压缩或校验
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-600">
            支持语法校验、智能缩进和错误定位
          </p>
        </div>
      )}
    </div>
  );
}
