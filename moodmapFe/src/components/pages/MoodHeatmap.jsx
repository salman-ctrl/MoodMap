import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const generateMoodData = () => {
  const data = [];
  for (let week = 0; week < 16; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      weekData.push(Math.floor(Math.random() * 9) + 1);
    }
    data.push(weekData);
  }
  return data;
};

const getMoodColor = (mood) => {
  if (mood >= 8) return "bg-[#3454F5]";
  if (mood >= 6) return "bg-[#CBA6F7]";
  if (mood >= 4) return "bg-[#8386B0]";
  if (mood >= 2) return "bg-orange-300";
  return "bg-red-400";
};

const getMoodIntensity = (mood) => {
  if (mood >= 8) return "Excellent";
  if (mood >= 6) return "Good";
  if (mood >= 4) return "Neutral";
  if (mood >= 2) return "Low";
  return "Poor";
};

export default function MoodHeatmap() {
  const [filter, setFilter] = useState("month");
  const [moodData] = useState(generateMoodData());

  const getDataByFilter = () => {
    switch (filter) {
      case "week":
        return moodData.slice(0, 1);
      case "month":
        return moodData.slice(0, 4);
      case "semester":
        return moodData;
      default:
        return moodData.slice(0, 4);
    }
  };

  const displayData = getDataByFilter();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[#1C1E4A] mb-2">Mood Heatmap</h1>
            <p className="text-[#4B4E82]">
              Track your emotional patterns over time
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {["week", "month", "semester"].map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-xl transition-all ${
                  filter === f
                    ? "bg-gradient-to-r from-[#3454F5] to-[#CBA6F7] text-white shadow-lg shadow-[#3454F5]/25"
                    : "bg-white border border-[#8386B0]/30 text-[#4B4E82] hover:bg-[#CBA6F7]/10"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Insights Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="p-5 rounded-2xl border-[#8386B0]/20 shadow-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(52, 84, 245, 0.1) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#4B4E82] text-sm mb-1">Most Stable Month</p>
                <p className="text-[#1C1E4A]">September 2025</p>
                <p className="text-[#3454F5] text-xs mt-1">Avg. 7.8/10</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3454F5] to-[#3454F5]/80 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
          </Card>

          <Card
            className="p-5 rounded-2xl border-[#8386B0]/20 shadow-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(203, 166, 247, 0.1) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#4B4E82] text-sm mb-1">Stress Peak Period</p>
                <p className="text-[#1C1E4A]">Mid-October</p>
                <p className="text-orange-500 text-xs mt-1">Avg. 4.2/10</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
            </div>
          </Card>

          <Card
            className="p-5 rounded-2xl border-[#8386B0]/20 shadow-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(131, 134, 176, 0.1) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#4B4E82] text-sm mb-1">Overall Trend</p>
                <p className="text-[#1C1E4A]">Improving</p>
                <p className="text-[#3454F5] text-xs mt-1">+12% vs last month</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8386B0] to-[#4B4E82] flex items-center justify-center shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Heatmap */}
        <Card
          className="p-6 rounded-2xl border-[#8386B0]/20 shadow-sm"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="overflow-x-auto">
            <div className="min-w-[600px] space-y-3">
              {/* Day Headers */}
              <div className="flex gap-2 mb-4">
                <div className="w-20 text-xs text-[#4B4E82]"></div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, i) => (
                    <div
                      key={i}
                      className="w-16 text-center text-xs text-[#4B4E82]"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Heatmap Rows */}
              {displayData.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex gap-2 transition-all duration-500 ease-in-out"
                  style={{
                    animation: `fadeIn 0.5s ease-in-out ${weekIndex * 0.1}s both`,
                  }}
                >
                  <div className="w-20 text-xs text-[#4B4E82] flex items-center">
                    Week {weekIndex + 1}
                  </div>
                  {week.map((mood, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-16 h-16 rounded-xl ${getMoodColor(
                        mood
                      )} transition-all hover:scale-110 hover:shadow-xl cursor-pointer group relative`}
                      style={{
                        boxShadow:
                          mood >= 7
                            ? "0 4px 12px rgba(52, 84, 245, 0.25)"
                            : "none",
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                        <div className="bg-[#1C1E4A] text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl">
                          <p>
                            {getMoodIntensity(mood)}: {mood}/10
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-[#8386B0]/20">
            <span className="text-xs text-[#4B4E82]">Low Mood</span>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-400" />
              <div className="w-8 h-8 rounded-lg bg-orange-300" />
              <div className="w-8 h-8 rounded-lg bg-[#8386B0]" />
              <div className="w-8 h-8 rounded-lg bg-[#CBA6F7]" />
              <div className="w-8 h-8 rounded-lg bg-[#3454F5]" />
            </div>
            <span className="text-xs text-[#4B4E82]">High Mood</span>
          </div>
        </Card>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
