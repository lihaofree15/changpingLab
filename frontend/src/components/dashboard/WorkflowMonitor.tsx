import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export function WorkflowMonitor() {
  const workflows = [
    { stage: 'Sample Receipt', count: 156, avgTime: '2h', status: 'normal' },
    { stage: 'DNA Extraction', count: 89, avgTime: '4h', status: 'bottleneck' },
    { stage: 'Library Prep', count: 67, avgTime: '6h', status: 'normal' },
    { stage: 'Sequencing', count: 34, avgTime: '18h', status: 'normal' },
    { stage: 'Analysis', count: 42, avgTime: '12h', status: 'fast' }
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Workflow Pipeline Status</h2>
      </div>

      <div className="space-y-4">
        {workflows.map((workflow, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  workflow.status === 'bottleneck' ? 'bg-red-500' :
                  workflow.status === 'fast' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <h3 className="font-medium text-gray-900">{workflow.stage}</h3>
                  <p className="text-sm text-gray-600">Avg. processing: {workflow.avgTime}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{workflow.count}</div>
                <div className="text-sm text-gray-600">samples</div>
              </div>
            </div>
            {index < workflows.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}