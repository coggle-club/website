"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/common/ThemeToggle";

const mainLinks = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/tutorials", label: "教程" },
  { href: "/competitions", label: "竞赛" },
  { href: "/models", label: "模型" },
];

const dropdownLinks = [
  { href: "/links", label: "常见链接" },
  { href: "/tools", label: "在线工具" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const isDropdownActive = dropdownLinks.some((l) => isActive(l.href));

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary-600">Coggle</span>
          <span className="hidden text-sm text-gray-500 dark:text-gray-400 sm:inline">
            专业的数据科学、大模型和数据竞赛社区
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400",
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isDropdownActive
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400",
              )}
            >
              其他
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform",
                  dropdownOpen && "rotate-180",
                )}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-4 py-2 text-sm transition-colors",
                      isActive(link.href)
                        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="ml-2 border-l border-gray-200 pl-2 dark:border-gray-700">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile right section */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-96 border-t border-gray-200 dark:border-gray-800" : "max-h-0",
        )}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {[...mainLinks, ...dropdownLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                isActive(link.href)
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400",
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
