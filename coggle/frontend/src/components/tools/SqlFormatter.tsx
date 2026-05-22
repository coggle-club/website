"use client";

import { useState, useCallback } from "react";
import { format as sqlFormat } from "sql-formatter";
import {
  Trash2,
  Copy,
  Check,
  Code,
  Minus,
  Maximize2,
  AlertCircle,
} from "lucide-react";

const dialects = [
  { value: "sql", label: "ANSI SQL" },
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mariadb", label: "MariaDB" },
  { value: "sqlite", label: "SQLite" },
  { value: "bigquery", label: "BigQuery" },
  { value: "hive", label: "Hive" },
  { value: "spark", label: "Spark" },
  { value: "snowflake", label: "Snowflake" },
  { value: "plsql", label: "PL/SQL" },
  { value: "db2", label: "DB2" },
  { value: "transactsql", label: "TSQL" },
  { value: "clickhouse", label: "ClickHouse" },
  { value: "duckdb", label: "DuckDB" },
  { value: "redshift", label: "Redshift" },
  { value: "trino", label: "Trino" },
];

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dialect, setDialect] = useState("mysql");
  const [copied, setCopied] = useState(false);
  const [lastAction, setLastAction] = useState<"format" | "minify" | null>(null);

  const formatSql = useCallback(
    (minify: boolean) => {
      if (!input.trim()) {
        setError("请输入 SQL 语句");
        setOutput("");
        return;
      }
      try {
        let result = sqlFormat(input.trim(), {
          language: dialect as any,
          tabWidth: 2,
          useTabs: false,
          linesBetweenQueries: 2,
          keywordCase: "upper",
        });
        if (minify) {
          // Collapse to single line with minimal whitespace
          result = result
            .replace(/--.*$/gm, "") // remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//g, "") // remove multi-line comments
            .replace(/\s+/g, " ") // collapse whitespace
            .replace(/\s*([(),;])\s*/g, "$1") // trim around punctuation
            .replace(/\s*([=<>!])\s*/g, " $1 ") // keep spacing around operators
            .replace(/\s{2,}/g, " ")
            .trim();
        }
        setOutput(result);
        setError(null);
        setLastAction(minify ? "minify" : "format");
      } catch (e: any) {
        setError(e.message ?? "SQL 解析失败，请检查语法");
        setOutput("");
      }
    },
    [input, dialect],
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
    setLastAction(null);
  }, []);

  const outputLines = output ? output.split("\n").length : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      {/* Dialect selector */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
          数据库类型
        </label>
        <select
          value={dialect}
          onChange={(e) => setDialect(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
        >
          {dialects.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Input */}
      <div className="mb-3">
        <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          SQL 语句
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="粘贴 SQL 语句到这里…"
          rows={8}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        />
      </div>

      {/* Actions */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => formatSql(false)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm text-white transition-colors hover:bg-primary-700"
        >
          <Code size={14} />
          格式化
        </button>
        <button
          type="button"
          onClick={() => formatSql(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Minus size={14} />
          压缩
        </button>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Trash2 size={14} />
          清空
        </button>

        {/* Stats */}
        {output && (
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <span>{outputLines} 行</span>
            <span>{output.length} 字符</span>
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
              {lastAction === "minify" ? "压缩结果" : "格式化结果"}
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
      {!input && !output && !error && (
        <div className="rounded-lg border border-dashed border-gray-300 py-16 text-center dark:border-gray-600">
          <div className="mb-3 text-gray-300 dark:text-gray-600">
            <Maximize2 size={40} className="mx-auto" />
          </div>
          <p className="mb-1 text-sm text-gray-400 dark:text-gray-500">
            输入 SQL 语句，点击格式化或压缩
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-600">
            支持 MySQL、PostgreSQL、BigQuery 等 15 种方言
          </p>
        </div>
      )}
    </div>
  );
}
