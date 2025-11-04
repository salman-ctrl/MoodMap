import { Calendar, TrendingUp, BookOpen, Heart, Users, PenLine, Brain } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const moodData = [
  { day: 'Mon', mood: 7 },
  { day: 'Tue', mood: 6 },
  { day: 'Wed', mood: 8 },
  { day: 'Thu', mood: 7 },
  { day: 'Fri', mood: 9 },
  { day: 'Sat', mood: 8 },
  { day: 'Sun', mood: 7 },
];

const heatmapData = [
  [0, 7, 6, 8, 7, 5, 6],
  [7, 8, 7, 9, 8, 7, 6],
  [6, 7, 8, 7, 9, 8, 7],
  [8, 7, 6, 7, 8, 9, 8],
  [7, 8, 9, 8, 7, 6, 7],
];

const getMoodColor = (mood) => {
  if (mood === 0) return 'bg-gray-100';
  if (mood >= 8) return 'bg-[#3454F5]';
  if (mood >= 6) return 'bg-[#CBA6F7]';
  if (mood >= 4) return 'bg-[#8386B0]';
  return 'bg-red-300';
};

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[#1C1E4A] mb-1">Welcome back, Bunga 👋</h1>
          <p className="text-[#4B4E82] flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {today}
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-[#3454F5] to-[#CBA6F7] text-white rounded-xl shadow-lg shadow-[#3454F5]/25 hover:shadow-xl hover:shadow-[#3454F5]/30 transition-all">
            <PenLine className="w-4 h-4 mr-2" />
            Write Journal
          </Button>
          <Button variant="outline" className="rounded-xl border-[#8386B0]/30 text-[#3454F5] hover:bg-[#CBA6F7]/10">
            <Brain className="w-4 h-4 mr-2" />
            View Mind Map
          </Button>
        </div>
      </div>
    
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Journals', value: '42', icon: BookOpen, color: 'from-[#3454F5] to-[#3454F5]/80' },
          { label: 'Positive Days', value: '28', icon: Heart, color: 'from-[#CBA6F7] to-[#CBA6F7]/80' },
          { label: 'Consultations', value: '5', icon: Users, color: 'from-[#3454F5] to-[#CBA6F7]' },
          { label: 'Avg. Mood', value: '7.4', icon: TrendingUp, color: 'from-[#8386B0] to-[#4B4E82]' },
        ].map((stat, index) => (
          <Card 
            key={index}
            className="p-5 rounded-2xl border-[#8386B0]/20 shadow-sm hover:shadow-md transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(203, 166, 247, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#4B4E82] text-sm mb-1">{stat.label}</p>
                <p className="text-[#1C1E4A]">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mood Summary Chart */}
        <Card 
          className="lg:col-span-2 p-6 rounded-2xl border-[#8386B0]/20 shadow-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(52, 84, 245, 0.02) 100%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[#1C1E4A] mb-1">Average Mood This Week</h2>
              <p className="text-[#4B4E82] text-sm">Tracking your emotional wellbeing</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#CBA6F7]/10 text-[#3454F5]">
              Score: 7.4
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#8386B0" opacity={0.2} />
              <XAxis dataKey="day" stroke="#4B4E82" />
              <YAxis stroke="#4B4E82" domain={[0, 10]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #8386B0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#3454F5" 
                strokeWidth={3}
                dot={{ fill: '#3454F5', r: 5 }}
                activeDot={{ r: 7, fill: '#CBA6F7' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Mind Mapping Progress */}
        <Card 
          className="p-6 rounded-2xl border-[#8386B0]/20 shadow-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(203, 166, 247, 0.1) 0%, rgba(255, 255, 255, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3 className="text-[#1C1E4A] mb-4">Mind Map Progress</h3>
          
          <div className="space-y-4">
            {[
              { goal: 'Academic Goals', progress: 75, color: '#3454F5' },
              { goal: 'Personal Growth', progress: 60, color: '#CBA6F7' },
              { goal: 'Social Life', progress: 85, color: '#8386B0' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-[#1C1E4A] text-sm">{item.goal}</span>
                  <span className="text-[#4B4E82] text-sm">{item.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${item.progress}%`,
                      background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}80 100%)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button 
            className="w-full mt-6 bg-white border border-[#8386B0]/30 text-[#3454F5] hover:bg-[#CBA6F7]/10 rounded-xl"
            variant="outline"
          >
            View Full Map
          </Button>
        </Card>
      </div>

      {/* Mood Heatmap */}
      <Card 
        className="p-6 rounded-2xl border-[#8386B0]/20 shadow-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#1C1E4A] mb-1">Mood Heatmap</h2>
            <p className="text-[#4B4E82] text-sm">Last 5 weeks overview</p>
          </div>
          <Button variant="ghost" className="text-[#3454F5] hover:bg-[#CBA6F7]/10">
            View Full Calendar →
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2 mb-2 text-xs text-[#4B4E82]">
            <div className="w-12"></div>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={i} className="w-12 text-center">{day}</div>
            ))}
          </div>
          
          {heatmapData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex gap-2">
              <div className="w-12 text-xs text-[#4B4E82] flex items-center">Week {weekIndex + 1}</div>
              {week.map((mood, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-12 h-12 rounded-lg ${getMoodColor(mood)} transition-all hover:scale-110 cursor-pointer`}
                  style={{
                    boxShadow: mood >= 8 ? '0 2px 8px rgba(52, 84, 245, 0.2)' : 'none',
                  }}
                  title={`Mood: ${mood}/10`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6 text-xs text-[#4B4E82]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded bg-gray-100" />
            <div className="w-6 h-6 rounded bg-red-300" />
            <div className="w-6 h-6 rounded bg-[#8386B0]" />
            <div className="w-6 h-6 rounded bg-[#CBA6F7]" />
            <div className="w-6 h-6 rounded bg-[#3454F5]" />
          </div>
          <span>More</span>
        </div>
      </Card>
    </div>
  );
}
