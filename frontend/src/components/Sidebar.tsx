import React from 'react';
import { 
  LayoutDashboard, 
  TestTube, 
  Database, 
  Network, 
  BarChart3, 
  FolderOpen,
  Settings,
  Users,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Operations Dashboard', icon: LayoutDashboard },
    { id: 'samples', label: 'Sample Tracking', icon: TestTube },
    { id: 'projects', label: 'Project Management', icon: FolderOpen },
    { id: 'master-data', label: 'Master Data', icon: Database },
    { id: 'integration', label: 'System Integration', icon: Network },
    { id: 'analytics', label: 'Analytics & BI', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Lab Platform</h1>
            <p className="text-xs text-gray-500">Data Middle Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${activeView === item.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
          <Settings className="w-5 h-5 text-gray-400" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
}