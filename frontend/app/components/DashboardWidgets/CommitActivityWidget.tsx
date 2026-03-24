"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData } from "chart.js";
import Button from "@/app/components/ui/button";

import axiosInstance from "@/app/api/axiosInstance";

// Register the components you need
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function CommitActivityWidget() {
  const [daysRange, setDaysRange] = useState(7);
  const [commits, setCommits] = useState<any[]>([]);

  useEffect(()=> {
    const fetchCommits = async()=> {
      try {
        const { data } = await axiosInstance.get("/auth/commits");
        console.log(data);
        setCommits(data);
      } catch(err) {
        console.error("failed to fetch commits: ", err);
      }
    }
    fetchCommits()
  }, []);


  const getCommitCounts = (days: number) => {
    const today = new Date();
    const counts: number[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      const count = commits.filter((commit) => {
        const commitDate = new Date(commit.timestamp);
        return (
          commitDate.toDateString() === date.toDateString()
        );
      }).length;

      counts.push(count);
    }

    return counts;
  };

  const chartData: ChartData<"line"> = {
    labels:
      daysRange === 7
        ? ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
        : Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Commits",
        data: getCommitCounts(daysRange),
        backgroundColor: "rgba(58, 132, 255, 0.2)",
        borderColor: "#3A84FF",
        borderWidth: 2,
        pointBackgroundColor: "#3A84FF",
        pointRadius: 4,
      },
    ],
  };




  return (
    <Card className="bg-gradient-to-br from-slate-900/60 via-indigo-900/20 to-slate-900/60">
      <CardHeader className="items-start gap-3">
        <div>
          <CardTitle className="text-lg">Commit Activity</CardTitle>
          <p className="text-xs text-slate-300">Your momentum across time windows</p>
        </div>
        <div className="flex gap-2">
          <Button
            className={`${
              daysRange === 7
                ? "bg-teal-400/20 text-teal-100 border border-teal-300/30"
                : "bg-white/5 text-slate-300 border border-white/10"
            }`}
            onClick={() => setDaysRange(7)}
          >
            7 Days
          </Button>
          <Button
            className={`${
              daysRange === 30
                ? "bg-teal-400/20 text-teal-100 border border-teal-300/30"
                : "bg-white/5 text-slate-300 border border-white/10"
            }`}
            onClick={() => setDaysRange(30)}
          >
            30 Days
          </Button>
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { color: "#94A3B8" },
                  grid: { color: "rgba(148,163,184,0.15)" },
                },
                x: {
                  ticks: { color: "#94A3B8" },
                  grid: { color: "rgba(148,163,184,0.08)" },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
