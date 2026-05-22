import Link from "next/link";

const footerLinks = [
  {
    title: "内容",
    links: [
      { href: "/competitions", label: "竞赛" },
      { href: "/blog", label: "博客" },
      { href: "/tutorials", label: "教程" },
      { href: "/models", label: "模型" },
    ],
  },
  {
    title: "资源",
    links: [
      { href: "/links", label: "常见链接" },
      { href: "/tools", label: "工具" },
      { href: "/apps", label: "应用" },
    ],
  },
  {
    title: "关于",
    links: [
      { href: "/about", label: "关于 Coggle" },
      { href: "/privacy", label: "隐私政策" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Coggle Community. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
