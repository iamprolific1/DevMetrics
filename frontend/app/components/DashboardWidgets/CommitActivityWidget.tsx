"use client";
import { useState } from "react";
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

  const commitData: { [key: number]: number[] } = {
    7: [3, 5, 2, 8, 6, 4, 7],
    30: [
      4, 6, 3, 7, 8, 5, 6, 9, 4, 3, 7, 6, 8, 5, 4, 3, 6, 7, 8, 5, 4, 3, 7, 6, 8,
      5, 4, 3, 6, 7,
    ],
  };

  const chartData: ChartData<"line"> = {
    labels:
      daysRange === 7
        ? ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
        : Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Commits",
        data: commitData[daysRange],
        backgroundColor: "rgba(58, 132, 255, 0.2)",
        borderColor: "#3A84FF",
        borderWidth: 2,
        pointBackgroundColor: "#3A84FF",
        pointRadius: 4,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commit Activity</CardTitle>
        <div className="flex gap-2">
          <Button
            className={`${
              daysRange === 7
                ? "bg-[#7DF9FF] text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setDaysRange(7)}
          >
            7 Days
          </Button>
          <Button
            className={`${
              daysRange === 30
                ? "bg-[#7DF9FF] text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setDaysRange(30)}
          >
            30 Days
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, ticks: { color: "#A0AEC0" } },
              x: { ticks: { color: "#A0AEC0" } },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
