"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, Home, BarChart, Settings } from "lucide-react";
import Profile2 from '@/public/profile-11.jpg';
import UserInfoWidget from "@/app/components/DashboardWidgets/UserInfoWidget";
import CommitActivityWidget from "@/app/components/DashboardWidgets/CommitActivityWidget";
import StreaksWidget from "@/app/components/DashboardWidgets/StreaksWidget";
import TimeSpentWidget from "@/app/components/DashboardWidgets/TimeSpentWidget";
import { FaBook } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

const user = {
    topRepos: [
        { name: "devmetrics-dashboard", commits: 56 },
        { name: "nextjs-auth-api", commits: 34 },
        { name: "prisma-backend", commits: 28 },
    ]
}

export default function Dashboard() {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    return (
        <>
            {/* Sidebar */}
            <aside
            className={`${
                isSidebarOpen ? "w-64" : "w-20"
            } transition-all duration-300 p-4 bg-gray-800 border-r border-gray-700`}
            >
                <button
                    className="mb-4"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <Menu />
                </button>
                <nav className="flex flex-col gap-4">
                    <a href="#" className="flex items-center gap-2">
                        <Home /> {isSidebarOpen && "Dashboard"}
                    </a>
                    <a href="#" className="flex items-center gap-2">
                        <BarChart /> {isSidebarOpen && "Analytics"}
                    </a>
                    <a href="#" className="flex items-center gap-2">
                        <Settings /> {isSidebarOpen && "Settings"}
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
            {/* Navbar */}
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">DevMetrics Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm">Welcome, Abdulmalik!</span>
                    <Image
                        src={Profile2}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                        width={40}
                        height={40}
                    />
                    <IoMdNotifications className="text-2xl cursor-pointer" />
                </div>
            </header>

            {/* Dashboard Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <UserInfoWidget />
                </div>
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <CommitActivityWidget />
                </div>
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <StreaksWidget />
                </div>
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <TimeSpentWidget />
                </div>
            </div>

            {/* Top repositories widget */}
            <div className="mt-6">
                <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                <FaBook className="text-purple-400 text-2xl" /> Top Repositories
                </h3>
                <ul className="text-sm text-gray-400 space-y-2">
                {user.topRepos.map((repo, index) => (
                    <li
                    key={index}
                    className="flex justify-between items-center p-3 rounded-lg shadow-md transition-transform transform hover:scale-[1.03] hover:shadow-lg hover:bg-gray-700 duration-300 cursor-pointer"
                    >
                    <span className="text-[#7DF9FF] font-semibold">
                        {repo.name}
                    </span>
                    <span className="text-gray-300 font-medium">
                        {repo.commits} commits
                    </span>
                    </li>
                ))}
                </ul>
            </div>
            </main>
        </>
    );
}