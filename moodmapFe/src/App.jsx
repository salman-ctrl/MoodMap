import { useState } from 'react';
import { Home, BookOpen, Brain, Calendar, Users, Settings } from 'lucide-react';
import Dashboard from './components/pages/Dashboard';
import Journal from './components/pages/Journal';
import MindMap from './components/pages/MindMap';
import MoodHeatmap from './components/pages/MoodHeatmap';
import Consultation from './components/pages/Consultation';
import SettingsPage from './components/pages/SettingsPage';
import Sidebar from './components/Sidebar';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'mindmap', label: 'Mind Map', icon: Brain },
    { id: 'heatmap', label: 'Mood Heatmap', icon: Calendar },
    { id: 'consultation', label: 'Consultation', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'journal':
        return <Journal />;
      case 'mindmap':
        return <MindMap />;
      case 'heatmap':
        return <MoodHeatmap />;
      case 'consultation':
        return <Consultation />;
      case 'settings':
        return <SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-[#1C1E4A]' : 'bg-white'}`}>
      <Sidebar 
        menuItems={menuItems} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
      />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}
