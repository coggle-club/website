"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logPageView } from "@/lib/logger";

/**
 * 页面访问追踪组件 — 在路由变化时记录页面访问日志。
 * 需放在 layout 中（client component wrapper）。
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    logPageView(pathname);
  }, [pathname]);

  return null;
}
