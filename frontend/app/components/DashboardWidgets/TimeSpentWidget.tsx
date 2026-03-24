import { FaClock } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

const user = {
    timeSpentHours: 32
}
export default function TimeSpentWidget(){
    return (
        <Card className="bg-gradient-to-br from-slate-900/60 via-cyan-900/10 to-slate-900/70">
            <CardHeader>
                <CardTitle className="text-lg">Time Spent Coding</CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
                <div className="flex items-center gap-4">
                    <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4">
                        <FaClock className="text-cyan-300 text-2xl" />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">{user.timeSpentHours} hrs</p>
                        <span className="text-xs text-slate-300">Total time recorded this month</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
