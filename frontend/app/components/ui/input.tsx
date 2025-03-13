import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

type InputProps = {
  label?: string;
  icon?: LucideIcon;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
  label,
  icon: Icon,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 w-5 h-5 text-gray-400" />}
        <input
          className={cn(
            "w-full p-2 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary",
            Icon ? "pl-10" : "",
            error ? "border-red-500" : "",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
