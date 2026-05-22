"use client";

import { useState, useMemo, useCallback } from "react";
import CryptoJS from "crypto-js";
import { Copy, Check, Hash, Trash2 } from "lucide-react";

export default function Md5Hash() {
  const [input, setInput] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const results = useMemo(() => {
    if (!input) return [];
    const wordArray = CryptoJS.enc.Utf8.parse(input);
    return [
      { label: "MD5", value: CryptoJS.MD5(input).toString() },
      { label: "MD5 (大写)", value: CryptoJS.MD5(input).toString().toUpperCase() },
      { label: "SHA-1", value: CryptoJS.SHA1(input).toString() },
      { label: "SHA-256", value: CryptoJS.SHA256(input).toString() },
    ];
  }, [input]);

  const handleCopy = useCallback(
    async (text: string, index: number) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch {}
    },
    [],
  );

  const clear = useCallback(() => {
    setInput("");
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      {/* Input */}
      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          输入文本
        </label>
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入要计算哈希的文本…"
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          />
          {input && (
            <button
              type="button"
              onClick={clear}
              className="absolute right-2 top-2 rounded p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
        {input && (
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {input.length} 字符
          </p>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400">
            哈希结果
          </label>
          <div className="grid gap-2">
            {results.map((r, i) => (
              <div
                key={r.label}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
              >
                <span className="w-20 shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {r.label}
                </span>
                <code className="flex-1 select-all overflow-x-auto text-xs text-gray-900 dark:text-gray-100">
                  {r.value}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(r.value, i)}
                  className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  title="复制"
                >
                  {copiedIndex === i ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!input && (
        <div className="rounded-lg border border-dashed border-gray-300 py-14 text-center dark:border-gray-600">
          <div className="mb-3 text-gray-300 dark:text-gray-600">
            <Hash size={40} className="mx-auto" />
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            输入文本，自动计算 MD5 / SHA-1 / SHA-256 哈希值
          </p>
        </div>
      )}
    </div>
  );
}
