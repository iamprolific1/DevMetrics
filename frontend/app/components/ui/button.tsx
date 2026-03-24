import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  isLoading,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center cursor-pointer gap-2 px-4 py-2 rounded-xl font-medium transition-all",
        {
          "bg-primary text-white hover:bg-opacity-90": variant === "primary",
          "bg-secondary text-white hover:bg-opacity-90":
            variant === "secondary",
          "border border-gray-500 text-gray-300 hover:bg-gray-800":
            variant === "outline",
          "opacity-50 cursor-not-allowed": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
}
