import React, { useState } from 'react';
import { Search, Filter, Eye, Download, TestTube } from 'lucide-react';

export function SampleTracking() {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  const samples = [
    {
      id: 'SMPL-2024-001547',
      externalId: 'COHORT-A-0001',
      project: 'GWAS-Diabetes-2024',
      status: 'Sequencing',
      stage: 'On Sequencer',
      receivedDate: '2024-01-15',
      expectedCompletion: '2024-01-22',
      progress: 75
    },
    {
      id: 'SMPL-2024-001548',
      externalId: 'COHORT-A-0002',
      project: 'GWAS-Diabetes-2024',
      status: 'Library Prep',
      stage: 'QC Review',
      receivedDate: '2024-01-15',
      expectedCompletion: '2024-01-25',
      progress: 45
    },
    {
      id: 'SMPL-2024-001549',
      externalId: 'COHORT-B-0001',
      project: 'Cancer-Genomics-2024',
      status: 'Analysis',
      stage: 'Variant Calling',
      receivedDate: '2024-01-10',
      expectedCompletion: '2024-01-18',
      progress: 90
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Received': 'bg-gray-100 text-gray-800',
      'DNA Extraction': 'bg-blue-100 text-blue-800',
      'Library Prep': 'bg-orange-100 text-orange-800',
      'Sequencing': 'bg-purple-100 text-purple-800',
      'Analysis': 'bg-teal-100 text-teal-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sample Tracking</h1>
          <p className="text-gray-600 mt-1">End-to-end sample journey from receipt to results</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Sample ID, External ID, or Project..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Sample Information</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Project</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Current Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Progress</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Timeline</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {samples.map((sample) => (
                <tr key={sample.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TestTube className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{sample.id}</div>
                        <div className="text-sm text-gray-600">{sample.externalId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{sample.project}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sample.status)}`}>
                        {sample.status}
                      </span>
                      <div className="text-sm text-gray-600">{sample.stage}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{sample.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${sample.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">Received: {sample.receivedDate}</div>
                    <div className="text-sm text-gray-600">Expected: {sample.expectedCompletion}</div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedSample(sample.id)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}