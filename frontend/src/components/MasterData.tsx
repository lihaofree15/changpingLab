import React, { useState } from 'react';
import { Database, Plus, Search, Edit, Trash2 } from 'lucide-react';

export function MasterData() {
  const [activeTab, setActiveTab] = useState('samples');

  const tabs = [
    { id: 'samples', label: 'Samples', count: 2847 },
    { id: 'libraries', label: 'Libraries', count: 1256 },
    { id: 'projects', label: 'Projects', count: 23 },
    { id: 'reagents', label: 'Reagents', count: 156 },
    { id: 'users', label: 'Users', count: 45 },
    { id: 'instruments', label: 'Instruments', count: 12 }
  ];

  const sampleData = [
    {
      globalId: 'GLOBAL-SMPL-001547',
      externalId: 'COHORT-A-0001',
      subjectId: 'SUBJ-001547',
      sampleType: 'Whole Blood',
      collectionDate: '2024-01-15',
      status: 'Active'
    },
    {
      globalId: 'GLOBAL-SMPL-001548',
      externalId: 'COHORT-A-0002',
      subjectId: 'SUBJ-001548',
      sampleType: 'Saliva',
      collectionDate: '2024-01-15',
      status: 'Active'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Master Data Management</h1>
          <p className="text-gray-600 mt-1">Centralized management of core business entities</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create New</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Database className="w-4 h-4" />
              <span>Single Source of Truth</span>
            </div>
          </div>

          {activeTab === 'samples' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Global Sample ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">External ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Subject ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Sample Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Collection Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sampleData.map((sample, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-sm text-blue-600">{sample.globalId}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{sample.externalId}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{sample.subjectId}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{sample.sampleType}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{sample.collectionDate}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {sample.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}