"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Home, BarChart, Settings, X } from "lucide-react";
import Profile2 from '@/public/profile-11.jpg';
import UserInfoWidget from "@/app/components/DashboardWidgets/UserInfoWidget";
import CommitActivityWidget from "@/app/components/DashboardWidgets/CommitActivityWidget";
import StreaksWidget from "@/app/components/DashboardWidgets/StreaksWidget";
import TimeSpentWidget from "@/app/components/DashboardWidgets/TimeSpentWidget";
import { FaBook } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

import { User } from "@/app/components/DashboardWidgets/UserInfoWidget";
import axiosInstance from "../api/axiosInstance";


export default function Dashboard() {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(()=> {
        const fetchUser = async() => {
            try {
                const { data } = await axiosInstance.get("/auth/me");
                console.log(data.user)
                setUser(data.user);
            } catch (error) {
                console.error("User not authenticated: ", error);
            }
        }
        fetchUser();
    }, []);

    const topRepos = user?.topRepos ?? [];
    const maxCommits = Math.max(1, ...topRepos.map((repo) => Number(repo.commits || 0)));

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-72 lg:w-64 border-r border-white/10 bg-slate-950/70 backdrop-blur-xl p-6 transform transition-transform duration-300 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:static`}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="text-lg font-semibold tracking-wide">
                        DevMetrics
                        <span className="ml-2 text-xs text-teal-300 bg-teal-400/10 border border-teal-400/30 px-2 py-0.5 rounded-full">
                            Focus
                        </span>
                    </div>
                    <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                        <X className="text-slate-300" />
                    </button>
                </div>
                <nav className="flex flex-col gap-2 text-sm">
                    <a className="flex items-center gap-3 rounded-xl px-3 py-2 bg-white/5 border border-white/10 text-slate-100" href="/dashboard">
                        <Home className="text-teal-300" /> Dashboard
                    </a>
                    <a className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/10 transition" href="#">
                        <BarChart /> Analytics
                    </a>
                    <a className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/10 transition" href="#">
                        <Settings /> Settings
                    </a>
                </nav>

                <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4">
                    <p className="text-xs text-slate-300 mb-2">Today’s Focus</p>
                    <p className="text-sm font-medium">Ship one meaningful PR</p>
                    <button className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-xs text-slate-200 hover:bg-white/10 transition">
                        Update goal
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 lg:ml-0">
                <header className="flex gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden rounded-xl border border-white/10 bg-white/5 p-2"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu />
                        </button>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                            <p className="text-sm text-slate-300">Welcome back, {user?.username || "Developer"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200 hover:bg-white/10 transition">
                            <FaBook className="text-teal-300" /> New snapshot
                        </button>
                        <div className="relative">
                            <IoMdNotifications className="text-2xl cursor-pointer text-slate-300" />
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-teal-400" />
                        </div>
                        <div className="p-[2px] rounded-full bg-gradient-to-tr from-teal-400 via-sky-400 to-indigo-400">
                            <Image
                                src={user?.avatarUrl || Profile2}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                                width={40}
                                height={40}
                            />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4">
                        <UserInfoWidget />
                    </div>
                    <div className="lg:col-span-8">
                        <CommitActivityWidget />
                    </div>
                    <div className="lg:col-span-4">
                        <StreaksWidget />
                    </div>
                    <div className="lg:col-span-4">
                        <TimeSpentWidget />
                    </div>
                    <div className="lg:col-span-4">
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-indigo-900/10 to-slate-900/70 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <FaBook className="text-teal-300 text-xl" /> Top Repositories
                                </h3>
                                <span className="text-xs text-slate-400">Last 30 days</span>
                            </div>
                            <div className="space-y-3">
                                {topRepos.length ? (
                                    topRepos.map((repo, index) => {
                                        const commitCount = Number(repo.commits || 0);
                                        const pct = Math.round((commitCount / maxCommits) * 100);
                                        return (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition"
                                            >
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-teal-200 font-medium">{repo.name}</span>
                                                    <span className="text-slate-300">{commitCount} commits</span>
                                                </div>
                                                <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-teal-400 to-sky-400"
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-slate-400">No repositories found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
