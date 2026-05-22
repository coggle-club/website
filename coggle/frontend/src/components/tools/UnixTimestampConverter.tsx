"use client";

import { useState, useCallback, useMemo } from "react";
import { Copy, Check, Clock } from "lucide-react";

function toLocalISO(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
}

function unixToDateStr(ts: string): string {
  const num = Number(ts.trim());
  if (!Number.isInteger(num) || num < 0) return "";
  const d = new Date(num * 1000);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
}

function dateStrToUnix(ds: string): string {
  const d = new Date(ds);
  if (isNaN(d.getTime())) return "";
  return String(Math.floor(d.getTime() / 1000));
}

export default function UnixTimestampConverter() {
  const [unixInput, setUnixInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [unixError, setUnixError] = useState("");
  const [dateError, setDateError] = useState("");
  const [copiedUnix, setCopiedUnix] = useState(false);
  const [copiedDate, setCopiedDate] = useState(false);

  // Real-time derived values
  const dateResult = useMemo(() => {
    if (!unixInput.trim()) return "";
    const trimmed = unixInput.trim();
    const num = Number(trimmed);
    if (!Number.isInteger(num) || num < 0) {
      setUnixError("请输入正整数");
      return "";
    }
    const d = new Date(num * 1000);
    if (isNaN(d.getTime())) {
      setUnixError("超出有效范围");
      return "";
    }
    setUnixError("");
    return d.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
  }, [unixInput]);

  const unixResult = useMemo(() => {
    if (!dateInput.trim()) return "";
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      setDateError("日期格式无效");
      return "";
    }
    setDateError("");
    return String(Math.floor(d.getTime() / 1000));
  }, [dateInput]);

  const now = useCallback(() => {
    const d = new Date();
    setUnixInput(String(Math.floor(d.getTime() / 1000)));
    setDateInput(toLocalISO(d));
    setUnixError("");
    setDateError("");
  }, []);

  const copyText = useCallback(async (text: string, setter: (v: boolean) => void) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch {
      // clipboard not available
    }
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock size={16} />
          双向实时转换
        </div>
        <button
          type="button"
          onClick={now}
          className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100 dark:bg-primary-950 dark:text-primary-300 dark:hover:bg-primary-900"
        >
          填入当前时间
        </button>
      </div>

      {/* Two columns */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Unix → Date */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
            Unix 时间戳
          </label>
          <input
            type="text"
            value={unixInput}
            onChange={(e) => setUnixInput(e.target.value)}
            placeholder="1747785600"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          />
          <div className="mt-2">
            <div className="mb-1 text-xs text-gray-400 dark:text-gray-500">
              北京时间
            </div>
            <div className="group relative rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
              {unixError ? (
                <span className="text-sm text-red-500">{unixError}</span>
              ) : dateResult ? (
                <>
                  <span className="font-mono text-base font-semibold text-gray-900 dark:text-gray-100">
                    {dateResult}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText(dateResult, setCopiedUnix)}
                    className="absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-200 hover:text-gray-600 group-hover:opacity-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    title="复制"
                  >
                    {copiedUnix ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </>
              ) : (
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  输入 Unix 时间戳后自动转换
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Date → Unix */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
            日期时间
          </label>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            step="1"
            aria-label="日期时间"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
          <div className="mt-2">
            <div className="mb-1 text-xs text-gray-400 dark:text-gray-500">
              Unix 时间戳
            </div>
            <div className="group relative rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
              {dateError ? (
                <span className="text-sm text-red-500">{dateError}</span>
              ) : unixResult ? (
                <>
                  <span className="font-mono text-base font-semibold text-gray-900 dark:text-gray-100">
                    {unixResult}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText(unixResult, setCopiedDate)}
                    className="absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-200 hover:text-gray-600 group-hover:opacity-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    title="复制"
                  >
                    {copiedDate ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </>
              ) : (
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  选择日期时间后自动转换
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-6 flex flex-wrap items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
        <span>快速填入：</span>
        {["1747785600", "1700000000", "1600000000"].map((ts) => (
          <button
            key={ts}
            type="button"
            onClick={() => {
              setUnixInput(ts);
              setDateInput(toLocalISO(new Date(Number(ts) * 1000)));
              setUnixError("");
              setDateError("");
            }}
            className="rounded bg-gray-100 px-2 py-1 font-mono text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            {ts}
          </button>
        ))}
      </div>
    </div>
  );
}
