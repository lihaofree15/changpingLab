import React from 'react';
import { Activity, CheckCircle, AlertCircle } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    { 
      type: 'success', 
      message: 'Analysis completed for Project GWAS-2024-001', 
      time: '5 min ago',
      system: 'Omics Platform'
    },
    { 
      type: 'warning', 
      message: 'Low reagent level detected: PCR Master Mix', 
      time: '12 min ago',
      system: 'Inventory System'
    },
    { 
      type: 'info', 
      message: 'New batch of 48 samples received', 
      time: '23 min ago',
      system: 'Sample Library'
    },
    { 
      type: 'success', 
      message: 'Library preparation completed for Batch-L2024-089', 
      time: '1 hour ago',
      system: 'LIMS'
    },
    { 
      type: 'info', 
      message: 'Sequencing run R2024-001 started', 
      time: '2 hours ago',
      system: 'Sequanta Flash'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{activity.system}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}