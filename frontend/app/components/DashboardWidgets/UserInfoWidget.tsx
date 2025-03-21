"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Avatar } from "@/app/components/ui/Avatar";

import {
  FaCodeBranch,
  FaCheckCircle,
  FaExclamationCircle,
  FaCog
} from "react-icons/fa";

const user = {
    avatarUrl: "https://avatars.githubusercontent.com/u/157180724?v=4",
    username: "ProlificDev",
    email: "prolificdev@example.com",
    totalCommits: 128,
    pullRequests: 28,
    issues: 24,
};

export default function UserInfoWidget() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar 
                        src={user.avatarUrl}
                        alt={user.username}
                        width={35}
                        height={35}
                    />
                    <div>
                        <CardTitle>{user.username}</CardTitle>
                        <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-white transition">
                    <FaCog className="text-2xl" />
                </button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center mt-6">
                    <FaCodeBranch className="text-[#7DF9FF] text-2xl" />
                    <p className="font-medium text-lg">{user.totalCommits}</p>
                    <span className="text-sm text-gray-400">Commits</span>
                </div>
                <div className="flex flex-col items-center mt-6">
                    <FaCheckCircle className="text-green-400 text-2xl" />
                    <p className="font-medium text-lg">{user.pullRequests}</p>
                    <span className="text-sm text-gray-400">PRs</span>
                </div>
                <div className="flex flex-col items-center mt-6">
                    <FaExclamationCircle className="text-red-400 text-2xl" />
                    <p className="font-medium text-lg">{user.issues}</p>
                    <span className="text-sm text-gray-400">Issues</span>
                </div>
            </CardContent>
        </Card>
    );
}