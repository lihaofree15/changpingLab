import React from 'react';
import { BarChart3 } from 'lucide-react';

export function CapacityOverview() {
  const equipmentData = [
    { name: 'Sequencer A', utilization: 85, capacity: 100, type: 'NovaSeq' },
    { name: 'Sequencer B', utilization: 92, capacity: 100, type: 'NovaSeq' },
    { name: 'Sequencer C', utilization: 67, capacity: 100, type: 'MiSeq' },
    { name: 'Auto Workstation 1', utilization: 78, capacity: 100, type: 'Hamilton' },
    { name: 'Auto Workstation 2', utilization: 89, capacity: 100, type: 'Hamilton' }
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Equipment Capacity & Utilization</h2>
      </div>

      <div className="space-y-6">
        {equipmentData.map((equipment, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{equipment.name}</h3>
                <p className="text-sm text-gray-600">{equipment.type}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">{equipment.utilization}%</span>
                <p className="text-sm text-gray-600">utilized</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  equipment.utilization > 90 ? 'bg-red-500' :
                  equipment.utilization > 80 ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${equipment.utilization}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}