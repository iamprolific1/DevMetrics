import "./styles.css";
import clsx from "clsx";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        "p-5 min-h-[240px] transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mb-3 flex items-center justify-between", className)}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mt-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={clsx("text-xl font-semibold tracking-tight", className)}>
      {children}
    </h2>
  );
}
