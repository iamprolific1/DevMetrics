import "./styles.css";
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className={`bg-glassmorphism rounded-2xl shadow-md p-4 min-h-[250px]`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className={`mb-2 flex justify-between items-center`}>
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className={`grid grid-cols-3 gap-4 mt-4`}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className={`text-xl font-bold`}>
      {children}
    </h2>
  );
}