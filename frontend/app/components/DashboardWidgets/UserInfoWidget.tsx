"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Avatar } from "@/app/components/ui/Avatar";
import axiosInstance from "@/app/api/axiosInstance";

import {
  FaCodeBranch,
  FaCheckCircle,
  FaExclamationCircle,
  FaCog
} from "react-icons/fa";

export interface User {
    avatarUrl: string;
    email: string;
    name: string;
    username: string;
    totalCommits: number;
    pullRequests: number;
    issues: number;
    topRepos?: {
        name: string;
        commits: number;
    }[]
}


export default function UserInfoWidget() {
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
    return (
        <Card className="bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-teal-900/20 border-white/10">
            <CardHeader className="items-start">
                <div className="flex items-center gap-4">
                    <div className="p-[2px] rounded-full bg-gradient-to-tr from-teal-400 via-sky-400 to-indigo-400">
                        <Avatar 
                            src={user?.avatarUrl || ""}
                            alt={user?.username || ""}
                            width={42}
                            height={42}
                        />
                    </div>
                    <div>
                        <CardTitle className="text-lg">{user?.username || "John Doe"}</CardTitle>
                        <p className="text-xs text-slate-300">{user?.email || "johndoe@example.com"}</p>
                        <span className="inline-flex items-center mt-2 rounded-full bg-teal-500/15 text-teal-200 text-[11px] px-2 py-1 border border-teal-400/30">
                            Focus Mode
                        </span>
                    </div>
                </div>
                <button className="text-slate-300 hover:text-white transition">
                    <FaCog className="text-xl" />
                </button>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <FaCodeBranch className="text-teal-300 text-xl mx-auto" />
                    <p className="font-semibold text-lg">{user?.totalCommits ?? 0}</p>
                    <span className="text-xs text-slate-300">Commits</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <FaCheckCircle className="text-emerald-300 text-xl mx-auto" />
                    <p className="font-semibold text-lg">{user?.pullRequests ?? 0}</p>
                    <span className="text-xs text-slate-300">PRs</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <FaExclamationCircle className="text-rose-300 text-xl mx-auto" />
                    <p className="font-semibold text-lg">{user?.issues ?? 0}</p>
                    <span className="text-xs text-slate-300">Issues</span>
                </div>
            </CardContent>
        </Card>
    );
}
