/**
 * Frontend logger — logs page visits and API interactions to console
 * and sends to backend for file persistence.
 * Only active in development by default.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

const isDev = process.env.NODE_ENV === "development";

export function getBrowserInfo(): Record<string, string> {
  if (typeof window === "undefined") return {};
  return {
    url: window.location.href,
    referrer: document.referrer || "-",
    userAgent: navigator.userAgent,
    screen: `${window.screen.width}x${window.screen.height}`,
  };
}

function sendToBackend(level: string, message: string) {
  // 仅在浏览器端发送，SSR/SSG 时跳过
  if (typeof window === "undefined") return;
  fetch(`${API_BASE}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level, message }),
  }).catch(() => {
    /* 静默失败 */
  });
}

export function logPageView(page: string) {
  const info = getBrowserInfo();
  const msg = `[PageView] ${page} | ref: ${info.referrer ?? "-"} | ua: ${info.userAgent ?? "-"}`;
  if (isDev) console.log(msg);
  sendToBackend("INFO", msg);
}

export function logApiCall(method: string, endpoint: string, status: number) {
  // 不记录日志接口自身的调用
  if (endpoint === "/logs") return;
  const info = getBrowserInfo();
  const msg = `[API] ${method} ${endpoint} ${status} | ua: ${info.userAgent ?? "-"}`;
  if (isDev) console.log(msg);
  sendToBackend("INFO", msg);
}
