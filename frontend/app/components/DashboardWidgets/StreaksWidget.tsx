import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { FaFire, FaMedal } from "react-icons/fa";

const user = {
    activeStreak: 5,
    longestStreak: 12
}

export default function StreaksWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Streaks & Active Days</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="flex flex-col items-center">
                    <FaFire className="text-orange-400 text-2xl" />
                    <p className="font-medium text-lg">{user.activeStreak} days</p>
                    <span className="text-sm text-gray-400">Current Streak</span>
                </div>
                <div className="flex flex-col items-center">
                    <FaMedal className="text-orange-400 text-2xl" />
                    <p className="font-medium text-lg">{user.longestStreak} days</p>
                    <span className="text-sm text-gray-400">Longest Streak</span>
                </div>
            </div>
        </Card>
    );
}