"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Button from "@/app/components/ui/button";
import axiosInstance from "@/app/api/axiosInstance";

export default function CommitActivityWidget() {
  const [weeksRange, setWeeksRange] = useState(12);
  const [commits, setCommits] = useState<any[]>([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const { data } = await axiosInstance.get("/auth/commits");
        setCommits(data);
      } catch (err) {
        console.error("failed to fetch commits: ", err);
      }
    };
    fetchCommits();
  }, []);

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const buildHeatmap = (weeks: number) => {
    const today = new Date();
    const totalDays = weeks * 7;
    const start = new Date(today);
    start.setDate(today.getDate() - (totalDays - 1));
    const startDay = start.getDay();
    start.setDate(start.getDate() - startDay);

    const end = new Date(today);
    const dayMap = new Map<string, number>();
    commits.forEach((commit) => {
      const commitDate = new Date(commit.timestamp);
      const key = formatDateKey(commitDate);
      dayMap.set(key, (dayMap.get(key) ?? 0) + 1);
    });

    const days: { date: Date | null; count: number }[] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      const key = formatDateKey(cursor);
      days.push({ date: new Date(cursor), count: dayMap.get(key) ?? 0 });
      cursor.setDate(cursor.getDate() + 1);
    }

    while (days.length % 7 !== 0) {
      days.push({ date: null, count: 0 });
    }

    const weeksGrid: { date: Date | null; count: number }[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeksGrid.push(days.slice(i, i + 7));
    }

    const maxCount = Math.max(1, ...days.map((d) => d.count));
    return { weeksGrid, maxCount };
  };

  const { weeksGrid, maxCount } = buildHeatmap(weeksRange);
  const totalCommits = commits.length;
  const avgPerDay = (totalCommits / (weeksRange * 7)).toFixed(1);

  const monthLabels = (() => {
    return weeksGrid.map((week) => {
      const firstDay = week.find((d) => d.date)?.date;
      if (!firstDay) return "";
      return firstDay.toLocaleString("en-US", { month: "short" });
    });
  })();

  return (
    <Card className="bg-gradient-to-br from-slate-900/60 via-indigo-900/20 to-slate-900/60">
      <CardHeader className="items-start gap-3">
        <div>
          <CardTitle className="text-lg">Commit Activity</CardTitle>
          <p className="text-xs text-slate-300">
            Heatmap of your daily coding rhythm
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className={`${
              weeksRange === 12
                ? "bg-teal-400/20 text-teal-100 border border-teal-300/30"
                : "bg-white/5 text-slate-300 border border-white/10"
            }`}
            onClick={() => setWeeksRange(12)}
          >
            12 Weeks
          </Button>
          <Button
            className={`${
              weeksRange === 26
                ? "bg-teal-400/20 text-teal-100 border border-teal-300/30"
                : "bg-white/5 text-slate-300 border border-white/10"
            }`}
            onClick={() => setWeeksRange(26)}
          >
            26 Weeks
          </Button>
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 mb-4">
            <span>
              {totalCommits} commits • {avgPerDay} avg/day
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px]">Less</span>
              <div className="flex gap-1">
                {[
                  "bg-white/5",
                  "bg-teal-400/20",
                  "bg-teal-400/40",
                  "bg-teal-400/70",
                  "bg-teal-400",
                ].map((bg) => (
                  <span
                    key={bg}
                    className={`h-3 w-3 rounded-[4px] border border-white/10 ${bg}`}
                  />
                ))}
              </div>
              <span className="text-[11px]">More</span>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <div className="flex flex-col gap-1 text-[10px] text-slate-400 pr-2">
              <span className="h-4" />
              <span className="h-4 flex items-center">Mon</span>
              <span className="h-4 flex items-center" />
              <span className="h-4 flex items-center">Wed</span>
              <span className="h-4 flex items-center" />
              <span className="h-4 flex items-center">Fri</span>
              <span className="h-4 flex items-center" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 text-[10px] text-slate-400">
                {weeksGrid.map((week, weekIndex) => (
                  <span key={`m-${weekIndex}`} className="w-4 text-center">
                    {weekIndex === 0 || monthLabels[weekIndex] !== monthLabels[weekIndex - 1]
                      ? monthLabels[weekIndex]
                      : ""}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {weeksGrid.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-1">
                    {week.map((day, dayIndex) => {
                      const intensity = day.count / maxCount;
                      const level =
                        day.count === 0
                          ? "bg-white/5"
                          : intensity < 0.25
                          ? "bg-teal-400/20"
                          : intensity < 0.5
                          ? "bg-teal-400/40"
                          : intensity < 0.75
                          ? "bg-teal-400/70"
                          : "bg-teal-400";

                      const title = day.date
                        ? `${day.count} commit${day.count === 1 ? "" : "s"} on ${
                            day.date.toDateString()
                          }`
                        : "No data";

                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          title={title}
                          className={`h-4 w-4 rounded-[4px] border border-white/10 ${level}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
