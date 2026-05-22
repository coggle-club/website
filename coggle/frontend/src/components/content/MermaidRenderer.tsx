"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  chart: string;
}

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

function getTheme(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

async function renderChart(
  el: HTMLElement,
  chart: string,
  theme: "light" | "dark",
) {
  if (!chart.trim()) return;

  mermaid.initialize({
    startOnLoad: false,
    theme: theme === "dark" ? "dark" : "default",
    securityLevel: "loose",
  });

  const id = `m-${Math.random().toString(36).slice(2, 9)}`;
  const { svg } = await mermaid.render(id, chart);
  el.innerHTML = svg;
}

export default function MermaidRenderer({ chart }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const renderIdRef = useRef(0);

  // Observe <html> class changes for dark mode switching
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(getTheme());
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Re-render chart when theme or chart content changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    setHasError(false);

    const id = ++renderIdRef.current;

    renderChart(el, chart, theme)
      .then(() => {
        // Stale render — ignore
      })
      .catch(() => {
        if (renderIdRef.current === id) {
          setHasError(true);
        }
      });
  }, [chart, theme]);

  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(s + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(s - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setScale((s) => {
      const next = s + delta;
      return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next));
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({
      x: posStart.current.x + dx,
      y: posStart.current.y + dy,
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  if (hasError) {
    return (
      <div className="my-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
        <pre className="whitespace-pre-wrap">{chart}</pre>
      </div>
    );
  }

  return (
    <div className="not-prose group relative my-6">
      {/* Toolbar */}
      <div className="absolute right-2 top-2 z-10 flex gap-1 rounded-lg border border-gray-200 bg-white/90 p-1 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-900/90">
        <button
          type="button"
          onClick={zoomIn}
          className="rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          title="放大"
        >
          +
        </button>
        <span className="flex items-center px-1 text-xs text-gray-400 dark:text-gray-500">
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          onClick={zoomOut}
          className="rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          title="缩小"
        >
          &minus;
        </button>
        <button
          type="button"
          onClick={resetView}
          className="rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          title="重置"
        >
          重置
        </button>
      </div>

      {/* Zoomable content area */}
      <div
        className="flex justify-center bg-white dark:bg-gray-900"
        onWheel={handleWheel}
      >
        <div
          ref={contentRef}
          className="cursor-grab active:cursor-grabbing"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center",
            transition: isDragging.current ? "none" : "transform 0.15s ease",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div ref={containerRef} />
        </div>
      </div>
    </div>
  );
}
