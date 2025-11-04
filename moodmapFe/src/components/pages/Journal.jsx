import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sparkles, Calendar as CalendarIcon, Save } from "lucide-react";
import { format } from "date-fns";

const previousEntries = [
  {
    date: "2025-10-23",
    mood: "Happy",
    preview:
      "Today was amazing! Had a great study session with friends and finally understood calculus...",
  },
  {
    date: "2025-10-22",
    mood: "Neutral",
    preview:
      "Regular day. Attended classes, worked on assignments. Feeling okay overall...",
  },
  {
    date: "2025-10-21",
    mood: "Anxious",
    preview:
      "Feeling stressed about upcoming exams. Need to plan better and stay organized...",
  },
  {
    date: "2025-10-20",
    mood: "Excited",
    preview: "Got accepted to the research program! This is such great news...",
  },
];

const moodColors = {
  Happy: "bg-[#3454F5] text-white",
  Excited: "bg-[#CBA6F7] text-white",
  Neutral: "bg-[#8386B0] text-white",
  Sad: "bg-[#4B4E82] text-white",
  Anxious: "bg-red-400 text-white",
};

export default function Journal() {
  const [date, setDate] = useState(new Date());
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-[#1C1E4A] mb-2">Journal Entry</h1>
          <p className="text-[#4B4E82]">
            Express your thoughts and track your emotional journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Writing Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card
              className="p-6 rounded-2xl border-[#8386B0]/20 shadow-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(52, 84, 245, 0.02) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex gap-4 mb-6">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-xl border-[#8386B0]/30 text-[#1C1E4A] hover:bg-[#CBA6F7]/10"
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {format(date, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Select value={mood} onValueChange={(value) => setMood(value)}>
                  <SelectTrigger className="w-48 rounded-xl border-[#8386B0]/30">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Happy">😊 Happy</SelectItem>
                    <SelectItem value="Excited">🎉 Excited</SelectItem>
                    <SelectItem value="Neutral">😐 Neutral</SelectItem>
                    <SelectItem value="Sad">😔 Sad</SelectItem>
                    <SelectItem value="Anxious">😰 Anxious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="How are you feeling today? Write down your thoughts, experiences, and emotions..."
                className="min-h-[300px] rounded-xl border-[#8386B0]/30 resize-none text-[#1C1E4A] placeholder:text-[#8386B0]"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />

              <Button className="w-full mt-6 bg-gradient-to-r from-[#3454F5] to-[#CBA6F7] text-white rounded-xl shadow-lg shadow-[#3454F5]/25 hover:shadow-xl hover:shadow-[#3454F5]/30 transition-all">
                <Save className="w-4 h-4 mr-2" />
                Save & Analyze Entry
              </Button>
            </Card>

            {/* AI Reflection Suggestion */}
            <Card
              className="p-6 rounded-2xl border-[#8386B0]/20 shadow-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(203, 166, 247, 0.15) 0%, rgba(52, 84, 245, 0.05) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CBA6F7] to-[#3454F5] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[#1C1E4A] mb-2">AI Reflection Suggestion</h3>
                  <p className="text-[#4B4E82] text-sm leading-relaxed">
                    Based on your recent entries, you seem to be experiencing increased
                    academic stress. Consider these reflection prompts: What specific
                    aspects of your studies are causing the most concern? What support
                    systems can you lean on? Remember to celebrate small victories and
                    practice self-compassion.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Previous Entries Sidebar */}
          <div className="space-y-4">
            <h3 className="text-[#1C1E4A]">Previous Entries</h3>

            {previousEntries.map((entry, index) => (
              <Card
                key={index}
                className="p-4 rounded-2xl border-[#8386B0]/20 shadow-sm hover:shadow-md transition-all cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#4B4E82] text-sm">{entry.date}</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${moodColors[entry.mood]}`}>
                    {entry.mood}
                  </span>
                </div>
                <p className="text-[#1C1E4A] text-sm line-clamp-3">{entry.preview}</p>
              </Card>
            ))}

            <Button
              variant="outline"
              className="w-full rounded-xl border-[#8386B0]/30 text-[#3454F5] hover:bg-[#CBA6F7]/10"
            >
              View All Entries
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
