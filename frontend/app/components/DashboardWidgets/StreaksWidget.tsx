import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { FaFire, FaMedal } from "react-icons/fa";

const user = {
    activeStreak: 5,
    longestStreak: 12
}

export default function StreaksWidget() {
    return (
        <Card className="bg-gradient-to-br from-slate-900/60 via-amber-900/10 to-slate-900/70">
            <CardHeader>
                <CardTitle className="text-lg">Streaks & Active Days</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                        <FaFire className="text-orange-300 text-2xl" />
                        <div>
                            <p className="text-2xl font-semibold">{user.activeStreak}</p>
                            <span className="text-xs text-slate-300">Current Streak (days)</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                        <FaMedal className="text-amber-300 text-2xl" />
                        <div>
                            <p className="text-2xl font-semibold">{user.longestStreak}</p>
                            <span className="text-xs text-slate-300">Longest Streak</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
