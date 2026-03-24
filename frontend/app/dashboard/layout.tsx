
import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function DashboardLayout({
    children
}: { children: React.ReactNode}) {
    return (
        <section className={`${space.className} min-h-screen text-slate-100 bg-[#0b0e14] relative overflow-hidden`}>
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-teal-500/20 via-cyan-400/10 to-transparent blur-3xl" />
            <div className="absolute top-1/2 -right-40 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-indigo-500/15 via-sky-400/10 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-rose-500/10 via-amber-400/10 to-transparent blur-3xl" />
            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
}
