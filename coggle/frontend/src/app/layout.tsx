import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingQr from "@/components/layout/FloatingQr";
import PageViewTracker from "@/components/common/PageViewTracker";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Coggle",
    default: "Coggle - 专业的数据科学、大模型和数据竞赛社区",
  },
  description:
    "Coggle 专业的数据科学、大模型和数据竞赛社区，专注 Kaggle 竞赛、机器学习与深度学习内容分享。",
  keywords: [
    "Kaggle",
    "数据科学",
    "机器学习",
    "深度学习",
    "竞赛",
    "Coggle",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script charSet="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `LA.init({id:"3Q0xhijgV7mWFe4G",ck:"3Q0xhijgV7mWFe4G"})`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100" suppressHydrationWarning>
        <PageViewTracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingQr />
      </body>
    </html>
  );
}
