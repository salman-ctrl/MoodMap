import { Sparkles } from 'lucide-react';

export default function Sidebar({ menuItems, currentPage, setCurrentPage, isDarkMode }) {
  return (
    <aside 
      className={`w-64 border-r transition-colors ${
        isDarkMode 
          ? 'bg-[#1C1E4A] border-[#4B4E82]' 
          : 'bg-white border-[#8386B0]/20'
      }`}
      style={{
        backdropFilter: 'blur(10px)',
        background: isDarkMode 
          ? 'linear-gradient(180deg, #1C1E4A 0%, #2A2D5A 100%)'
          : 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)',
      }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3454F5] to-[#CBA6F7] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1C1E4A]'}`}>MoodMap</h1>
            <p className={`text-xs ${isDarkMode ? 'text-[#8386B0]' : 'text-[#4B4E82]'}`}>Mental Health Tracker</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3454F5] to-[#3454F5]/80 text-white shadow-lg shadow-[#3454F5]/25'
                    : isDarkMode
                    ? 'text-[#8386B0] hover:bg-[#4B4E82]/20'
                    : 'text-[#4B4E82] hover:bg-[#CBA6F7]/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
