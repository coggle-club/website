"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  diffLines,
  diffWords,
  type Change,
} from "diff";
import {
  ArrowUpDown,
  Trash2,
  Columns2,
  List,
  Plus,
  Minus,
  Copy,
  Check,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Word-level diff within a single line
// ---------------------------------------------------------------------------

function WordDiffSpan({
  oldText,
  newText,
  kind,
}: {
  oldText: string;
  newText: string;
  kind: "add" | "remove";
}) {
  const words = useMemo(() => {
    try {
      // Compare old vs new to find word-level changes on this line
      const a = kind === "add" ? oldText : newText;
      const b = kind === "add" ? newText : oldText;
      const result = diffWords(a, b);
      // For "add" we highlight the "added" parts; for "remove" we highlight "removed"
      return result.filter((c) => kind === "add" ? !c.removed : !c.added);
    } catch {
      return [{ value: kind === "add" ? newText : oldText, added: false, removed: false }] as Change[];
    }
  }, [oldText, newText, kind]);

  return (
    <>
      {words.map((part, i) => {
        const highlight = kind === "add" ? part.added : part.removed;
        if (highlight) {
          return (
            <span
              key={i}
              className={`rounded px-0.5 ${
                kind === "add"
                  ? "bg-green-300 text-green-900 dark:bg-green-600 dark:text-green-50"
                  : "bg-red-300 text-red-900 dark:bg-red-600 dark:text-red-50"
              }`}
            >
              {part.value}
            </span>
          );
        }
        return <span key={i}>{part.value}</span>;
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Pair changes into aligned (left, right) rows for split view
// ---------------------------------------------------------------------------

interface DiffRow {
  left: string | null; // null = empty placeholder (line was added)
  right: string | null; // null = empty placeholder (line was removed)
  type: "equal" | "replace" | "add" | "remove";
}

function buildSplitRows(changes: Change[]): DiffRow[] {
  const rows: DiffRow[] = [];
  let i = 0;

  while (i < changes.length) {
    const cur = changes[i];

    // Equal lines — show on both sides
    if (!cur.added && !cur.removed) {
      const lines = cur.value.replace(/\n$/, "").split("\n");
      for (const line of lines) {
        rows.push({ left: line, right: line, type: "equal" });
      }
      i++;
      continue;
    }

    // Try to pair remove + add as a "replace"
    if (cur.removed && i + 1 < changes.length && changes[i + 1].added) {
      const next = changes[i + 1];
      const leftLines = cur.value.replace(/\n$/, "").split("\n");
      const rightLines = next.value.replace(/\n$/, "").split("\n");
      const maxLen = Math.max(leftLines.length, rightLines.length);
      for (let j = 0; j < maxLen; j++) {
        rows.push({
          left: j < leftLines.length ? leftLines[j] : null,
          right: j < rightLines.length ? rightLines[j] : null,
          type: "replace",
        });
      }
      i += 2;
      continue;
    }

    // Standalone removal
    if (cur.removed) {
      const lines = cur.value.replace(/\n$/, "").split("\n");
      for (const line of lines) {
        rows.push({ left: line, right: null, type: "remove" });
      }
      i++;
      continue;
    }

    // Standalone addition
    if (cur.added) {
      const lines = cur.value.replace(/\n$/, "").split("\n");
      for (const line of lines) {
        rows.push({ left: null, right: line, type: "add" });
      }
      i++;
      continue;
    }

    i++; // safety
  }

  return rows;
}

// ---------------------------------------------------------------------------
// Split View
// ---------------------------------------------------------------------------

function SplitView({ changes }: { changes: Change[] }) {
  const rows = useMemo(() => buildSplitRows(changes), [changes]);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  const syncScroll = useCallback(
    (source: "left" | "right") => {
      if (syncing.current) return;
      syncing.current = true;

      const src = source === "left" ? leftRef.current : rightRef.current;
      const tgt = source === "left" ? rightRef.current : leftRef.current;
      if (src && tgt) {
        tgt.scrollTop = src.scrollTop;
      }

      requestAnimationFrame(() => {
        syncing.current = false;
      });
    },
    [],
  );

  let leftNum = 0;
  let rightNum = 0;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <div className="flex w-1/2 items-center gap-2 border-r border-gray-200 bg-red-50/50 px-4 py-2 text-xs font-semibold text-red-700 dark:border-gray-700 dark:bg-red-950/20 dark:text-red-400">
          <Minus size={12} />
          原文
        </div>
        <div className="flex w-1/2 items-center gap-2 bg-green-50/50 px-4 py-2 text-xs font-semibold text-green-700 dark:bg-green-950/20 dark:text-green-400">
          <Plus size={12} />
          修改后
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        {/* Left pane */}
        <div
          ref={leftRef}
          onScroll={() => syncScroll("left")}
          className="w-1/2 overflow-auto border-r border-gray-200 dark:border-gray-700"
          style={{ maxHeight: "600px" }}
        >
          <table className="w-full font-mono text-xs leading-relaxed">
            <tbody>
              {rows.map((row, i) => {
                const isAdd = row.type === "add";
                const isRemove = row.type === "remove";
                const isReplace = row.type === "replace";
                if (isAdd) {
                  leftNum++;
                } else if (!isAdd) {
                  leftNum++;
                }
                const isEmpty = row.left === null;

                return (
                  <tr
                    key={i}
                    className={`${
                      isRemove || isReplace
                        ? "bg-red-50 dark:bg-red-950/20"
                        : isAdd
                          ? "bg-gray-50 dark:bg-gray-900"
                          : ""
                    }`}
                  >
                    <td
                      className={`w-12 select-none border-r px-2 py-0 text-right ${
                        isRemove || isReplace
                          ? "border-red-200 text-red-400 dark:border-red-800 dark:text-red-500"
                          : "border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-600"
                      }`}
                    >
                      {!isEmpty ? (isAdd ? "" : leftNum) : ""}
                    </td>
                    <td
                      className={`w-6 select-none border-r px-1 py-0 text-center ${
                        isRemove || isReplace
                          ? "border-red-200 text-red-500 dark:border-red-800"
                          : isAdd
                            ? "border-gray-200 dark:border-gray-700"
                            : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      {isRemove || isReplace ? (
                        <Minus size={10} className="inline" />
                      ) : (
                        ""
                      )}
                    </td>
                    <td
                      className={`whitespace-pre-wrap break-all px-3 py-0 ${
                        isRemove || isReplace
                          ? "text-red-800 dark:text-red-300"
                          : isAdd
                            ? "text-gray-400 dark:text-gray-600"
                            : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {isEmpty ? (
                        <span className="opacity-0">.</span>
                      ) : isRemove || isReplace ? (
                        <WordDiffSpan
                          oldText={row.left!}
                          newText={row.right ?? ""}
                          kind="remove"
                        />
                      ) : (
                        row.left
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right pane */}
        <div
          ref={rightRef}
          onScroll={() => syncScroll("right")}
          className="w-1/2 overflow-auto"
          style={{ maxHeight: "600px" }}
        >
          <table className="w-full font-mono text-xs leading-relaxed">
            <tbody>
              {rows.map((row, i) => {
                const isAdd = row.type === "add";
                const isRemove = row.type === "remove";
                const isReplace = row.type === "replace";
                const isEmpty = row.right === null;

                // Count lines for right-side line numbers
                if (isRemove) {
                  // right side is empty, don't increment
                } else {
                  rightNum++;
                }

                return (
                  <tr
                    key={i}
                    className={`${
                      isAdd || isReplace
                        ? "bg-green-50 dark:bg-green-950/20"
                        : isRemove
                          ? "bg-gray-50 dark:bg-gray-900"
                          : ""
                    }`}
                  >
                    <td
                      className={`w-6 select-none border-r px-1 py-0 text-center ${
                        isAdd || isReplace
                          ? "border-green-200 text-green-500 dark:border-green-800"
                          : isRemove
                            ? "border-gray-200 dark:border-gray-700"
                            : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      {isAdd || isReplace ? (
                        <Plus size={10} className="inline" />
                      ) : (
                        ""
                      )}
                    </td>
                    <td
                      className={`w-12 select-none border-r px-2 py-0 text-left ${
                        isAdd || isReplace
                          ? "border-green-200 text-green-400 dark:border-green-800 dark:text-green-500"
                          : "border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-600"
                      }`}
                    >
                      {!isEmpty ? (isRemove ? "" : rightNum) : ""}
                    </td>
                    <td
                      className={`whitespace-pre-wrap break-all px-3 py-0 ${
                        isAdd || isReplace
                          ? "text-green-800 dark:text-green-300"
                          : isRemove
                            ? "text-gray-400 dark:text-gray-600"
                            : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {isEmpty ? (
                        <span className="opacity-0">.</span>
                      ) : isAdd || isReplace ? (
                        <WordDiffSpan
                          oldText={row.left ?? ""}
                          newText={row.right!}
                          kind="add"
                        />
                      ) : (
                        row.right
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Unified View (enhanced from original)
// ---------------------------------------------------------------------------

function UnifiedView({ changes }: { changes: Change[] }) {
  let lineA = 0;
  let lineB = 0;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full table-fixed font-mono text-xs leading-relaxed">
        <thead>
          <tr className="select-none border-b border-gray-200 bg-gray-50 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <th className="w-16 px-2 py-1.5 text-right">原文</th>
            <th className="w-16 px-2 py-1.5 text-right">改后</th>
            <th className="w-8 px-1 py-1.5 text-center"></th>
            <th className="px-3 py-1.5 text-left">内容</th>
          </tr>
        </thead>
        <tbody>
          {changes.map((part, i) => {
            const lines = part.value.replace(/\n$/, "").split("\n");
            return lines.map((line, j) => {
              const isAdd = part.added;
              const isRemove = part.removed;
              const numA = !isAdd ? ++lineA : "";
              const numB = !isRemove ? ++lineB : "";

              return (
                <tr
                  key={`${i}-${j}`}
                  className={`${
                    isAdd
                      ? "bg-green-50 dark:bg-green-950/20"
                      : isRemove
                        ? "bg-red-50 dark:bg-red-950/20"
                        : ""
                  }`}
                >
                  <td className="w-16 select-none border-r border-gray-200 px-2 py-0 text-right text-gray-400 dark:border-gray-700 dark:text-gray-600">
                    {numA}
                  </td>
                  <td className="w-16 select-none border-r border-gray-200 px-2 py-0 text-right text-gray-400 dark:border-gray-700 dark:text-gray-600">
                    {numB}
                  </td>
                  <td className="w-8 select-none border-r border-gray-200 px-1 py-0 text-center dark:border-gray-700">
                    {isAdd ? (
                      <Plus size={10} className="inline text-green-500" />
                    ) : isRemove ? (
                      <Minus size={10} className="inline text-red-500" />
                    ) : (
                      ""
                    )}
                  </td>
                  <td
                    className={`whitespace-pre-wrap break-all px-3 py-0 ${
                      isAdd
                        ? "text-green-800 dark:text-green-300"
                        : isRemove
                          ? "text-red-800 dark:text-red-300"
                          : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {line || "\u00A0"}
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

type ViewMode = "split" | "unified";

export default function TextDiff() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [copied, setCopied] = useState(false);

  const changes = useMemo(() => {
    if (!textA && !textB) return [];
    try {
      return diffLines(textA, textB);
    } catch {
      return [];
    }
  }, [textA, textB]);

  const stats = useMemo(() => {
    if (changes.length === 0) return null;
    let adds = 0;
    let removes = 0;
    for (const c of changes) {
      if (c.added) removes += c.count ?? c.value.split("\n").length - 1;
      else if (c.removed) removes += c.count ?? c.value.split("\n").length - 1;
    }
    // "adds" counts added lines, "removes" counts removed lines
    // In diff output, added entries contribute to right side, removed to left side
    // Let's recompute properly
    adds = 0;
    removes = 0;
    for (const c of changes) {
      if (c.added) adds += c.count ?? c.value.replace(/\n$/, "").split("\n").length;
      else if (c.removed) removes += c.count ?? c.value.replace(/\n$/, "").split("\n").length;
    }
    return { adds, removes };
  }, [changes]);

  const swap = useCallback(() => {
    setTextA(textB);
    setTextB(textA);
  }, [textA, textB]);

  const clear = useCallback(() => {
    setTextA("");
    setTextB("");
  }, []);

  const handleCopyDiff = useCallback(async () => {
    try {
      const lines: string[] = [];
      for (const c of changes) {
        if (c.added) {
          lines.push(...c.value.replace(/\n$/, "").split("\n").map((l) => `+ ${l}`));
        } else if (c.removed) {
          lines.push(...c.value.replace(/\n$/, "").split("\n").map((l) => `- ${l}`));
        } else {
          lines.push(...c.value.replace(/\n$/, "").split("\n").map((l) => `  ${l}`));
        }
      }
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [changes]);

  // Count unchanged lines for stats
  const unchangedCount = useMemo(() => {
    let count = 0;
    for (const c of changes) {
      if (!c.added && !c.removed) {
        count += c.count ?? c.value.replace(/\n$/, "").split("\n").length;
      }
    }
    return count;
  }, [changes]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      {/* Inputs */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
            原文 <span className="text-red-400">(A)</span>
          </label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="在此粘贴原文…"
            rows={8}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
            修改后 <span className="text-green-400">(B)</span>
          </label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder="在此粘贴修改后的文本…"
            rows={8}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {/* View toggle */}
        {changes.length > 0 && (
          <div className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-colors ${
                viewMode === "split"
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <Columns2 size={13} />
              分栏
            </button>
            <button
              type="button"
              onClick={() => setViewMode("unified")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-colors ${
                viewMode === "unified"
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <List size={13} />
              统一
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={swap}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <ArrowUpDown size={14} />
          交换上下
        </button>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Trash2 size={14} />
          清空
        </button>

        {changes.length > 0 && (
          <button
            type="button"
            onClick={handleCopyDiff}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            {copied ? "已复制" : "复制 Diff"}
          </button>
        )}

        {/* Stats */}
        {stats && (stats.adds > 0 || stats.removes > 0) && (
          <div className="ml-auto flex items-center gap-2 text-xs">
            {unchangedCount > 0 && (
              <span className="rounded bg-gray-100 px-2 py-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                {unchangedCount} 行未变
              </span>
            )}
            {stats.adds > 0 && (
              <span className="inline-flex items-center gap-0.5 rounded bg-green-100 px-2 py-1 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                <Plus size={10} />
                {stats.adds}
              </span>
            )}
            {stats.removes > 0 && (
              <span className="inline-flex items-center gap-0.5 rounded bg-red-100 px-2 py-1 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                <Minus size={10} />
                {stats.removes}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Diff result */}
      {changes.length > 0 && (
        viewMode === "split"
          ? <SplitView changes={changes} />
          : <UnifiedView changes={changes} />
      )}

      {/* Empty state */}
      {!textA && !textB && (
        <div className="rounded-lg border border-dashed border-gray-300 py-16 text-center dark:border-gray-600">
          <div className="mb-3 text-gray-300 dark:text-gray-600">
            <Columns2 size={40} className="mx-auto" />
          </div>
          <p className="mb-1 text-sm text-gray-400 dark:text-gray-500">
            在两侧输入文本后自动对比差异
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-600">
            支持行级和词级高亮
          </p>
        </div>
      )}

      {/* One side only — hint */}
      {(textA || textB) && changes.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center dark:border-gray-600">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {textA && !textB
              ? "请在右侧输入修改后的文本"
              : !textA && textB
                ? "请在左侧输入原文"
                : "两段文本完全相同，无差异"}
          </p>
        </div>
      )}
    </div>
  );
}
