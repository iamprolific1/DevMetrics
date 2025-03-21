

export default function DashboardLayout({
    children
}: { children: React.ReactNode}) {
    return (
        <section className="flex h-screen bg-gray-900 text-white">
            {children}
        </section>
    );
}