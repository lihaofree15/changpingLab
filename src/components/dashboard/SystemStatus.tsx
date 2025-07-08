import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';

export function SystemStatus() {
  const systems = [
    { name: 'Feishu Multi-table', status: 'online', health: 98, icon: '📊' },
    { name: '3D Sample Library', status: 'online', health: 95, icon: '🧪' },
    { name: 'Bioligent LIMS', status: 'warning', health: 87, icon: '⚗️' },
    { name: 'Sequanta Flash', status: 'online', health: 92, icon: '🧬' },
    { name: 'Tencent Omics', status: 'online', health: 99, icon: '☁️' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">System Integration Status</h2>
      </div>

      <div className="space-y-4">
        {systems.map((system, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{system.icon}</span>
              <div>
                <h3 className="font-medium text-gray-900">{system.name}</h3>
                <p className="text-sm text-gray-600">Health: {system.health}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(system.status)}
              <span className={`text-sm font-medium capitalize ${
                system.status === 'online' ? 'text-green-600' : 
                system.status === 'warning' ? 'text-orange-600' : 'text-red-600'
              }`}>
                {system.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}