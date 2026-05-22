"use client";

import { useState } from "react";
import { MessageCircle, Newspaper } from "lucide-react";

const qrItems = [
  {
    id: "official",
    label: "公众号",
    src: "https://cdn.coggle.club/coggle_qrcode.jpg",
    icon: Newspaper,
    btnBg: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500",
    btnText: "text-white",
    labelColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "assistant",
    label: "小助手微信",
    src: "https://cdn.coggle.club/coggle101_qrcode.jpeg",
    icon: MessageCircle,
    btnBg: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500",
    btnText: "text-white",
    labelColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export default function FloatingQr() {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);

  const active = qrItems.find((i) => i.id === hoverId);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover */}
      {active && (
        <div className="mb-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <p className={`mb-2 text-center text-sm font-medium ${active.labelColor}`}>
            {active.label}
          </p>
          {imgError === active.id ? (
            <div className="flex h-56 w-44 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400 dark:bg-gray-800">
              二维码加载失败
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={active.src}
              alt={active.label}
              width={176}
              height={224}
              className="h-56 w-44 rounded-lg"
              onError={() => setImgError(active.id)}
            />
          )}
          <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
            扫码{active.id === "assistant" ? "添加小助手" : "关注公众号"}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        {qrItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => setHoverId(item.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(item.id)}
              onBlur={() => setHoverId(null)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 shadow-md transition-all hover:shadow-lg ${item.btnBg} ${item.btnText}`}
              title={item.label}
            >
              <Icon size={16} />
              <span className="hidden text-xs font-medium sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
