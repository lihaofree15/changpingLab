import React from 'react';
import { BarChart3, TrendingUp, Clock, DollarSign } from 'lucide-react';

export function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Business Intelligence</h1>
          <p className="text-gray-600 mt-1">Cross-system insights and predictive analytics</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Sample-to-Answer Turnaround Time</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Average TAT</span>
              <span className="text-lg font-bold text-gray-900">14.2 days</span>
            </div>
            
            <div className="space-y-3">
              {[
                { stage: 'Sample Receipt to DNA Extraction', time: '2.1 days', color: 'bg-blue-500' },
                { stage: 'DNA Extraction to Library Prep', time: '3.4 days', color: 'bg-teal-500' },
                { stage: 'Library Prep to Sequencing', time: '4.2 days', color: 'bg-orange-500' },
                { stage: 'Sequencing to Analysis Complete', time: '4.5 days', color: 'bg-purple-500' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.stage}</span>
                    <span className="font-medium">{item.time}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full transition-all duration-300`} style={{width: `${Math.random() * 80 + 20}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Throughput Analysis</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">847</div>
                <div className="text-sm text-gray-600">Samples This Month</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">28.2</div>
                <div className="text-sm text-gray-600">Avg Daily Throughput</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Bottleneck Analysis</h3>
              {[
                { stage: 'DNA Extraction', utilization: 89, status: 'High' },
                { stage: 'Library Preparation', utilization: 67, status: 'Normal' },
                { stage: 'Sequencing', utilization: 94, status: 'Critical' },
                { stage: 'Analysis Pipeline', utilization: 72, status: 'Normal' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.stage}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{item.utilization}%</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'Critical' ? 'bg-red-100 text-red-800' :
                      item.status === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <DollarSign className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">Cost Analysis & Resource Optimization</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Cost per Sample</h3>
            <div className="text-3xl font-bold text-gray-900">¥284</div>
            <div className="text-sm text-green-600">-12% from last month</div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reagents</span>
                <span>¥156 (55%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Labor</span>
                <span>¥89 (31%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Equipment</span>
                <span>¥39 (14%)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Equipment Utilization</h3>
            <div className="space-y-3">
              {[
                { name: 'NovaSeq 6000 #1', utilization: 92 },
                { name: 'NovaSeq 6000 #2', utilization: 87 },
                { name: 'MiSeq v3', utilization: 64 },
                { name: 'Hamilton STARlet', utilization: 78 }
              ].map((equipment, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{equipment.name}</span>
                    <span className="font-medium">{equipment.utilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        equipment.utilization > 85 ? 'bg-red-500' :
                        equipment.utilization > 70 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${equipment.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Predictive Insights</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">Inventory Alert</div>
                <div className="text-xs text-yellow-700 mt-1">PCR Master Mix will run out in 5 days based on current usage</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Capacity Forecast</div>
                <div className="text-xs text-blue-700 mt-1">Expected 15% increase in throughput next month</div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm font-medium text-green-800">Optimization</div>
                <div className="text-xs text-green-700 mt-1">Batch size optimization can reduce cost by 8%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}