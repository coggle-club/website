import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "bg-primary-600 text-white hover:bg-primary-700": variant === "primary",
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50":
            variant === "secondary",
          "text-gray-700 hover:bg-gray-100": variant === "ghost",
        },
        {
          "px-2.5 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
