import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { Components } from "react-markdown";
import MermaidRenderer from "@/components/content/MermaidRenderer";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function isMermaidCode(className?: string): boolean {
  return typeof className === "string" && className.includes("language-mermaid");
}

const components: Partial<Components> = {
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  iframe: ({ src, title, ...props }) => {
    // rehype-raw passes boolean HTML attrs as strings; normalize for React
    const { allowFullScreen: _allowFullScreen, ...rest } = props;
    return (
      <div className="relative mx-auto my-6 aspect-video w-full max-w-3xl">
        <iframe
          src={src}
          title={title || "Embedded content"}
          className="h-full w-full rounded-lg"
          allowFullScreen
          {...rest}
        />
      </div>
    );
  },
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      className="mx-auto my-6 rounded-lg"
      loading="lazy"
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    if (isMermaidCode(className)) {
      return (
        <div className="not-prose" data-mermaid-block="true">
          <MermaidRenderer chart={String(children)} />
        </div>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
