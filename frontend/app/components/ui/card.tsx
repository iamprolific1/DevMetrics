import { cn } from "../../lib/utils";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Card({ title, children, className }: CardProps) {
  return (
    <div
      className={cn(
        "p-4 bg-gray-800 border border-gray-700 rounded-2xl shadow-md",
        className
      )}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-200 mb-2">{title}</h3>
      )}
      {children}
    </div>
  );
}
