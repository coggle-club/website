"use client";

import { useState, useMemo, useCallback } from "react";
import { Copy, Check, ArrowRightLeft, Trash2 } from "lucide-react";

const BASES = [
  { value: 2, label: "二进制", short: "BIN" },
  { value: 8, label: "八进制", short: "OCT" },
  { value: 10, label: "十进制", short: "DEC" },
  { value: 16, label: "十六进制", short: "HEX" },
];

const CUSTOM_BASES = [3, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

export default function BaseConverter() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const results = useMemo(() => {
    if (!input.trim()) return [];
    try {
      const decimal = parseInt(input.trim(), fromBase);
      if (isNaN(decimal)) return [];
      return BASES.map((b) => ({
        ...b,
        value: decimal.toString(b.value).toUpperCase(),
      }));
    } catch {
      return [];
    }
  }, [input, fromBase]);

  const error = useMemo(() => {
    if (!input.trim()) return null;
    const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, fromBase);
    const normalized = input.trim().toUpperCase();
    for (const ch of normalized) {
      if (ch === " ") continue;
      if (ch === ".") continue; // allow decimal point
      if (!validChars.includes(ch)) {
        return `"${ch}" 无效的 ${fromBase} 进制数字`;
      }
    }
    const decimal = parseInt(input.trim(), fromBase);
    if (isNaN(decimal)) {
      return `无法解析为 ${fromBase} 进制数字`;
    }
    return null;
  }, [input, fromBase]);

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
      {/* Base selector + input */}
      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          输入数字
        </label>
        <div className="flex gap-2">
          <select
            value={fromBase}
            onChange={(e) => {
              setFromBase(Number(e.target.value));
              setInput("");
            }}
            className="shrink-0 rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <optgroup label="常用进制">
              {BASES.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label} ({b.short})
                </option>
              ))}
            </optgroup>
            <optgroup label="其他进制">
              {CUSTOM_BASES.map((b) => (
                <option key={b} value={b}>
                  {b} 进制
                </option>
              ))}
            </optgroup>
          </select>
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`输入${fromBase}进制数字…`}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
              autoFocus
            />
            {input && (
              <button
                type="button"
                onClick={clear}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && !error && (
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400">
            转换结果
          </label>
          <div className="grid gap-2">
            {results.map((r, i) => (
              <div
                key={r.value}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
              >
                <span className="w-16 shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {r.short}
                </span>
                <span className="flex-1 font-mono text-sm text-gray-900 dark:text-gray-100">
                  {r.value}
                </span>
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
      {!input && !error && (
        <div className="rounded-lg border border-dashed border-gray-300 py-14 text-center dark:border-gray-600">
          <div className="mb-3 text-gray-300 dark:text-gray-600">
            <ArrowRightLeft size={40} className="mx-auto" />
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            输入数字，实时查看各进制转换结果
          </p>
        </div>
      )}
    </div>
  );
}
