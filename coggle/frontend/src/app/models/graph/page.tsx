"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchApi } from "@/lib/api";
import type { ModelSummary, ModelRelation } from "@/types/content";
import { ArrowLeft, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

interface Node {
  slug: string;
  name: string;
  category: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Edge {
  source: string;
  target: string;
  type: string;
  label?: string | null;
}

// 类别颜色映射
const categoryColors: Record<string, string> = {
  "大语言模型": "#3b82f6",
  "计算机视觉": "#10b981",
  "自然语言处理": "#8b5cf6",
  "语音识别": "#f59e0b",
  "多模态": "#ef4444",
};

const defaultColor = "#6b7280";

// 关系类型颜色
const edgeColors: Record<string, string> = {
  evolution: "#3b82f6",
  variant: "#10b981",
  inspired_by: "#f59e0b",
};

export default function ModelGraphPage() {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const [models, setModels] = useState<ModelSummary[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  // 节点拖拽状态
  const dragRef = useRef<{
    slug: string;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    dragged: boolean;
  } | null>(null);

  // 画布平移状态
  const panRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    dragged: boolean;
  } | null>(null);

  useEffect(() => {
    fetchApi<Record<string, ModelSummary[]>>("/models")
      .then((data) => {
        const allModels = Object.values(data).flat();
        setModels(allModels);

        // 构建节点
        const nodeList: Node[] = allModels.map((m, i) => {
          const angle = (2 * Math.PI * i) / allModels.length;
          const radius = 200;
          return {
            slug: m.slug,
            name: m.name,
            category: m.category,
            x: 400 + radius * Math.cos(angle),
            y: 300 + radius * Math.sin(angle),
            vx: 0,
            vy: 0,
          };
        });

        // 构建边
        const edgeList: Edge[] = [];
        const seen = new Set<string>();
        for (const m of allModels) {
          for (const rel of m.relations || []) {
            const key = [m.slug, rel.target].sort().join("->");
            if (!seen.has(key)) {
              seen.add(key);
              edgeList.push({
                source: m.slug,
                target: rel.target,
                type: rel.type,
                label: rel.label,
              });
            }
          }
        }

        setNodes(nodeList);
        setEdges(edgeList);
        setLoading(false);

        // 简单力导向布局迭代
        let currentNodes = [...nodeList];
        for (let iter = 0; iter < 100; iter++) {
          const alpha = 1 - iter / 100;
          // 排斥力
          for (let i = 0; i < currentNodes.length; i++) {
            for (let j = i + 1; j < currentNodes.length; j++) {
              const dx = currentNodes[j].x - currentNodes[i].x;
              const dy = currentNodes[j].y - currentNodes[i].y;
              const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
              const force = (5000 / (dist * dist)) * alpha;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              currentNodes[i].vx -= fx;
              currentNodes[i].vy -= fy;
              currentNodes[j].vx += fx;
              currentNodes[j].vy += fy;
            }
          }
          // 吸引力（沿边）
          for (const edge of edgeList) {
            const si = currentNodes.findIndex((n) => n.slug === edge.source);
            const ti = currentNodes.findIndex((n) => n.slug === edge.target);
            if (si === -1 || ti === -1) continue;
            const dx = currentNodes[ti].x - currentNodes[si].x;
            const dy = currentNodes[ti].y - currentNodes[si].y;
            const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
            const force = (dist / 50) * alpha;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            currentNodes[si].vx += fx;
            currentNodes[si].vy += fy;
            currentNodes[ti].vx -= fx;
            currentNodes[ti].vy -= fy;
          }
          // 居中引力
          for (const n of currentNodes) {
            n.vx += (400 - n.x) * 0.001 * alpha;
            n.vy += (300 - n.y) * 0.001 * alpha;
            n.x += n.vx;
            n.y += n.vy;
            n.vx *= 0.9;
            n.vy *= 0.9;
          }
        }
        setNodes([...currentNodes]);
      })
      .catch(() => setLoading(false));
  }, []);

  function getNode(slug: string) {
    return models.find((m) => m.slug === slug);
  }

  function svgPoint(clientX: number, clientY: number): { x: number; y: number } {
    const svg = svgRef.current;
    if (!svg) return { x: clientX, y: clientY };
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.getAttribute("viewBox")?.split(" ").map(Number) || [0, 0, 800, 600];
    return {
      x: ((clientX - rect.left) / rect.width) * viewBox[2] + viewBox[0],
      y: ((clientY - rect.top) / rect.height) * viewBox[3] + viewBox[1],
    };
  }

  // 节点拖拽
  const handleNodePointerDown = useCallback((e: React.PointerEvent, slug: string) => {
    e.stopPropagation();
    const svg = svgRef.current;
    if (!svg) return;
    svg.setPointerCapture(e.pointerId);
    const node = nodesRef.current.find((n) => n.slug === slug);
    if (!node) return;
    dragRef.current = {
      slug,
      startX: e.clientX,
      startY: e.clientY,
      originX: node.x,
      originY: node.y,
      dragged: false,
    };
  }, []);

  // 画布平移
  const handleCanvasPointerDown = useCallback((e: React.PointerEvent) => {
    // 仅在点击空白区域时平移
    if (e.target !== e.currentTarget && (e.target as Element).closest("g")) return;
    const svg = svgRef.current;
    if (!svg) return;
    svg.setPointerCapture(e.pointerId);
    panRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: panOffset.x,
      originY: panOffset.y,
      dragged: false,
    };
  }, [panOffset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    // 节点拖拽
    const drag = dragRef.current;
    if (drag) {
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (!drag.dragged && Math.abs(dx) + Math.abs(dy) > 5) {
        drag.dragged = true;
      }
      if (drag.dragged) {
        const pt = svgPoint(e.clientX, e.clientY);
        const originPt = svgPoint(drag.startX, drag.startY);
        setNodes((prev) =>
          prev.map((n) =>
            n.slug === drag.slug
              ? { ...n, x: drag.originX + pt.x - originPt.x, y: drag.originY + pt.y - originPt.y }
              : n,
          ),
        );
      }
      return;
    }
    // 画布平移
    const pan = panRef.current;
    if (!pan) return;
    const dx = e.clientX - pan.startX;
    const dy = e.clientY - pan.startY;
    if (!pan.dragged && Math.abs(dx) + Math.abs(dy) > 5) {
      pan.dragged = true;
    }
    if (pan.dragged) {
      setPanOffset({ x: pan.originX + dx, y: pan.originY + dy });
    }
  }, []);

  const handlePointerUp = useCallback(
    (_e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (drag) {
        const wasDragged = drag.dragged;
        dragRef.current = null;
        if (!wasDragged) {
          router.push(`/models/${drag.slug}`);
        }
        return;
      }
      const pan = panRef.current;
      if (pan) {
        panRef.current = null;
      }
    },
    [router],
  );

  const edgePaths = edges.map((edge, i) => {
    const source = nodes.find((n) => n.slug === edge.source);
    const target = nodes.find((n) => n.slug === edge.target);
    if (!source || !target) return null;
    return (
      <g key={`edge-${i}`}>
        <line
          x1={source.x}
          y1={source.y}
          x2={target.x}
          y2={target.y}
          stroke={edgeColors[edge.type] || "#9ca3af"}
          strokeWidth={hoveredSlug === edge.source || hoveredSlug === edge.target ? 2.5 : 1.5}
          strokeOpacity={hoveredSlug && hoveredSlug !== edge.source && hoveredSlug !== edge.target ? 0.15 : 0.5}
          strokeDasharray={edge.type === "inspired_by" ? "6,3" : "none"}
          markerEnd="url(#arrowhead)"
          className="transition-all duration-200"
        />
        {edge.label && (
          <text
            x={(source.x + target.x) / 2}
            y={(source.y + target.y) / 2 - 6}
            textAnchor="middle"
            fontSize={10}
            fill="#9ca3af"
            className="pointer-events-none"
          >
            {edge.label}
          </text>
        )}
      </g>
    );
  });

  const nodeCircles = nodes.map((node) => {
    const model = getNode(node.slug);
    const isHovered = hoveredSlug === node.slug;
    const isDimmed = hoveredSlug && !isHovered &&
      !edges.some((e) => (e.source === hoveredSlug && e.target === node.slug) || (e.target === hoveredSlug && e.source === node.slug));
    const r = isHovered ? 28 : 22;
    return (
      <g
        key={node.slug}
        className="transition-all duration-200"
        style={{ cursor: "grab" }}
        onPointerDown={(e) => handleNodePointerDown(e, node.slug)}
      >
        <circle
          cx={node.x}
          cy={node.y}
          r={r}
          fill={categoryColors[node.category] || defaultColor}
          fillOpacity={isDimmed ? 0.2 : 0.9}
          stroke={isHovered ? "#fff" : "none"}
          strokeWidth={isHovered ? 3 : 0}
          className="transition-all duration-200 hover:brightness-110"
          onMouseEnter={() => setHoveredSlug(node.slug)}
          onMouseLeave={() => setHoveredSlug(null)}
        />
        <text
          x={node.x}
          y={node.y + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={isHovered ? 9 : 8}
          fill="#fff"
          fontWeight={600}
          className="pointer-events-none select-none"
        >
          {node.name.length > 8 ? node.name.slice(0, 7) + "…" : node.name}
        </text>
        {/* 悬浮提示标签 */}
        {isHovered && (
          <g>
            <rect
              x={node.x - 80}
              y={node.y - r - 28}
              width={160}
              height={22}
              rx={4}
              fill="#1f2937"
              opacity={0.95}
            />
            <text
              x={node.x}
              y={node.y - r - 13}
              textAnchor="middle"
              fontSize={11}
              fill="#fff"
              className="pointer-events-none"
            >
              {node.name} · {node.category}
            </text>
          </g>
        )}
      </g>
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Link
            href="/models"
            className="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <ArrowLeft size={14} />
            返回模型
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            模型关系图
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            拖拽节点移动位置，拖拽空白平移画布。实线=演进，虚线=启发
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setScale((s) => Math.min(s + 0.2, 3))}
            className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
            title="放大"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={() => setScale((s) => Math.max(s - 0.2, 0.3))}
            className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
            title="缩小"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={() => { setScale(1); setPanOffset({ x: 0, y: 0 }); }}
            className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
            title="重置"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* 图例 */}
      <div className="mb-4 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <span key={cat} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            {cat}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 bg-blue-500" />
          演进关系
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 border-b border-dashed border-yellow-500" />
          启发关系
        </span>
      </div>

      {/* SVG 画布 */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        {loading ? (
          <div className="flex h-[500px] items-center justify-center text-sm text-gray-400">
            加载中...
          </div>
        ) : (
          <svg
            ref={svgRef}
            viewBox={`${panOffset.x} ${panOffset.y} 800 600`}
            className="h-auto w-full select-none"
            style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
            onPointerDown={handleCanvasPointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#9ca3af" />
              </marker>
            </defs>
            {edgePaths}
            {nodeCircles}
          </svg>
        )}
      </div>
    </div>
  );
}
