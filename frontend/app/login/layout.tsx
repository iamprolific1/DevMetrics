export default function LoginLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <section className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-6">
            <div className="max-w-4xl w-full bg-gray-800 p-10 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
                {children}
            </div>
        </section>
    );
}